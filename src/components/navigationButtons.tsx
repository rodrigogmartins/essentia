'use client'

import Link from 'next/link'

export interface NavigationButtonI {
    backButtonLink?: string,
    nextButtonLink: string
}

export function NavigationButton({ backButtonLink, nextButtonLink }: NavigationButtonI) {
  return (
      <div className="mb-6 flex justify-between">
        {
            !!backButtonLink
                ? <Link
                    href={backButtonLink}
                    className="max-h-fit bg-neutral-100 text-neutral-900 font-semibold hover:bg-neutral-200 px-6 py-2 rounded-lg font-medium transition"
                >
                    Voltar
                </Link>
                : <div></div>
        }
        <Link
          href={nextButtonLink}
          className="max-h-fit bg-neutral-100 text-neutral-900 font-semibold hover:bg-neutral-200 px-4 py-2 rounded-lg font-medium transition"
        >
          Próximo passo
        </Link>
      </div>
  )
}
