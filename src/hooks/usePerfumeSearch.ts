import { PerfumeResult } from '@/types/perfume'
import { useEffect, useState } from 'react'

export function usePerfumeSearch(query: string) {
  const limit = 21
  const [results, setResults] = useState<PerfumeResult[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  const fetchData = (newOffset = 0) => {
    console.log(hasMore)
    if (loading || !hasMore) return

    const queryParam = query
      ? `?query=${encodeURIComponent(query)}&limit=${limit}&offset=${newOffset}`
      : `?limit=${limit}&offset=${newOffset}`

    setLoading(true)
    console.log(`1 - OFFSET FETCH: ${offset}, NEW ${newOffset}`)

    fetch(`http://192.168.2.110:8000/api/perfumes/search${queryParam}`)
      .then((res) => res.json())
      .then((data) => {
        const itemsList = data.items || []
        setHasMore(itemsList.length === limit)
        itemsList.pop()
        setResults((prev) => ( newOffset === 0 ? itemsList : [...prev, ...itemsList]))
        setOffset((prev) => prev + (limit - 1))
       console.log(`2 - OFFSET FETCH: ${offset}, NEW ${newOffset}`)

      })
      .catch((err) => {
        console.error('Erro ao buscar perfumes:', err)
        setHasMore(false)
      })
      .finally(() => setLoading(false))
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchData(offset)
    }
  }

  useEffect(() => {
    setResults([])
    setOffset(0)
    setHasMore(true)
    fetchData(0)
  }, [query])

  useEffect(() => {
    if (offset === 0 && results.length === 0) {
      loadMore()
    }
  }, [offset, results, loadMore])

  return { results, loading, hasMore, loadMore }
}
