'use client'

import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'

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
      // TODO: Replace with actual API call
      // const response = await fetch('/api/chats')
      // const data = await response.json()
      // setChats(data)

      // Mocked data for now
      setChats([
        {
          id: '1',
          title: 'Coleta de Papelão',
          participants: [{ id: '2', name: 'Maria Silva' }],
          lastMessage: {
            content: 'Olá, quando podemos agendar a coleta?',
            createdAt: new Date().toISOString(),
          },
        },
        {
          id: '2',
          title: 'Coleta de Eletrônicos',
          participants: [{ id: '3', name: 'João Pereira' }],
          lastMessage: {
            content: 'Tenho alguns eletrônicos para descartar',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        },
      ])
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
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/chats/${chatId}/messages`)
        // const data = await response.json()
        // setMessages(data)

        // Mocked data for now
        if (chatId === '1') {
          setMessages([
            {
              id: '1',
              content: 'Olá, estou interessado em seus serviços de coleta.',
              sender: {
                id: session?.user?.id || 'current-user',
                name: session?.user?.name || 'Você',
              },
              createdAt: new Date(Date.now() - 3600000).toISOString(),
            },
            {
              id: '2',
              content: 'Olá, quando podemos agendar a coleta?',
              sender: { id: '2', name: 'Maria Silva' },
              createdAt: new Date().toISOString(),
            },
          ])
        } else if (chatId === '2') {
          setMessages([
            {
              id: '3',
              content: 'Tenho alguns eletrônicos para descartar',
              sender: { id: '3', name: 'João Pereira' },
              createdAt: new Date(Date.now() - 86400000).toISOString(),
            },
          ])
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível carregar as mensagens.',
        })
      }
    },
    [session, toast],
  )

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return

    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/chats/${selectedChat}/messages`, {
      //   method: 'POST',
      //   body: JSON.stringify({ content: newMessage }),
      //   headers: { 'Content-Type': 'application/json' }
      // })

      // Add message locally for now
      const newMsg: Message = {
        id: `temp-${Date.now()}`,
        content: newMessage,
        sender: {
          id: session?.user?.id || 'current-user',
          name: session?.user?.name || 'Você',
        },
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, newMsg])
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="flex h-[calc(100vh-200px)] w-full gap-4">
      {/* Chat list */}
      <div className="h-full w-1/4 overflow-y-auto rounded-lg border">
        <div className="border-b p-4 font-medium">Conversas</div>
        {isLoading ? (
          <div className="p-4 text-center">Carregando conversas...</div>
        ) : chats.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Nenhuma conversa encontrada
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`cursor-pointer border-b p-4 transition-colors hover:bg-muted ${selectedChat === chat.id ? 'bg-muted' : ''}`}
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
                        {formatDate(chat.lastMessage.createdAt)}
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
                  className={`flex ${message.sender.id === session?.user?.id || message.sender.id === 'current-user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender.id === session?.user?.id ||
                      message.sender.id === 'current-user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p>{message.content}</p>
                    </div>
                    <p
                      className={`mt-1 text-xs ${
                        message.sender.id === session?.user?.id ||
                        message.sender.id === 'current-user'
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
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
