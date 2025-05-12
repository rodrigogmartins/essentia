'use client'

import { useEffect, useRef, useState } from 'react'
import { NavigationButton } from '@/components/navigationButtons'
import { PerfumeCard } from '@/components/perfumeCard'
import { usePerfumeSearch } from '@/hooks/usePerfumeSearch'
import { useDebounce } from '@/hooks/useDebounce'

export default function Home() {
  const isFirstPageLoad = useRef(true)
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const { results, loading, hasMore, loadMore } = usePerfumeSearch(debouncedQuery)

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev?.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const saved = localStorage.getItem('step1')

    if (saved == null) {
      return;
    }

    try {
      const selected = JSON.parse(saved);
      setSelected(selected)
    } catch (e) {
      localStorage.removeItem('step1')
      console.error('Erro ao ler dados do localStorage:', e)
    }
  }, [])

  useEffect(() => {
    if (isFirstPageLoad.current) {
      isFirstPageLoad.current = false
      return;
    }

    localStorage.setItem('step1', JSON.stringify(selected))
  }, [selected])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      if (scrollY + windowHeight >= documentHeight - 500 && hasMore && !loading) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore, hasMore, loading])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton nextButtonLink='/step2'/>

      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Escolha perfumes que você já possui</h1>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-900 font-semibold flex items-center justify-center" title={""+(selected?.length || 0)}>
            { selected?.length > 9 ? "9+" : (selected?.length || 0) }
          </div>
        </div>
      </header>

      <input
        type="text"
        placeholder="Buscar perfume..."
        className="w-full p-3 rounded-xl border border-neutral-300 mb-6 shadow-sm"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {!loading && results.map(
            (perfume: any) => (
              <PerfumeCard
                key={perfume._id}
                perfume={perfume}
                isSelected={selected?.includes(perfume._id)}
                toggleSelection={toggleSelection}
              />
            )
          )
        }
      </div>
    </main>
  )
}