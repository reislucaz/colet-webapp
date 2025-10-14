'use client'
import { useSession } from 'next-auth/react'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Socket } from 'socket.io-client'
import { Chat } from '../@types/chat'
import { Message } from '../@types/message'
import { getSocketClient } from '../services/socket-client'

interface ChatContextProps {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  chatId: string | undefined
  setChatId: Dispatch<SetStateAction<string | undefined>>
  socketRef: React.MutableRefObject<Socket | null>
  selectedChat: Chat | null
  setSelectedChat: Dispatch<SetStateAction<Chat | null>>
}

export const ChatContext = createContext<ChatContextProps>(
  {} as ChatContextProps,
)

export function ChatContextProvider({ children }: { children: ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>(
    selectedChat?.messages || [],
  )
  const socketRef = useRef<Socket | null>(null)
  const [chatId, setChatId] = useState<string | undefined>()
  const { data: session } = useSession()
  const user = session?.user

  useEffect(() => {
    if (!user?.id || socketRef.current?.connected || !chatId) return
    const socket = getSocketClient(user.id, chatId)
    socketRef.current = socket
    socket.on('message', handleMessage)
    return () => {
      socket?.disconnect()
    }
  }, [user?.id, chatId])

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  function handleMessage(message: Message) {
    setMessages((prev) => {
      return [...prev, message]
    })
  }

  return (
    <ChatContext.Provider
      value={{
        setChatId,
        chatId,
        messages,
        setMessages,
        socketRef,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatContextProvider')
  }
  return context
}
