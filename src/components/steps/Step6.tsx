'use client'

import { useEffect } from 'react'
import { NavigationButton } from '@/components/NavigationButtons'
import { useFetchPerfumeRecommendations } from '@/hooks/useFetchPerfumeRecommendations'
import { PerfumeCardSkeleton } from '@/components/PerfumeCardSkeleton'
import { PerfumeRecommendationResult } from '@/types/perfumeRecommendation'
import { StepProps } from './StepProps'
import { RecommendationInput } from '@/data/RecommendationsInput.interface'

export default function Step6({ onBack, pageStateKeyPrefix }: StepProps) {
  const { results, loading, error, fetchRecommendations } = useFetchPerfumeRecommendations()

  useEffect(() => {
    const payload = buildRequestPayload()
    fetchRecommendations(payload)
  }, [])

  function buildRequestPayload(): RecommendationInput {
    const savedStep1 = localStorage.getItem(`${pageStateKeyPrefix}-step1`)
    const savedStep2 = localStorage.getItem(`${pageStateKeyPrefix}-step2`)
    const savedStep3 = localStorage.getItem(`${pageStateKeyPrefix}-step3`)
    const savedStep4 = localStorage.getItem(`${pageStateKeyPrefix}-step4`)
    const savedStep5 = localStorage.getItem(`${pageStateKeyPrefix}-step5`)

    const payload: RecommendationInput = {}

    if (!!savedStep1) {
      const ownedPerfumes = JSON.parse(savedStep1)
      payload.ownedPerfumes = ownedPerfumes.map((item: any) => item.id)
    }

    if (!!savedStep2) {
      const likedPerfumes = JSON.parse(savedStep2)
      payload.likedPerfumes = likedPerfumes.map((item: any) => item.id)
    }
    
    if (!!savedStep3) {
      const { likedNotes, likedAccords } = JSON.parse(savedStep3) 
      payload.likedNotes = likedNotes.map((it: any) => it.value)
      payload.likedAccords = likedAccords.map((it: any) => it.value)
    }
    
    if (!!savedStep4) {
      const { notLikedNotes, notLikedAccords } = JSON.parse(savedStep4) 
      payload.notLikedNotes = notLikedNotes.map((it: any) => it.value)
      payload.notLikedAccords = notLikedAccords.map((it: any) => it.value)
    }
    
    if (!!savedStep5) {
      const { seasons , dayShifts, climates } = JSON.parse(savedStep5) 
      payload.seasons = seasons
      payload.dayShifts = dayShifts
      payload.climates = climates
    }

    return payload
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton onBack={onBack} />
      
      <h1 className="text-2xl font-medium mb-6">Top recomendações para você</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((perfume: PerfumeRecommendationResult) => (
          <a
            key={perfume.id}
            href={perfume.url}
            target="_blank"
            rel="noopener noreferrer"
            title='Visualizar página no Fragrantica'
            className="block rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              src={perfume.image_url}
              alt={perfume.name}
              className="w-full h-48 object-contain p-2"
            />
            <div className="p-2">
              <h2 className="text-md font-semibold text-neutral-900 leading-tight">
                {perfume.name}
              </h2>
              <p className="text-sm text-neutral-600">{perfume.brand}</p>
              <p className="text-xs mt-1 text-neutral-700">Nota: {perfume.rating}</p>
            </div>
          </a>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <PerfumeCardSkeleton key={i} />
          ))}
        </div>
      )}
    </main>
  )
}