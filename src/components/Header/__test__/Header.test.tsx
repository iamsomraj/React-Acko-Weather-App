import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import Header from '../Header'

// Mock child components
vi.mock('@/components/Brand/Brand', () => ({
  default: ({ brandName }: { brandName: string }) => (
    <div data-testid="brand">{brandName}</div>
  ),
}))

vi.mock('@/components/HeaderLink/HeaderLink', () => ({
  default: ({ text }: { text: string }) => (
    <div data-testid="header-link">{text}</div>
  ),
}))

// Mock data
vi.mock('@/data', () => ({
  default: {
    brand: {
      text: 'Weather App',
      path: '/',
    },
    navLinks: [
      { text: 'Home', path: '/', isPrimary: true },
      { text: 'About', path: '/about', isPrimary: false },
    ],
  },
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Header Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Header />)

    expect(document.body).toBeDefined()
  })

  it('renders as header element with correct role', () => {
    const { container } = renderWithRouter(<Header />)
    const header = container.querySelector('header')

    expect(header).toBeDefined()
    expect(header?.getAttribute('role')).toBe('banner')
  })

  it('renders brand component', () => {
    const { getByTestId } = renderWithRouter(<Header />)

    expect(getByTestId('brand')).toBeDefined()
  })

  it('has sticky positioning and backdrop blur', () => {
    const { container } = renderWithRouter(<Header />)
    const header = container.querySelector('header')

    expect(header?.className).toContain('sticky')
    expect(header?.className).toContain('backdrop-blur-md')
  })
})
