'use client'

import { Chat } from '@/@types/chat'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChatSkeleton } from '@/components/ui/chat-skeleton'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ChatService } from '@/services/chat-service'
import { timeAgo } from '@/utils/time-ago'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useChatContext } from '../../../hooks/use-chat-context'

interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
  }
  createdAt: string
}

export function ChatInterface() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const { chatId, setChatId, socketRef } = useChatContext()
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const { data: chats, isLoading } = useQuery({
    queryKey: ['chat-list'],
    queryFn: ChatService.findMany,
  })
  const chatFromUser = selectedChat?.participants.find(
    (participant) => participant.id !== session?.user.id,
  )

  function handleSendMessage() {
    if (!newMessage.trim() || !selectedChat) return

    console.log(newMessage)
  }

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return
    console.log('Sending message:', newMessage)
    console.log('Socket:', socketRef?.current?.active)
    socketRef?.current?.emit('message', {
      chatId: selectedChat.id,
      text: newMessage,
      fromUser: {
        id: session?.user.id,
        name: session?.user.name || 'Usuário',
      },
    })
  }

  if (isLoading) {
    return <ChatSkeleton />
  }

  return (
    <div className="flex h-[calc(100vh-200px)] w-full gap-4">
      {/* Chat list */}
      <div className="h-full w-1/4 overflow-y-auto rounded-lg border">
        <div className="border-b p-4 font-medium">Conversas</div>
        {chats?.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Nenhuma conversa encontrada
          </div>
        ) : (
          chats?.map((chat) => {
            const lastMessage = chat.messages?.[chat.messages.length - 1]
            return (
              <div
                key={chat.id}
                className={`cursor-pointer border-b p-4 transition-colors hover:bg-muted ${selectedChat?.id === chat.id ? 'bg-muted' : ''
                  }`}
                onClick={() => {
                  setSelectedChat(chat)
                  setChatId(chat.id)
                }}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {chatFromUser?.name.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{chatFromUser?.name}</p>
                    {chat.messages && (
                      <div className="flex flex-col">
                        <p className="truncate text-sm text-muted-foreground">
                          {lastMessage.text}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {timeAgo(new Date(lastMessage.createdAt))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
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
              {chatFromUser?.name || 'Conversa'}
            </div>
            <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
              {selectedChat?.messages.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message.fromUser?.id === session?.user?.id
                    ? 'justify-end'
                    : 'justify-start'
                    }`}
                >
                  {message.fromUser?.id !== session?.user?.id && (
                    <Avatar>
                      <AvatarFallback>
                        {chatFromUser?.name.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${message.fromUser?.id === session?.user?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                      }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`mt-1 text-xs ${message.fromUser?.id === session?.user?.id
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                        }`}
                    >
                      {timeAgo(new Date(message.createdAt))}
                    </p>
                  </div>
                  {message.fromUser?.id === session?.user?.id && (
                    <Avatar>
                      <AvatarFallback>
                        {message.fromUser?.name.charAt(0)}
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
