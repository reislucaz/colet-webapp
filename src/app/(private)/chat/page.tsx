import { ChatInterface } from '@/components/routes/chat/chat-interface'

export default function ChatPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Mensagens</h1>
      <ChatInterface />
    </div>
  )
}
