'use client'

import { ChatSkeleton } from '@/components/ui/chat-skeleton'
import { ChatService } from '@/services/chat-service'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useChatContext } from '../../../hooks/use-chat-context'
import { Card, CardContent } from '../../ui/card'
import { ChatMessages } from './chat-messages'
import { ChatOffer } from './chat-offer'
import { ChatSidebarItem } from './chat-sidebar-item'
import { ChatSubmitMessageButton } from './chat-submit-message-button'

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
  const { setChatId, messages, selectedChat, setSelectedChat } = useChatContext()
  const { data: chats, isLoading } = useQuery({
    queryKey: ['chat-list'],
    queryFn: ChatService.findMany,
  })

  if (isLoading) {
    return <ChatSkeleton />
  }

  return (
    <div className='flex h-[calc(100vh-200px)] w-full gap-4'>
      <div className='h-full w-1/4 overflow-y-auto rounded-lg border'>
        <div className='border-b p-4 font-medium'>Conversas</div>
        {chats?.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>Nenhuma conversa encontrada</div>
        ) : (
          chats?.map((chat) => {
            return (
              <ChatSidebarItem
                key={chat.id}
                chat={chat}
                handleChatSelect={() => {
                  setSelectedChat(chat)
                  setChatId(chat.id)
                }}
              />
            )
          })
        )}
      </div>
      <Card className='flex h-full w-3/4 flex-col'>
        {!selectedChat ? (
          <div className='flex flex-1 items-center justify-center p-4 text-muted-foreground'>
            Selecione uma conversa para começar
          </div>
        ) : (
          <div className='relative flex h-full flex-col'>
            <div className='border-b p-4 font-medium'>
              {selectedChat?.participants.find((participant) => participant.id !== session?.user.id)
                ?.name || 'Conversa'}
            </div>
            <CardContent className='flex-1 space-y-4 overflow-y-auto p-4'>
              {selectedChat && <ChatOffer chatId={selectedChat.id} />}
              {messages.map((message) => (
                <ChatMessages key={message.id} message={message} selectedChat={selectedChat} />
              ))}
            </CardContent>
            {selectedChat && <ChatSubmitMessageButton selectedChat={selectedChat} />}
          </div>
        )}
      </Card>
    </div>
  )
}
