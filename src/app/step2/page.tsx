'use client'

import { useEffect, useState } from 'react'
import { NavigationButton } from '@/components/navigationButtons'
import { MultiSelect } from '@/components/multiSelect'
import { perfumesAccords } from '@/data/perfumesAccords'
import { perfumesNotes } from '@/data/perfumesNotes'

export default function Step2() {
  const [likedNotes, setLikedNotes] = useState<string[]>([])
  const [likedAccords, setLikedAccords] = useState<string[]>([])

  useEffect(() => {
    const data = {
      likedNotes,
      likedAccords
    }
    localStorage.setItem('step2', JSON.stringify(data))
  }, [likedNotes, likedAccords])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton backButtonLink='/' nextButtonLink='/step3'/>

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
