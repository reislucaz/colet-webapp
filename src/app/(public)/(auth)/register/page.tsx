/* eslint-disable @next/next/no-img-element */
import { RegisterForm } from '@/components/routes/register/register-form'
import * as motion from 'motion/react-client'

export default async function RegisterPage() {
  return (
    <div className="flex h-screen max-h-screen w-screen max-w-[100vw] items-start justify-between">
      <motion.div animate={{ opacity: [0, 1], translateX: [10, 0], translateY: [10, 0], transition: { ease: 'easeInOut', delay: 0.2, duration: 0.5 } }} className="h-screen w-[50vw] max-w-[50vw] items-center justify-center bg-primary rounded-tr-[3rem] rounded-br-[10rem] bg-gradient-to-bl from-textPrimary to-primary flex flex-col">
        <motion.h3 animate={{ opacity: [0, 1], translateY: [10, 0], transition: { delay: 0.3, duration: 0.5 } }} className='text-5xl text-center text-accent font-medium'>Conectando pessoas. Movimentando reciclagem.</motion.h3>
      </motion.div>
      <div className="flex h-screen w-1/2 flex-col items-center justify-center">
        <div className="flex gap-4 flex-col items-center justify-center w-2/3">
          <img className='w-72' src="logo.svg" alt="" />
          <h3 className="text-3xl font-bold self-start text-primary">
            Crie a sua conta
          </h3>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
