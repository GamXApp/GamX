import TopBar from '../TopBar/TopBar'
import NavBar  from '../NavBar/NavBar'
import styles  from './Layout.module.css'

export default function Layout({ children, fullWidth = false }) {
  return (
    <div className={styles.root}>
      <TopBar />
      <NavBar />
      <main className={`${styles.main} ${fullWidth ? styles.fullWidth : ''}`}>
        {children}
      </main>
    </div>
  )
}
