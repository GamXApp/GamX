import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './searchPage.module.css';
import Navbar from '../../components/navBar/navBar';
import AppHeader from '../../components/AppHeader/AppHeader'
import logo from '../../assets/images/logo.png';
import searchIcon from '../../assets/icons/Search.png';
import { CATEGORIES, PLATFORMS } from '../../components/Search/search';
import { useSearchGames } from '../../hooks/useSearchGames';

function SearchPage({ onNavigate }) {
    const navigate = useNavigate();
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterSection, setFilterSection] = useState('category');
    const filterRef = useRef(null);

    const {
        text,
        setText,
        category,
        setCategory,
        platform,
        setPlatform,
        games,
        loading,
        error,
        page,
        totalPages,
        visiblePages,
        hasFilters,
        resultCount,
        clearSearch,
        clearCategory,
        clearPlatform,
        retry,
        goToPage,
    } = useSearchGames();

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setFilterOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <Navbar />

            <AppHeader
                title='GamX'
                showLogo
            ></AppHeader>

            <main className={styles.main}>
                <h1 className={styles.tittle}>Buscar</h1>

                <section>
                    <div className={styles.searchControls}>
                        <div className={styles.inputWrap}>
                            <img src={searchIcon} alt="buscar" className={styles.searchIcon} />
                            <input
                                className={styles.input}
                                type="search"
                                placeholder="Buscar por titulo"
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                            />
                            {text && (
                                <button
                                    type="button"
                                    className={styles.clearBtn}
                                    onClick={clearSearch}
                                    aria-label="Limpiar busqueda"
                                >
                                    x
                                </button>
                            )}
                        </div>

                        <div className={styles.filterWrap} ref={filterRef}>
                            <button
                                type="button"
                                className={`${styles.filterBtn} ${hasFilters ? styles.filterBtnActive : ''}`}
                                onClick={() => setFilterOpen((value) => !value)}
                            >
                                <span className={styles.filterIcon}>▾</span>
                                Filtrar
                                {hasFilters && <span className={styles.filterDot} />}
                            </button>

                            {filterOpen && (
                                <div className={styles.dropdown}>
                                    <div className={styles.dropTabs}>
                                        <button
                                            type="button"
                                            className={`${styles.dropTab} ${filterSection === 'category' ? styles.dropTabActive : ''}`}
                                            onClick={() => setFilterSection('category')}
                                        >
                                            Categorias
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.dropTab} ${filterSection === 'platform' ? styles.dropTabActive : ''}`}
                                            onClick={() => setFilterSection('platform')}
                                        >
                                            Plataformas
                                        </button>
                                    </div>

                                    {filterSection === 'category' ? (
                                        <ul className={styles.dropList}>
                                            {CATEGORIES.map((option) => (
                                                <li key={`category-${option}`}>
                                                    <button
                                                        type="button"
                                                        className={`${styles.dropItem} ${category === option ? styles.dropItemActive : ''}`}
                                                        onClick={() => {
                                                            setCategory(option);
                                                            setFilterOpen(false);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <ul className={styles.dropList}>
                                            {PLATFORMS.map((option) => (
                                                <li key={`platform-${option}`}>
                                                    <button
                                                        type="button"
                                                        className={`${styles.dropItem} ${platform === option ? styles.dropItemActive : ''}`}
                                                        onClick={() => {
                                                            setPlatform(option);
                                                            setFilterOpen(false);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {hasFilters && (
                        <div className={styles.chips}>
                            {category !== 'Todos' && (
                                <button className={styles.chip} onClick={clearCategory} type="button">
                                    {category} x
                                </button>
                            )}
                            {platform !== 'Todas' && (
                                <button className={styles.chip} onClick={clearPlatform} type="button">
                                    {platform} x
                                </button>
                            )}
                        </div>
                    )}
                </section>

                {!loading && !error && (
                    <p className={styles.resultCount}>
                        {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
                    </p>
                )}

                {loading && (
                    <div className={styles.stateBox}>
                        <p className={styles.stateText}>Cargando juegos...</p>
                    </div>
                )}

                {error && (
                    <div className={styles.stateBox}>
                        <p className={styles.errorText}>{error}</p>
                        <button className={styles.retryBtn} onClick={retry}>
                            Reintentar
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {games.length === 0 ? (
                            <div className={styles.stateBox}>
                                <p className={styles.stateText}>
                                    Sin resultados para esta busqueda.
                                </p>
                            </div>
                        ) : (
                            <section className={styles.resultList}>
                                {games.map((game) => (
                                    <div
                                        key={game.id}
                                        className={styles.gameCard}
                                        onClick={() => navigate(`/game/${game.id}`)}
                                    >
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

                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    className={styles.pageBtn}
                                    onClick={() => goToPage(page - 1)}
                                    disabled={page === 1}
                                >
                                    {'<'}
                                </button>

                                {visiblePages.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        className={`${styles.pageBtn} ${pageNumber === page ? styles.pageBtnActive : ''}`}
                                        onClick={() => goToPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                <button
                                    className={styles.pageBtn}
                                    onClick={() => goToPage(page + 1)}
                                    disabled={page === totalPages}
                                >
                                    {'>'}
                                </button>
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
