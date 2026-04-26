import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import GameCard from '../../components/GameCard/GameCard'
import styles from './searchPage.module.css'
import searchIcon from '../../assets/icons/Search.png'

const PAGE_SIZE = 12

const CATEGORIES = [
  'Todos', 'Acción', 'RPG', 'Battle Royale', 'Aventura',
  'Estrategia', 'Terror', 'Multijugador', 'Carreras',
  'Arcade', 'MMORPG', 'Shooter', 'MOBA',
]
const CAT_MAP = {
  'Todos':'', 'Acción':'action', 'RPG':'action-rpg',
  'Battle Royale':'battle-royale', 'Aventura':'open-world',
  'Estrategia':'strategy', 'Terror':'survival',
  'Multijugador':'mmorpg', 'Carreras':'racing',
  'Arcade':'card', 'MMORPG':'mmorpg', 'Shooter':'shooter', 'MOBA':'moba',
}
const PLATFORMS = ['Todas', 'PC', 'Navegador']
const PLAT_MAP  = { 'Todas':'', 'PC':'pc', 'Navegador':'browser' }

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const categoryFromUrl = searchParams.get('category')
  const initialCategory = CAT_MAP[categoryFromUrl] !== undefined ? categoryFromUrl : 'Todos'

  const [text,       setText]       = useState('')
  const [category,   setCategory]   = useState(initialCategory)
  const [platform,   setPlatform]   = useState('Todas')
  const [filterOpen, setFilterOpen] = useState(false)
  const [games,      setGames]      = useState([])
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState(null)
  const [page,       setPage]       = useState(1)

  const filterRef = useRef(null)

  /* Close mobile dropdown on outside click */
  useEffect(() => {
    function handler(e) {
      if (filterRef.current && !filterRef.current.contains(e.target))
        setFilterOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const fetchGames = useCallback(async () => {
    setLoading(true); setError(null); setPage(1)
    const params = new URLSearchParams()
    if (CAT_MAP[category])  params.set('category', CAT_MAP[category])
    if (PLAT_MAP[platform]) params.set('platform', PLAT_MAP[platform])
    try {
      const res  = await fetch(`/api/games${params.toString() ? `?${params}` : ''}`)
      if (!res.ok) throw new Error(`Error ${res.status}`)
      setGames(await res.json())
    } catch {
      setError('No se pudieron cargar los juegos.')
      setGames([])
    } finally {
      setLoading(false)
    }
  }, [category, platform])

  useEffect(() => { fetchGames() }, [fetchGames])

  const filtered = useMemo(() => {
    if (!text.trim()) return games
    const q = text.toLowerCase()
    return games.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.genre?.toLowerCase().includes(q) ||
      g.publisher?.toLowerCase().includes(q)
    )
  }, [games, text])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const hasFilters = category !== 'Todos' || platform !== 'Todas'

  function goToPage(p) { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  /* ── Filter panel (reused in sidebar + mobile dropdown) ── */
  const FilterPanel = () => (
    <div className={styles.filterPanel}>
      <div className={styles.filterGroup}>
        <h3 className={styles.filterGroupTitle}>Categoría</h3>
        <ul className={styles.filterList}>
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button
                className={`${styles.filterItem} ${category === cat ? styles.filterItemActive : ''}`}
                onClick={() => { setCategory(cat); setFilterOpen(false) }}
              >{cat}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.filterGroup}>
        <h3 className={styles.filterGroupTitle}>Plataforma</h3>
        <ul className={styles.filterList}>
          {PLATFORMS.map(plat => (
            <li key={plat}>
              <button
                className={`${styles.filterItem} ${platform === plat ? styles.filterItemActive : ''}`}
                onClick={() => { setPlatform(plat); setFilterOpen(false) }}
              >{plat}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className={styles.pageLayout}>

        {/* ── Desktop sidebar ── */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Filtros</h2>
          <FilterPanel />
        </aside>

        {/* ── Main column ── */}
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Buscar</h1>

          {/* Search bar */}
          <div className={styles.searchRow}>
            <div className={styles.inputWrap}>
              <img src={searchIcon} alt="" className={styles.searchIcon} aria-hidden="true" />
              <input
                className={styles.input}
                type="search"
                placeholder="Buscar por título, género…"
                value={text}
                onChange={e => { setText(e.target.value); setPage(1) }}
              />
              {text && (
                <button className={styles.clearBtn} onClick={() => setText('')} aria-label="Limpiar">✕</button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <div className={styles.filterWrap} ref={filterRef}>
              <button
                className={`${styles.filterToggle} ${hasFilters ? styles.filterToggleActive : ''}`}
                onClick={() => setFilterOpen(v => !v)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="4" y1="6"  x2="20" y2="6" />
                  <line x1="8" y1="12" x2="20" y2="12" />
                  <line x1="12" y1="18" x2="20" y2="18" />
                  <circle cx="4"  cy="6"  r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="8"  cy="12" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                Filtrar
                {hasFilters && <span className={styles.filterDot} />}
              </button>

              {filterOpen && (
                <div className={styles.filterDropdown}>
                  <FilterPanel />
                </div>
              )}
            </div>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className={styles.chips}>
              {category !== 'Todos' && (
                <button className={styles.chip} onClick={() => setCategory('Todos')}>
                  {category} ✕
                </button>
              )}
              {platform !== 'Todas' && (
                <button className={styles.chip} onClick={() => setPlatform('Todas')}>
                  {platform} ✕
                </button>
              )}
            </div>
          )}

          {/* Result count */}
          {!loading && !error && (
            <p className={styles.resultCount}>
              {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
            </p>
          )}

          {/* States */}
          {loading && (
            <div className={styles.stateBox}>
              <div className={styles.spinner} />
              <p className={styles.stateText}>Cargando juegos…</p>
            </div>
          )}
          {error && (
            <div className={styles.stateBox}>
              <p className={styles.errorText}>{error}</p>
              <button className={styles.retryBtn} onClick={fetchGames}>Reintentar</button>
            </div>
          )}

          {/* Results grid */}
          {!loading && !error && (
            <>
              {paged.length === 0 ? (
                <div className={styles.stateBox}>
                  <p className={styles.stateText}>🎮 Sin resultados para esta búsqueda.</p>
                </div>
              ) : (
                <div className={styles.resultsGrid}>
                  {paged.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button className={styles.pageBtn} onClick={() => goToPage(page - 1)} disabled={page === 1}>‹</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce((acc, p, i, arr) => {
                      if (i > 0 && p - arr[i-1] > 1) acc.push('…')
                      acc.push(p); return acc
                    }, [])
                    .map((p, i) => p === '…'
                      ? <span key={`e${i}`} className={styles.pageEllipsis}>…</span>
                      : <button key={p} className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`} onClick={() => goToPage(p)}>{p}</button>
                    )
                  }
                  <button className={styles.pageBtn} onClick={() => goToPage(page + 1)} disabled={page === totalPages}>›</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
