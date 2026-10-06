import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { routes } from '@/lib/routes'
import HomePage from '@/pages/HomePage'

const WeatherPage = lazy(() => import('@/pages/WeatherPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export default function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.weather} element={<WeatherPage />} />
        <Route path={routes.about} element={<AboutPage />} />
        <Route path={routes.privacy} element={<PrivacyPage />} />
        {/* Legacy v1 route */}
        <Route
          path="/weather-forecast"
          element={<Navigate to={routes.weather} replace />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RootLayout>
  )
}
