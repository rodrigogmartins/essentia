import { StepProps } from "../steps/StepProps";

export interface MultiStepFormProps {
  steps: React.FC<StepProps>[],
  pageStateKeyPrefix: string
}
