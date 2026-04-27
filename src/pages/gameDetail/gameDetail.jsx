import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getGameById } from '../../services/api'
import { addToHistory, isInWishlist, addToWishlist, removeFromWishlist } from '../../services/storage'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Layout from '../../components/Layout/Layout'
import WishlistModal from '../../components/WishlistModal/WishlistModal'
import styles from './GameDetail.module.css'

function Spinner() {
  return <div className={styles.spinner} aria-label="Cargando…" />
}

export default function GameDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [game,       setGame]       = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [showModal,  setShowModal]  = useState(false)
  const [inWish,     setInWish]     = useState(false)
  const [activeShot, setActiveShot] = useState(0)

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const data = await getGameById(id)

      if (!data || data.status === 0) {
        throw new Error('No pudimos cargar la información del juego.')
      }

      setGame(data)
      setInWish(isInWishlist(data.id))
      
      addToHistory({
        id:        data.id,
        title:     data.title,
        thumbnail: data.thumbnail,
        genre:     data.genre,
        platform:  data.platform,
      })
    } catch (err) {
      setError(err.message || 'No se pudo cargar el juego.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { load() }, [load])

  function handleAdd(formData) {
    const added = addToWishlist(game, formData)
    if (added) setInWish(true)
    return added
  }

  function handleRemove() {
    removeFromWishlist(game.id)
    setInWish(false)
  }

  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingWrap}>
          <Spinner />
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage message={error} onRetry={load} />
      </Layout>
    )
  }

  if (!game) return null

  const shots = game.screenshots || []
  const sys   = game.minimum_system_requirements

  return (
    <Layout fullWidth>
      {showModal && (
        <WishlistModal
          game={game}
          onConfirm={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className={styles.hero}>
        <img
          src={game.thumbnail}
          alt={game.title}
          className={styles.heroImg}
        />
        <div className={styles.heroGrad} />

        <button
          className={styles.heroBack}
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <span aria-hidden="true">&lt;</span>
        </button>

        <div className={styles.heroBadges}>
          <span className={styles.genreBadge}>{game.genre}</span>
          {game.status && <span className={styles.statusBadge}>{game.status}</span>}
        </div>
      </div>

      <div className={styles.bodyWrap}>
        <div className={styles.body}>

          <div className={styles.mainCol}>
            <h1 className={styles.title}>{game.title}</h1>

            <div className={styles.metaRow}>
              {[
                { l: 'Plataforma',   v: game.platform === 'PC (Windows)' ? 'PC' : game.platform },
                { l: 'Publisher',    v: game.publisher },
                { l: 'Lanzamiento',  v: game.release_date },
              ].filter(m => m.v).map(m => (
                <div key={m.l} className={styles.metaItem}>
                  <span className={styles.metaLabel}>{m.l}</span>
                  <span className={styles.metaVal}>{m.v}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.wishBtn} ${inWish ? styles.wishBtnAdded : ''}`}
                onClick={inWish ? handleRemove : () => setShowModal(true)}
              >
                <span aria-hidden="true">{inWish ? '♥' : '♡'}</span>
                {inWish ? 'Quitar de deseos' : 'Agregar a deseos'}
              </button>
              {game.game_url && (
                <a
                  href={game.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.playBtn}
                >
                  Jugar ↗
                </a>
              )}
            </div>

            {game.description && (
              <section className={styles.section}>
                <h2 className={styles.secLabel}>Descripción</h2>
                <p className={styles.desc}>{game.description}</p>
              </section>
            )}

            {shots.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.secLabel}>Screenshots</h2>

                <div className={styles.screenPreview}>
                  <img
                    src={shots[activeShot]?.image}
                    alt={`Screenshot ${activeShot + 1}`}
                    className={styles.screenPreviewImg}
                  />
                </div>
                
                <div className={styles.shots}>
                  {shots.map((s, i) => (
                    <button
                      key={s.id}
                      className={`${styles.shotBtn} ${i === activeShot ? styles.shotActive : ''}`}
                      onClick={() => setActiveShot(i)}
                    >
                      <img src={s.image} alt={`Screenshot ${i + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {sys && (
            <aside className={styles.sideCol}>
              <section className={styles.section}>
                <h2 className={styles.secLabel}>Requisitos mínimos</h2>
                <div className={styles.reqList}>
                  {[
                    { l: 'Sistema operativo', v: sys.os },
                    { l: 'Procesador',        v: sys.processor },
                    { l: 'Memoria RAM',       v: sys.memory },
                    { l: 'Gráfica',           v: sys.graphics },
                    { l: 'Almacenamiento',    v: sys.storage },
                  ].filter(r => r.v).map(r => (
                    <div key={r.l} className={styles.reqRow}>
                      <span className={styles.reqLabel}>{r.l}</span>
                      <span className={styles.reqVal}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          )}

        </div>
      </div>
    </Layout>
  )
}
