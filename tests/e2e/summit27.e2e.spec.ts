import { test, expect, type Page } from '@playwright/test'

const URL = 'http://localhost:3000/summit27'

/**
 * CSS-module class names are hashed as `summit-module__<hash>__<localName>`,
 * so the local name is a stable suffix to match on.
 *
 * Anchor the end of the token, or a plain `*=` match would also catch every
 * class that merely starts with the name — `quote` would pull in `quoteText`,
 * `quoteBy` and the rest. A token ends either at the end of the attribute or
 * at the space before the next class.
 */
const mod = (name: string) => `[class$="__${name}"], [class*="__${name} "]`

/** Collects console errors and page exceptions for the lifetime of the page. */
function watchForErrors(page: Page) {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
  return errors
}

/** True when a computed colour reads as the browser's default link blue. */
function looksBlue(color: string) {
  const [r, g, b] = (color.match(/\d+/g) ?? []).map(Number)
  return b > 150 && b > r + 60 && b > g + 40
}

test.describe('Summit 2027', () => {
  test('renders every section of the design', async ({ page }) => {
    const errors = watchForErrors(page)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    await expect(page).toHaveTitle(/AI for Good Summit 2027/)

    // Hero
    await expect(page.locator('h1')).toContainText('AI for Good')
    await expect(page.locator('h1')).toContainText('Global Summit')
    await expect(page.locator('h1')).toContainText('2027')
    await expect(page.getByText('21–24 June 2027').first()).toBeVisible()
    await expect(page.getByText('Palexpo, Geneva').first()).toBeVisible()
    await expect(page.locator(mod('heroMark')).locator('img')).toBeVisible()

    // Section headings, in document order
    for (const heading of [
      'Explore the 2026 speakers',
      'Two hundred stands you can actually touch.',
      '53 UN Partners',
      '2026 Sponsors',
      'Newsroom',
      'In their words',
    ]) {
      await expect(page.getByRole('heading', { name: heading })).toBeAttached()
    }

    // Anchor targets the nav and footer links point at
    for (const id of [
      'top',
      'speakers',
      'exhibition',
      'un-partners',
      'sponsors',
      'news',
      'voices',
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }

    // Collection counts
    await expect(page.locator(mod('speaker'))).toHaveCount(12)
    await expect(page.locator(mod('tier'))).toHaveCount(9)
    await expect(page.locator(mod('logoTile'))).toHaveCount(59)
    // Duplicated for the seamless marquee loop: 53 real + 53 aria-hidden clones.
    await expect(page.locator(mod('partnerTile'))).toHaveCount(106)
    await expect(page.locator(mod('newsCard'))).toHaveCount(3)
    await expect(page.locator(mod('quote'))).toHaveCount(4)

    // Footer
    await expect(page.getByText(/© 2026 AI for Good/)).toBeAttached()

    expect(errors).toEqual([])
  })

  test('speakers, articles and sponsors link out to aiforgood.itu.int', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    const external = async (locator: ReturnType<Page['locator']>, pattern: RegExp) => {
      await expect(locator).toHaveAttribute('href', pattern)
      await expect(locator).toHaveAttribute('target', '_blank')
      await expect(locator).toHaveAttribute('rel', /noopener/)
    }

    // Every speaker card is a link to that speaker's page.
    const speakers = page.locator(mod('speaker'))
    await external(speakers.first(), /aiforgood\.itu\.int\/speaker\/doreen-bogdan-martin\//)
    await external(speakers.last(), /aiforgood\.itu\.int\/speaker\/avye-couloute\//)
    await expect(speakers.first()).toContainText('Secretary-General, ITU')

    // The three posts, and the blog behind them.
    const posts = page.locator(mod('newsCard'))
    await external(posts.nth(0), /from-bit-flow-to-token-flow/)
    await external(posts.nth(1), /from-plan-to-plate/)
    await external(posts.nth(2), /ai-readiness-hackathon/)
    await expect(posts.nth(0)).toContainText('21 September 2026')
    await external(page.getByRole('link', { name: /Read all articles/ }).first(), /ai-for-good-blog/)

    // Buttons that are really links.
    await external(
      page.getByRole('link', { name: 'Sponsorship opportunities' }).first(),
      /aiforgood\.itu\.int\/sponsor\//,
    )
    await external(
      page.getByRole('link', { name: 'Discover the 2026 exhibitors' }),
      /summit26\/exhibitors\//,
    )
    await external(page.getByRole('link', { name: 'About us' }).first(), /about-ai-for-good\//)
    await external(page.getByRole('link', { name: /Become a sponsor/ }).first(), /aiforgood\.itu\.int\/sponsor\//)

    // Each sponsor tile links to the sponsor; the Co-Convener tile is first within Sponsors.
    const sponsorTiles = page.locator('#sponsors').locator(mod('logoTile'))
    await external(sponsorTiles.first(), /admin\.ch/)
    await expect(sponsorTiles.first()).toHaveAttribute('aria-label', 'Swiss Confederation')

    // UN partner tiles sit in their own section, ahead of Sponsors.
    const unPartnerTiles = page.locator('#un-partners').locator(mod('partnerTile'))
    await external(unPartnerTiles.first(), /unaids\.org/)
    await expect(unPartnerTiles.first()).toHaveAttribute('aria-label', 'UNAIDS')
  })

  /*
   * A button that renders as an <a> is still subject to the UA's link colour,
   * and once was: the labels came out blue. Assert against the whole page
   * rather than one control, so the regression cannot come back elsewhere.
   */
  test('no link or button falls back to the browser link blue', async ({ page }) => {
    for (const scheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: scheme })
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(URL)
      const colours = await page
        .locator('a, button')
        .evaluateAll((els) =>
          els.map((el) => ({
            text: el.textContent?.trim().slice(0, 40) ?? '',
            color: getComputedStyle(el).color,
          })),
        )
      const blue = colours.filter((c) => looksBlue(c.color))
      expect(blue, `${scheme}: controls painted link-blue`).toEqual([])
    }
  })

  /*
   * The theme is one set of light-dark() tokens. It follows the OS by default,
   * and `data-theme` on <html> overrides it either way.
   */
  test('follows the colour scheme and honours a data-theme override', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    const root = page.locator(mod('root'))
    const sponsor = page.getByRole('link', { name: 'Sponsorship opportunities' })

    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto(URL)
    await expect(root).toHaveCSS('background-color', 'rgb(255, 255, 255)')
    await expect(root).toHaveCSS('color', 'rgb(15, 23, 42)')
    // secondary-gray on light: white face, slate hairline.
    await expect(sponsor.first()).toHaveCSS('background-color', 'rgb(255, 255, 255)')
    await expect(sponsor.first()).toHaveCSS('border-color', 'rgb(203, 213, 225)')

    await page.emulateMedia({ colorScheme: 'dark' })
    await expect(root).toHaveCSS('background-color', 'rgb(2, 6, 23)')
    await expect(root).toHaveCSS('color', 'rgb(248, 250, 252)')

    // Forcing light on a dark OS.
    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'light'
    })
    await expect(root).toHaveCSS('background-color', 'rgb(255, 255, 255)')

    // The dark bands keep their colours in both modes.
    const ticker = page.locator(mod('ticker')).first()
    await expect(ticker).toHaveCSS('background-color', 'rgb(2, 6, 23)')
    await expect(page.locator('footer')).toHaveCSS('background-color', 'rgb(10, 10, 10)')
  })

  test('shared Button resolves its theme tokens', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    // primary: brand black with white ink, square corners, the xl height.
    const primary = page.getByRole('button', { name: 'Sign up for updates' })
    await expect(primary).toHaveCSS('background-color', 'rgb(26, 26, 26)')
    await expect(primary).toHaveCSS('color', 'rgb(255, 255, 255)')
    await expect(primary).toHaveCSS('border-radius', '0px')
    await expect(primary).toHaveCSS('height', '48px')

    // The same hierarchy rendered as a link carries the same colours.
    const asLink = page.getByRole('link', { name: 'Discover the 2026 exhibitors' })
    await expect(asLink).toHaveCSS('background-color', 'rgb(26, 26, 26)')
    await expect(asLink).toHaveCSS('color', 'rgb(255, 255, 255)')
  })

  test('nav gains a surface on scroll and the progress bar advances', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    const nav = page.locator(mod('nav')).first()
    const progress = page.locator(mod('navProgress'))

    await expect(nav).not.toHaveClass(/navShrunk/)
    expect(await progress.evaluate((el) => getComputedStyle(el).clipPath)).toContain('100%')

    await page.mouse.wheel(0, 1200)
    await expect(nav).toHaveClass(/navShrunk/)

    /*
     * The bar is written inside a requestAnimationFrame callback, so poll
     * rather than reading once — a single read can land before the frame runs.
     */
    await expect
      .poll(
        async () => {
          const clip = await progress.evaluate((el) => getComputedStyle(el).clipPath)
          return clip.includes('100%')
        },
        { timeout: 5000 },
      )
      .toBe(false)

    await page.mouse.wheel(0, -1200)
    await expect(nav).not.toHaveClass(/navShrunk/)
  })

  test('reveal-on-scroll fires for below-the-fold sections', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    const reveals = page.locator(mod('reveal'))
    const total = await reveals.count()
    expect(total).toBeGreaterThan(4)

    /*
     * Keep advancing the page from inside the poll. The reveals fire from an
     * IntersectionObserver, so a fixed scroll loop followed by one assertion
     * races the observer — especially while the dev server compiles on demand.
     */
    await expect
      .poll(
        async () => {
          await page.mouse.wheel(0, 900)
          return reveals.evaluateAll(
            (els) => els.filter((el) => !(el as HTMLElement).dataset.shown).length,
          )
        },
        { timeout: 30000, intervals: [150] },
      )
      .toBe(0)
  })

  test('the marquee stops entirely under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)
    const track = page.locator(mod('tickerTrack'))
    await expect(track).toHaveCSS('animation-name', 'none')
    // Parked at its start, not raced to the end.
    const x = await track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41)
    expect(x).toBe(0)
  })

  test('the newsletter popup submits without leaving the page', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    // Stub the API route so the test never calls the real Mailchimp integration.
    await page.route('**/api/summit27-newsletter', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }),
    )

    await page.getByRole('button', { name: 'Sign up for updates' }).click()
    const dialog = page.getByRole('dialog', { name: 'Sign up for updates' })
    await expect(dialog).toBeVisible()

    await dialog.getByLabel('Email address').fill('test@example.com')
    await dialog.getByRole('button', { name: 'Sign up' }).click()
    await expect(dialog.getByText('You’re subscribed — thanks!')).toBeVisible()

    expect(page.url()).toBe(URL)
  })

  test('captures the full page in both themes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    for (const scheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: scheme })
      await page.goto(URL)
      for (let i = 0; i < 24; i++) {
        await page.mouse.wheel(0, 700)
        await page.waitForTimeout(60)
      }
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(900)
      await page.screenshot({ path: `test-results/summit-${scheme}-full.png`, fullPage: true })
    }
  })
})
