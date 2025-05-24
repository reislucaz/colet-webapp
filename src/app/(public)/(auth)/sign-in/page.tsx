/* eslint-disable @next/next/no-img-element */
import { AuthenticateForm } from '@/components/routes/sign-in/authenticate-form'
import * as motion from 'motion/react-client'

export default async function SignInPage() {
  return (
    <div className="flex h-screen max-h-screen w-screen max-w-[100vw] items-start justify-between">

      <div className="flex h-screen w-[50vw] max-w-[50vw] flex-col items-center justify-center space-y-4">
        <img className='w-72' src="logo.svg" alt="" />

        <div className="w-[30vw] space-y-3">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-primary">Login</h3>
            <p className="text-gray-400">
              Digite seu email e a sua senha para autenticar.
            </p>
          </div>
          <AuthenticateForm />
        </div>
      </div>
      <motion.div animate={{ opacity: [0, 1], translateX: [10, 0], translateY: [10, 0], transition: { ease: 'easeInOut', delay: 0.2, duration: 0.5 } }} className="h-screen w-[50vw] max-w-[50vw] items-center justify-center bg-primary rounded-tl-[3rem] rounded-bl-[10rem] bg-gradient-to-br from-textPrimary to-primary flex flex-col">
        <motion.h3 animate={{ opacity: [0, 1], translateY: [10, 0], transition: { delay: 0.3, duration: 0.5 } }} className='text-7xl text-center text-accent font-medium'>Conectando pessoas. Movimentando reciclagem.</motion.h3>
      </motion.div>
    </div>
  )
}
