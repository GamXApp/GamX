import { useNavigate } from 'react-router-dom';
import styles from './AppHeader.module.css';
import logo from '../../assets/images/logo.png'

function AppHeader({
  title,
  showLogo = false, }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        { showLogo ? (
            <img src={logo} alt="GamX" className={styles.logo}/>
          ) : null
        }
      </div>
      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
}

export default AppHeader;