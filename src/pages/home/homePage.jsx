import { useEffect, useState } from 'react';
import getAllGames from '../../services/api';
import styles from './homePage.module.css';
import navBar from '../../components/navBar/navBar';
import logo from '../../assets/images/logo.png';
import homeImage from '../../assets/images/PcGmaer.jpg';

function HomePage(){
    const [games, setgames] = useState([])

    useEffect(() => {
        async function loadGames(){
            const data = await getAllGames()
            setGames(data)
        }

        loadGames()
    }, [])

    return(
        <div className={styles.homePageWrapper}>
            {/* Header con el logo*/}
            <header className={styles.header}>
                <img
                className={styles.logos} 
                src={logo} alt="logo" />
            </header>

            {/* Contenido principal */}
            <div className={styles.main}>
                <div className={styles.heroSection}>
                    <h1 className={styles.tittle}>GamX</h1>
                    <p className={styles.description}>
                        Bienvenido a GamX, la mejor plataforma para los amantes de los videojuegos. Explora e investiga sobre los mejores videojuegos free to play.
                    </p>
                </div>


            </div>
        </div>
    )
}