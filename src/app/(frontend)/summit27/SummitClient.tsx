'use client'

/*
 * Plain <img> throughout: this layout depends on precise object-fit /
 * object-position / absolute-inset control. The assets are pre-optimised.
 */
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import styles from './summit.module.css'
import { Button, Eyebrow, SidePanel } from '@/components/ui'
import { useReveal, useScrollChrome } from './motion'
import { SocialIcon } from './SocialIcon'
import {
  ACCENT,
  EXHIBITORS_2026,
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  LINKS,
  NAV_LINKS,
  NEWS,
  SPEAKERS,
  SOCIALS,
  SPONSOR_TIERS,
  TESTIMONIALS,
  THEMES,
  TICKER_ITEMS,
  UN_PARTNERS,
  type SponsorTier,
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

/** One pass of the UN partners marquee. */
function PartnerRun({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.partnersRun} aria-hidden={ariaHidden || undefined}>
      {UN_PARTNERS.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.partnerTile}
          aria-label={p.name}
          tabIndex={ariaHidden ? -1 : undefined}
        >
          <img src={p.src} alt={p.name} loading="lazy" />
        </a>
      ))}
    </div>
  )
}

/** One pass of the 2026 exhibitors carousel. */
function ExhibitorRun({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.exhibitorsRun} aria-hidden={ariaHidden || undefined}>
      {EXHIBITORS_2026.map((e) => (
        <a
          key={e.name}
          href={e.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.exhibitorCard}
          tabIndex={ariaHidden ? -1 : undefined}
        >
          <div className={styles.exhibitorImgWrap}>
            <img className={styles.exhibitorImg} src={e.img} alt={e.name} loading="lazy" />
          </div>
          <div className={styles.exhibitorName}>{e.name}</div>
        </a>
      ))}
    </div>
  )
}

/** One sponsor tier's label and logo grid. */
/** Desktop's logo grid is 5 columns wide, so anything past this is a second row. */
const TIER_ROW_SIZE = 5

