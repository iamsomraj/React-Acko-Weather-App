/**
 * Captures README screenshots, the Open Graph image and the touch icon.
 *
 *   bun run build && bun run screenshots
 *
 * Requires a real VITE_OPENWEATHER_API_KEY in .env at build time and
 * `npx playwright install chromium`.
 */
import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import { chromium, type Page } from 'playwright'

const PORT = 4179
const BASE = `http://localhost:${PORT}`
const OUT = 'docs/screenshots'
const CITY =
  '/weather?lat=51.5073&lon=-0.1276&name=London&country=GB&state=England'

type Shot = {
  name: string
  path: string
  scheme: 'light' | 'dark'
  viewport: { width: number; height: number }
  fullPage?: boolean
  out?: string
}

const shots: Shot[] = [
  {
    name: 'home-light',
    path: '/',
    scheme: 'light',
    viewport: { width: 1440, height: 900 },
  },
  {
    name: 'home-dark',
    path: '/',
    scheme: 'dark',
    viewport: { width: 1440, height: 900 },
  },
  {
    name: 'weather-light',
    path: CITY,
    scheme: 'light',
    viewport: { width: 1440, height: 900 },
    fullPage: true,
  },
  {
    name: 'weather-dark',
    path: CITY,
    scheme: 'dark',
    viewport: { width: 1440, height: 900 },
    fullPage: true,
  },
  {
    name: 'weather-mobile',
    path: CITY,
    scheme: 'light',
    viewport: { width: 390, height: 844 },
    fullPage: true,
  },
  {
    name: 'weather-mobile-dark',
    path: CITY,
    scheme: 'dark',
    viewport: { width: 390, height: 844 },
  },
  {
    name: 'og-image',
    path: CITY,
    scheme: 'light',
    viewport: { width: 1200, height: 630 },
    out: 'public/og-image.png',
  },
]

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      if ((await fetch(BASE)).ok) return
    } catch {
      // not up yet
    }
    await delay(200)
  }
  throw new Error('Preview server did not start')
}

async function settle(page: Page, path: string) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  if (path.startsWith('/weather')) {
    await page.getByText('Next 48 hours').waitFor({ timeout: 15_000 })
    await page.getByText('Air quality').waitFor()
  }
  // Let entrance animations and chart transitions finish.
  await page.waitForTimeout(1200)
}

const server = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort'],
  {
    stdio: 'ignore',
  }
)

try {
  await waitForServer()
  const browser = await chromium.launch()

  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: shot.viewport,
      deviceScaleFactor: shot.out ? 1 : 2,
      colorScheme: shot.scheme,
      locale: 'en-GB',
    })
    const page = await context.newPage()
    await settle(page, shot.path)
    const file = shot.out ?? `${OUT}/${shot.name}.png`
    await page.screenshot({ path: file, fullPage: shot.fullPage ?? false })
    console.log(`✓ ${file}`)
    await context.close()
  }

  // Touch icon rendered from the SVG favicon.
  const context = await browser.newContext({
    viewport: { width: 180, height: 180 },
  })
  const page = await context.newPage()
  await page.setContent(
    `<body style="margin:0"><img src="${BASE}/favicon.svg" width="180" height="180"></body>`
  )
  await page.waitForLoadState('networkidle')
  await page.screenshot({
    path: 'public/apple-touch-icon.png',
    omitBackground: true,
  })
  console.log('✓ public/apple-touch-icon.png')

  await browser.close()
} finally {
  server.kill()
}
