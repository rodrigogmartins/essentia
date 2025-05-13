'use client'

import { useEffect, useState } from 'react'
import { NavigationButton } from '@/components/navigationButtons'
import { useFetchPerfumeRecommendations } from '@/hooks/useFetchPerfumeRecommendations'
import { PerfumeCardSkeleton } from '@/components/perfumeCardSkeleton'
import { PerfumeRecommendationResult } from '@/types/perfumeRecommendation'

export default function ResultPage() {
  const { results, loading, error, fetchRecommendations } = useFetchPerfumeRecommendations()

  useEffect(() => {
    const payload = buildRequestPayload()
    fetchRecommendations(payload)
  }, [])

  function buildRequestPayload() {
    const savedStep1 = localStorage.getItem('step1')
    const savedStep2 = localStorage.getItem('step2')
    const savedStep3 = localStorage.getItem('step3')
    const savedStep4 = localStorage.getItem('step4')

    const payload: any = {}

    if (!!savedStep1) {
      const ownedPerfumes = JSON.parse(savedStep1)
      payload.ownedPerfumes = ownedPerfumes.map((item: any) => item.id)
    }
    
    if (!!savedStep2) {
      const { likedNotes, likedAccords } = JSON.parse(savedStep2) 
      payload.likedNotes = likedNotes.map((it: any) => it.value)
      payload.likedAccords = likedAccords.map((it: any) => it.value)
    }
    
    if (!!savedStep3) {
      const { notLikedNotes, notLikedAccords } = JSON.parse(savedStep3) 
      payload.notLikedNotes = notLikedNotes.map((it: any) => it.value)
      payload.notLikedAccords = notLikedAccords.map((it: any) => it.value)
    }
    
    if (!!savedStep4) {
      const { seasons , dayShifts, climates } = JSON.parse(savedStep4) 
      payload.seasons = seasons
      payload.dayShifts = dayShifts
      payload.climates = climates
    }

    return payload
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton nextButtonLink='/' nextButtonLabel='Refazer formulário'/>
      
      <h1 className="text-2xl font-medium mb-6">Top recomendações para você</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <PerfumeCardSkeleton key={i} />
          ))}
        </div>
      )}
    </main>
  )
}