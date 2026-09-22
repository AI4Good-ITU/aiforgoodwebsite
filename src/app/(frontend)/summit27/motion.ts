'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

function prefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_QUERY).matches
}

/**
 * Reveals `[data-reveal]` descendants as they scroll into view by adding
 * `shownClass`.
 */
export function useReveal(rootRef: RefObject<HTMLElement | null>, shownClass: string) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))

    const show = (el: HTMLElement) => {
      if (el.dataset.shown) return
      el.dataset.shown = '1'
      el.classList.add(shownClass)
    }

    if (prefersReduced() || !('IntersectionObserver' in window)) {
      els.forEach(show)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement)
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef, shownClass])
}

/**
 * Drives the fixed bar: reports whether the page has scrolled past the point
 * where the bar takes on a surface, and writes the read-progress bar's
 * clip-path straight to the node so progress costs no re-render.
 */
export function useScrollChrome(progressRef: RefObject<HTMLElement | null>) {
  const [shrunk, setShrunk] = useState(false)
  const shrunkRef = useRef(false)

  useEffect(() => {
    let ticking = false

    const frame = () => {
      ticking = false
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0

      if (progressRef.current) {
        progressRef.current.style.clipPath = `inset(0 ${((1 - progress) * 100).toFixed(2)}% 0 0)`
      }

      const next = y > 40
      if (next !== shrunkRef.current) {
        shrunkRef.current = next
        setShrunk(next)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(frame)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    frame()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [progressRef])

  return shrunk
}
