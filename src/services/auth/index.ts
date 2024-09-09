import { AuthenticateInput } from '@/validations/authenticate-schema'
import { coletApi } from '../axios'

export function authService() {
  async function authenticateService(anInput: AuthenticateInput) {
    const { data } = await coletApi.post('/auth/login', anInput)

    return data
  }

  return {
    authenticateService,
  }
}
