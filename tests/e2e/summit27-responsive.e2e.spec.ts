import { test, expect, type Page } from '@playwright/test'

const URL = 'http://localhost:3000/summit27'

/** Matches a CSS-module local name; see the note in summit27.e2e.spec.ts. */
const mod = (name: string) => `[class$="__${name}"], [class*="__${name} "]`

/**
 * The widths the layout is claimed to hold at: the narrowest phone still worth
 * supporting, the common handset sizes, both tablet orientations, and the
 * laptop and desktop the composition was drawn for.
 */
const WIDTHS = [320, 390, 430, 640, 768, 1024, 1180, 1440]

/**
 * Reveal-on-scroll leaves sections translated and transparent until they are
 * observed. Measuring geometry before that has run reads the pre-animation
 * transform, so put every section in its final state up front.
 */
async function settle(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.dataset.shown = '1'
      const reveal = [...el.classList].find((c) => c.includes('__reveal'))
      if (reveal) el.classList.add(reveal.replace('__reveal', '__shown'))
    })
  })
  await page.waitForTimeout(250)
}

async function open(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto(URL)
  await settle(page)
}

/** Number of tracks in a resolved `grid-template-columns`. */
function columnCount(page: Page, selector: string) {
  return page
    .locator(selector)
    .first()
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length)
}

