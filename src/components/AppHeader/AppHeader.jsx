import { useNavigate } from 'react-router-dom';
import styles from './AppHeader.module.css';

function AppHeader({ showBack, onBack, title }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <header className={styles.header}>
      {showBack && (
        <button className={styles.backBtn} onClick={handleBack}>
          ←
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}

export default AppHeader;