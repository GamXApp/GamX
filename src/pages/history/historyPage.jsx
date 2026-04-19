import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../../services/storage';
import Navbar from '../../components/navBar/navBar';
import styles from './historyPage.module.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <h1>Historial</h1>
        {history.length === 0 ? (
          <p>No has visto ningún juego aún.</p>
        ) : (
          <div className={styles.list}>
            {history.map(game => (
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

export default HistoryPage;