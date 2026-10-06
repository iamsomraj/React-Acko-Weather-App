import { Link } from 'react-router'
import { APP_NAME } from '@/lib/constants'
import { routes } from '@/lib/routes'

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. Weather data by{' '}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            OpenWeather
          </a>
          .
        </p>
        <nav aria-label="Footer" className="flex gap-5">
          <Link to={routes.about} className="hover:text-foreground">
            About
          </Link>
          <Link to={routes.privacy} className="hover:text-foreground">
            Privacy
          </Link>
          <a
            href="https://github.com/iamsomraj/React-Acko-Weather-App"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
