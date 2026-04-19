import styles    from './contactPage.module.css';
import Navbar    from '../../components/navBar/navBar';
import logo      from '../../assets/images/logo.png';
import mailIcon  from '../../assets/icons/Mail.png';
import phoneIcon from '../../assets/icons/Phone.png';
import mapIcon   from '../../assets/icons/Map pin.png';

function ContactPage({ onNavigate }) {
    return (
        <div className={styles.pageWrapper}>
            {/* Header con el logo */}
            <header className={styles.header}>
                <img
                    className={styles.logo}
                    src={logo}
                    alt="GamX"
                />
            </header>

            {/* Contenido principal */}
            <main className={styles.main}>
                <h1 className={styles.tittle}>Contacto</h1>

                {/* Información de contacto */}
                <section className={styles.card}>
                    <h2 className={styles.cardTittle}>Información de Contacto</h2>

                    <div className={styles.contactItem}>
                        <span className={styles.icon}>
                            <img src={mailIcon} alt="Mail" />
                        </span>
                        <div>
                            <p className={styles.label}>Email</p>
                            <a href="mailto:gamX@gmail.com" className={styles.value}>
                                gamX@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <span className={styles.icon}>
                            <img src={phoneIcon} alt="Phone" />
                        </span>
                        <div>
                            <p className={styles.label}>Teléfono</p>
                            <a href="tel:+1234567890" className={styles.value}>
                                +1 (234) 567-890
                            </a>
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <span className={styles.icon}>
                            <img src={mapIcon} alt="Map" />
                        </span>
                        <div>
                            <p className={styles.label}>Ubicación</p>
                            <p className={styles.value}>
                                Catedral de la Plata, <br />
                                La Plata, Buenos Aires, Argentina
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mapa embebido */}
                <div className={styles.mapWrapper}>
                    <iframe
                        className={styles.map}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.3!2d-57.954!3d-34.921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCatedral+de+La+Plata!5e0!3m2!1ses!2sar!4v1"
                        allowFullScreen
                        loading="lazy"
                        title="Ubicacion GamX"
                    />
                </div>
            </main>

            <Navbar currentPage="contact" onNavigate={onNavigate} />
        </div>
    );
}

export default ContactPage;