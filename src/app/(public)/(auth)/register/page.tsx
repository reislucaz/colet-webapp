/* eslint-disable @next/next/no-img-element */
import { RegisterForm } from '@/components/routes/register/register-form'
import * as motion from 'motion/react-client'

export default async function RegisterPage() {
  return (
    <div className="flex h-screen max-h-screen w-screen max-w-[100vw] items-start justify-between">
      <motion.div
        animate={{
          opacity: [0, 1],
          translateX: [10, 0],
          translateY: [10, 0],
          transition: { ease: 'easeInOut', delay: 0.2, duration: 0.5 },
        }}
        className="flex h-screen w-[50vw] max-w-[50vw] flex-col items-center justify-center rounded-r-[3rem] bg-primary bg-gradient-to-bl from-textPrimary to-primary"
      >
        <motion.h3
          animate={{
            opacity: [0, 1],
            translateY: [10, 0],
            transition: { delay: 0.3, duration: 0.5 },
          }}
          className="text-center text-5xl font-medium text-accent"
        >
          Conectando pessoas. Movimentando reciclagem.
        </motion.h3>
      </motion.div>
      <div className="flex h-screen w-1/2 flex-col items-center justify-center">
        <div className="flex w-2/3 flex-col items-center justify-center gap-4">
          <img className="w-72" src="logo.svg" alt="" />
          <h3 className="self-start text-3xl font-bold text-primary">
            Crie a sua conta
          </h3>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
