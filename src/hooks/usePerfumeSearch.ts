import { useEffect, useState, useCallback } from 'react'
import { PerfumeResult } from '@/types/perfume'

export function usePerfumeSearch(query: string) {
  const limit = 21
  const [results, setResults] = useState<PerfumeResult[]>([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [lastQuery, setLastQuery] = useState('')

  const fetchData = useCallback(async (offsetToUse: number, queryToUse: string) => {
    if (loading) return

    setLoading(true)

    const queryParam = queryToUse
      ? `?query=${encodeURIComponent(queryToUse)}&limit=${limit}&offset=${offsetToUse}`
      : `?limit=${limit}&offset=${offsetToUse}`

    try {
      const res = await fetch(`http://192.168.2.110:8000/api/perfumes/search${queryParam}`)
      const data = await res.json()
      const items = data.items || []

      setHasMore(items.length === limit)
      items.pop()
      setResults(prev =>
        offsetToUse === 0 ? items : [...prev, ...items]
      )
      setOffset(offsetToUse + items.length)
    } catch (err) {
      console.error('Erro ao buscar perfumes:', err)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [loading])

  // Buscar dados quando a query mudar
  useEffect(() => {
    if (query !== lastQuery) {
      setResults([])
      setOffset(0)
      setHasMore(true)
      setLastQuery(query)
      fetchData(0, query)
    }
  }, [query, lastQuery, fetchData])

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchData(offset, lastQuery)
    }
  }

  return { results, loading, hasMore, loadMore }
}
