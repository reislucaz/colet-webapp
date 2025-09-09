'use client'

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { PaymentStep } from "./types"

interface StepIndicatorProps {
  currentStep: PaymentStep
}

const steps = [
  { key: 'order-creation', label: 'Pedido', number: 1 },
  { key: 'payment-info', label: 'Pagamento', number: 2 },
  { key: 'payment-result', label: 'Resultado', number: 3 }
] as const

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep)
  }

  const currentIndex = getCurrentStepIndex()

  const isStepCompleted = (stepIndex: number) => {
    return stepIndex < currentIndex
  }

  const isStepActive = (stepIndex: number) => {
    return stepIndex === currentIndex
  }

  return (
    <div className="flex items-center justify-center w-full mb-8">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isStepCompleted(index)
                  ? 'bg-primary text-primary-foreground'
                  : isStepActive(index)
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-muted text-muted-foreground'
                  }`}
                animate={isStepCompleted(index) ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isStepCompleted(index) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </motion.div>
              <span className={`text-xs mt-2 font-medium ${isStepActive(index) || isStepCompleted(index)
                ? 'text-primary'
                : 'text-muted-foreground'
                }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-px mx-4 transition-colors ${isStepCompleted(index) ? 'bg-primary' : 'bg-border'
                }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
