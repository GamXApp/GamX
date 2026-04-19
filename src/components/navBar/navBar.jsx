import home    from '../../assets/icons/Home.png';
import search  from '../../assets/icons/Search.png';
import heart   from '../../assets/icons/Heart.png';
import clock   from '../../assets/icons/Clock.png';
import phone   from '../../assets/icons/Phone.png';
import styles  from './navBar.module.css';

const NAV_ITEMS = [
    { page: 'home',     icon: home,   alt: 'Home'     },
    { page: 'search',   icon: search, alt: 'Buscar'   },
    { page: 'wishlist', icon: heart,  alt: 'Wishlist' },
    { page: 'history',  icon: clock,  alt: 'Historial'},
    { page: 'contact',  icon: phone,  alt: 'Contacto' },
];

function Navbar({ currentPage, onNavigate }) {
    return (
        <nav className={styles.navBar}>
            {NAV_ITEMS.map(({ page, icon, alt }) => (
                <button
                    key={page}
                    className={currentPage === page ? styles.navItemActive : styles.navItem}
                    onClick={() => onNavigate(page)}
                    aria-label={alt}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    <img src={icon} alt={alt} className={styles.icon} />
                </button>
            ))}
        </nav>
    );
}

export default Navbar;