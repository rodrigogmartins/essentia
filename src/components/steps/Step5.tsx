'use client'

import { useEffect, useRef, useState } from 'react'
import { NavigationButton } from '@/components/NavigationButtons'
import { MultiSelectChips } from '@/components/MultiSelect'
import { StepProps } from './StepProps'
import { predefinedSeasons } from '@/data/PredefinedSeasons'
import { predefinedShifts } from '@/data/PredefinedShifts'
import { predefinedClimates } from '@/data/PredefinedClimates'

export default function Step5({ onBack, onNext, pageStateKeyPrefix }: StepProps) {
  const STEP = `${pageStateKeyPrefix}-step5`
  const isFirstPageLoad = useRef(true)
  const [seasons, setSeasons] = useState<string[]>([])
  const [dayShifts, setDayShifts] = useState<string[]>([])
  const [climates, setClimates] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STEP)

    if (saved == null) {
      return;
    }

    try {
      const { seasons, dayShifts, climates } = JSON.parse(saved);
      setSeasons(seasons)
      setDayShifts(dayShifts)
      setClimates(climates)
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

    const data = { seasons, dayShifts, climates }
    localStorage.setItem(STEP, JSON.stringify(data))
  }, [seasons, dayShifts, climates])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton onBack={onBack} onNext={onNext} />

      <h1 className="text-2xl font-medium mb-6">Onde e quando você pretende usar o perfume?</h1>

      <MultiSelectChips label="Estações do ano" options={predefinedSeasons} selected={seasons} setSelected={setSeasons} />
      <MultiSelectChips label="Período do dia" options={predefinedShifts} selected={dayShifts} setSelected={setDayShifts} />
      <MultiSelectChips label="Clima" options={predefinedClimates} selected={climates} setSelected={setClimates} />
    </main>
  )
}