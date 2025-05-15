'use client'

import { useEffect, useRef, useState } from 'react'
import { NavigationButton } from '@/components/NavigationButtons'
import { PerfumeCard } from '@/components/PerfumeCard'
import { usePerfumeSearch } from '@/hooks/usePerfumeSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { useInView } from 'react-intersection-observer'
import { PerfumeCardSkeleton } from '@/components/PerfumeCardSkeleton'
import { PerfumeResult } from '@/types/perfume'
import { StepProps } from './StepProps'

export default function Step1({ onNext }: StepProps) {
  const STEP = 'step1'
  const isFirstPageLoad = useRef(true)
  const [selected, setSelected] = useState<any[]>([])
  const [showSelected, setShowSelected] = useState(false)
  const [query, setQuery] = useState('')
  const { ref, inView } = useInView()

  const debouncedQuery = useDebounce(query, 500)
  const { results, loading, hasMore, loadMore } = usePerfumeSearch(debouncedQuery)

  useEffect(() => {
    const saved = localStorage.getItem(STEP)

    if (saved == null) {
      return;
    }

    try {
      const selected = JSON.parse(saved);
      setSelected(selected)
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

    localStorage.setItem(STEP, JSON.stringify(selected))
  }, [selected])

  useEffect(() => {
    if (inView && hasMore && !loading && !showSelected) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  const toggleSelection = (perfume: PerfumeResult) => {
    setSelected((prev) => {
      return !!prev?.find((item) => item.id === perfume.id)
        ? prev.filter((item) => item.id !== perfume.id)
        : [...prev, perfume]
    })
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <NavigationButton onNext={onNext} />

      <header className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-medium">Escolha perfumes que você possui</h1>
        <div className="relative w-full sm:w-auto">
          <div
            className="max-h-fit bg-neutral-100 text-neutral-900 font-semibold hover:bg-neutral-200 px-4 py-2 rounded-lg text-center font-medium transition w-full sm:w-auto"
            title={""+(selected?.length || 0)}
            onClick={() => setShowSelected(!showSelected)}
          >
            {
              showSelected
                ? `Visualizar itens selecionados (${ selected?.length > 9 ? "9+" : (selected?.length || 0) })`
                : `Visualizar todos os itens (${ selected?.length > 9 ? "9+" : (selected?.length || 0) })`
            }
            
          </div>
        </div>
      </header>

      <input
        type="text"
        placeholder="Buscar perfume..."
        className="w-full p-3 rounded-xl border border-neutral-300 mb-6 shadow-sm"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {!showSelected && results.map(
            (perfume: PerfumeResult) => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                isSelected={selected?.find((item) => item.id === perfume.id)}
                toggleSelection={toggleSelection}
              />
            )
          )
        }
        
        {showSelected && selected.map(
            (perfume: PerfumeResult) => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                isSelected={true}
                toggleSelection={toggleSelection}
              />
            )
          )
        }
      </div>
      
      {!loading && <div ref={ref} className="h-10" />}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <PerfumeCardSkeleton key={i} />
          ))}
        </div>
      )}
    </main>
  )
}