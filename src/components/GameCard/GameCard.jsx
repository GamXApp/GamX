import { useNavigate } from 'react-router-dom'
import styles from './GameCard.module.css'

/**
 * Reusable game card.
 * Props:
 *   game       – game object {id, title, thumbnail, genre, publisher}
 *   onRemove   – optional fn(id) — shows remove (×) button when provided
 *   size       – 'default' | 'compact'  (compact = list row style)
 */
export default function GameCard({ game, onRemove, size = 'default' }) {
  const navigate = useNavigate()

  function handleRemove(e) {
    e.stopPropagation()
    onRemove?.(game.id)
  }

  return (
    <article
      className={`${styles.card} ${size === 'compact' ? styles.compact : ''}`}
      onClick={() => navigate(`/game/${game.id}`)}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/game/${game.id}`)}
      aria-label={`Ver detalles de ${game.title}`}
    >
      {/* Thumbnail */}
      <div className={styles.thumbWrap}>
        <img
          src={game.thumbnail}
          alt={game.title}
          className={styles.thumb}
          loading="lazy"
        />
        <div className={styles.thumbOverlay} />

        {/* Remove button */}
        {onRemove && (
          <button
            className={styles.removeBtn}
            onClick={handleRemove}
            aria-label={`Quitar ${game.title}`}
          >
            <span aria-hidden="true">×</span>
          </button>
        )}

        {/* Genre badge */}
        {size !== 'compact' && (
          <span className={styles.genre}>{game.genre}</span>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.title}>{game.title}</p>
        {size === 'compact' && (
          <p className={styles.genreCompact}>{game.genre}</p>
        )}
        {game.publisher && size === 'compact' && (
          <p className={styles.publisher}>{game.publisher}</p>
        )}
      </div>
    </article>
  )
}
