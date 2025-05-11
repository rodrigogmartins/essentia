'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const predefinedSeasons = ['spring', 'summer', 'autumn', 'winter']
const predefinedShifts = ['morning', 'afternoon', 'night']
const predefinedClimates = ['hot', 'cold', 'mild']

const MultiSelect = ({ label, options, selected, setSelected }: any) => {
  const toggle = (item: string) => {
    setSelected((prev: string[]) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <div className="mb-6">
      <p className="font-medium mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((item: string) => (
          <button
            key={item}
            onClick={() => toggle(item)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selected.includes(item) ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Step3() {
  const [seasons, setSeasons] = useState<string[]>([])
  const [dayShifts, setDayShifts] = useState<string[]>([])
  const [climates, setClimates] = useState<string[]>([])

  useEffect(() => {
    const data = { seasons, dayShifts, climates }
    localStorage.setItem('step3', JSON.stringify(data))
  }, [seasons, dayShifts, climates])

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Onde e quando você pretende usar o perfume?</h1>

      <MultiSelect label="Estações do ano" options={predefinedSeasons} selected={seasons} setSelected={setSeasons} />
      <MultiSelect label="Turnos do dia" options={predefinedShifts} selected={dayShifts} setSelected={setDayShifts} />
      <MultiSelect label="Climas preferidos" options={predefinedClimates} selected={climates} setSelected={setClimates} />

      <div className="mt-6 flex justify-between">
        <Link
          href="/step3"
          className="px-6 py-3 rounded-xl border border-black text-black hover:bg-neutral-200 transition"
        >
          Voltar
        </Link>
        <Link
          href="/result"
          className="bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-neutral-800 transition"
        >
          Ver recomendações
        </Link>
      </div>
    </main>
  )
}