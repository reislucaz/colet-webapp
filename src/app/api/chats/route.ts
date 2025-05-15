import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { coletApi } from '@/services/axios'

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const response = await coletApi.get('/chats')
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error fetching chats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 },
    )
  }
}
