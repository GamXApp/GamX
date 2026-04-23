import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, saveHistory } from '../../services/storage';
import Navbar from '../../components/navBar/navBar';
import logo from '../../assets/images/logo.png';
import styles from './historyPage.module.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  function removeGame(gameId) {
    const updated = history.filter(g => g.id !== gameId);
    saveHistory(updated);
    setHistory(updated);
  }

  function clearAll() {
    saveHistory([]);
    setHistory([]);
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <header className={styles.header}>
        <img src={logo} alt="GamX" className={styles.logo} />
      </header>
      <main className={styles.main}>
        <div className={styles.titleRow}>
          <h1 className={styles.tittle}>Historial</h1>
          {history.length > 0 && (
            <button className={styles.clearAllBtn} onClick={clearAll}>
              Limpiar todo
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className={styles.empty}>No has visto ningún juego aún.</p>
        ) : (
          <div className={styles.resultList}>
            {history.map(game => (
              <div key={game.id} className={styles.gameCard}>
                <div
                  className={styles.cardClickable}
                  onClick={() => navigate(`/game/${game.id}`)}
                >
                  <img
                    className={styles.cardThumb}
                    src={game.thumbnail}
                    alt={game.title}
                    loading="lazy"
                  />
                  <div className={styles.cardInfo}>
                    <p className={styles.cardTitle}>{game.title}</p>
                    <p className={styles.cardGenre}>{game.genre}</p>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeGame(game.id)}
                  aria-label={`Quitar ${game.title} del historial`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Navbar currentPage="history" />
    </div>
  );
}

export default HistoryPage;
