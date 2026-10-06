import { Seo } from '@/components/layout/Seo'
import { ProsePage } from './ProsePage'

export default function AboutPage() {
  return (
    <ProsePage
      title="About WeatherNow"
      lead="A fast, focused weather app that turns raw forecast data into something you can read at a glance."
    >
      <Seo
        title="About"
        description="WeatherNow is a fast, accessible weather app built with React 19, TanStack Query, Tailwind CSS and shadcn/ui."
        path="/about"
      />
      <section>
        <h2>What it does</h2>
        <p>
          Search any city — or share your location — to see current conditions,
          a 48-hour temperature and precipitation chart, a 5-day outlook with
          daily ranges, sunrise and sunset, air quality and a full three-hourly
          breakdown for each day.
        </p>
      </section>
      <section>
        <h2>How it is built</h2>
        <ul>
          <li>React 19 and TypeScript, bundled with Vite.</li>
          <li>
            TanStack Query for caching, retries and request de-duplication.
          </li>
          <li>
            Tailwind CSS v4 with shadcn/ui components and Recharts
            visualisations.
          </li>
          <li>
            Forecast, geocoding and air-pollution data from the OpenWeather API.
          </li>
        </ul>
      </section>
      <section>
        <h2>Open source</h2>
        <p>
          The source is available on{' '}
          <a
            href="https://github.com/iamsomraj/React-Acko-Weather-App"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          . Issues and pull requests are welcome.
        </p>
      </section>
    </ProsePage>
  )
}
