'use client'

import { useEffect, useRef, useState } from 'react'
import { NavigationButton } from '@/components/NavigationButtons'
import { MultiSelect } from '@/components/MultiSelect'
import { perfumesAccords } from '@/data/PerfumesAccords'
import { perfumesNotes } from '@/data/PerfumesNotes'
import { StepProps } from './StepProps'

export default function Step3({ onBack, onNext }: StepProps) {
  const STEP = 'step3'
  const isFirstPageLoad = useRef(true)
  const [likedNotes, setLikedNotes] = useState<string[]>([])
  const [likedAccords, setLikedAccords] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STEP)

    if (saved == null) {
      return;
    }

    try {
      const { likedNotes, likedAccords } = JSON.parse(saved);
      setLikedNotes(likedNotes)
      setLikedAccords(likedAccords)
    } catch (e) {
      localStorage.removeItem(STEP)
      console.error('Erro ao ler dados do localStorage:', e)
    }
  }, [])

  useEffect(() => {
    if (isFirstPageLoad.current) {
      isFirstPageLoad.current = false
      return;
    }

    const data = {
      likedNotes,
      likedAccords
    }
    localStorage.setItem(STEP, JSON.stringify(data))
  }, [likedNotes, likedAccords])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton onBack={onBack} onNext={onNext} />

      <h1 className="text-2xl font-medium mb-6">Quais notas e acordes você gosta?</h1>

      <div className="mb-6">
        <MultiSelect
          label="Notas que gosta (opcional)"
          options={perfumesNotes}
          selected={likedNotes}
          setSelected={setLikedNotes}
        />
        
        <MultiSelect
          label="Acordes que gosta (opcional)"
          options={perfumesAccords}
          selected={likedAccords}
          setSelected={setLikedAccords}
        />
      </div>
    </main>
  )
}
