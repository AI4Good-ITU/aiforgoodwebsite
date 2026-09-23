import { test, expect, type Page } from '@playwright/test'

const URL = 'http://localhost:3000/summit27'

/** Matches a CSS-module local name; see the note in summit27.e2e.spec.ts. */
const mod = (name: string) => `[class$="__${name}"], [class*="__${name} "]`

/**
 * The widths the layout is claimed to hold at: the narrowest phone still worth
 * supporting, the common handset sizes, both tablet orientations, and the
 * laptop and desktop the composition was drawn for.
 */
const WIDTHS = [320, 375, 390, 430, 640, 768, 1024, 1180, 1440]

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
  for (const width of WIDTHS) {
    test(`fits the viewport at ${width}px`, async ({ page }) => {
      await open(page, width)

      const overflow = await page.evaluate(() => {
        const de = document.documentElement
        const vw = de.clientWidth

        /*
         * Decorative layers are deliberately larger than their frame — the
         * hero mark runs off the right edge by design, the wash bleeds, the
         * marquee is twice the page wide. Each sits inside a clipping parent,
         * so the page still does not scroll; exempt them by name.
         */
        const exempt =
          /__(heroWash|heroMark|footerMark|tickerTrack|tickerRun|tickerItem|tickerDot|partnersTrack|partnersRun|partnerTile|coverImg|venueScrim)\b/

        const past: string[] = []
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el)
          if (cs.display === 'none' || cs.visibility === 'hidden') continue
          const cls = typeof el.className === 'string' ? el.className : ''
          if (
            exempt.test(cls) ||
            el.closest(`[class*="__heroMark"], [class*="__footerMark"], [class*="__partnerTile"]`)
          )
            continue
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
    await expect(menu.getByRole('link', { name: 'Speakers' })).toBeVisible()
    await expect(menu.getByRole('link')).toHaveCount(4)

    // Choosing a destination closes the sheet and moves the page to it.
    await menu.getByRole('link', { name: 'Sponsors' }).click()
    await expect(menu).toHaveCount(0)
    expect(page.url()).toContain('#sponsors')
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
    expect(await columnCount(page, mod('themeGrid'))).toBe(5)
    expect(await columnCount(page, mod('logoGrid'))).toBe(5)
    expect(await columnCount(page, mod('newsGrid'))).toBe(3)
    expect(await columnCount(page, mod('quoteGrid'))).toBe(2)
    expect(await columnCount(page, mod('footerGrid'))).toBe(4)
    expect(await columnCount(page, mod('exhibitionGrid'))).toBe(2)

    await open(page, 1024)
    expect(await columnCount(page, mod('speakerGrid'))).toBe(3)
    expect(await columnCount(page, mod('footerGrid'))).toBe(3)

    await open(page, 768)
    // Speakers hold three across a tablet; they drop to two at 720.
    expect(await columnCount(page, mod('speakerGrid'))).toBe(3)
    expect(await columnCount(page, mod('themeGrid'))).toBe(3)
    expect(await columnCount(page, mod('logoGrid'))).toBe(3)
    expect(await columnCount(page, mod('newsGrid'))).toBe(2)
    expect(await columnCount(page, mod('quoteGrid'))).toBe(1)
    expect(await columnCount(page, mod('exhibitionGrid'))).toBe(1)

    await open(page, 390)
    expect(await columnCount(page, mod('speakerGrid'))).toBe(2)
    expect(await columnCount(page, mod('themeGrid'))).toBe(2)
    expect(await columnCount(page, mod('logoGrid'))).toBe(2)
    expect(await columnCount(page, mod('newsGrid'))).toBe(1)
    expect(await columnCount(page, mod('footerGrid'))).toBe(2)
  })

  /*
   * The design pins the mark to the viewport's right edge, not to the content
   * column: at 1440 its glyph sits at x 845–1258 with the canvas running off
   * the page. On a phone it moves behind the copy, still bleeding right.
   */
  test('the hero mark is anchored to the viewport edge, and dropped on a phone', async ({
    page,
  }) => {
    await open(page, 1440)
    const mark = page.locator(mod('heroMark'))
    const img = mark.locator('img')
    const box = await img.boundingBox()
    expect(box!.x + box!.width).toBeGreaterThanOrEqual(1440)
    expect(Math.round(box!.width)).toBe(825)
    expect(Math.round(box!.x)).toBe(617)

    await open(page, 375)
    // It competes with the copy at this width, so the mark is hidden outright.
    await expect(mark).toBeHidden()
  })

  test('the section links become full-width buttons on a phone', async ({ page }) => {
    await open(page, 1440)
    await expect(page.locator(mod('moreLinkDesktop')).first()).toBeVisible()
    await expect(page.locator(mod('mobileCta')).first()).toBeHidden()

    await open(page, 390)
    await expect(page.locator(mod('moreLinkDesktop')).first()).toBeHidden()
    const cta = page.locator(mod('mobileCta')).first()
    await cta.scrollIntoViewIfNeeded()
    await expect(cta).toBeVisible()
    const box = await cta.boundingBox()
    // Edge to edge inside the 16px phone gutter.
    expect(Math.round(box!.x)).toBe(16)
    expect(Math.round(box!.width)).toBe(390 - 32)
  })

  test('sponsor tiers past Youth Zone hide behind "Show more" on a phone only', async ({
    page,
  }) => {
    const networking = page.getByText('Networking partners')
    const showMore = page.getByRole('button', { name: 'Show more' })

    await open(page, 1440)
    await expect(networking).toBeVisible()
    await expect(showMore).toBeHidden()

    await open(page, 390)
    await expect(networking).toBeHidden()
    await showMore.scrollIntoViewIfNeeded()
    await expect(showMore).toBeVisible()

    await showMore.click()
    await expect(networking).toBeVisible()
    await expect(showMore).toBeHidden()
  })

  test('the hero keeps the wider inset the design gives it on a phone', async ({ page }) => {
    await open(page, 375)
    const title = await page.locator('h1').boundingBox()
    const eyebrow = await page.locator(mod('eyebrow')).first().boundingBox()
    // Hero copy sits 32px in; every other section sits 16px in.
    expect(Math.round(title!.x)).toBe(32)
    expect(Math.round(eyebrow!.x)).toBe(16)
  })
})
