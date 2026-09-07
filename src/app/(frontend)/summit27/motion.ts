'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

function prefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_QUERY).matches
}

/**
 * Counts an element's text up to its data-count target. Runs once per element.
 */
function countUp(node: HTMLElement, reduced: boolean) {
  if (node.dataset.counted) return
  node.dataset.counted = '1'
  const target = parseInt(node.dataset.count ?? '0', 10) || 0
  const suffix = node.dataset.suffix ?? ''
  if (reduced) {
    node.textContent = target.toLocaleString('en-US') + suffix
    return
  }
  const start = performance.now()
  const duration = 1100
  const step = (t: number) => {
    const p = Math.min(1, (t - start) / duration)
    const eased = 1 - Math.pow(1 - p, 3)
    node.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Reveals `[data-reveal]` descendants as they scroll into view by adding
 * `shownClass`, and starts any `[data-count]` counters inside them.
 */
export function useReveal(rootRef: RefObject<HTMLElement | null>, shownClass: string) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = prefersReduced()
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))

    const show = (el: HTMLElement) => {
      if (el.dataset.shown) return
      el.dataset.shown = '1'
      el.classList.add(shownClass)
      el.querySelectorAll<HTMLElement>('[data-count]').forEach((n) => countUp(n, reduced))
    }

    if (reduced || !('IntersectionObserver' in window)) {
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.02 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef, shownClass])
}

/**
 * Drives the scroll-linked chrome: nav shrink state, the progress bar's
 * clip-path, and the parallax offset on `[data-parallax]` images.
 *
 * Only the shrink flag goes through React state — the rest is written straight
 * to style so scrolling never re-renders the tree.
 */
export function useScrollChrome(progressRef: RefObject<HTMLElement | null>) {
  const [shrunk, setShrunk] = useState(false)
  const shrunkRef = useRef(false)

  useEffect(() => {
    const reduced = prefersReduced()
    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    let ticking = false

    const frame = () => {
      ticking = false
      const y = window.scrollY
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)

      if (progressRef.current) {
        const pct = Math.min(100, (y / scrollable) * 100)
        progressRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
      }

      const next = y > 40
      if (next !== shrunkRef.current) {
        shrunkRef.current = next
        setShrunk(next)
      }

      if (!reduced) {
        const vh = window.innerHeight
        parallax.forEach((el) => {
          const parent = el.parentElement
          if (!parent) return
          const box = parent.getBoundingClientRect()
          const speed = parseFloat(el.dataset.parallax ?? '0.12') || 0.12
          // The image is pre-scaled to 1.18, so this is the slack we can slide
          // it through without exposing an edge.
          const slack = ((1.18 - 1) * box.height) / 2
          const p = Math.max(0, Math.min(1, (vh - box.top) / (vh + box.height)))
          const range = slack * Math.min(1, speed / 0.14)
          const offset = (0.5 - p) * 2 * range
          el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0) scale(1.18)`
        })
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

/**
 * Cursor-tracking glow over the hero, with a slight counter-drift on the
 * photo and the copy.
 */
export function useHeroPointer(
  heroRef: RefObject<HTMLElement | null>,
  glowRef: RefObject<HTMLElement | null>,
  imgRef: RefObject<HTMLElement | null>,
  textRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || prefersReduced()) return

    const onMove = (e: PointerEvent) => {
      const box = hero.getBoundingClientRect()
      const x = e.clientX - box.left
      const y = e.clientY - box.top
      if (glowRef.current) {
        glowRef.current.style.opacity = '1'
        glowRef.current.style.transform = `translate3d(${x}px,${y}px,0)`
      }
      const dx = x / box.width - 0.5
      const dy = y / box.height - 0.5
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${(dx * -18).toFixed(1)}px,${(dy * -14).toFixed(1)}px,0) scale(1.04)`
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${(dx * 7).toFixed(1)}px,0,0)`
      }
    }

    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0'
      if (imgRef.current) imgRef.current.style.transform = 'none'
      if (textRef.current) textRef.current.style.transform = 'none'
    }

    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [heroRef, glowRef, imgRef, textRef])
}
