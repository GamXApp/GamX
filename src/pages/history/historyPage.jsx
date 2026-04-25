import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, saveHistory } from '../../services/storage';
import Navbar from '../../components/navBar/navBar';
import AppHeader from '../../components/AppHeader/AppHeader';
import logo from '../../assets/images/logo.png';
import styles from './historyPage.module.css';
 
function HistoryPage() {
  const [history, setHistory] = useState(() => getHistory());
  const [confirmClear, setConfirmClear] = useState(false);
  const navigate = useNavigate();
 
  function removeGame(e, gameId) {
    e.stopPropagation();
    const updated = history.filter(g => g.id !== gameId);
    saveHistory(updated);
    setHistory(updated);
  }
 
  function clearAll() {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    saveHistory([]);
    setHistory([]);
    setConfirmClear(false);
  }
 
  return (
    <div className={styles.page}>
      <Navbar />
      
      <AppHeader
        title='GamX'
        showLogo
      ></AppHeader>

      <main className={styles.main}>
        <div className={styles.titleRow}>
          <h1 className={styles.tittle}>Historial</h1>
          {history.length > 0 && (
            <button
              className={`${styles.clearAllBtn} ${confirmClear ? styles.clearAllBtnConfirm : ''}`}
              onClick={clearAll}
            >
              {confirmClear ? '¿Confirmar?' : 'Limpiar todo'}
            </button>
          )}
        </div>
 
        {history.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🎮</span>
            <p className={styles.empty}>No has visto ningún juego aún.</p>
          </div>
        ) : (
          <>
            <p className={styles.count}>{history.length} {history.length === 1 ? 'juego' : 'juegos'}</p>
            <div className={styles.grid}>
              {history.map(game => (
                <div
                  key={game.id}
                  className={styles.gameCard}
                  onClick={() => navigate(`/game/${game.id}`)}
                >
                  <div className={styles.thumbWrap}>
                    <img
                      className={styles.cardThumb}
                      src={game.thumbnail}
                      alt={game.title}
                      loading="lazy"
                    />
                    <button
                      className={styles.removeBtn}
                      onClick={(e) => removeGame(e, game.id)}
                      aria-label={`Quitar ${game.title} del historial`}
                    >
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="2" y1="2" x2="12" y2="12" />
                        <line x1="12" y1="2" x2="2" y2="12" />
                      </svg>
                    </button>
                  </div>
                  <div className={styles.cardInfo}>
                    <p className={styles.cardTitle}>{game.title}</p>
                    <p className={styles.cardGenre}>{game.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Navbar currentPage="history" />
    </div>
  );
}
 
export default HistoryPage;