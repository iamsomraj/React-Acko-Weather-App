import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import DebugTest from '../DebugTest'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('DebugTest Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<DebugTest />)

    expect(document.body).toBeDefined()
  })

  it('displays debug information', () => {
    renderWithRouter(<DebugTest />)

    expect(screen.getByText('Component Testing')).toBeDefined()
    expect(screen.getByText('Sample Button')).toBeDefined()
    expect(screen.getByPlaceholderText('Sample input field')).toBeDefined()
    expect(screen.getByText('Sample Card Component')).toBeDefined()
  })

  it('renders all test components', () => {
    renderWithRouter(<DebugTest />)

    // Check for button
    expect(screen.getByRole('button', { name: 'Sample Button' })).toBeDefined()
    // Check for input
    expect(screen.getByRole('textbox')).toBeDefined()
    // Check for action button
    expect(
      screen.getByRole('button', { name: 'Navigate to Navigate Home' })
    ).toBeDefined()
  })
})
