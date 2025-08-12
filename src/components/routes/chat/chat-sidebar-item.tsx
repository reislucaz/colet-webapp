import { useSession } from "next-auth/react"
import { Chat } from "../../../@types/chat"
import { timeAgo } from "../../../utils/time-ago"
import { Avatar, AvatarFallback } from "../../ui/avatar"

export function ChatSidebarItem({ chat, handleChatSelect }: { chat: Chat, handleChatSelect: () => void }) {
  const { data: session } = useSession()
  const lastMessage = chat.messages?.[chat.messages.length - 1]
  const chatFromUser = chat.participants.find(
    (participant) => participant.id !== session?.user.id,
  )
  return <div
    key={chat.id}
    className={`cursor-pointer border-b p-4 transition-colors hover:bg-muted`}
    onClick={handleChatSelect}
  >
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>
          {chatFromUser?.name.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{chatFromUser?.name}</p>
        {lastMessage && (
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
}