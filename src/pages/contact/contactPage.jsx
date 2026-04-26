import Layout from '../../components/Layout/Layout'
import styles  from './contactPage.module.css'
import mailIcon  from '../../assets/icons/Mail.png'
import phoneIcon from '../../assets/icons/Phone.png'
import mapIcon   from '../../assets/icons/Map pin.png'

const CONTACT_ITEMS = [
  {
    icon: mailIcon,
    label: 'Email',
    value: 'gamX@gmail.com',
    href:  'mailto:gamX@gmail.com',
  },
  {
    icon: phoneIcon,
    label: 'Teléfono',
    value: '+1 (234) 567-890',
    href:  'tel:+1234567890',
  },
  {
    icon: mapIcon,
    label: 'Ubicación',
    value: 'Catedral de La Plata, Buenos Aires, Argentina',
    href:  null,
  },
]

export default function ContactPage() {
  return (
    <Layout>
      <h1 className={styles.title}>Contacto</h1>

      <div className={styles.grid}>
        {/* ── Info card ── */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Información de Contacto</h2>

          <div className={styles.contactList}>
            {CONTACT_ITEMS.map(({ icon, label, value, href }) => (
              <div key={label} className={styles.contactItem}>
                <span className={styles.iconWrap}>
                  <img src={icon} alt="" className={styles.icon} aria-hidden="true" />
                </span>
                <div>
                  <p className={styles.contactLabel}>{label}</p>
                  {href ? (
                    <a href={href} className={styles.contactValue}>{value}</a>
                  ) : (
                    <p className={styles.contactValue}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Map ── */}
        <div className={styles.mapWrap}>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.3!2d-57.954!3d-34.921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCatedral+de+La+Plata!5e0!3m2!1ses!2sar!4v1"
            allowFullScreen
            loading="lazy"
            title="Ubicación GamX"
          />
        </div>
      </div>
    </Layout>
  )
}
