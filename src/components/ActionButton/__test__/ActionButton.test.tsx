import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import ActionButton from '../ActionButton'

describe('ActionButton Component', () => {
  const defaultProps = {
    body: 'Test Button',
    path: '/test',
  }

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders with default props', () => {
    renderWithRouter(<ActionButton {...defaultProps} />)

    expect(
      screen.getByRole('button', { name: 'Navigate to Test Button' })
    ).toBeDefined()
    expect(screen.getByText('Test Button')).toBeDefined()
  })

  it('applies correct variant styles', () => {
    const { rerender } = renderWithRouter(
      <ActionButton {...defaultProps} variant="default" />
    )
    let button = screen.getByRole('button')
    expect(button.className).toContain('bg-gradient-to-br')

    rerender(
      <BrowserRouter>
        <ActionButton {...defaultProps} variant="outline" />
      </BrowserRouter>
    )
    button = screen.getByRole('button')
    expect(button.className).toContain('border-2')

    rerender(
      <BrowserRouter>
        <ActionButton {...defaultProps} variant="ghost" />
      </BrowserRouter>
    )
    button = screen.getByRole('button')
    expect(button.className).toContain('hover:bg-primary/10')
  })

  it('applies correct size styles', () => {
    const { rerender } = renderWithRouter(
      <ActionButton {...defaultProps} size="sm" />
    )
    let button = screen.getByRole('button')
    expect(button.className).toContain('px-4')

    rerender(
      <BrowserRouter>
        <ActionButton {...defaultProps} size="md" />
      </BrowserRouter>
    )
    button = screen.getByRole('button')
    expect(button.className).toContain('px-6')

    rerender(
      <BrowserRouter>
        <ActionButton {...defaultProps} size="lg" />
      </BrowserRouter>
    )
    button = screen.getByRole('button')
    expect(button.className).toContain('px-8')
  })

  it('applies custom className', () => {
    renderWithRouter(
      <ActionButton {...defaultProps} className="custom-class" />
    )
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })

  it('has correct link path', () => {
    renderWithRouter(<ActionButton {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button.getAttribute('href')).toBe('/test')
  })
})
