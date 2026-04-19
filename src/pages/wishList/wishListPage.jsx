import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWishlist } from '../../services/storage';
import Navbar from '../../components/navBar/navBar';
import logo from '../../assets/images/logo.png';
import styles from './wishListPage.module.css';

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await getWishlist();
      setWishlist(data);
    };

    fetchWishlist();
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <header className={styles.header}>
        <img src={logo} alt="GamX" className={styles.logo} />
      </header>
      <main className={styles.main}>
        <h1 className={styles.tittle}>Lista de Deseos</h1>
        {wishlist.length === 0 ? (
          <p>No tienes juegos en tu lista de deseos.</p>
        ) : (
          <div className={styles.resultList}>
            {wishlist.map(game => (
              <div key={game.id} className={styles.gameCard} onClick={() => navigate(`/game/${game.id}`)}>
                <img className={styles.cardThumb} src={game.thumbnail} alt={game.title} loading="lazy" />
                <div className={styles.cardInfo}>
                  <p className={styles.cardTitle}>{game.title}</p>
                  <p className={styles.cardGenre}>{game.genre}</p>
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