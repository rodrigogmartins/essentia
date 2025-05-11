'use client'

import { useEffect, useState } from 'react'
import { NavigationButton } from '@/components/navigationButtons'
import { MultiSelect } from '@/components/multiSelect'
import { perfumesNotes } from '@/data/perfumesNotes'
import { perfumesAccords } from '@/data/perfumesAccords'

export default function Step3() {
  const [notLikedNotes, setNotLikedNotes] = useState<string[]>([])
  const [notLikedAccords, setNotLikedAccords] = useState<string[]>([])

  useEffect(() => {
    const data = {
      notLikedNotes,
      notLikedAccords,
    }
    localStorage.setItem('step3', JSON.stringify(data))
  }, [notLikedNotes, notLikedAccords])

  return (
    <main className="p-4 max-w-4xl mx-auto">  
      <NavigationButton backButtonLink='/step2' nextButtonLink='/step4'/>

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