function SponsorTierRow({ tier }: { tier: SponsorTier }) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = tier.logos.length > TIER_ROW_SIZE

  return (
    <div className={styles.tier}>
      <span className={styles.tierLabel}>{tier.label}</span>
      <div className={`${styles.logoGrid} ${expanded ? styles.logoGridExpanded : ''}`}>
        {tier.logos.map((l) =>
          l.href ? (
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
          ) : (
            <div key={`${tier.label}-${l.name}`} className={styles.logoTile} aria-label={l.name}>
              <img src={l.src} alt={l.name} loading="lazy" />
            </div>
          ),
        )}
      </div>
      {hasMore && (
        <button
          type="button"
          className={styles.tierShowMore}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show less' : 'Show more'} <ChevronDown up={expanded} />
        </button>
      )}
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

/** Points down at rest; the caller rotates it to point up when expanded. */
function ChevronDown({ up = false }: { up?: boolean }) {
  return (
    <svg
      className={styles.chevron}
      style={up ? { transform: 'rotate(180deg)' } : undefined}
      width="14"
      height="8"
      viewBox="0 0 14 8"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 1l6 6 6-6"
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
  /*
   * SidePanel portals into this instead of document.body, so the panel stays
   * inside the themed subtree. Held in state rather than read off the ref
   * during render, which React disallows.
   */
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [newsletterError, setNewsletterError] = useState<string | null>(null)

  const [sponsorsExpanded, setSponsorsExpanded] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const shrunk = useScrollChrome(progressRef)
  useReveal(rootRef, styles.shown)

  useEffect(() => setPortalContainer(rootRef.current), [])

  const toggleTheme = () => themeStore.set(effectiveTheme === 'dark' ? 'light' : 'dark')

  const onNewsletterOpenChange = useCallback((open: boolean) => {
    setNewsletterOpen(open)
    if (!open) {
      setNewsletterStatus('idle')
      setNewsletterError(null)
    }
  }, [])

  const onNewsletterSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '')
    setNewsletterStatus('submitting')
    setNewsletterError(null)
    try {
      const res = await fetch('/api/summit27-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      if (!res.ok) throw new Error(data?.error || 'Could not complete signup.')
      setNewsletterStatus('success')
    } catch (err) {
      setNewsletterStatus('error')
      setNewsletterError(err instanceof Error ? err.message : 'Could not complete signup.')
    }
  }, [])

  /*
   * On a phone the tier list runs long, so only Co-convener through Youth
   * Zone show by default; the rest sit behind "Show more". Desktop ignores
   * this split entirely — see .sponsorExtra's media query.
   */
  const sponsorSplit = SPONSOR_TIERS.findIndex((t) => t.label === 'Youth Zone sponsors') + 1
  const primarySponsorTiers = SPONSOR_TIERS.slice(0, sponsorSplit)
  const extraSponsorTiers = SPONSOR_TIERS.slice(sponsorSplit)

  return (
    <div className={themeClass}>
      <div className={styles.root} ref={rootRef}>
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
                <span className={styles.heroDate}>21–24 June 2027</span>
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
              <h3 className={styles.heroSubhead}>
                The United Nations&rsquo; leading platform on Artificial Intelligence.
              </h3>
              <p className={styles.heroLede}>
                AI for Good is unlocking AI&rsquo;s potential to serve humanity.
              </p>
              <p className={styles.heroBody}>
                AI for Good is organized by ITU in partnership with over 50 UN partners and
                co-convened with the Government of Switzerland.
              </p>
              <div className={styles.heroButtons}>
                <Button size="xl" hierarchy="primary" onClick={() => setNewsletterOpen(true)}>
                  Sign up for updates
                </Button>
                <Button size="xl" hierarchy="secondary-gray" href={LINKS.becomeASponsor}>
                  Sponsorship opportunities
                </Button>
              </div>
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

        {/* ── Speakers ── */}
        <section id="speakers" className={styles.section} style={{ background: 'var(--bg)' }}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <div className={styles.sectionHead}>
              <div>
                <Eyebrow>Speakers</Eyebrow>
                <h2 className={styles.h2}>Explore the 2026 speakers</h2>
              </div>
            </div>
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

        {/* ── UN partners ── */}
        <section id="un-partners" className={styles.section} style={{ background: 'var(--bg-2)' }}>
          <div className={`${styles.shell} ${styles.partnersHead} ${styles.reveal}`} data-reveal="1">
            <Eyebrow>Partners</Eyebrow>
            <h2 className={styles.h2}>53 UN Partners</h2>
          </div>
          <div className={styles.partnersViewport}>
            <div className={styles.partnersTrack}>
              <PartnerRun />
              <PartnerRun ariaHidden />
            </div>
          </div>
        </section>

        {/* ── Topics ── */}
        <section id="topics" className={styles.section} style={{ background: 'var(--bg)' }}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <Eyebrow>Programme</Eyebrow>
            <h2 className={styles.h2}>Discover the 2026 Summit themes</h2>
            <div className={styles.themeGrid}>
              {THEMES.map((t) => (
                <div key={t.title} className={styles.themeTile}>
                  <div className={styles.themeImgWrap}>
                    <img className={styles.themeImg} src={t.img} alt="" loading="lazy" />
                    <div className={styles.themeTitle}>{t.title}</div>
                  </div>
                </div>
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
              <h2 className={styles.exhibitionTitle}>
                Explore AI innovations with real world impact
              </h2>
              <p className={styles.exhibitionBody}>
                See cutting-edge AI demos and experience the latest innovations firsthand.
              </p>
              <div className={styles.exhibitionActions}>
                <Button size="lg" hierarchy="primary" href={LINKS.exhibitors2026}>
                  Discover the 2026 exhibitors
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2026 Exhibitors ── */}
        <section id="exhibitors-2026" className={styles.section} style={{ background: 'var(--bg)' }}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <div className={styles.sectionHead}>
              <div>
                <h2 className={styles.h2}>Discover the 2026 exhibitors</h2>
                <p className={styles.lede}>
                  Get ready to be inspired with our exciting range of exhibitors showcasing the
                  latest AI breakthroughs and innovative solutions.
                </p>
              </div>
              <span className={styles.exhibitorsBtnDesktop}>
                <Button size="lg" hierarchy="primary" href={LINKS.exhibitors2026}>
                  View all exhibitors
                </Button>
              </span>
            </div>
            <div className={styles.exhibitorsViewport}>
              <div className={styles.exhibitorsTrack}>
                <ExhibitorRun />
                <ExhibitorRun ariaHidden />
              </div>
            </div>
            <a
              href={LINKS.exhibitors2026}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileCta}
            >
              View all exhibitors
            </a>
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
                <h2 className={styles.h2}>In their words</h2>
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

        {/* ── Sponsors ── */}
        <section id="sponsors" className={styles.section} style={{ background: 'var(--bg-2)' }}>
          <div className={`${styles.shell} ${styles.sectionPad} ${styles.reveal}`} data-reveal="1">
            <div className={styles.sectionHead}>
              <div>
                <h2 className={styles.h2}>2026 Sponsors</h2>
                <p className={styles.lede}>
                  Want to help shape the future of AI for Good? Join early to secure the best
                  slots. Now available, our 2027 Sponsorship &amp; Exhibition Brochure!
                </p>
              </div>
              <span className={styles.sponsorBtn}>
                <Button size="lg" hierarchy="primary" href={LINKS.becomeASponsor}>
                  Become a sponsor <Arrow />
                </Button>
              </span>
            </div>
            {primarySponsorTiers.map((tier) => (
              <SponsorTierRow key={tier.label} tier={tier} />
            ))}
            {extraSponsorTiers.length > 0 && (
              <>
                <div
                  className={`${styles.sponsorExtra} ${sponsorsExpanded ? styles.sponsorExtraShown : ''}`}
                >
                  {extraSponsorTiers.map((tier) => (
                    <SponsorTierRow key={tier.label} tier={tier} />
                  ))}
                </div>
                {!sponsorsExpanded && (
                  <button
                    type="button"
                    className={styles.sponsorShowMore}
                    onClick={() => setSponsorsExpanded(true)}
                  >
                    Show more
                  </button>
                )}
              </>
            )}
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

        {/* ── Newsletter signup ── */}
        <SidePanel
          open={newsletterOpen}
          onOpenChange={onNewsletterOpenChange}
          title="Sign up for updates"
          subtitle="Get the news and pass alerts for Summit 2027, straight to your inbox."
          container={portalContainer}
        >
          {newsletterStatus === 'success' ? (
            <p className={styles.newsletterNote}>You&rsquo;re subscribed — thanks!</p>
          ) : (
            <form className={styles.newsletterForm} onSubmit={onNewsletterSubmit}>
              <label className={styles.newsletterLabel} htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={styles.newsletterInput}
                disabled={newsletterStatus === 'submitting'}
              />
              {newsletterError ? (
                <p className={`${styles.newsletterNote} ${styles.newsletterNoteError}`}>
                  {newsletterError}
                </p>
              ) : null}
              <Button
                type="submit"
                size="lg"
                hierarchy="primary"
                fullWidth
                disabled={newsletterStatus === 'submitting'}
              >
                {newsletterStatus === 'submitting' ? 'Signing up…' : 'Sign up'}
              </Button>
            </form>
          )}
        </SidePanel>
      </div>
    </div>
  )
}
