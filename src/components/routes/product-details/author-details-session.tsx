'use client'
import { User } from '@/@types/users'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { usersQueryKey } from '@/constants/query-key/users-query-key'
import { coletApi } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'
import * as motion from 'motion/react-client'

export async function AuthorDetailsSession(params: { id: string }) {
  const { data: author } = useQuery({
    queryFn: async () => (await coletApi.get<User>(`/users/${params.id}`)).data,
    queryKey: [usersQueryKey.GET_ONE_USER],
  })

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-3xl font-bold">Informações do vendedor:</h2>
      <Card className="size-full shadow-md">
        <CardContent className="flex flex-col gap-2">
          <div className="flex w-full items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src="/user-default.png" />
            </Avatar>
            <h3 className="text-3xl font-bold">{author?.name}</h3>
          </div>
          <span className="mt-4 border border-gray-200"></span>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-medium">Contatos:</h3>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">Email:</h4>
              <p className="text-sm">{author?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
