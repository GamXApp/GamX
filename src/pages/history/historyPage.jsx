import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../../services/storage';
import Navbar from '../../components/navBar/navBar';
import logo from '../../assets/images/logo.png';
import styles from './historyPage.module.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <header className={styles.header}>
        <img src={logo} alt="GamX" className={styles.logo} />
      </header>
      <main className={styles.main}>
        <h1 className={styles.tittle}>Historial</h1>
        {history.length === 0 ? (
          <p>No has visto ningún juego aún.</p>
        ) : (
          <div className={styles.resultList}>
            {history.map(game => (
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

export default HistoryPage;