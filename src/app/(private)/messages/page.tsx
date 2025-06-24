'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChatSkeleton } from '@/components/ui/chat-skeleton'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { coletApi } from '@/services/axios'
import { timeAgo } from '@/utils/time-ago'
import { Search, Send } from 'lucide-react'
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

export default function MessagesPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch chats
  const fetchChats = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await coletApi.get('/chats')
      setChats(response.data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar os chats.',
      })
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

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return <ChatSkeleton />
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mensagens</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie suas conversas e mensagens
          </p>
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)] w-full gap-4">
        {/* Chat list */}
        <Card className="h-full w-1/4">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredChats.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Nenhuma conversa encontrada
              </div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted ${selectedChat === chat.id ? 'bg-muted' : ''
                    }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <Avatar>
                    <AvatarFallback>
                      {chat.participants[0]?.name.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium leading-none">
                      {chat.title}
                    </p>
                    {chat.lastMessage && (
                      <p className="truncate text-sm text-muted-foreground">
                        {chat.lastMessage.content}
                      </p>
                    )}
                  </div>
                  {chat.lastMessage && (
                    <div className="text-xs text-muted-foreground">
                      {timeAgo(new Date(chat.lastMessage.createdAt))}
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Chat messages */}
        <Card className="flex h-full w-3/4 flex-col">
          {!selectedChat ? (
            <div className="flex flex-1 items-center justify-center p-4 text-muted-foreground">
              Selecione uma conversa para começar
            </div>
          ) : (
            <>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {chats
                        .find((c) => c.id === selectedChat)
                        ?.participants[0]?.name.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>
                      {chats.find((c) => c.id === selectedChat)?.title}
                    </CardTitle>
                    <CardDescription>Online</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.sender.id === session?.user?.id
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
                  <Button type="submit">
                    <Send className="size-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
