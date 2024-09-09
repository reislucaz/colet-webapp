import { ListUsers } from '@/@types/users'
import { coletApi } from '../axios'
import { CreateUserInput } from '@/validations/create-user-schema'
import { Pagination } from '@/@types/pagination'

export function useUsersService() {
  const endpoint = '/users'

  async function createUsersService(anInput: CreateUserInput) {
    await coletApi.post('/auth/register', anInput)
  }

  async function fetchUsersService(): Promise<Pagination<ListUsers>> {
    const { data } = await coletApi.get(endpoint)

    return data
  }

  return {
    createUsersService,
    fetchUsersService,
  }
}
