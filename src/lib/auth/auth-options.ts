import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { data } = await axios.post(`${apiUrl}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          })

          const userResponse = jwtDecode(data.access_token)
          if (userResponse) {
            return {
              ...data,
              ...userResponse,
            }
          }

          return null
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = {
          ...token,
          user,
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        session.user = token.user
        session.user.id = token.user.sub
      }
      return session
    },
  },
}
