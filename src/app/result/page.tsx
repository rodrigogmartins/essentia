'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const mockResults = [
  {
    _id: '23569',
    name: 'Shisha Lounge',
    brand: 'Ricardo Ramos Perfumes de Autor',
    image_url: 'https://fimgs.net/mdimg/perfume/375x500.58575.jpg',
    url: 'https://www.fragrantica.com/perfume/ricardo-ramos-perfumes-de-autor/shisha-lounge-58575.html',
    rating: 4.46,
    match_probability: 0.53,
  },
  {
    _id: '3928',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    image_url: 'https://fimgs.net/mdimg/perfume/375x500.7035.jpg',
    url: 'https://www.fragrantica.com/perfume/chanel/bleu-de-chanel-7035.html',
    rating: 4.32,
    match_probability: 0.51,
  },
]

export default function ResultPage() {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    // Simula o carregamento do resultado do localStorage ou API
    setResults(mockResults)
    localStorage.setItem('lastResult', JSON.stringify(mockResults))
  }, [])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Top recomendações para você</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((perfume) => (
          <a
            key={perfume._id}
            href={perfume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              src={perfume.image_url}
              alt={perfume.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <h2 className="text-sm font-semibold leading-tight">
                {perfume.name}
              </h2>
              <p className="text-xs text-neutral-500">{perfume.brand}</p>
              <p className="text-xs mt-1">Nota: {perfume.rating} / Match: {(perfume.match_probability * 100).toFixed(0)}%</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-right">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl border border-black text-black hover:bg-neutral-200 transition"
        >
          Refazer formulário
        </Link>
      </div>
    </main>
  )
}