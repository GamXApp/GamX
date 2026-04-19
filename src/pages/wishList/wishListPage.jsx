import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWishlist } from '../../services/storage';
import Navbar from '../../components/navBar/navBar';
import styles from './wishListPage.module.css';

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <h1>Lista de Deseos</h1>
        {wishlist.length === 0 ? (
          <p>No tienes juegos en tu lista de deseos.</p>
        ) : (
          <div className={styles.list}>
            {wishlist.map(game => (
              <div key={game.id} className={styles.gameCard} onClick={() => navigate(`/game/${game.id}`)}>
                <img src={game.thumbnail} alt={game.title} />
                <div>
                  <h3>{game.title}</h3>
                  <p>{game.genre}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default WishlistPage;