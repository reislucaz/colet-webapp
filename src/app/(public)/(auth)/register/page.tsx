/* eslint-disable @next/next/no-img-element */
import { RegisterForm } from '@/components/routes/register/register-form'

export default async function RegisterPage() {
  return (
    <div className="flex h-screen max-h-screen w-screen max-w-[100vw] items-start justify-between">
      <div>
        <img
          src="./sign-up-bg.png"
          alt="Sign up background"
          className="h-screen w-[50vw] rounded-br-[120px] bg-contain"
        />
      </div>
      <div className="flex h-screen w-[50vw] max-w-[50vw] flex-col items-center justify-center space-y-4">
        <div className="w-[30vw] space-y-8">
          <div>
            <h3 className="text-3xl font-bold text-textPrimary">
              Crie a sua conta
            </h3>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
