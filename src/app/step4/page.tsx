'use client'

import { useEffect, useState } from 'react'
import { predefinedSeasons } from '@/data/predefinedSeasons'
import { predefinedShifts } from '@/data/predefinedShifts'
import { predefinedClimates } from '@/data/predefinedClimates'
import { NavigationButton } from '@/components/navigationButtons'
import { MultiSelectChips } from '@/components/multiSelect'

export default function Step3() {
  const [seasons, setSeasons] = useState<string[]>([])
  const [dayShifts, setDayShifts] = useState<string[]>([])
  const [climates, setClimates] = useState<string[]>([])

  useEffect(() => {
    const data = { seasons, dayShifts, climates }
    localStorage.setItem('step3', JSON.stringify(data))
  }, [seasons, dayShifts, climates])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton backButtonLink='/step3' nextButtonLink='/result' nextButtonLabel="Ver recomendações" />

      <h1 className="text-2xl font-medium mb-6">Onde e quando você pretende usar o perfume?</h1>

      <MultiSelectChips label="Estações do ano" options={predefinedSeasons} selected={seasons} setSelected={setSeasons} />
      <MultiSelectChips label="Período do dia" options={predefinedShifts} selected={dayShifts} setSelected={setDayShifts} />
      <MultiSelectChips label="Clima" options={predefinedClimates} selected={climates} setSelected={setClimates} />
    </main>
  )
}