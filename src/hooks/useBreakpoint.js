import { useState, useEffect } from 'react'

const BREAKPOINTS = {
  sm:  480,
  md:  768,
  lg:  1024,
  xl:  1280,
}

/**
 * Returns the current breakpoint key: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * and convenience booleans.
 *
 * Usage:
 *   const { isMobile, isTablet, isDesktop } = useBreakpoint()
 */
export function useBreakpoint() {
  const getBreakpoint = () => {
    const w = window.innerWidth
    if (w < BREAKPOINTS.sm)  return 'xs'
    if (w < BREAKPOINTS.md)  return 'sm'
    if (w < BREAKPOINTS.lg)  return 'md'
    if (w < BREAKPOINTS.xl)  return 'lg'
    return 'xl'
  }

  const [bp, setBp] = useState(() =>
    typeof window !== 'undefined' ? getBreakpoint() : 'xs'
  )

  useEffect(() => {
    const mql = Object.entries(BREAKPOINTS).map(([key, px]) => ({
      key,
      mql: window.matchMedia(`(min-width: ${px}px)`),
    }))

    const handler = () => setBp(getBreakpoint())
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    bp,
    /** < 768px */
    isMobile:  bp === 'xs' || bp === 'sm',
    /** 768px – 1023px */
    isTablet:  bp === 'md',
    /** >= 1024px */
    isDesktop: bp === 'lg' || bp === 'xl',
  }
}
