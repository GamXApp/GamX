import { useState, useEffect } from 'react'

/**
 * usePWA — handles:
 *   1. Install prompt  (beforeinstallprompt)
 *   2. SW update available (via vite-plugin-pwa's virtual module)
 *
 * Usage:
 *   const { canInstall, install, needsUpdate, updateApp } = usePWA()
 */
export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [canInstall,    setCanInstall]    = useState(false)
  const [needsUpdate,   setNeedsUpdate]   = useState(false)
  const [registration,  setRegistration]  = useState(null)

  /* ── Capture install prompt ── */
  useEffect(() => {
    function handler(e) {
      e.preventDefault()
      setInstallPrompt(e)
      setCanInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  /* ── Detect SW update via vite-plugin-pwa virtual module ── */
  useEffect(() => {
    // Dynamic import so the build doesn't break if the virtual module
    // isn't available (e.g. during unit tests).
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
        // Not in a PWA context — silently ignore
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
      await registration(true)   // force reload
    }
    setNeedsUpdate(false)
  }

  return { canInstall, install, needsUpdate, updateApp }
}
