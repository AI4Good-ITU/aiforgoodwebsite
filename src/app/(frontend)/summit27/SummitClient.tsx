'use client'

/*
 * Plain <img> throughout: this layout depends on precise object-fit /
 * object-position / absolute-inset control and on writing `transform` straight
 * to the node for the parallax and hero-pointer effects. The assets are
 * pre-optimised (47MB of camera originals down to 1.9MB).
 */
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useRef, useState } from 'react'

import styles from './summit.module.css'
import {
  Badge,
  Button,
  ChipGroup,
  Eyebrow,
  SegmentedControl,
  SidePanel,
  Tabs,
  Toast,
} from '@/components/ui'
import { useHeroPointer, useReveal, useScrollChrome } from './motion'
import {
  DAYS,
  HIGHLIGHTS,
  LOGOS,
  MEDIA_LOGOS,
  NAV_LINKS,
  NEWS,
  PARTS,
  PASSES,
  PRACTICAL,
  SESSIONS,
  SPEAKERS,
  SPECTRUM,
  STATS,
  TICKER_ITEMS,
  TRACKS,
  TRACK_BADGE,
} from './data'

/** Alternating spectrum dots between ticker items. */
function TickerRun({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.tickerRun} aria-hidden={ariaHidden || undefined}>
      {TICKER_ITEMS.map((item, i) => (
        <React.Fragment key={item}>
          <span className={styles.tickerItem}>{item}</span>
          <span className={styles.tickerDot} style={{ color: i % 2 === 0 ? '#22D3EE' : '#7B5CFA' }}>
            ●
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

export default function SummitClient() {
  const [day, setDay] = useState(0)
  const [track, setTrack] = useState<string>('All')
  const [speakerIndex, setSpeakerIndex] = useState<number | null>(null)
  const [early, setEarly] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  /*
   * SidePanel portals into this instead of document.body, so the panel stays
   * inside the themed subtree. Held in state rather than read off the ref
   * during render, which React disallows.
   */
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const shrunk = useScrollChrome(progressRef)
  useReveal(rootRef, styles.shown)
  useHeroPointer(heroRef, glowRef, heroImgRef, heroTextRef)

  /*
   * Each day is its own tab panel, so filtering is per-day rather than
   * derived from the active day. Radix mounts only the selected panel.
   */
  const sessionsFor = useCallback(
    (dayIndex: number) => SESSIONS[dayIndex].filter((s) => track === 'All' || s.track === track),
    [track],
  )

  const countLabel = (dayIndex: number) => {
    const shown = sessionsFor(dayIndex).length
    const total = SESSIONS[dayIndex].length
    const suffix = track === 'All' ? '' : ` · ${track}`
    return `${shown} of ${total} sessions on ${DAYS[dayIndex].label}${suffix}`
  }

  const activeSpeaker = speakerIndex === null ? null : SPEAKERS[speakerIndex]

  // Escape, focus trap and focus restore are handled by SidePanel's Radix Dialog.

  useEffect(() => setPortalContainer(rootRef.current), [])

  useEffect(() => () => void (toastTimer.current && clearTimeout(toastTimer.current)), [])

  /*
   * Every destination marked data-page is out of scope for this page, so
   * intercept the click and say so rather than navigating nowhere.
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
    <div className={styles.root} ref={rootRef} onClick={onRootClick}>
      {/* ── Nav ── */}
      <div className={`${styles.nav} ${shrunk ? styles.navShrunk : ''}`}>
        <div className={`${styles.shell} ${styles.navInner}`}>
          <a href="#top" className={styles.navBrand}>
            <span className={styles.navLogo}>
              <img src="/img/logo-white.png" alt="AI for Good" />
            </span>
          </a>
          <div className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
            <span className={styles.glowNav} data-page="Registration">
              <Button size="md" hierarchy="primary">
                Register
              </Button>
            </span>
          </div>
        </div>
        <div className={styles.navRule} />
        <div
          ref={progressRef}
          className={styles.navProgress}
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        />
      </div>

      {/* ── Hero ── */}
      <section id="top" ref={heroRef} className={styles.hero}>
        <div className={styles.heroWash} />
        <div ref={glowRef} className={styles.heroGlow} />
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div ref={heroTextRef} className={styles.heroText}>
            <div>
              <div className={styles.heroMeta}>
                <span className={styles.heroDate}>7–10 July 2027</span>
                <span className={styles.heroMetaRule} />
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
            </div>
            <div className={styles.heroActions}>
              <div className={styles.heroButtons}>
                <span className={styles.glowHero} data-page="Pass waitlist">
                  <Button size="xl" hierarchy="primary">
                    Get first access to passes
                  </Button>
                </span>
                <span data-page="Sponsor &amp; exhibit">
                  <Button size="xl" hierarchy="secondary-gray">
                    Sponsor &amp; exhibit
                  </Button>
                </span>
              </div>
              <p className={styles.heroFoot}>
                Organized by ITU in partnership with over 50 UN sister agencies and co-convened with
                the Government of Switzerland.
              </p>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <img
              ref={heroImgRef}
              className={styles.heroImg}
              src="/img/dancer.jpg"
              alt="Dancer performing in front of generative visuals on the summit stage"
            />
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

      {/* ── Stats ── */}
      <div style={{ background: 'var(--bg)' }}>
        <div className={`${styles.shell} ${styles.stats} ${styles.reveal}`} data-reveal="1">
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.statRule} />
              <div className={styles.statNum} data-count={stat.count} data-suffix={stat.suffix}>
                {stat.count.toLocaleString('en-US')}
                {stat.suffix}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Six parts ── */}
      <section id="week" className={styles.section} style={{ background: 'var(--bg-2)' }}>
        <div
          className={`${styles.sectionPad} ${styles.reveal}`}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto' }}
        >
          <div className={styles.sectionHead} style={{ marginBottom: 44 }}>
            <div>
              <Eyebrow>The week</Eyebrow>
              <h2 className={styles.h2}>Six parts, one hall.</h2>
            </div>
            <a href="#programme" className={styles.moreLink}>
              Jump to the schedule →
            </a>
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
            <div className={styles.partsEnd} />
          </div>
        </div>
      </section>

      {/* ── Programme ── */}
      <section id="programme" className={styles.section} style={{ background: 'var(--bg)' }}>
        <div
          className={`${styles.sectionPad} ${styles.reveal}`}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto' }}
        >
          <div className={styles.sectionHead} style={{ marginBottom: 36 }}>
            <div>
              <Eyebrow>Programme</Eyebrow>
              <h2 className={styles.h2}>
                Four days, three stages,
                <br />
                one agenda.
              </h2>
            </div>
            <a href="#programme" data-page="Full programme" className={styles.moreLink}>
              Full programme →
            </a>
          </div>

          <Tabs.Root value={String(day)} onValueChange={(v) => setDay(Number(v))}>
            <Tabs.List label="Programme day">
              {DAYS.map((d, i) => (
                <Tabs.Trigger key={d.label} value={String(i)} label={d.label} sub={d.sub} />
              ))}
            </Tabs.List>

            {/* Sits between the strip and the panels: a control over the
                panel's contents rather than part of either. */}
            <div className={styles.trackRow}>
              <ChipGroup value={track} onValueChange={setTrack} options={TRACKS} label="Track" />
            </div>

            {DAYS.map((d, i) => (
              <Tabs.Content key={d.label} value={String(i)} className={styles.sessions}>
                {sessionsFor(i).map((s) => (
                  <div key={`${s.time}-${s.title}`} className={styles.sessionRow}>
                    <span className={styles.sessionTime}>{s.time}</span>
                    <span className={styles.sessionTitle}>{s.title}</span>
                    <span className={styles.sessionWho}>{s.who}</span>
                    <span className={styles.sessionStage}>{s.stage}</span>
                    <span className={styles.sessionBadge}>
                      <Badge color={TRACK_BADGE[s.track] ?? 'gray'}>{s.track}</Badge>
                    </span>
                  </div>
                ))}
                <div className={styles.sessionFoot}>
                  <span className={styles.sessionCount}>{countLabel(i)}</span>
                  <a
                    href="#programme"
                    data-page="Session archive"
                    className={styles.sessionArchive}
                  >
                    Browse all 300+ sessions →
                  </a>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </section>

      {/* ── Speakers ── */}
      <section id="speakers" className={styles.section} style={{ background: 'var(--bg-2)' }}>
        <div
          className={`${styles.sectionPad} ${styles.reveal}`}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto' }}
        >
          <div className={styles.sectionHead} style={{ marginBottom: 14 }}>
            <div>
              <Eyebrow>Speakers</Eyebrow>
              <h2 className={styles.h2}>Who takes the stage</h2>
            </div>
            <a href="#speakers" data-page="Speaker index" className={styles.moreLink}>
              All speakers →
            </a>
          </div>
          <p className={styles.lede}>
            Heads of state, Nobel and Turing laureates, the researchers building frontier systems
            and the people holding them to account. Select anyone to read their sessions.
          </p>
          <div className={styles.speakerGrid}>
            {SPEAKERS.map((p, i) => {
              const hue = SPECTRUM[i % SPECTRUM.length]
              return (
                <button
                  key={p.name}
                  type="button"
                  className={styles.speaker}
                  onClick={() => setSpeakerIndex(i)}
                  aria-label={`${p.name} — ${p.role}`}
                >
                  <div
                    className={styles.speakerFrame}
                    style={
                      {
                        '--sp-shadow': `0 8px 22px -12px ${hue}55`,
                        '--sp-shadow-hover': `0 18px 44px -12px ${hue}70`,
                      } as React.CSSProperties
                    }
                  >
                    <div className={styles.speakerImgWrap}>
                      <img className={styles.speakerImg} src={p.img} alt={p.name} loading="lazy" />
                    </div>
                  </div>
                  <div className={styles.speakerName}>{p.name}</div>
                  <div className={styles.speakerRole}>{p.role}</div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Exhibition ── */}
      <section id="exhibition" className={styles.section} style={{ background: 'var(--bg)' }}>
        <div className={styles.exhibitionGrid}>
          <div className={styles.exhibitionMedia}>
            <img
              className={styles.parallaxImg}
              data-parallax="0.14"
              src="/img/robot.jpg"
              alt="Attendee interviewing a humanoid robot on the exhibition floor"
              loading="lazy"
            />
          </div>
          <div className={`${styles.exhibitionCopy} ${styles.reveal}`} data-reveal="1">
            <Eyebrow>The exhibition</Eyebrow>
            <h2 className={styles.exhibitionTitle}>Two hundred stands you can actually touch.</h2>
            <p className={styles.exhibitionBody}>
              Humanoid robots, brain-computer interfaces, autonomous systems, quantum demonstrations
              and UN programmes deploying AI in the field. Open to every pass, including Discovery.
            </p>
            <div className={styles.exhibitionActions}>
              <span data-page="Exhibitor directory">
                <Button size="lg" hierarchy="secondary-gray">
                  See exhibitors
                </Button>
              </span>
              <span data-page="Exhibit in 2027">
                <Button size="lg" hierarchy="link-gray">
                  Exhibit in 2027 →
                </Button>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <div className={`${styles.highlights} ${styles.reveal}`} data-reveal="1">
        {HIGHLIGHTS.map((h) => (
          <div key={h.title} className={styles.highlight}>
            <img
              className={styles.parallaxImg}
              data-parallax="0.12"
              src={h.img}
              alt={h.title}
              loading="lazy"
            />
            <div className={styles.highlightScrim} />
            <div className={styles.highlightCopy}>
              <div className={styles.highlightHead}>
                <span
                  className={styles.highlightDot}
                  style={{
                    background: h.color,
                    boxShadow: `0 0 12px ${h.color}, 0 0 24px ${h.color}66`,
                  }}
                />
                <span className={styles.highlightTitle}>{h.title}</span>
              </div>
              <div className={styles.highlightDesc}>{h.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Passes ── */}
      <section id="passes" className={styles.section} style={{ background: 'var(--bg-2)' }}>
        <div
          className={`${styles.sectionPad} ${styles.reveal}`}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto' }}
        >
          <div className={styles.sectionHead} style={{ marginBottom: 14 }}>
            <div>
              <Eyebrow>Passes</Eyebrow>
              <h2 className={styles.h2}>Choose your pass</h2>
            </div>
            <SegmentedControl
              label="Pricing tier"
              value={early ? 'early' : 'standard'}
              onValueChange={(v) => setEarly(v === 'early')}
              options={[
                { value: 'early', label: 'Early access' },
                { value: 'standard', label: 'Standard' },
              ]}
            />
          </div>
          <p className={styles.lede}>
            One entry point for the exhibition, one for the full summit, one for the room where the
            deals happen. Prices are provisional, carried over from 2026.
          </p>
          <div className={styles.passGrid}>
            {PASSES.map((p) => (
              <div
                key={p.name}
                className={`${styles.passCard} ${p.primary ? styles.passCardPrimary : ''}`}
                style={
                  {
                    '--accent-border': `${p.accent}80`,
                    '--accent-shadow': `${p.accent}70`,
                  } as React.CSSProperties
                }
              >
                <div
                  className={styles.passBar}
                  style={{
                    background: p.primary ? 'linear-gradient(90deg,#F5B93D,#FFD874)' : p.accent,
                  }}
                />
                <div className={styles.passHead}>
                  <span className={styles.passName}>{p.name}</span>
                  {p.tag ? (
                    <span
                      className={styles.passTag}
                      style={{ background: `${p.accent}24`, color: p.accent }}
                    >
                      {p.tag}
                    </span>
                  ) : null}
                </div>
                <div className={styles.passPriceRow}>
                  <span className={styles.passPrice}>{early ? p.early : p.standard}</span>
                  {early ? <span className={styles.passWas}>{p.standard}</span> : null}
                </div>
                <div className={styles.passNote}>
                  {early ? 'Early access rate, until 31 March 2027' : 'Standard rate'}
                </div>
                <div className={styles.passFeatures}>
                  {p.features.map((f) => (
                    <span key={f} className={styles.passFeature}>
                      {f}
                    </span>
                  ))}
                </div>
                <div
                  className={`${styles.passCta} ${styles.glowPass}`}
                  data-page="Registration"
                  style={{ '--glow-accent': `${p.accent}80` } as React.CSSProperties}
                >
                  <Button size="lg" hierarchy="primary" fullWidth>
                    {p.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.passFoot}>
            <span className={styles.passFootItem}>
              <strong>Virtual pass</strong> — free, Centre Stage streamed live
            </span>
            <span className={styles.passFootItem}>
              <strong>Students</strong> — 50% off every tier
            </span>
            <span className={styles.passFootItem}>
              <strong>Under 18</strong> — free Discovery pass
            </span>
            <a href="#passes" data-page="Group bookings" className={styles.passFootLink}>
              Group bookings →
            </a>
          </div>
        </div>
      </section>

      {/* ── Global Dialogue ── */}
      <div className={styles.dialogue}>
        <div
          className={`${styles.dialogueInner} ${styles.reveal}`}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto' }}
        >
          <div className={styles.dialogueDates}>
            <div className={styles.dialogueDay}>6–7</div>
            <div className={styles.dialogueMonth}>July</div>
          </div>
          <div className={styles.dialogueBody}>
            <h3 className={styles.dialogueTitle}>
              The UN Global Dialogue on AI Governance runs back to back with the Summit.
            </h3>
            <p className={styles.dialogueText}>
              Established under UN General Assembly resolution A/79/L.118 and supported by ITU.
              Delegates can attend both on a single trip to Geneva.
            </p>
          </div>
          <a href="#top" data-page="Global Dialogue brief" className={styles.dialogueCta}>
            Read the brief →
          </a>
        </div>
      </div>

      {/* ── Geneva ── */}
      <section id="geneva" className={styles.section} style={{ background: 'var(--bg)' }}>
        <div
          className={styles.reveal}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto', padding: '88px 48px 40px' }}
        >
          <Eyebrow>Practical</Eyebrow>
          <div className={styles.sectionHead} style={{ margin: '16px 0 40px' }}>
            <h2 className={styles.h2} style={{ margin: 0 }}>
              Getting to Geneva
            </h2>
            <a href="#geneva" data-page="Practical information" className={styles.moreLink}>
              Travel &amp; visas →
            </a>
          </div>
          <div className={styles.practicalGrid}>
            {PRACTICAL.map((item) => (
              <div key={item.num} className={styles.practical}>
                <div className={styles.practicalNum}>{item.num}</div>
                <div className={styles.practicalTitle}>{item.title}</div>
                <div className={styles.practicalDesc}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={styles.reveal}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto', padding: '40px 48px 96px' }}
        >
          <div className={styles.venue}>
            <img
              className={styles.parallaxImg}
              data-parallax="0.1"
              src="/img/hall-rainbow.jpg"
              alt="The main hall at Palexpo lit for the opening ceremony"
              loading="lazy"
            />
            <div className={styles.venueScrim} />
            <div className={styles.venueCopy}>
              <div>
                <div className={styles.venueName}>Palexpo, Halls 1–4</div>
                <div className={styles.venueAddress}>
                  Route François-Peyrot 30, 1218 Le Grand-Saconnex
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Route+Fran%C3%A7ois-Peyrot+30%2C+1218+Le+Grand-Saconnex"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.venueLink}
              >
                Get directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section id="partners" className={styles.section} style={{ background: 'var(--bg-2)' }}>
        <div
          className={styles.reveal}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto', padding: '80px 48px' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}
          >
            <Eyebrow>Partners &amp; sponsors</Eyebrow>
            <a href="#partners" data-page="Sponsorship brochure" className={styles.moreLink}>
              Sponsorship brochure →
            </a>
          </div>
          <div className={styles.logoGrid}>
            {LOGOS.map((l) => (
              <div key={l.name} className={styles.logoTile}>
                <img src={l.src} alt={l.name} loading="lazy" />
              </div>
            ))}
          </div>
          <div className={styles.mediaBlock}>
            <Eyebrow>Media partners</Eyebrow>
            <div className={styles.logoGrid} style={{ marginTop: 20 }}>
              {MEDIA_LOGOS.map((l) => (
                <div key={l.name} className={`${styles.logoTile} ${styles.logoTileSm}`}>
                  <img src={l.src} alt={l.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsroom ── */}
      <section id="news" className={styles.section} style={{ background: 'var(--bg)' }}>
        <div
          className={`${styles.sectionPad} ${styles.reveal}`}
          data-reveal="1"
          style={{ maxWidth: 1360, margin: '0 auto' }}
        >
          <div className={styles.sectionHead} style={{ marginBottom: 36 }}>
            <h2 className={styles.h2} style={{ margin: 0 }}>
              Newsroom
            </h2>
            <a href="#news" data-page="Newsroom" className={styles.moreLink}>
              All articles →
            </a>
          </div>
          <div className={styles.newsGrid}>
            {NEWS.map((n) => (
              <a key={n.title} href="#news" data-page={n.page} className={styles.newsCard}>
                <div className={styles.newsTag}>
                  <span
                    className={styles.newsDot}
                    style={{ background: n.dot, boxShadow: `0 0 8px ${n.dot}99` }}
                  />
                  {n.tag}
                </div>
                <div className={styles.newsTitle}>{n.title}</div>
                <div className={styles.newsDate}>{n.date}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <div className={styles.closing}>
        <div className={styles.closingWash} />
        <div className={styles.closingInner} style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div>
            <h2 className={styles.closingTitle}>Geneva, 7–10 July 2027.</h2>
            <p className={styles.closingText}>
              Passes open in the new year. Waitlist members get 48 hours’ head start.
            </p>
          </div>
          <a href="#top" data-page="Pass waitlist" className={styles.closingCta}>
            Join the pass waitlist <span style={{ fontSize: 17 }}>→</span>
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid} style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div>
            <img className={styles.footerLogo} src="/img/logo-white.png" alt="AI for Good" />
            <p className={styles.footerAbout}>
              The United Nations’ leading platform on AI. Organized by ITU in partnership with over
              50 UN sister agencies and co-convened with the Government of Switzerland.
            </p>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Summit</span>
            <a href="#programme" className={styles.footerLink}>
              Programme
            </a>
            <a href="#speakers" className={styles.footerLink}>
              Speakers
            </a>
            <a href="#exhibition" className={styles.footerLink}>
              Exhibition
            </a>
            <a href="#passes" className={styles.footerLink}>
              Passes
            </a>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Take part</span>
            <a href="#top" data-page="Speaker application" className={styles.footerLink}>
              Apply to speak
            </a>
            <a href="#top" data-page="Exhibit in 2027" className={styles.footerLink}>
              Exhibit
            </a>
            <a href="#top" data-page="Sponsorship brochure" className={styles.footerLink}>
              Sponsor
            </a>
            <a href="#top" data-page="Press accreditation" className={styles.footerLink}>
              Press accreditation
            </a>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>About</span>
            <a href="#top" data-page="About AI for Good" className={styles.footerLink}>
              The platform
            </a>
            <a href="#news" className={styles.footerLink}>
              Newsroom
            </a>
            <a href="#top" data-page="Contact" className={styles.footerLink}>
              Contact
            </a>
            <a href="#top" data-page="Privacy" className={styles.footerLink}>
              Privacy
            </a>
          </div>
        </div>
        <div className={styles.footerBase} style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div className={styles.footerBaseInner}>
            <span className={styles.footerFine}>© 2026 International Telecommunication Union</span>
            <span className={styles.footerFine}>
              Prototype — Blend direction, homepage only. Dates and prices provisional.
            </span>
          </div>
        </div>
      </footer>

      {/* ── Speaker panel ── */}
      <SidePanel
        open={activeSpeaker !== null}
        onOpenChange={(next) => {
          if (!next) setSpeakerIndex(null)
        }}
        title={activeSpeaker?.name ?? ''}
        subtitle={activeSpeaker?.role}
        image={activeSpeaker ? { src: activeSpeaker.img, alt: activeSpeaker.name } : undefined}
        container={portalContainer}
      >
        {activeSpeaker ? (
          <>
            <p className={styles.panelBio}>{activeSpeaker.bio}</p>
            <div className={styles.panelSessions}>
              <span className={styles.panelSectionTitle}>Sessions</span>
              <div className={styles.panelSessionList}>
                {activeSpeaker.sessions.map((s) => (
                  <div key={s.title} className={styles.panelSession}>
                    <span className={styles.panelSessionWhen}>{s.when}</span>
                    <span className={styles.panelSessionTitle}>{s.title}</span>
                    <span className={styles.panelSessionStage}>{s.stage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.panelCta} data-page="Speaker profile">
              <Button size="lg" hierarchy="primary" fullWidth>
                Full profile
              </Button>
            </div>
          </>
        ) : null}
      </SidePanel>

      {/* ── Toast ── */}
      <Toast message={toast ? `${toast} — not built in this prototype` : null} />
    </div>
  )
}
