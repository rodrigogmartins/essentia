import { useEffect } from 'react'

export function useStepNavigation(step: number, setStep: (step: number) => void) {
  useEffect(() => {
    window.history.pushState({ step }, '', `#step-${step}`)
  }, [step])

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const previousStep = event.state?.step
      if (typeof previousStep === 'number') {
        setStep(previousStep)
      }
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
}
