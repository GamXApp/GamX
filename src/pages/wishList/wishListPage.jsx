import { useState, useEffect } from 'react'
import { getWishlist, removeFromWishlist } from '../../services/storage'
import Layout from '../../components/Layout/Layout'
import GameCard from '../../components/GameCard/GameCard'
import styles from './wishListPage.module.css'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => { setWishlist(getWishlist()) }, [])

  function handleRemove(id) {
    removeFromWishlist(id)
    setWishlist(prev => prev.filter(g => g.id !== id))
  }

  return (
    <Layout>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Lista de Deseos</h1>
        {wishlist.length > 0 && (
          <span className={styles.badge}>{wishlist.length}</span>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>💝</span>
          <p>Tu lista de deseos está vacía.</p>
          <p className={styles.emptyHint}>Agregá juegos desde su página de detalle.</p>
        </div>
      ) : (
        <>
          <p className={styles.count}>{wishlist.length} {wishlist.length === 1 ? 'juego' : 'juegos'}</p>
          <div className={styles.grid}>
            {wishlist.map(game => (
              <GameCard key={game.id} game={game} onRemove={handleRemove} />
            ))}
          </div>
        </>
      )}
    </Layout>
  )
}
