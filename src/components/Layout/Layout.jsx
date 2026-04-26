import TopBar from '../TopBar/TopBar'
import NavBar  from '../NavBar/NavBar'
import styles  from './Layout.module.css'

/**
 * Layout wraps every page.
 * - Renders TopBar (desktop) + NavBar (mobile)
 * - Adds correct top/bottom padding so content is never hidden under nav
 * - Centers content with max-width on wide screens
 *
 * Usage:
 *   <Layout>
 *     <MyPage />
 *   </Layout>
 */
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
