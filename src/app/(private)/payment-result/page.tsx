'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Package } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PaymentResultContent() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount')
  const productName = searchParams.get('product')

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full"
      >
        {/* Ícone de sucesso com animação */}
        <motion.div className="relative flex justify-center mb-8">
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute size-32 rounded-full bg-primary/20 dark:bg-primary/10"
          />
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute size-24 rounded-full bg-primary/30 dark:bg-primary/20"
            style={{ animationDelay: '0.5s' }}
          />
          <motion.div
            variants={iconVariants}
            className="relative z-10 size-16 rounded-full bg-primary flex items-center justify-center"
          >
            <CheckCircle className="size-10 text-primary-foreground" />
          </motion.div>
        </motion.div>

        {/* Conteúdo principal */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold text-foreground"
          >
            Pagamento Realizado!
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg"
          >
            Seu pagamento foi processado com sucesso
          </motion.p>
        </motion.div>

        {/* Detalhes do pagamento */}
        {(amount || productName) && (
          <motion.div
            variants={itemVariants}
            className="mt-8 p-6 rounded-lg bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <Package className="size-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">Detalhes da Compra</h3>
            </div>

            <div className="space-y-2 text-sm">
              {productName && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Produto:</span>
                  <span className="font-medium text-card-foreground">{productName}</span>
                </div>
              )}
              {amount && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="font-bold text-primary">
                    R$ {parseFloat(amount).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Botões de ação */}
        <motion.div
          variants={itemVariants}
          className="mt-8 space-y-3"
        >
          <Link href="/products" className="block">
            <Button className="w-full" size="lg">
              Continuar Comprando
            </Button>
          </Link>

          <Link href="/dashboard" className="block">
            <Button variant="outline" className="w-full" size="lg">
              <ArrowLeft className="size-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Animação de confete/celebração */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-2 bg-primary rounded-full"
              initial={{
                x: Math.random() * window?.innerWidth,
                y: -10,
                rotate: 0,
                opacity: 0.8
              }}
              animate={{
                y: window?.innerHeight + 10,
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
              style={{
                left: `${Math.random() * 100}%`
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <PaymentResultContent />
    </Suspense>
  )
}