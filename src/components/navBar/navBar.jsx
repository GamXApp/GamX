import home from '../../assets/icons/Home.png'
import search from '../../assets/icons/Search.png'
import heart from '../../assets/icons/Heart.png'
import clock from '../../assets/icons/Clock.png'
import phone from '../../assets/icons/Phone.png'
import styles from './navBar.module.css'


function Navbar() {
    return (
        <nav className={styles.navBar}>
            <a href="../../pages/home" className={styles.navItem}> 
                <img src={home} alt="Home" className={styles.icon}/>
            </a>
            <a href="../../pages/search" className={styles.navItem}> 
                <img src={search} alt="Search" className={styles.icon}/>
            </a>
            <a href="../../pages/wishList" className={styles.navItem}> 
                <img src={heart} alt="Wishlist" className={styles.icon}/>
            </a>
            <a href="../../pages/history" className={styles.navItem}> 
                <img src={clock} alt="History" className={styles.icon}/>
            </a>
            <a href="../../pages/contact" className={styles.navItemActive}> 
                <img src={phone} alt="Contact" className={styles.icon}/>
            </a>
        </nav>
    )
}

export default Navbar 