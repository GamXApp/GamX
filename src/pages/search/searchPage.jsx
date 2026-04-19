import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './searchPage.module.css';
import Navbar from '../../components/navBar/navBar';
import logo from '../../assets/images/logo.png';
import searchIcon from '../../assets/icons/Search.png';

/* ── Constantes ─────────────────────────────── */
const PAGE_SIZE = 10;

const CATEGORIES = [
    'Todos', 'Acción', 'RPG', 'Battle Royale', 'Aventura',
    'Estrategia', 'Terror', 'Multijugador', 'Carreras',
    'Arcade', 'MMORPG', 'Shooter', 'MOBA',
];

const CAT_MAP = {
    'Todos': '', 'Acción': 'action', 'RPG': 'action-rpg',
    'Battle Royale': 'battle-royale', 'Aventura': 'open-world',
    'Estrategia': 'strategy', 'Terror': 'survival',
    'Multijugador': 'mmorpg', 'Carreras': 'racing',
    'Arcade': 'card', 'MMORPG': 'mmorpg',
    'Shooter': 'shooter', 'MOBA': 'moba',
};

const PLATFORMS = ['Todas', 'PC', 'Navegador'];
const PLAT_MAP  = { 'Todas': '', 'PC': 'pc', 'Navegador': 'browser' };

