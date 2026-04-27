import { useState, useEffect } from 'react'

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [canInstall,    setCanInstall]    = useState(false)
  const [needsUpdate,   setNeedsUpdate]   = useState(false)
  const [registration,  setRegistration]  = useState(null)

  useEffect(() => {
    function handler(e) {
      e.preventDefault()
      setInstallPrompt(e)
      setCanInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  useEffect(() => {
    
    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        const updateSW = registerSW({
          onNeedRefresh() {
            setNeedsUpdate(true)
            setRegistration(updateSW)
          },
          onOfflineReady() {
            console.log('[GamX PWA] App lista para uso offline')
          },
        })
      })
      .catch(() => {
        console.warn('[GamX PWA] No se pudo registrar el Service Worker')
      })
  }, [])

  async function install() {
    if (!installPrompt) return
    await installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') {
      setCanInstall(false)
      setInstallPrompt(null)
    }
  }

  async function updateApp() {
    if (registration) {
      await registration(true)   
    }
    setNeedsUpdate(false)
  }

  return { canInstall, install, needsUpdate, updateApp }
}
