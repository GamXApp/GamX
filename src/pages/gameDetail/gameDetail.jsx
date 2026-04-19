import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getGameById } from '../../services/api.js'
import { addToHistory, isInWishlist, addToWishlist, removeFromWishlist } from '../../services/storage.js'
import AppHeader from '../../components/AppHeader/AppHeader.jsx'
import Navbar from '../../components/navBar/navBar.jsx'
import WishlistModal from '../../components/WishlistModal/WishlistModal.jsx'
import Spinner from '../../components/Spinner/Spinner.jsx'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx'
import styles from './GameDetail.module.css'

export default function GameDetail( onNavigate ) {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const [game,      setGame]      = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [inWish,    setInWish]    = useState(false)
  const [activeShot,setActiveShot]= useState(0)

  // ✅ Usamos useCallback para que ESLint no se queje
  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const data = await getGameById(id)
      setGame(data)
      setInWish(isInWishlist(data.id))
      addToHistory({ id:data.id, title:data.title, thumbnail:data.thumbnail, genre:data.genre, platform:data.platform })
    } catch (err) {
      setError(err.message || 'No se pudo cargar el juego.')
    } finally { setLoading(false) }
  }, [id]) // depende de id

  // ✅ Ahora el useEffect depende de load
  useEffect(() => {
    load()
  }, [load])

  function handleAdd(formData) {
    const added = addToWishlist(game, formData)
    if (added) setInWish(true)
    return added
  }

  function handleRemove() {
    removeFromWishlist(game.id)
    setInWish(false)
  }

  if (loading) return <div className={styles.page}><AppHeader showBack onBack={() => navigate(-1)} title="Cargando…" /><Spinner /></div>
  if (error)   return <div className={styles.page}><AppHeader showBack onBack={() => navigate(-1)} title="Error" /><ErrorMessage message={error} onRetry={load} /></div>
  if (!game)   return null

  const shots = game.screenshots || []
  const sys   = game.minimum_system_requirements

  return (
    <div className={styles.page}>
      {showModal && (
        <WishlistModal game={game} onConfirm={handleAdd} onClose={() => setShowModal(false)} />
      )}

      <AppHeader showBack onBack={() => navigate(-1)} title={game.title} />

      {/* Main image */}
      <div className={styles.heroWrap}>
        <img
          src={shots[activeShot]?.image || game.thumbnail}
          alt={game.title}
          className={styles.heroImg}
        />
        <div className={styles.heroGrad} />
        <div className={styles.heroBadges}>
          <span className={styles.genreBadge}>{game.genre}</span>
          {game.status && <span className={styles.statusBadge}>{game.status}</span>}
        </div>
      </div>

      {/* Content */}
      <div className={styles.body}>
        <h1 className={styles.title}>{game.title}</h1>

        {/* Meta row */}
        <div className={styles.metaRow}>
          {[
            { l:'Plataforma', v: game.platform==='PC (Windows)'?'PC':game.platform },
            { l:'Publisher',  v: game.publisher },
            { l:'Lanzamiento',v: game.release_date },
          ].filter(m => m.v).map(m => (
            <div key={m.l} className={styles.metaItem}>
              <span className={styles.metaLabel}>{m.l}</span>
              <span className={styles.metaVal}>{m.v}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={`${styles.wishBtn} ${inWish ? styles.wishBtnAdded : ''}`}
            onClick={inWish ? handleRemove : () => setShowModal(true)}
          >
            {inWish
              ? <><span>♥</span> Quitar de deseos</>
              : <><span>♡</span> Agregar a deseos</>
            }
          </button>
          {game.game_url && (
            <a href={game.game_url} target="_blank" rel="noopener noreferrer" className={styles.playBtn}>
              Jugar ↗
            </a>
          )}
        </div>

        {/* Description */}
        {game.description && (
          <section className={styles.section}>
            <h2 className={styles.secLabel}>Descripción</h2>
            <p className={styles.desc}>{game.description}</p>
          </section>
        )}

        {/* Screenshots */}
        {shots.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.secLabel}>Screenshots</h2>
            <div className={styles.shots}>
              {shots.map((s, i) => (
                <button key={s.id} className={`${styles.shotBtn} ${i===activeShot?styles.shotActive:''}`}
                        onClick={() => setActiveShot(i)}>
                  <img src={s.image} alt={`Screenshot ${i+1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* System requirements */}
        {sys && (
          <section className={styles.section}>
            <h2 className={styles.secLabel}>Requisitos mínimos</h2>
            <div className={styles.reqList}>
              {[
                { l:'Sistema operativo', v: sys.os },
                { l:'Procesador',        v: sys.processor },
                { l:'Memoria RAM',       v: sys.memory },
                { l:'Gráfica',           v: sys.graphics },
                { l:'Almacenamiento',    v: sys.storage },
              ].filter(r => r.v).map(r => (
                <div key={r.l} className={styles.reqRow}>
                  <span className={styles.reqLabel}>{r.l}</span>
                  <span className={styles.reqVal}>{r.v}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Navbar currentPage="gameDetail" onNavigate={onNavigate} />
    </div>
  )
}
