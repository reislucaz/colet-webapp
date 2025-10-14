'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { PaymentStep } from './types'

interface StepIndicatorProps {
  currentStep: PaymentStep
}

const steps = [
  { key: 'order-creation', label: 'Pedido', number: 1 },
  { key: 'payment-info', label: 'Pagamento', number: 2 },
  { key: 'payment-result', label: 'Resultado', number: 3 },
] as const

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.key === currentStep)
  }

  const currentIndex = getCurrentStepIndex()

  const isStepCompleted = (stepIndex: number) => {
    return stepIndex < currentIndex
  }

  const isStepActive = (stepIndex: number) => {
    return stepIndex === currentIndex
  }

  return (
    <div className="mb-8 flex w-full items-center justify-center">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                className={`flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isStepCompleted(index)
                    ? 'bg-primary text-primary-foreground'
                    : isStepActive(index)
                      ? 'border-2 border-primary bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                }`}
                animate={isStepCompleted(index) ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isStepCompleted(index) ? (
                  <CheckCircle className="size-5" />
                ) : (
                  step.number
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isStepActive(index) || isStepCompleted(index)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-px w-16 transition-colors ${
                  isStepCompleted(index) ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
