import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames } from '../../services/api';
import styles from './homePage.module.css';
import Navbar from '../../components/navBar/navBar';
import logo from '../../assets/images/logo.png';
import homeImage from '../../assets/images/PcGamer.jpg';

function HomePage( onNavigate ) {
    const navigate = useNavigate();
    const [games, setGames] = useState([])

    useEffect(() => {
        async function loadGames(){
            try{
                const data = await getAllGames()
            
                const randomGames = data
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 10)

                setGames(randomGames)
            } catch (error) {
                console.error('Error al cargar juegos', error)
            }
        }

        loadGames()
    }, [])

    return(
        <div className={styles.homePageWrapper}>
            {/* Header con el logo*/}
            <header className={styles.header}>
                <img
                className={styles.logo} 
                src={logo} alt="logo" />
            </header>

            {/* Contenido principal */}
            <div className={styles.main}>
                <div className={styles.heroSection}>
                    <img className={styles.heroImage} src={homeImage} alt="Imagen de fondo"/>
                    <div className={styles.Text}>
                        <h1 className={styles.title}>GamX</h1>
                        <p className={styles.description}>
                            Bienvenido a GamX, la mejor plataforma para los amantes de los videojuegos. Explora e investiga sobre los mejores videojuegos free to play.
                        </p>
                    </div>
                </div>

                <div className={styles.gamesWrapper}>
                    <h2 className={styles.discover}>Descubre</h2>
                    <section className={styles.gamesSection}>
                        {
                            games.map(
                                game => (
                                    <div key={game.id} className={styles.gameCard}>
                                        <img className={styles.gameImage} src={game.thumbnail} alt={game.title} loading="lazy" />
                                        <div className={styles.gameInfo}>
                                            <p className={styles.gameTitle}>
                                                {game.title}
                                            </p>
                                            <p className={styles.gameGenre}>
                                                {game.genre}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </section>
                </div> 
            </div>

            <Navbar currentPage="home" onNavigate={onNavigate} />
        </div>
    )
}

export default HomePage;