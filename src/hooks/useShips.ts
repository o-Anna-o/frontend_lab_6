// src/hooks/useShips.ts
import { useEffect, useState } from 'react'
import { getShips, ShipsFilterParams } from '../api'

type UseShipsArg = string | ShipsFilterParams | undefined

type ShipForFilter = { Name?: string; [key: string]: any }

export function useShips(param?: UseShipsArg) {
  const [ships, setShips] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function normalize(p: UseShipsArg): ShipsFilterParams | undefined {
    if (!p) return {} // пустой объект для fetch всех кораблей
    if (typeof p === 'string') {
      const st = p.trim()
      return st ? { search: st } : {}
    }
    return p
  }

  useEffect(() => {
    if (param === undefined) return
    let cancelled = false
    const params = normalize(param)

    const fetchShips = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getShips(params)
        let arr = Array.isArray(res) ? res : res?.data ?? res ?? []
        if (!Array.isArray(arr)) arr = []

        if (params?.search) {
          const searchLower = params.search.toLowerCase()
          arr = arr.filter(
            (ship: ShipForFilter) => typeof ship.Name === 'string' && ship.Name.toLowerCase().includes(searchLower)
          )
        }

        if (!cancelled) setShips(arr)
      } catch (e: any) {
        if (!cancelled) setError(String(e?.message ?? e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchShips()
    return () => { cancelled = true }
  }, [param])

  return { ships, loading, error, setShips }
}
