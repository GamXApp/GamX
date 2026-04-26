import { usePWA } from '../../hooks/usePWA'
import styles from './PWAPrompts.module.css'

/**
 * PWAPrompts renders two non-blocking UI elements:
 *  1. Install banner  — appears at the bottom when the browser fires
 *                       beforeinstallprompt (Android Chrome / Edge / Samsung)
 *  2. Update toast    — appears at the top when a new SW version is waiting
 *
 * Drop this component once inside <App /> (outside the Router is fine too).
 */
export default function PWAPrompts() {
  const { canInstall, install, needsUpdate, updateApp } = usePWA()

  return (
    <>
      {/* ── Update toast ── */}
      {needsUpdate && (
        <div className={styles.updateToast} role="alert">
          <span>🚀 Nueva versión disponible</span>
          <button className={styles.updateBtn} onClick={updateApp}>
            Actualizar
          </button>
          <button className={styles.dismissBtn} onClick={() => {}}>✕</button>
        </div>
      )}

      {/* ── Install banner ── */}
      {canInstall && (
        <div className={styles.installBanner} role="complementary" aria-label="Instalar GamX">
          <div className={styles.installInfo}>
            <span className={styles.installIcon}>🎮</span>
            <div>
              <p className={styles.installTitle}>Instalá GamX</p>
              <p className={styles.installSub}>Accedé sin internet, más rápido</p>
            </div>
          </div>
          <div className={styles.installActions}>
            <button className={styles.installBtn} onClick={install}>
              Instalar
            </button>
            <button
              className={styles.installDismiss}
              onClick={() => {
                /* The hook state won't reset on dismiss — user just hides it */
                document.querySelector('[role="complementary"]')?.remove()
              }}
            >
              Ahora no
            </button>
          </div>
        </div>
      )}
    </>
  )
}
