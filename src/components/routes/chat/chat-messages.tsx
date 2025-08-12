import { useSession } from "next-auth/react"
import { Chat } from "../../../@types/chat"
import { Message } from "../../../@types/message"
import { timeAgo } from "../../../utils/time-ago"
import { Avatar, AvatarFallback } from "../../ui/avatar"

export function ChatMessages({ message, selectedChat }: { message: Message, selectedChat: Chat }) {
  const { data: session } = useSession()
  return <div
    key={message?.id}
    className={`flex ${message.fromUser?.id === session?.user?.id
      ? 'justify-end'
      : 'justify-start'
      }`}
  >
    {message.fromUser?.id !== session?.user?.id && (
      <Avatar>
        <AvatarFallback>
          {selectedChat?.participants.find(
            (participant) => participant.id !== session?.user.id)?.name.charAt(0) || 'U'}
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
}