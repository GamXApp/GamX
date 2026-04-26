import { useState, useEffect } from 'react'
import { getHistory, saveHistory } from '../../services/storage'
import Layout from '../../components/Layout/Layout'
import GameCard from '../../components/GameCard/GameCard'
import styles from './historyPage.module.css'

export default function HistoryPage() {
  const [history,      setHistory]      = useState([])
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => { setHistory(getHistory()) }, [])

  function removeGame(id) {
    const updated = history.filter(g => g.id !== id)
    saveHistory(updated)
    setHistory(updated)
  }

  function clearAll() {
    if (!confirmClear) {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
      return
    }
    saveHistory([]); setHistory([]); setConfirmClear(false)
  }

  return (
    <Layout>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Historial</h1>
        {history.length > 0 && (
          <button
            className={`${styles.clearBtn} ${confirmClear ? styles.clearBtnConfirm : ''}`}
            onClick={clearAll}
          >
            {confirmClear ? '¿Confirmar?' : 'Limpiar todo'}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🕹️</span>
          <p>No has visto ningún juego aún.</p>
        </div>
      ) : (
        <>
          <p className={styles.count}>{history.length} {history.length === 1 ? 'juego' : 'juegos'}</p>
          {/* Mobile: 2-col grid | Desktop: 4-col grid */}
          <div className={styles.grid}>
            {history.map(game => (
              <GameCard key={game.id} game={game} onRemove={removeGame} />
            ))}
          </div>
        </>
      )}
    </Layout>
  )
}
