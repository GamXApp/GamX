import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllGames } from '../../services/api'
import Layout from '../../components/Layout/Layout'
import GameCard from '../../components/GameCard/GameCard'
import styles from './homePage.module.css'

import homeImage        from '../../assets/images/PcGamer.jpg'
import imageAction      from '../../assets/images/imageAction.jpeg'
import imageActionRpg   from '../../assets/images/imageActionRpg.jpeg'
import imageAdventure   from '../../assets/images/imageAdventure.jpg'
import imageBattleRoyale from '../../assets/images/imageBattleRoyale.jpg'
import imageCard        from '../../assets/images/imageCard.webp'
import imageMultiplayer from '../../assets/images/imageMMORP.jpg'
import imageMOBA        from '../../assets/images/imageMOBA.jpg'
import imageRacing      from '../../assets/images/imageRacing.jpg'
import imageShooter     from '../../assets/images/imageShooter.jpg'
import imageStrategy    from '../../assets/images/imageStrategy.jpg'
import imageTerror      from '../../assets/images/imageTerror.jpg'
import imageMMORPG      from '../../assets/images/imageMMORPG.jpg'

const CATEGORIES = [
  { name: 'Acción',        image: imageAction       },
  { name: 'RPG',           image: imageActionRpg    },
  { name: 'Battle Royale', image: imageBattleRoyale },
  { name: 'Aventura',      image: imageAdventure    },
  { name: 'Estrategia',    image: imageStrategy     },
  { name: 'Terror',        image: imageTerror       },
  { name: 'Multijugador',  image: imageMultiplayer  },
  { name: 'Carreras',      image: imageRacing       },
  { name: 'Arcade',        image: imageCard         },
  { name: 'MMORPG',        image: imageMMORPG       },
  { name: 'Shooter',       image: imageShooter      },
  { name: 'MOBA',          image: imageMOBA         },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [games, setGames] = useState([])

  useEffect(() => {
    getAllGames()
      .then(data => setGames(data.sort(() => Math.random() - 0.5).slice(0, 12)))
      .catch(console.error)
  }, [])

  function goToCategory(name) {
    navigate(`/search?category=${encodeURIComponent(name)}`)
  }

  return (
    <Layout fullWidth>
      <section className={styles.hero}>
        <img src={homeImage} alt="" className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>GamX</h1>
          <p className={styles.heroSub}>
            Explorá los mejores videojuegos free-to-play del mundo
          </p>
          <button
            className={styles.heroCta}
            onClick={() => navigate('/search')}
          >
            Explorar juegos
          </button>
        </div>
      </section>

      <div className={styles.container}>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Descubrí</h2>
          <div className={styles.discoverGrid}>
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Categorías</h2>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                className={styles.categoryCard}
                onClick={() => goToCategory(cat.name)}
              >
                <img src={cat.image} alt={cat.name} className={styles.categoryImg} />
                <span className={styles.categoryName}>{cat.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
