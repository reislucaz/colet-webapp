import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession()

  if (!session) {
    return <>Você não está logado</>
  }

  return <>Bem vindo, {session!.user.name}!</>
}
