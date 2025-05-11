'use client'

import { useEffect, useState } from 'react'
import { mockPerfumes } from '@/lib/mockPerfumes'
import { Check } from 'lucide-react'
import { NavigationButton } from '@/components/navigationButtons'

export default function Home() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    localStorage.setItem('step1', JSON.stringify(selected))
  }, [selected])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton nextButtonLink='/step2'/>

      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Escolha perfumes que você já possui</h1>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-900 font-semibold flex items-center justify-center" title={""+selected.length}>
            { selected.length > 9 ? "9+" : selected.length }
          </div>
        </div>
      </header>

      <input
        type="text"
        placeholder="Buscar perfume..."
        className="w-full p-3 rounded-xl border border-neutral-300 mb-6 shadow-sm"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mockPerfumes.map((perfume) => {
          const isSelected = selected.includes(perfume._id)
          return (
            <div
              key={perfume._id}
              onClick={() => toggleSelection(perfume._id)}
              className={`relative cursor-pointer rounded-xl border transition-all overflow-hidden shadow-md hover:shadow-lg bg-white ${
                isSelected ? 'ring-2 ring-black' : ''
              }`}
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
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
          )
        })}
      </div>

    </main>
  )
}