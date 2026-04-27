import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import styles from './TopBar.module.css'

import homeIcon    from '../../assets/icons/Home.png'
import searchIcon  from '../../assets/icons/Search.png'
import heartIcon   from '../../assets/icons/Heart.png'
import clockIcon   from '../../assets/icons/Clock.png'
import phoneIcon   from '../../assets/icons/Phone.png'

const NAV_ITEMS = [
  { key: 'home',     path: '/',         icon: homeIcon,   label: 'Inicio'   },
  { key: 'search',   path: '/search',   icon: searchIcon, label: 'Buscar'   },
  { key: 'wishlist', path: '/wishlist', icon: heartIcon,  label: 'Deseos'   },
  { key: 'history',  path: '/history',  icon: clockIcon,  label: 'Historial'},
  { key: 'contact',  path: '/contact',  icon: phoneIcon,  label: 'Contacto' },
]

export default function TopBar() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const currentKey = location.pathname === '/'
    ? 'home'
    : location.pathname.split('/')[1]

  return (
    <header className={styles.topbar}>
      <div className={styles.inner}>
        
        <button
          className={styles.logoBtn}
          onClick={() => navigate('/')}
          aria-label="GamX — Inicio"
        >
          <img src={logo} alt="GamX" className={styles.logoImg} />
          <span className={styles.logoText}>GamX</span>
        </button>

        <nav className={styles.nav} aria-label="Navegación principal">
          {NAV_ITEMS.map(({ key, path, icon, label }) => {
            const active = currentKey === key
            return (
              <button
                key={key}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                onClick={() => navigate(path)}
                aria-current={active ? 'page' : undefined}
              >
                <img src={icon} alt="" className={styles.navIcon} aria-hidden="true" />
                <span>{label}</span>
                {active && <span className={styles.activeLine} aria-hidden="true" />}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
