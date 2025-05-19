'use client'

import { useEffect, useRef, useState } from 'react'
import { NavigationButton } from '@/components/NavigationButtons'
import { MultiSelect } from '@/components/MultiSelect'
import { perfumesNotes } from '@/data/PerfumesNotes'
import { perfumesAccords } from '@/data/PerfumesAccords'
import { StepProps } from './StepProps'

export default function Step4({ onBack, onNext, pageStateKeyPrefix }: StepProps) {
  const STEP = `${pageStateKeyPrefix}-step4`
  const isFirstPageLoad = useRef(true)
  const [notLikedNotes, setNotLikedNotes] = useState<string[]>([])
  const [notLikedAccords, setNotLikedAccords] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STEP)

    if (saved == null) {
      return;
    }

    try {
      const { notLikedNotes, notLikedAccords } = JSON.parse(saved);
      setNotLikedNotes(notLikedNotes)
      setNotLikedAccords(notLikedAccords)
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
      notLikedNotes,
      notLikedAccords,
    }
    localStorage.setItem(STEP, JSON.stringify(data))
  }, [notLikedNotes, notLikedAccords])

  return (
    <main className="p-4 max-w-4xl mx-auto">  
      <NavigationButton onBack={onBack} onNext={onNext} />

      <h1 className="text-2xl font-medium mb-6">Quais notas e acordes você não gosta?</h1>

      <div className="mb-6">
        <MultiSelect
          label="Notas que não gosta (opcional)"
          options={perfumesNotes}
          selected={notLikedNotes}
          setSelected={setNotLikedNotes}
        />
        <MultiSelect
          label="Acordes que não gosta (opcional)"
          options={perfumesAccords}
          selected={notLikedAccords}
          setSelected={setNotLikedAccords}
        />
      </div>
    </main>
  )
}
