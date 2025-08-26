import { useSession } from "next-auth/react"
import { Chat } from "../../../@types/chat"
import { Message } from "../../../@types/message"
import { timeAgo } from "../../../utils/time-ago"
import { Avatar, AvatarFallback } from "../../ui/avatar"

export function ChatMessages({ message, selectedChat }: { message: Message, selectedChat: Chat }) {
  const { data: session } = useSession()
  const fromUser = message.fromUserId || message.user
  const isActiveUser = fromUser === session?.user?.id
  return <div
    key={message?.id}
    className={`flex items-start ${isActiveUser
      ? 'justify-end'
      : 'justify-start'
      }`}
  >
    <div
      className={`max-w-[70%] rounded-b-xl flex items-center gap-2 rounded-tl-xl rounded-tr-xl p-4 ${isActiveUser
        ? 'bg-primary text-primary-foreground'
        : 'bg-gray-300'
        }`}
    >
      <Avatar>
        <AvatarFallback className="border-primary text-primary border">
          {selectedChat?.participants.find(
            (participant) => participant.id)?.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm">{message.text}</p>
        <p
          className={`mt-1 text-xs ${isActiveUser
            ? 'text-primary-foreground/70'
            : 'text-muted-foreground'
            }`}
        >
          {timeAgo(new Date(message?.createdAt || new Date()))}
        </p>
      </div>
    </div>
  </div>
}