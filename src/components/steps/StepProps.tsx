export interface StepProps {
  onNext?: () => void
  onBack?: () => void,
  pageStateKeyPrefix: string
}