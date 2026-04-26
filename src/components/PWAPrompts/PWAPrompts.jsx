import { useState } from 'react'
import { usePWA } from '../../hooks/usePWA'
import styles from './PWAPrompts.module.css'

export default function PWAPrompts() {
  const { canInstall, install, needsUpdate, updateApp } = usePWA()
  const [showInstall, setShowInstall] = useState(true)
  const [showUpdate, setShowUpdate] = useState(true)

  return (
    <>
      {needsUpdate && showUpdate && (
        <div className={styles.updateToast} role="alert">
          <span>Nueva version disponible</span>
          <button className={styles.updateBtn} onClick={updateApp}>
            Actualizar
          </button>
          <button className={styles.dismissBtn} onClick={() => setShowUpdate(false)}>
            x
          </button>
        </div>
      )}

      {canInstall && showInstall && (
        <div className={styles.installBanner} role="complementary" aria-label="Instalar GamX">
          <div className={styles.installInfo}>
            <span className={styles.installIcon}>GX</span>
            <div>
              <p className={styles.installTitle}>Instala GamX</p>
              <p className={styles.installSub}>Accede sin internet, mas rapido</p>
            </div>
          </div>
          <div className={styles.installActions}>
            <button className={styles.installBtn} onClick={install}>
              Instalar
            </button>
            <button className={styles.installDismiss} onClick={() => setShowInstall(false)}>
              Ahora no
            </button>
          </div>
        </div>
      )}
    </>
  )
}
