'use client'

export interface NavigationButtonI {
    nextButtonLabel?: string,
    onNext?: () => void
    onBack?: () => void
}

export function NavigationButton({
  nextButtonLabel,
  onNext,
  onBack
}: NavigationButtonI) {
    return (
        <div className="mb-6 flex justify-between">
            {
                !!onBack
                    ? <button
                        onClick={onBack}
                        className="max-h-fit bg-neutral-100 text-neutral-900 font-semibold hover:bg-neutral-200 px-6 py-2 rounded-lg font-medium transition"
                    >
                        Voltar
                    </button>
                    : <div></div>
            }

            {
                !!onNext
                    ? <button
                        onClick={onNext}
                        className="max-h-fit bg-neutral-100 text-neutral-900 font-semibold hover:bg-neutral-200 px-4 py-2 rounded-lg font-medium transition"
                    >
                        { !!nextButtonLabel ? nextButtonLabel : "Próximo passo" }
                    </button>
                    : <div></div>
            }
            
        </div>
    )
}
