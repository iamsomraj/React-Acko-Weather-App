import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { ActionButton } from '../ActionButton'

describe('ActionButton Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders with default props', () => {
    renderWithRouter(<ActionButton body="Test Button" path="/test" />)

    expect(
      screen.getByRole('button', { name: 'Navigate to Test Button' })
    ).toBeDefined()
    expect(screen.getByText('Test Button')).toBeDefined()
  })

  it('applies correct variant styles', () => {
    const { rerender } = renderWithRouter(
      <ActionButton body="Test Button" path="/test" variant="default" />
    )
    let button = screen.getByRole('button')
    expect(button.className).toContain('bg-gradient-to-br')

    rerender(
      <BrowserRouter>
        <ActionButton body="Test Button" path="/test" variant="outline" />
      </BrowserRouter>
    )
    button = screen.getByRole('button')
    expect(button.className).toContain('border-2')

    rerender(
      <BrowserRouter>
        <ActionButton body="Test Button" path="/test" variant="ghost" />
      </BrowserRouter>
    )
    button = screen.getByRole('button')
    expect(button.className).toContain('hover:bg-primary/10')
  })

  it('applies correct size styles', () => {
    const { rerender } = renderWithRouter(
      <ActionButton body="Test Button" path="/test" size="sm" />
    )
    let button = screen.getByRole('button')
    expect(button.className).toContain('px-4')

    rerender(
      <BrowserRouter>
        <ActionButton body="Test Button" path="/test" size="md" />
      </BrowserRouter>
    )
    button = screen.getByRole('button')
    expect(button.className).toContain('px-6')

    rerender(
      <BrowserRouter>
        <ActionButton body="Test Button" path="/test" size="lg" />
      </BrowserRouter>
    )
    button = screen.getByRole('button')
    expect(button.className).toContain('px-8')
  })

  it('applies custom className', () => {
    renderWithRouter(
      <ActionButton body="Test Button" path="/test" className="custom-class" />
    )
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })

  it('has correct link path', () => {
    renderWithRouter(<ActionButton body="Test Button" path="/test" />)
    const button = screen.getByRole('button')
    expect(button.getAttribute('href')).toBe('/test')
  })
})
