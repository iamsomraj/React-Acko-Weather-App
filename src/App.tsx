import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FooterSection from '@/components/FooterSection/FooterSection'
import Header from '@/components/Header/Header'
import data from '@/data'

function App() {
  const BrandComponent = data.brand.container

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 text-foreground antialiased">
      <Router>
        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <Header />

        <main
          id="main-content"
          className="focus:outline-none"
          tabIndex={-1}
          role="main"
          aria-label="Main content"
        >
          <Routes>
            <Route path={data.brand.path} element={<BrandComponent />} />
            {data.navLinks.map((link) => {
              const LinkComponent = link.container
              return (
                <Route
                  key={link.path + link.text}
                  path={link.path}
                  element={<LinkComponent />}
                />
              )
            })}
          </Routes>
        </main>

        <FooterSection />
      </Router>
    </div>
  )
}

export default App
