import { BarChart3, Gauge, LocateFixed, Moon } from 'lucide-react'
import { Seo } from '@/components/layout/Seo'
import { CitySearch } from '@/components/weather/CitySearch'
import { PopularLocations } from '@/components/weather/PopularLocations'
import { APP_TAGLINE } from '@/lib/constants'

const FEATURES = [
  {
    icon: LocateFixed,
    title: 'Search or locate',
    body: 'Instant city autocomplete, recent searches, or one tap to use where you are.',
  },
  {
    icon: BarChart3,
    title: 'Readable forecasts',
    body: '48-hour charts, a 5-day outlook with temperature ranges and detailed hourly tables.',
  },
  {
    icon: Gauge,
    title: 'Everything that matters',
    body: 'Feels-like, wind, humidity, pressure, visibility, sun times and air quality.',
  },
  {
    icon: Moon,
    title: 'Made for every screen',
    body: 'Light and dark themes, °C or °F, fully responsive and keyboard accessible.',
  },
]

export default function HomePage() {
  return (
    <>
      <Seo
        path="/"
        description="Search any city for current conditions, a 48-hour chart, 5-day outlook and air quality. Fast, free and beautifully clear."
      />
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_50%_-10%,var(--sky-from),transparent_70%)]"
        />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
          <span className="rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
            Live data from OpenWeather
          </span>
          <h1 className="text-4xl font-semibold tracking-tighter text-balance sm:text-6xl">
            The weather,{' '}
            <span className="text-primary">beautifully clear.</span>
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            {APP_TAGLINE}
          </p>
          <CitySearch size="lg" className="w-full max-w-xl text-left" />
          <PopularLocations />
        </div>
      </section>

      <section
        aria-labelledby="features-heading"
        className="mx-auto max-w-6xl px-4 pb-24 sm:px-6"
      >
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="space-y-3 rounded-2xl glass p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
