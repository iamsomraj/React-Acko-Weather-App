import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FooterSection from '@/components/FooterSection/FooterSection'
import Header from '@/components/Header/Header'
import data from '@/data'

function App() {
  const BrandComponent = data.brand.container

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-200 text-gray-500">
      <Router>
        <Header />
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
        <FooterSection />
      </Router>
    </div>
  )
}

export default App
