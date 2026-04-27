import { useNavigate, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'

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

export default function NavBar() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const currentKey = location.pathname === '/'
    ? 'home'
    : location.pathname.split('/')[1]

  return (
    <nav className={styles.navbar} aria-label="Navegación principal">
      {NAV_ITEMS.map(({ key, path, icon, label }) => {
        const active = currentKey === key
        return (
          <button
            key={key}
            className={`${styles.item} ${active ? styles.itemActive : ''}`}
            onClick={() => navigate(path)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
          >
            <img src={icon} alt="" className={styles.icon} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
