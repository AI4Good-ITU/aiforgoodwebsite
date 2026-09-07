import { test, expect, type Page } from '@playwright/test'

const URL = 'http://localhost:3000/summit27'

/**
 * CSS-module class names are hashed as `summit-module__<hash>__<localName>`,
 * so the local name is a stable suffix to match on.
 *
 * Anchor the end of the token, or a plain `*=` match would also catch every
 * class that merely starts with the name — `highlight` would pull in
 * `highlightScrim`, `highlightDot` and the rest. A token ends either at the
 * end of the attribute or at the space before the next class.
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

test.describe('Summit 2027 (Blend)', () => {
  test('renders every section of the design', async ({ page }) => {
    const errors = watchForErrors(page)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    await expect(page).toHaveTitle(/AI for Good Global Summit 2027/)

    // Hero
    await expect(page.locator('h1')).toContainText('AI for Good')
    await expect(page.locator('h1')).toContainText('Global Summit')
    await expect(page.locator('h1')).toContainText('2027')
    await expect(page.getByText('7–10 July 2027').first()).toBeVisible()
    await expect(page.getByText('Palexpo, Geneva').first()).toBeVisible()
    await expect(page.locator(mod('heroImg'))).toBeVisible()

    // Section headings, in document order
    for (const heading of [
      'Six parts, one hall.',
      'Who takes the stage',
      'Two hundred stands you can actually touch.',
      'Choose your pass',
      'Getting to Geneva',
      'Newsroom',
    ]) {
      await expect(page.getByRole('heading', { name: heading })).toBeAttached()
    }
    await expect(page.getByRole('heading', { name: /Four days, three stages/ })).toBeAttached()

    // Anchor targets the nav links point at
    for (const id of [
      'top',
      'week',
      'programme',
      'speakers',
      'exhibition',
      'passes',
      'geneva',
      'partners',
      'news',
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }

    // Collection counts
    await expect(page.locator(mod('partRow'))).toHaveCount(6)
    await expect(page.locator(mod('speaker'))).toHaveCount(8)
    await expect(page.locator(mod('passCard'))).toHaveCount(3)
    await expect(page.locator(mod('logoTile'))).toHaveCount(13)
    await expect(page.locator(mod('newsCard'))).toHaveCount(3)
    await expect(page.locator(mod('highlight'))).toHaveCount(3)
    await expect(page.locator(mod('practical'))).toHaveCount(4)

    // Closing CTA + footer
    await expect(page.getByRole('heading', { name: 'Geneva, 7–10 July 2027.' })).toBeAttached()
    await expect(page.getByText(/© 2026 International Telecommunication Union/)).toBeAttached()

    expect(errors).toEqual([])
  })

  test('stats count up to their final values', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)
    const stats = page.locator(mod('statNum'))
    await expect(stats.nth(0)).toHaveText('1,000+', { timeout: 5000 })
    await expect(stats.nth(1)).toHaveText('200+')
    await expect(stats.nth(2)).toHaveText('50+')
  })

  test('programme filters by day and by track', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)
    await page.locator('#programme').scrollIntoViewIfNeeded()

    const rows = page.locator(mod('sessionRow'))
    const count = page.locator(mod('sessionCount'))

    // Day 1 (default): 6 sessions
    await expect(rows).toHaveCount(6)
    await expect(count).toHaveText('6 of 6 sessions on Wed 7 July')
    await expect(page.getByText('Opening ceremony: the state of AI in 2027')).toBeVisible()

    // Switching day swaps the session list
    await page.getByRole('tab', { name: /Sat 10 July/ }).click()
    await expect(rows).toHaveCount(5)
    await expect(count).toHaveText('5 of 5 sessions on Sat 10 July')
    await expect(page.getByText('Safety research in the open')).toBeVisible()
    await expect(page.getByText('Opening ceremony: the state of AI in 2027')).toHaveCount(0)

    // Track chip narrows within the day, and the count reflects both
    await page.getByRole('radio', { name: 'Keynote', exact: true }).click()
    await expect(rows).toHaveCount(2)
    await expect(count).toHaveText('2 of 5 sessions on Sat 10 July · Keynote')

    // Back to All restores the day's full list
    await page.getByRole('radio', { name: 'All', exact: true }).click()
    await expect(rows).toHaveCount(5)
  })

  test('speaker panel opens with bio and sessions, and closes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)
    await page.locator('#speakers').scrollIntoViewIfNeeded()

    const panel = page.getByRole('dialog')
    await expect(panel).toHaveCount(0)

    await page.locator(mod('speaker')).filter({ hasText: 'Geoffrey Hinton' }).click()
    await expect(panel).toBeVisible()
    await expect(panel.getByRole('heading', { name: 'Geoffrey Hinton' })).toBeVisible()
    await expect(panel).toContainText('Turing Award and Nobel laureate')
    await expect(panel).toContainText('open safety research')
    await expect(panel).toContainText('Sat 10 July, 11:00')
    await expect(panel).toContainText('Safety research in the open')

    // Escape closes it
    await page.keyboard.press('Escape')
    await expect(panel).toHaveCount(0)

    // So does the close button
    await page.locator(mod('speaker')).filter({ hasText: 'Fei-Fei Li' }).click()
    await expect(panel).toBeVisible()
    await panel.getByRole('button', { name: 'Close' }).click()
    await expect(panel).toHaveCount(0)
  })

  /*
   * The three tests below cover what moving onto Radix was for. Each asserts
   * behaviour the hand-rolled versions did not have.
   */

  test('day tabs follow the ARIA tabs keyboard pattern', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)
    await page.locator('#programme').scrollIntoViewIfNeeded()

    const tabs = page.getByRole('tab')
    await expect(tabs).toHaveCount(4)

    // The strip is a single tab stop; focus lands on the selected tab.
    await tabs.first().focus()
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true')

    // Arrow keys move selection along the strip.
    await page.keyboard.press('ArrowRight')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator(mod('sessionCount'))).toContainText('Thu 8 July')

    await page.keyboard.press('ArrowRight')
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true')

    await page.keyboard.press('ArrowLeft')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')

    // End/Home jump to the ends.
    await page.keyboard.press('End')
    await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true')
    await page.keyboard.press('Home')
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true')

    // Each tab is wired to a panel.
    const controls = await tabs.nth(0).getAttribute('aria-controls')
    expect(controls).toBeTruthy()
    await expect(page.locator(`#${controls}`)).toHaveAttribute('role', 'tabpanel')
  })

  test('filters expose single-select semantics', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)
    await page.locator('#programme').scrollIntoViewIfNeeded()

    // A one-of-many filter is a radiogroup, not a row of toggle buttons.
    const group = page.getByRole('radiogroup', { name: 'Track' })
    await expect(group).toBeVisible()
    await expect(group.getByRole('radio')).toHaveCount(7)
    await expect(page.getByRole('radio', { name: 'All', exact: true })).toHaveAttribute(
      'aria-checked',
      'true',
    )

    await page.getByRole('radio', { name: 'Health', exact: true }).click()
    await expect(page.getByRole('radio', { name: 'Health', exact: true })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    await expect(page.getByRole('radio', { name: 'All', exact: true })).toHaveAttribute(
      'aria-checked',
      'false',
    )

    // Re-pressing the active option must not clear the selection.
    await page.getByRole('radio', { name: 'Health', exact: true }).click()
    await expect(page.getByRole('radio', { name: 'Health', exact: true })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    await expect(page.locator(mod('sessionCount'))).toContainText('· Health')
  })

  test('speaker panel traps focus, restores it, and locks scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)
    await page.locator('#speakers').scrollIntoViewIfNeeded()

    const trigger = page.locator(mod('speaker')).filter({ hasText: 'Timnit Gebru' })
    await trigger.click()

    const panel = page.getByRole('dialog')
    await expect(panel).toBeVisible()

    // Body scroll is locked while the panel is open.
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden')

    // Tab cycles within the panel and never escapes to the page behind it.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab')
      const inside = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]')
        return !!dialog && !!document.activeElement && dialog.contains(document.activeElement)
      })
      expect(inside, `focus escaped the panel after ${i + 1} Tab press(es)`).toBe(true)
    }

    // Closing returns focus to the card that opened it.
    await page.keyboard.press('Escape')
    await expect(panel).toHaveCount(0)
    const restored = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null
      return el?.textContent?.includes('Timnit Gebru') ?? false
    })
    expect(restored, 'focus was not restored to the triggering card').toBe(true)

    // And scroll is released.
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden')
  })

  test('pass pricing toggles between early access and standard', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)
    await page.locator('#passes').scrollIntoViewIfNeeded()

    const prices = page.locator(mod('passPrice'))
    const note = page.locator(mod('passNote')).first()

    // Early access is the default, and shows the struck-through standard price
    await expect(prices).toHaveText(['CHF 50', 'CHF 890', 'CHF 4,900'])
    await expect(note).toHaveText('Early access rate, until 31 March 2027')
    await expect(page.locator(mod('passWas'))).toHaveText(['CHF 70', 'CHF 1,190', 'CHF 5,600'])

    await page.getByRole('radio', { name: 'Standard' }).click()
    await expect(prices).toHaveText(['CHF 70', 'CHF 1,190', 'CHF 5,600'])
    await expect(note).toHaveText('Standard rate')
    await expect(page.locator(mod('passWas'))).toHaveCount(0)

    await page.getByRole('radio', { name: 'Early access' }).click()
    await expect(prices).toHaveText(['CHF 50', 'CHF 890', 'CHF 4,900'])

    // Gold is the highlighted tier
    await expect(page.getByText('Most popular')).toBeVisible()
  })

  test('nav docks on scroll and the progress bar advances', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    const nav = page.locator(mod('nav')).first()
    const progress = page.locator(mod('navProgress'))

    // At rest: floating, inset from the edges, progress bar fully clipped
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

    // Scrolling back up undocks it
    await page.mouse.wheel(0, -1200)
    await expect(nav).not.toHaveClass(/navShrunk/)
  })

  test('reveal-on-scroll fires for below-the-fold sections', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    const reveals = page.locator(mod('reveal'))
    const total = await reveals.count()
    expect(total).toBeGreaterThan(5)

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

  test('unbuilt destinations report themselves instead of navigating', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    const toast = page.locator(mod('toast'))
    await expect(toast).not.toHaveClass(/shown/)

    await page.getByRole('button', { name: 'Register' }).click()
    await expect(toast).toHaveClass(/shown/)
    await expect(toast).toContainText('Registration — not built in this prototype')

    // Still on the same page
    expect(page.url()).toBe(URL)
  })

  /*
   * The link classes are all single-class rules, so any reset that outranks
   * them silently flattens the palette — and on the closing CTA (dark text on
   * a white pill) it makes the label vanish entirely. Assert the contrasts
   * that carry meaning rather than trusting the cascade.
   */
  test('link colours survive the cascade', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    const cta = page.getByRole('link', { name: /Join the pass waitlist/ })
    await cta.scrollIntoViewIfNeeded()
    const ctaStyle = await cta.evaluate((el) => {
      const cs = getComputedStyle(el)
      return { color: cs.color, background: cs.backgroundColor }
    })
    // Dark ink on the white pill, not white-on-white.
    expect(ctaStyle.color).toBe('rgb(12, 19, 32)')
    expect(ctaStyle.background).toBe('rgb(255, 255, 255)')

    // Nav and footer links are deliberately dimmer than full white.
    const navColor = await page
      .locator(mod('navLink'))
      .first()
      .evaluate((el) => getComputedStyle(el).color)
    expect(navColor).toBe('rgba(255, 255, 255, 0.72)')

    const footerColor = await page
      .locator(mod('footerLink'))
      .first()
      .evaluate((el) => getComputedStyle(el).color)
    expect(footerColor).toBe('rgba(255, 255, 255, 0.7)')
  })

  /*
   * The shared Button in @/components/ui gets its colours from CSS custom
   * properties defined by the theme class on the page root. If that class ever
   * stops being applied the button renders transparent-on-transparent, so
   * assert the variables actually resolve.
   */
  test('shared Button resolves its theme tokens', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    const register = page.getByRole('button', { name: 'Register' })
    const style = await register.evaluate((el) => {
      const cs = getComputedStyle(el)
      return { bg: cs.backgroundColor, color: cs.color, height: cs.height }
    })
    // --btn-bg / --btn-fg, and the md size.
    expect(style.bg).toBe('rgb(255, 255, 255)')
    expect(style.color).toBe('rgb(12, 19, 32)')
    expect(style.height).toBe('40px')

    // secondary-gray draws its outline with an inset shadow from --line-2.
    const sponsor = page.getByRole('button', { name: 'Sponsor & exhibit' })
    const shadow = await sponsor.evaluate((el) => getComputedStyle(el).boxShadow)
    expect(shadow).toContain('inset')
    expect(shadow).toContain('rgba(255, 255, 255, 0.28)')
  })

  test('captures the full page', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL)

    // Let the reveal observers and count-ups settle before shooting
    for (let i = 0; i < 24; i++) {
      await page.mouse.wheel(0, 700)
      await page.waitForTimeout(60)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(900)

    await page.screenshot({ path: 'test-results/summit-hero.png' })
    await page.screenshot({ path: 'test-results/summit-full.png', fullPage: true })
  })
})
