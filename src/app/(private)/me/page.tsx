import { ProfileManagement } from '@/components/routes/profile/profile-management'

export default function Me() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">Meu Perfil</h1>
      <ProfileManagement />
    </div>
  )
}
