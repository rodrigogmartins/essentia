import { PerfumeResult } from '@/types/perfume'
import { useEffect, useState } from 'react'

export function usePerfumeSearch(query: string) {
  let hasMore = true
  const limit = 21
  const [results, setResults] = useState<PerfumeResult[]>([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  const fetchData = (newOffset = 0) => {
    if (loading || !hasMore) return

    const queryParam = query
      ? `?query=${encodeURIComponent(query)}&limit=${limit}&offset=${newOffset}`
      : `?limit=${limit}&offset=${newOffset}`

    setLoading(true)

    fetch(`http://localhost:8000/api/perfumes/search${queryParam}`)
      .then((res) => res.json())
      .then((data) => {
        const itemsList = data.items || []
        hasMore = (itemsList.length === limit)
        itemsList.pop()
        setResults((prev) => ( offset === 0 ? itemsList : [...prev, ...itemsList]))
        setOffset((prev) => prev + (limit - 1))
      })
      .catch((err) => {
        console.error('Erro ao buscar perfumes:', err)
        hasMore = false
      })
      .finally(() => setLoading(false))
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchData(offset)
    }
  }

  useEffect(() => {
    setOffset(0)
    hasMore = true
  }, [query])

  useEffect(() => {
    if (offset === 0 && results.length === 0) {
      loadMore()
    }
  }, [offset, results, loadMore])

  return { results, loading, hasMore, loadMore }
}
