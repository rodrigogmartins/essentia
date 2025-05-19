import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { useStepNavigation } from '@/hooks/useStepNavigation'
import { MultiStepFormProps } from './MultiStepFormProps'

export default function MultiStepForm({ steps, pageStateKeyPrefix }: MultiStepFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const StepComponent = steps[step]

  useStepNavigation(step, setStep)

  const next = () => setStep((prev) => (prev + 1))  
  const back = () => {
    if (step === 0) {
      router.push('/')
    } else {
      setStep((prev) => prev - 1)
    }
  }

  useEffect(() => {
    const storedStep = localStorage.getItem('currentStep')
    if (storedStep) {
      setStep(parseInt(storedStep, 10))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('currentStep', step.toString())
  }, [step])

  return (
    <AnimatePresence mode="wait">
        <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
          <StepComponent
            onNext={next}
            onBack={back}
            pageStateKeyPrefix={pageStateKeyPrefix}
          />
        </motion.div>
    </AnimatePresence>
  )
}
