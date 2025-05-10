'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const predefinedNotes = ['vanilla', 'rose', 'eucalyptus', 'jasmine', 'lemon']
const predefinedAccords = ['sweet', 'woody', 'leather', 'fresh spicy', 'balsamic']

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

export default function Step2() {
  const [likedNotes, setLikedNotes] = useState<string[]>([])
  const [notLikedNotes, setNotLikedNotes] = useState<string[]>([])
  const [likedAccords, setLikedAccords] = useState<string[]>([])
  const [notLikedAccords, setNotLikedAccords] = useState<string[]>([])

  useEffect(() => {
    const data = {
      likedNotes,
      notLikedNotes,
      likedAccords,
      notLikedAccords,
    }
    localStorage.setItem('step2', JSON.stringify(data))
  }, [likedNotes, notLikedNotes, likedAccords, notLikedAccords])

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Quais notas e acordes você gosta?</h1>

      <MultiSelect
        label="Notas que gosta"
        options={predefinedNotes}
        selected={likedNotes}
        setSelected={setLikedNotes}
      />
      <MultiSelect
        label="Notas que não gosta"
        options={predefinedNotes}
        selected={notLikedNotes}
        setSelected={setNotLikedNotes}
      />
      <MultiSelect
        label="Acordes que gosta"
        options={predefinedAccords}
        selected={likedAccords}
        setSelected={setLikedAccords}
      />
      <MultiSelect
        label="Acordes que não gosta"
        options={predefinedAccords}
        selected={notLikedAccords}
        setSelected={setNotLikedAccords}
      />

      <div className="mt-6 flex justify-between">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl border border-black text-black hover:bg-neutral-200 transition"
        >
          Voltar
        </Link>
        <Link
          href="/step3"
          className="bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-neutral-800 transition"
        >
          Próximo passo
        </Link>
      </div>
    </main>
  )
}
