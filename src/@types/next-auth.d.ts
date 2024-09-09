import { UserRoles } from '@/constants/roles/user-roles'
import type { DefaultSession, User } from 'next-auth'

declare module 'next-auth' {
  export interface User {
    access_token: string
    sub: string
    name: string
    email: string
    phone: string
    companyId?: string
    roles: UserRoles[]
    iat: number
    id: string
  }

  export interface Session {
    user: User
    error: string
    id_token: string
    access_token: string
  }

  export interface Account {
    id: string
    type: string
    scope: string
    provider: string
    id_token: string
    expires_in: number
    token_type: string
    access_token: string
    refresh_token: string
    session_state: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
    exp: number
    sub: string
    name: string
    email: string
    error: string
    avatar: string
    id_token: string
    expires_at: number
    refresh_token: string
    access_token: string
    contact: string
    responsible: string
  }

  export interface Session extends DefaultSession {
    token: JWT
  }
}