test.describe('Summit 2027 — responsive', () => {
  /*
   * The page was authored as a fixed 1280px composition (`.root` carried
   * `min-width: 1280px`), so every width below that scrolled sideways. This is
   * the assertion that keeps it from coming back.
   */
  for (const width of WIDTHS) {
    test(`fits the viewport at ${width}px`, async ({ page }) => {
      await open(page, width)

      const overflow = await page.evaluate(() => {
        const de = document.documentElement
        const vw = de.clientWidth

        /*
         * Decorative layers are deliberately larger than their frame — washes
         * bleed past the edge, the marquee is twice the page wide, parallax
         * images are pre-scaled. Each sits inside a clipping parent, so the
         * page still does not scroll; exempt them by name.
         */
        const exempt =
          /__(heroWash|closingWash|heroGlow|tickerTrack|tickerRun|tickerItem|tickerDot|parallaxImg|heroImg|scrim|highlightScrim|venueScrim)\b/

        /* Anything inside a sideways scroller is allowed past the fold. */
        const inScroller = (el: Element) => {
          for (let n = el.parentElement; n; n = n.parentElement) {
            const ox = getComputedStyle(n).overflowX
            if (ox === 'auto' || ox === 'scroll') return true
          }
          return false
        }

        const past: string[] = []
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el)
          if (cs.display === 'none' || cs.visibility === 'hidden') continue
          const cls = typeof el.className === 'string' ? el.className : ''
          if (exempt.test(cls) || inScroller(el)) continue
          const r = el.getBoundingClientRect()
          if (r.width === 0 && r.height === 0) continue
          if (r.right > vw + 1 || r.left < -1) {
            past.push(`${cls || el.tagName} [${Math.round(r.left)} → ${Math.round(r.right)}]`)
          }
        }
        return { doc: de.scrollWidth - vw, past: past.slice(0, 10) }
      })

      expect(overflow.past, 'elements sitting outside the viewport').toEqual([])
      expect(overflow.doc, 'document scrolls sideways').toBeLessThanOrEqual(0)
    })
  }

  test('the nav trades its link row for a menu below 900px', async ({ page }) => {
    await open(page, 1440)
    await expect(page.locator(mod('navLinks'))).toBeVisible()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden()

    await page.setViewportSize({ width: 390, height: 800 })
    await expect(page.locator(mod('navLinks'))).toBeHidden()

    const toggle = page.getByRole('button', { name: 'Open menu' })
    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.click()
    const menu = page.getByRole('dialog')
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link', { name: 'Programme' })).toBeVisible()
    await expect(menu.getByRole('button', { name: 'Register' })).toBeVisible()

    // Choosing a destination closes the sheet and moves the page to it.
    await menu.getByRole('link', { name: 'Passes' }).click()
    await expect(menu).toHaveCount(0)
    expect(page.url()).toContain('#passes')
    // Radix's scroll lock has to be released, or the page is stuck.
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden')
  })

  test('the menu sheet closes on Escape', async ({ page }) => {
    await open(page, 390)
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
  })

  test('the multi-column grids step down with the viewport', async ({ page }) => {
    await open(page, 1440)
    expect(await columnCount(page, mod('speakerGrid'))).toBe(4)
    expect(await columnCount(page, mod('passGrid'))).toBe(3)
    expect(await columnCount(page, mod('logoGrid'))).toBe(5)
    expect(await columnCount(page, mod('newsGrid'))).toBe(3)
    expect(await columnCount(page, mod('practicalGrid'))).toBe(4)
    expect(await columnCount(page, mod('footerGrid'))).toBe(4)

    await open(page, 1024)
    expect(await columnCount(page, mod('speakerGrid'))).toBe(3)
    expect(await columnCount(page, mod('logoGrid'))).toBe(4)
    expect(await columnCount(page, mod('practicalGrid'))).toBe(2)

    await open(page, 768)
    // Speakers hold three across a tablet; they drop to two at 720.
    expect(await columnCount(page, mod('speakerGrid'))).toBe(3)
    expect(await columnCount(page, mod('passGrid'))).toBe(1)
    // Logos hold four across a tablet; they drop to three at 720.
    expect(await columnCount(page, mod('logoGrid'))).toBe(4)
    // News holds two across a tablet; it drops to one at 720.
    expect(await columnCount(page, mod('newsGrid'))).toBe(2)

    await open(page, 640)
    expect(await columnCount(page, mod('newsGrid'))).toBe(1)
    expect(await columnCount(page, mod('logoGrid'))).toBe(3)

    await open(page, 390)
    expect(await columnCount(page, mod('speakerGrid'))).toBe(2)
    expect(await columnCount(page, mod('logoGrid'))).toBe(2)
    expect(await columnCount(page, mod('practicalGrid'))).toBe(1)
  })

  test('a pass price never breaks across two lines', async ({ page }) => {
    /*
     * "CHF 4,900" beside a struck-through "CHF 5,600" is what sets the minimum
     * usable card width. Three cards narrower than that wrapped the pair, which
     * read as two prices rather than one and a markdown.
     */
    for (const width of [390, 768, 1024, 1100, 1180, 1280, 1440]) {
      await open(page, width)
      const rows = await page.locator(mod('passPriceRow')).evaluateAll((els) =>
        els.map((el) => {
          const price = el.querySelector('[class*="__passPrice"]') as HTMLElement
          return {
            rowHeight: Math.round(el.getBoundingClientRect().height),
            lineHeight: Math.round(price.getBoundingClientRect().height),
          }
        }),
      )
      expect(rows.length, `pass cards at ${width}px`).toBe(3)
      for (const row of rows) {
        expect(row.rowHeight, `price row wrapped at ${width}px`).toBeLessThanOrEqual(
          row.lineHeight + 2,
        )
      }
    }
  })

  test('the hero splits into one column and the photo keeps its frame covered', async ({
    page,
  }) => {
    await open(page, 1440)
    expect(await columnCount(page, mod('heroGrid'))).toBe(2)

    for (const width of [390, 768, 1440]) {
      await open(page, width)
      if (width < 900) expect(await columnCount(page, mod('heroGrid'))).toBe(1)

      /*
       * The photo is sized to 112% and pulled back 6% on each side so the
       * pointer parallax has somewhere to travel. The frontend's global
       * `img { max-width: 100% }` used to clamp it back to 100%, which left it
       * offset with a gap down the right-hand edge of the frame.
       */
      const frame = await page.locator(mod('heroMedia')).boundingBox()
      const img = await page.locator(mod('heroImg')).boundingBox()
      expect(frame, `hero frame at ${width}px`).not.toBeNull()
      expect(img, `hero photo at ${width}px`).not.toBeNull()
      expect(img!.x, `photo left edge at ${width}px`).toBeLessThanOrEqual(frame!.x)
      expect(img!.x + img!.width, `photo right edge at ${width}px`).toBeGreaterThanOrEqual(
        frame!.x + frame!.width,
      )
    }
  })

  test('the session and part rows re-flow instead of squeezing', async ({ page }) => {
    // Five columns on the desktop composition, stacked on a phone.
    await open(page, 1440)
    expect(await columnCount(page, mod('sessionRow'))).toBe(5)
    expect(await columnCount(page, mod('partRow'))).toBe(4)

    await open(page, 390)
    expect(await columnCount(page, mod('sessionRow'))).toBe(2)
    expect(await columnCount(page, mod('partRow'))).toBe(2)

    // Stacked, a row is taller than one line of text — proof it actually wrapped.
    const row = await page.locator(mod('sessionRow')).first().boundingBox()
    expect(row!.height).toBeGreaterThan(80)
  })

  test('the day tabs scroll sideways rather than widening the page', async ({ page }) => {
    await open(page, 390)
    await page.locator('#programme').scrollIntoViewIfNeeded()

    const list = page.getByRole('tablist')
    const box = await list.evaluate((el) => ({
      overflowX: getComputedStyle(el).overflowX,
      scrollable: el.scrollWidth > el.clientWidth,
      width: Math.round(el.getBoundingClientRect().width),
    }))
    expect(box.overflowX).toBe('auto')
    expect(box.scrollable, 'the strip should have somewhere to scroll').toBe(true)
    expect(box.width).toBeLessThanOrEqual(390)

    // All four days stay reachable.
    await expect(page.getByRole('tab')).toHaveCount(4)
    await page.getByRole('tab', { name: /Sat 10 July/ }).click()
    await expect(page.locator(mod('sessionCount'))).toContainText('Sat 10 July')
  })

  test('the speaker sheet goes full width on a phone', async ({ page }) => {
    await open(page, 390)
    await page.locator('#speakers').scrollIntoViewIfNeeded()
    await page.locator(mod('speaker')).first().click()

    const panel = page.getByRole('dialog')
    await expect(panel).toBeVisible()
    /*
     * Edge to edge: a 520px sheet inset from the right wastes a phone screen.
     * Poll rather than read once — the sheet slides in from translateX(40px),
     * so measuring on the first frame catches it mid-animation.
     */
    await expect
      .poll(async () => {
        const box = await panel.boundingBox()
        return box ? Math.round(box.x) : null
      })
      .toBe(0)
    const box = await panel.boundingBox()
    expect(box!.width).toBeCloseTo(390, 1)
  })
})
