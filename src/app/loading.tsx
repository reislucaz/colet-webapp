'use client'

import { motion } from 'framer-motion'
import { RecycleIcon } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed bottom-0 right-0 z-[9999] flex size-full items-center justify-center bg-accent opacity-80">
      <motion.div
        animate={{
          scale: [1, 0.9, 0.9, 1, 1],
          opacity: [1, 0.48, 0.48, 1, 1],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <RecycleIcon className="size-10" />
      </motion.div>
      <motion.div
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        className="absolute size-[100px] rounded-[25%] border-[3px] border-primary dark:border-secondary"
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        className="absolute size-[120px] rounded-[25%] border-8 border-primary dark:border-secondary"
        transition={{
          ease: 'linear',
          duration: 3.2,
          repeat: Infinity,
        }}
      />
    </div>
  )
}
