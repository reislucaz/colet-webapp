'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChatSkeleton } from '@/components/ui/chat-skeleton'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { coletApi } from '@/services/axios'
import { timeAgo } from '@/utils/time-ago'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
  }
  createdAt: string
}

interface Chat {
  id: string
  title: string
  participants: {
    id: string
    name: string
  }[]
  lastMessage?: {
    content: string
    createdAt: string
  }
}

export function ChatInterface() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch chats
  const fetchChats = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await coletApi.get('/chats')
      // Ensure we're working with an array
      const chatsData = Array.isArray(response.data) ? response.data : []
      setChats(chatsData)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar os chats.',
      })
      // Set empty array on error
      setChats([])
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  // Fetch messages for a chat
  const fetchMessages = useCallback(
    async (chatId: string) => {
      try {
        const response = await coletApi.get(`/chats/${chatId}/messages`)
        setMessages(response.data)
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível carregar as mensagens.',
        })
      }
    },
    [toast],
  )

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return

    try {
      const response = await coletApi.post('/messages', {
        chatId: selectedChat,
        content: newMessage,
      })

      setMessages((prev) => [...prev, response.data])
      setNewMessage('')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível enviar a mensagem.',
      })
    }
  }

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat)
    }
  }, [selectedChat, fetchMessages])

  if (isLoading) {
    return <ChatSkeleton />
  }

  return (
    <div className="flex h-[calc(100vh-200px)] w-full gap-4">
      {/* Chat list */}
      <div className="h-full w-1/4 overflow-y-auto rounded-lg border">
        <div className="border-b p-4 font-medium">Conversas</div>
        {chats.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Nenhuma conversa encontrada
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`cursor-pointer border-b p-4 transition-colors hover:bg-muted ${selectedChat === chat.id ? 'bg-muted' : ''
                }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {chat.participants[0]?.name.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{chat.title}</p>
                  {chat.lastMessage && (
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm text-muted-foreground">
                        {chat.lastMessage.content}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(new Date(chat.lastMessage.createdAt))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat messages */}
      <Card className="flex h-full w-3/4 flex-col">
        {!selectedChat ? (
          <div className="flex flex-1 items-center justify-center p-4 text-muted-foreground">
            Selecione uma conversa para começar
          </div>
        ) : (
          <>
            <div className="border-b p-4 font-medium">
              {chats.find((c) => c.id === selectedChat)?.title || 'Conversa'}
            </div>
            <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.id === session?.user?.id
                      ? 'justify-end'
                      : 'justify-start'
                    }`}
                >
                  {message.sender.id !== session?.user?.id && (
                    <Avatar>
                      <AvatarFallback>
                        {message.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${message.sender.id === session?.user?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`mt-1 text-xs ${message.sender.id === session?.user?.id
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                        }`}
                    >
                      {timeAgo(new Date(message.createdAt))}
                    </p>
                  </div>
                  {message.sender.id === session?.user?.id && (
                    <Avatar>
                      <AvatarFallback>
                        {message.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </CardContent>
            <div className="border-t p-4">
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
              >
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit">Enviar</Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
