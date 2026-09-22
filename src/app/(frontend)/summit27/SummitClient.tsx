'use client'

/*
 * Plain <img> throughout: this layout depends on precise object-fit /
 * object-position / absolute-inset control. The assets are pre-optimised.
 */
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import styles from './summit.module.css'
import { Button, Eyebrow, SidePanel, Toast } from '@/components/ui'
import { useReveal, useScrollChrome } from './motion'
import { SocialIcon } from './SocialIcon'
import {
  ACCENT,
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  LINKS,
  NAV_LINKS,
  NEWS,
  PARTS,
  SPEAKERS,
  SOCIALS,
  SPONSOR_TIERS,
  TESTIMONIALS,
  TICKER_ITEMS,
} from './data'

/** One pass of the ticker, with an accent dot after each item. */
function TickerRun({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.tickerRun} aria-hidden={ariaHidden || undefined}>
      {TICKER_ITEMS.map((item) => (
        <React.Fragment key={item}>
          <span className={styles.tickerItem}>{item}</span>
          <span className={styles.tickerDot} style={{ color: ACCENT }}>
            ●
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

/** The "→" that ends every secondary link on the page. */
function Arrow() {
  return (
    <svg
      className={styles.arrow}
      width="17"
      height="14"
      viewBox="0 0 17 14"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 7h14M10 1.5 15.5 7 10 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

type Theme = 'light' | 'dark'

const THEME_KEY = 'summit-theme'

function readStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_KEY)
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

/*
 * The saved choice as an external store. useSyncExternalStore hands the
 * server snapshot (null: follow the OS) to the hydrating render and only then
 * swaps in the stored value, so the markup matches without a flash — the
 * layout's <head> script has already put the flag on <html>.
 */
const themeListeners = new Set<() => void>()
const themeStore = {
  subscribe(cb: () => void) {
    themeListeners.add(cb)
    window.addEventListener('storage', cb)
    return () => {
      themeListeners.delete(cb)
      window.removeEventListener('storage', cb)
    }
  },
  get: readStoredTheme,
  set(next: Theme) {
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // Private mode or storage disabled: the choice still applies for this visit.
    }
    document.documentElement.dataset.theme = next
    themeListeners.forEach((cb) => cb())
  },
}

const DARK_QUERY = '(prefers-color-scheme: dark)'
const subscribeSystem = (cb: () => void) => {
  const mq = window.matchMedia(DARK_QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getSystem = (): Theme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light')

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path
        d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function SummitClient({ themeClass }: { themeClass: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  // null means "follow the OS"; `system` is what the OS currently says.
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.get, () => null)
  const system = useSyncExternalStore(subscribeSystem, getSystem, () => 'light' as Theme)
  const effectiveTheme = theme ?? system
  const [toast, setToast] = useState<string | null>(null)
  /*
   * SidePanel portals into this instead of document.body, so the panel stays
   * inside the themed subtree. Held in state rather than read off the ref
   * during render, which React disallows.
   */
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const shrunk = useScrollChrome(progressRef)
  useReveal(rootRef, styles.shown)

  useEffect(() => setPortalContainer(rootRef.current), [])

  const toggleTheme = () => themeStore.set(effectiveTheme === 'dark' ? 'light' : 'dark')

  useEffect(() => () => void (toastTimer.current && clearTimeout(toastTimer.current)), [])

  /*
   * Destinations marked data-page have no page yet, so intercept the click and
   * say so rather than navigating nowhere. Everything else is a real link.
   */
  const onRootClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const hit = (e.target as HTMLElement).closest('[data-page]')
    if (!hit) return
    e.preventDefault()
    setToast(hit.getAttribute('data-page'))
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }, [])

  return (
    <div className={themeClass}>
      <div className={styles.root} ref={rootRef} onClick={onRootClick}>
        {/* ── Nav ── */}
        <div className={`${styles.nav} ${shrunk ? styles.navShrunk : ''}`}>
          <div className={`${styles.shell} ${styles.navInner}`}>
            <a href="#top" className={styles.navBrand} aria-label="AI for Good">
              <span className={styles.navLogo} role="img" aria-label="AI for Good" />
            </a>
            <div className={styles.navLinks}>
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${effectiveTheme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {effectiveTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              type="button"
              className={styles.navToggle}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true" focusable="false">
                <path
                  d="M0 1h22M0 7h22M0 13h22"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
              </svg>
            </button>
          </div>
          <div
            ref={progressRef}
            className={styles.navProgress}
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          />
        </div>

        {/* ── Hero ── */}
        <section id="top" className={styles.hero}>
          <div className={styles.heroWash} />
          <div className={styles.heroMark}>
            <img src="/img/a-mark.png" alt="" aria-hidden="true" />
          </div>
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroText}>
              <div className={styles.heroMeta}>
                <span className={styles.heroDate}>7–10 July 2027</span>
                <span className={styles.heroMetaDot}>•</span>
                <span className={styles.heroVenue}>Palexpo, Geneva</span>
              </div>
              <h1 className={styles.heroTitle}>
                AI for Good
                <br />
                Global Summit
                <br />
                <span className={styles.heroYear}>2027</span>
              </h1>
              <p className={styles.heroBody}>
                Geneva has spent eighty years being the room where the world works things out. For
                four days in July 2027, that room is full of artificial intelligence — the people
                building it, the people governing it, and the people whose lives it changes.
              </p>
              <div className={styles.heroButtons}>
                <span data-page="Pass waitlist">
                  <Button size="xl" hierarchy="primary">
                    Get first access to passes
                  </Button>
                </span>
                <Button size="xl" hierarchy="secondary-gray" href={LINKS.sponsorshipOpportunities}>
                  Sponsorship opportunities
                </Button>
              </div>
              <p className={styles.heroFoot}>
                Organized by ITU in partnership with over 50 UN sister agencies and co-convened with
                the Government of Switzerland.
              </p>
            </div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            <TickerRun />
            <TickerRun ariaHidden />
          </div>
        </div>

        {/* ── Six parts ── */}
        <section id="week" className={styles.section} style={{ background: 'var(--bg-2)' }}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <div className={styles.sectionHead}>
              <div>
                <Eyebrow>The week</Eyebrow>
                <h2 className={styles.h2}>Six parts, one hall.</h2>
              </div>
            </div>
            <div className={styles.partsList}>
              {PARTS.map((part) => (
                <div key={part.num} className={styles.partRow}>
                  <span className={styles.partNum}>{part.num}</span>
                  <span className={styles.partTitle}>{part.title}</span>
                  <span className={styles.partDesc}>{part.desc}</span>
                  <span className={styles.partAccess}>{part.access}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Speakers ── */}
        <section id="speakers" className={styles.section} style={{ background: 'var(--bg)' }}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <div className={styles.sectionHead}>
              <div>
                <Eyebrow>Speakers</Eyebrow>
                <h2 className={styles.h2}>Who takes the stage</h2>
              </div>
            </div>
            <p className={styles.lede}>
              Heads of state, Nobel laureates, the researchers building frontier systems and the
              people holding them to account.
            </p>
            <div className={styles.speakerGrid}>
              {SPEAKERS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.speaker}
                >
                  <div className={styles.speakerImgWrap}>
                    <img className={styles.speakerImg} src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className={styles.speakerName}>{p.name}</div>
                  <div className={styles.speakerRole}>{p.role}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Exhibition ── */}
        <section id="exhibition" className={styles.section} style={{ background: 'var(--bg-2)' }}>
          <div className={styles.exhibitionGrid}>
            <div className={styles.exhibitionMedia}>
              <img
                className={styles.coverImg}
                src="/img/robot.jpg"
                alt="Attendee interviewing a humanoid robot on the exhibition floor"
                loading="lazy"
              />
            </div>
            <div className={`${styles.exhibitionCopy} ${styles.reveal}`} data-reveal="1">
              <Eyebrow>The exhibition</Eyebrow>
              <h2 className={styles.exhibitionTitle}>Two hundred stands you can actually touch.</h2>
              <p className={styles.exhibitionBody}>
                Humanoid robots, brain-computer interfaces, autonomous systems, quantum
                demonstrations and UN programmes deploying AI in the field. Open to every pass,
                including Discovery.
              </p>
              <div className={styles.exhibitionActions}>
                <Button size="lg" hierarchy="primary" href={LINKS.exhibitors2026}>
                  Discover the 2026 exhibitors
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI for Good band ── */}
        <div id="about" className={styles.dialogue}>
          <div
            className={`${styles.shell} ${styles.dialogueInner} ${styles.reveal}`}
            data-reveal="1"
          >
            <div className={styles.dialogueBody}>
              <h2 className={styles.dialogueTitle}>
                The United Nations’ leading platform on Artificial Intelligence.
              </h2>
              <p className={styles.dialogueSub}>
                AI for Good is <strong>unlocking AI’s potential to serve humanity.</strong>
              </p>
              <p className={styles.dialogueText}>
                AI for Good is organized by ITU in partnership with over 50 UN Sister Agencies and
                co-convened with the Government of Switzerland.
              </p>
            </div>
            <span className={styles.dialogueCta}>
              <Button size="lg" hierarchy="on-band" href={LINKS.about}>
                About us
              </Button>
            </span>
          </div>
        </div>

        {/* ── Past sponsors ── */}
        <section id="sponsors" className={styles.section} style={{ background: 'var(--bg-2)' }}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <Eyebrow>Past sponsors</Eyebrow>
            {SPONSOR_TIERS.map((tier) => (
              <div key={tier.label} className={styles.tier}>
                <span className={styles.tierLabel}>{tier.label}</span>
                <div className={styles.logoGrid}>
                  {tier.logos.map((l) => (
                    <a
                      key={`${tier.label}-${l.name}`}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.logoTile}
                      aria-label={l.name}
                    >
                      <img src={l.src} alt={l.name} loading="lazy" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.sponsorCta}>
              <div className={styles.sponsorCopy}>
                <div className={styles.sponsorTitle}>
                  Put your brand in the room where AI policy and deployment meet.
                </div>
                <div className={styles.sponsorText}>
                  200+ exhibition stands, live demos and the delegations setting the rules.
                </div>
              </div>
              <span className={styles.sponsorBtn}>
                <Button size="lg" hierarchy="primary" href={LINKS.becomeASponsor}>
                  Become a sponsor <Arrow />
                </Button>
              </span>
            </div>
          </div>
        </section>

        {/* ── Newsroom ── */}
        <section id="news" className={styles.section} style={{ background: 'var(--bg)' }}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <div className={styles.sectionHead}>
              <h2 className={styles.h2Bare}>Newsroom</h2>
              <a
                href={LINKS.blog}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.moreLink} ${styles.moreLinkDesktop}`}
              >
                Read all articles <Arrow />
              </a>
            </div>
            <div className={styles.newsGrid}>
              {NEWS.map((n) => (
                <a
                  key={n.title}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsCard}
                >
                  <div className={styles.newsTag}>
                    <span className={styles.newsDot} style={{ background: n.dot }} />
                    {n.tag}
                  </div>
                  <div className={styles.newsTitle}>{n.title}</div>
                  <div className={styles.newsDate}>{n.date}</div>
                </a>
              ))}
            </div>
            <a
              href={LINKS.blog}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileCta}
            >
              Read all articles
            </a>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="voices" className={`${styles.section} ${styles.closing}`}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <div className={styles.sectionHead}>
              <div>
                <Eyebrow>Voices</Eyebrow>
                <h2 className={styles.h2}>What they said on stage</h2>
              </div>
            </div>
            <div className={styles.quoteGrid}>
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className={styles.quote}>
                  <blockquote className={styles.quoteText}>{t.quote}</blockquote>
                  <figcaption className={styles.quoteBy}>
                    <img className={styles.quoteAvatar} src={t.img} alt="" loading="lazy" />
                    <span>
                      <span className={styles.quoteName}>{t.name}</span>
                      {t.role ? <span className={styles.quoteRole}>{t.role}</span> : null}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <div className={styles.footerMark} aria-hidden="true">
            <img src="/img/a-mark.png" alt="" />
          </div>
          <div className={`${styles.shell} ${styles.footerGrid}`}>
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className={styles.footerCol}>
                <span className={styles.footerColTitle}>{col.title}</span>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className={`${styles.shell} ${styles.footerBase}`}>
            <div className={styles.footerBaseInner}>
              <a
                href="https://itu.int/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerItu}
              >
                <img src="/img/itu-logo-white.png" alt="ITU" />
                <span className={styles.footerFine}>© ITU 2026 All Rights Reserved</span>
              </a>
              <div className={styles.footerLegal}>
                {LEGAL_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLegalLink}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <div className={styles.footerSocial}>
                {SOCIALS.map((sn) => (
                  <a
                    key={sn.id}
                    href={sn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerSocialLink}
                    aria-label={sn.label}
                  >
                    <SocialIcon id={sn.id} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* ── Mobile menu ── */}
        <SidePanel
          open={menuOpen}
          onOpenChange={setMenuOpen}
          title="Menu"
          container={portalContainer}
        >
          <nav className={styles.menuLinks} aria-label="Summit sections">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.menuLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </SidePanel>

        {/* ── Toast ── */}
        <Toast message={toast ? `${toast} — not built in this prototype` : null} />
      </div>
    </div>
  )
}
