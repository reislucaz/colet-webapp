import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { coletApi } from '@/services/axios'

export async function GET(
  request: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const chatId = params.chatId
    const response = await coletApi.get(`/chats/${chatId}`)

    return NextResponse.json(response.data.messages || [])
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { chatId: string } },
) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const chatId = params.chatId
    const data = await request.json()

    const response = await coletApi.post(`/messages`, {
      chatId,
      content: data.content,
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    )
  }
}
