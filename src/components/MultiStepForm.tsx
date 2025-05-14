import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'
import { useStepNavigation } from '@/hooks/useStepNavigation'

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  useStepNavigation(step, setStep)

  const next = () => setStep((prev) => (prev + 1))
  const back = () => setStep((prev) => prev - 1)

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
            {step === 1 && <Step1 onNext={next} />}
            {step === 2 && <Step2 onNext={next} onBack={back} />}
            {step === 3 && <Step3 onNext={next} onBack={back} />}
            {step === 4 && <Step4 onNext={next} onBack={back} />}
            {step === 5 && <Step5 onNext={next} onBack={back} />}
            {step === 6 && <Step6 onBack={back} />}
        </motion.div>
    </AnimatePresence>
  )
}
