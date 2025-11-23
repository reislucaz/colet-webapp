import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Chat } from '../../../@types/chat'
import { useChatContext } from '../../../hooks/use-chat-context'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { queryClient } from '@/utils/query-client'

export function ChatSubmitMessageButton({ selectedChat }: { selectedChat: Chat }) {
  const { data: session } = useSession()
  const { socketRef } = useChatContext()
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return
    socketRef?.current?.emit('message', {
      chatId: selectedChat.id,
      user: session?.user.id,
      text: newMessage,
    })
    queryClient.invalidateQueries({
      queryKey: ['chat-list'],
    })
    setNewMessage('')
  }

  const [newMessage, setNewMessage] = useState('')
  return (
    <div className='border-t p-4'>
      <form
        className='flex gap-2'
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
      >
        <Input
          placeholder='Digite sua mensagem...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button type='submit'>Enviar</Button>
      </form>
    </div>
  )
}
