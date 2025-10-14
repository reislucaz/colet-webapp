import { io } from 'socket.io-client'

export function getSocketClient(userId: string, chatId: string) {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
    query: {
      chatId,
      from: userId,
    },
    transports: ['websocket'],
    reconnectionAttempts: 3,
    reconnectionDelay: 1000 + Math.min(Math.random() * 1000, 1000),
    reconnectionDelayMax: 5000,
  })
  return socket
}
