'use client'

import MultiStepForm from "@/components/MultiStepForm/MultiStepForm"
import Step1 from "@/components/steps/Step1"
import Step2 from "@/components/steps/Step2"
import Step3 from "@/components/steps/Step3"
import Step4 from "@/components/steps/Step4"
import Step5 from "@/components/steps/Step5"
import Step6 from "@/components/steps/Step6"

export default function CompleteForm() {
  const steps = [Step1, Step2, Step3, Step4, Step5, Step6]
    
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <MultiStepForm steps={steps} />
    </main>
  )
}