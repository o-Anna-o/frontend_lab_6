// src/pages/ShipsList.tsx
import React from 'react'
import ShipCard from '../components/ShipCard'
import { useShips } from '../hooks/useShips'
import Navbar from '../components/Navbar'
import Breadcrumbs from '../components/Breadcrumbs'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSearch, setLastSearch } from '../store/slices/filterSlice'

export default function ShipsList() {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.filter.search)
  const lastSearch = useAppSelector((state) => state.filter.lastSearch)

  // fetch по последнему сабмиту
  const { ships, loading, error } = useShips(lastSearch)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setLastSearch(search)) // fetch срабатывает только на submit
  }

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form className="page__search" onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          <input
            className="search-input page__search-input page__search-item"
            type="text"
            placeholder="Поиск контейнеровоза"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <button className="btn search-btn page__search-item" type="submit">
            Найти
          </button>
        </form>

        {loading && <div style={{ marginTop: 20 }}>Загрузка...</div>}
        {error && <div style={{ marginTop: 20, color: 'red' }}>{error}</div>}

        <ul className="ship-cards" style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, justifyContent: 'center' }}>
            {ships.map((s) => (
              <div key={s.ship_id ?? s.ShipID} style={{ display: 'flex', justifyContent: 'center' }}>
                <ShipCard ship={s} />
              </div>
            ))}
          </div>
        </ul>
      </div>
    </>
  )
}