/* ── Componente ─────────────────────────────── */
function SearchPage({ onNavigate }) {
    const [text,       setText]       = useState('');
    const [category,   setCategory]   = useState('Todos');
    const [platform,   setPlatform]   = useState('Todas');
    const [filterOpen, setFilterOpen] = useState(false); // 'category' | 'platform' | false
    const [games,      setGames]      = useState([]);
    const [loading,    setLoading]    = useState(false);
    const [error,      setError]      = useState(null);
    const [page,       setPage]       = useState(1);

    const filterRef = useRef(null);

    /* Cierra el dropdown al hacer click afuera */
    useEffect(() => {
        function handler(e) {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /*
     * fetchGames envuelto en useCallback para que el useEffect
     * de abajo pueda declararlo como dependencia sin entrar en
     * un loop infinito. Se recrea solo cuando category o platform
     * cambian — que es exactamente cuando queremos re-fetchear.
     */
    const fetchGames = useCallback(async () => {
        setLoading(true);
        setError(null);
        setPage(1);

        const params = new URLSearchParams();
        if (CAT_MAP[category])  params.set('category', CAT_MAP[category]);
        if (PLAT_MAP[platform]) params.set('platform', PLAT_MAP[platform]);

        const query = params.toString() ? `?${params}` : '';

        try {
            const res = await fetch(`/api/games${query}`);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setGames(data);
        } catch {
            setError('No se pudieron cargar los juegos. Revisá tu conexión.');
            setGames([]);
        } finally {
            setLoading(false);
        }
    }, [category, platform]); // ← dependencias declaradas correctamente

    /* Se ejecuta al montar y cada vez que category o platform cambian */
    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    function handleCategorySelect(cat) {
        setCategory(cat);
        setFilterOpen(false);
        // El useEffect se dispara solo porque category cambió → fetchGames se recrea
    }

    function handlePlatformSelect(plat) {
        setPlatform(plat);
        setFilterOpen(false);
        // Ídem para platform
    }

    function handleSearch(e) {
        e.preventDefault();
        fetchGames();
    }

    /* Filtro de texto en el cliente */
    const filtered = useMemo(() => {
        if (!text.trim()) return games;
        const q = text.toLowerCase();
        return games.filter(g =>
            g.title.toLowerCase().includes(q) ||
            g.genre?.toLowerCase().includes(q) ||
            g.publisher?.toLowerCase().includes(q)
        );
    }, [games, text]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const hasFilters = category !== 'Todos' || platform !== 'Todas';

    function goToPage(p) {
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className={styles.pageWrapper}>

            {/* ── Header ── */}
            <header className={styles.header}>
                <img src={logo} alt="GamX" className={styles.logo} />
            </header>

            {/* ── Main ── */}
            <main className={styles.main}>
                <h1 className={styles.tittle}>Buscar</h1>

                {/* Barra de búsqueda */}
                <form className={styles.searchBar} onSubmit={handleSearch}>
                    <div className={styles.inputWrap}>
                        <img src={searchIcon} alt="buscar" className={styles.searchIcon} />
                        <input
                            className={styles.input}
                            type="search"
                            placeholder="Buscar por título"
                            value={text}
                            onChange={e => { setText(e.target.value); setPage(1); }}
                        />
                        {text && (
                            <button
                                type="button"
                                className={styles.clearBtn}
                                onClick={() => setText('')}
                                aria-label="Limpiar búsqueda"
                            >✕</button>
                        )}
                    </div>

                    {/* Botón filtrar */}
                    <div className={styles.filterWrap} ref={filterRef}>
                        <button
                            type="button"
                            className={`${styles.filterBtn} ${hasFilters ? styles.filterBtnActive : ''}`}
                            onClick={() => setFilterOpen(v => v ? false : 'category')}
                        >
                            <span className={styles.filterIcon}>▾</span>
                            Filtrar
                            {hasFilters && <span className={styles.filterDot} />}
                        </button>

                        {/* Dropdown */}
                        {filterOpen && (
                            <div className={styles.dropdown}>
                                {/* Tabs */}
                                <div className={styles.dropTabs}>
                                    <button
                                        type="button"
                                        className={`${styles.dropTab} ${filterOpen === 'category' ? styles.dropTabActive : ''}`}
                                        onClick={() => setFilterOpen('category')}
                                    >Categorías</button>
                                    <button
                                        type="button"
                                        className={`${styles.dropTab} ${filterOpen === 'platform' ? styles.dropTabActive : ''}`}
                                        onClick={() => setFilterOpen('platform')}
                                    >Plataformas</button>
                                </div>

                                {/* Lista de categorías */}
                                {filterOpen === 'category' && (
                                    <ul className={styles.dropList}>
                                        {CATEGORIES.map(cat => (
                                            <li key={cat}>
                                                <button
                                                    type="button"
                                                    className={`${styles.dropItem} ${category === cat ? styles.dropItemActive : ''}`}
                                                    onClick={() => handleCategorySelect(cat)}
                                                >{cat}</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Lista de plataformas */}
                                {filterOpen === 'platform' && (
                                    <ul className={styles.dropList}>
                                        {PLATFORMS.map(plat => (
                                            <li key={plat}>
                                                <button
                                                    type="button"
                                                    className={`${styles.dropItem} ${platform === plat ? styles.dropItemActive : ''}`}
                                                    onClick={() => handlePlatformSelect(plat)}
                                                >{plat}</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </form>

                {/* Chips de filtros activos */}
                {hasFilters && (
                    <div className={styles.chips}>
                        {category !== 'Todos' && (
                            <button
                                className={styles.chip}
                                onClick={() => handleCategorySelect('Todos')}
                            >{category} ✕</button>
                        )}
                        {platform !== 'Todas' && (
                            <button
                                className={styles.chip}
                                onClick={() => handlePlatformSelect('Todas')}
                            >{platform} ✕</button>
                        )}
                    </div>
                )}

                {/* Contador de resultados */}
                {!loading && !error && (
                    <p className={styles.resultCount}>
                        {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
                    </p>
                )}

                {/* Estados: cargando / error */}
                {loading && (
                    <div className={styles.stateBox}>
                        <p className={styles.stateText}>Cargando juegos…</p>
                    </div>
                )}
                {error && (
                    <div className={styles.stateBox}>
                        <p className={styles.errorText}>{error}</p>
                        <button
                            className={styles.retryBtn}
                            onClick={fetchGames}
                        >Reintentar</button>
                    </div>
                )}

                {/* Lista de resultados */}
                {!loading && !error && (
                    <>
                        {paged.length === 0 ? (
                            <div className={styles.stateBox}>
                                <p className={styles.stateText}>
                                    🎮 Sin resultados para esta búsqueda.
                                </p>
                            </div>
                        ) : (
                            <section className={styles.resultList}>
                                {paged.map(game => (
                                    <div key={game.id} className={styles.gameCard}>
                                        <img
                                            src={game.thumbnail}
                                            alt={game.title}
                                            className={styles.cardThumb}
                                            loading="lazy"
                                        />
                                        <div className={styles.cardInfo}>
                                            <p className={styles.cardTitle}>{game.title}</p>
                                            <p className={styles.cardGenre}>{game.genre}</p>
                                            {game.publisher && (
                                                <p className={styles.cardPub}>{game.publisher}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    className={styles.pageBtn}
                                    onClick={() => goToPage(page - 1)}
                                    disabled={page === 1}
                                >‹</button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                    .reduce((acc, p, i, arr) => {
                                        if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                    .map((p, i) =>
                                        p === '…' ? (
                                            <span key={`e-${i}`} className={styles.pageEllipsis}>…</span>
                                        ) : (
                                            <button
                                                key={p}
                                                className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`}
                                                onClick={() => goToPage(p)}
                                            >{p}</button>
                                        )
                                    )
                                }

                                <button
                                    className={styles.pageBtn}
                                    onClick={() => goToPage(page + 1)}
                                    disabled={page === totalPages}
                                >›</button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Navbar currentPage="search" onNavigate={onNavigate} />
        </div>
    );
}

export default SearchPage;