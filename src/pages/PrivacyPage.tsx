import { Seo } from '@/components/layout/Seo'
import { ProsePage } from './ProsePage'

export default function PrivacyPage() {
  return (
    <ProsePage
      title="Privacy"
      lead="WeatherNow has no accounts, no analytics and no server of its own. Here is exactly what happens with your data."
    >
      <Seo
        title="Privacy"
        description="WeatherNow has no accounts and no tracking. Learn how location and search data are handled."
        path="/privacy"
      />
      <section>
        <h2>Location</h2>
        <p>
          Your location is only requested when you choose “Use my current
          location”. The coordinates are sent directly from your browser to
          OpenWeather to fetch the forecast and appear in the page URL so you
          can bookmark or share it. They are never sent anywhere else.
        </p>
      </section>
      <section>
        <h2>Stored on your device</h2>
        <ul>
          <li>Your theme preference (light, dark or system).</li>
          <li>Your preferred units (°C or °F).</li>
          <li>Up to six recent searches.</li>
        </ul>
        <p>
          These live in your browser’s local storage and can be cleared at any
          time from your browser settings.
        </p>
      </section>
      <section>
        <h2>Third parties</h2>
        <p>
          Weather requests go to{' '}
          <a
            href="https://openweathermap.org/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            OpenWeather
          </a>
          , whose privacy policy applies to those requests. The site is hosted
          on Vercel.
        </p>
      </section>
    </ProsePage>
  )
}
