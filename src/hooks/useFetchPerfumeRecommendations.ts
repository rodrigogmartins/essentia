import { PerfumeResult } from '@/types/perfume'
import { PerfumeRecommendationResult } from '@/types/perfumeRecommendation'
import { useState } from 'react'

export function useFetchPerfumeRecommendations() {
  const [results, setResults] = useState<PerfumeRecommendationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRecommendations = async (payload: any) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('http://192.168.2.110:8000/api/perfumes/recommendations?limit=8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar recomendações')
      }

      const data = await response.json()
      setResults(data.items || [])
    } catch (err: any) {
      setError(err.message || 'Erro inesperado')
      setResults([])
    } finally {
      setLoading(false)
    }
  }
    
  return { results, loading, error, fetchRecommendations }
}
