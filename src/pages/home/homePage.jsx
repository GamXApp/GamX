import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames } from '../../services/api';
import styles from './homePage.module.css';
import Navbar from '../../components/navBar/navBar';
import AppHeader from '../../components/AppHeader/AppHeader'
import logo from '../../assets/images/logo.png';
import homeImage from '../../assets/images/PcGamer.jpg';
import imageAction from '../../assets/images/imageAction.jpeg';
import imageActionRpg from '../../assets/images/imageActionRpg.jpeg';
import imageAdventure from '../../assets/images/imageAdventure.jpg';
import imageBattleRoyale from '../../assets/images/imageBattleRoyale.jpg';
import imageCard from '../../assets/images/imageCard.webp';
import imageMultiplayer from '../../assets/images/imageMMORP.jpg';
import imageMOBA from '../../assets/images/imageMOBA.jpg';
import imageRacing from '../../assets/images/imageRacing.jpg';
import imageShooter from '../../assets/images/imageShooter.jpg';
import imageStrategy from '../../assets/images/imageStrategy.jpg';
import imageTerror from '../../assets/images/imageTerror.jpg';
import imageMMORPG from '../../assets/images/imageMMORPG.jpg';

const categories = [
    {
        name: 'Acción',
        image: imageAction,
    },
    {
        name: 'RPG',
        image: imageActionRpg,
    },
    {
        name: 'Battle Royale',
        image: imageBattleRoyale,
    },
    {
        name: 'Aventura',
        image: imageAdventure,
    },
    {
        name: 'Estrategia',
        image: imageStrategy,
    },
    {
        name: 'Terror',
        image: imageTerror,
    },
    {
        name: 'Multijugador',
        image: imageMultiplayer,
    },
    {
        name: 'Carreras',
        image: imageRacing,
    },
    {
        name: 'Arcade',
        image: imageCard,
    },
    {
        name: 'MMORPG',
        image: imageMMORPG,
    },
    {
        name: 'Shooter',
        image: imageShooter,
    },
    {
        name: 'MOBA',
        image: imageMOBA,
    },
    ];

function HomePage( onNavigate ) {
    const navigate = useNavigate();
    const [games, setGames] = useState([])

    // Cambio: esta funcion va dentro del componente porque necesita usar "navigate",
    // que se crea con useNavigate() dentro de HomePage.
    function goToCategory(categoryName){
        navigate(`/search?category=${encodeURIComponent(categoryName)}`)
    }

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
            <AppHeader 
                title='GamX'
                showLogo
            ></AppHeader>

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
                                    <div 
                                    key={game.id} 
                                    className={styles.gameCard}
                                    onClick={() => navigate(`/game/${game.id}`)}>
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

                <section className={styles.categoriesSection}>
                    <h2 className={styles.discover}>Categorías</h2>

                    <div className={styles.categoryGrid}>
                        {categories.map(category => (
                            <button 
                                key={category.name}
                                className={styles.categoryCard}
                                // Cambio: mandamos solo el nombre de la categoria.
                                // Antes se mandaba el objeto completo y la URL quedaba mal.
                                onClick={() => goToCategory(category.name)}
                            > 
                                <img 
                                className={styles.categoryImage}
                                src={category.image} alt={category.name} />

                                <span className={styles.categoryName}>
                                    {category.name}
                                </span>
                            </button>
                            ))

                        }
                    </div>
                </section>
            </div>

            <Navbar currentPage="home" onNavigate={onNavigate} />
        </div>
    )
}

export default HomePage;
