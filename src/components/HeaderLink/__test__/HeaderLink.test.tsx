import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import HeaderLink from '../HeaderLink'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HeaderLink Component', () => {
  const defaultProps = {
    isPrimary: true,
    path: '/test',
    text: 'Test Link',
  }

  it('renders link text', () => {
    renderWithRouter(<HeaderLink {...defaultProps} />)

    expect(screen.getByText('Test Link')).toBeDefined()
  })

  it('renders as a link with correct href', () => {
    renderWithRouter(<HeaderLink {...defaultProps} />)

    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/test')
  })

  it('applies primary styles when isPrimary is true', () => {
    renderWithRouter(<HeaderLink {...defaultProps} isPrimary={true} />)

    const link = screen.getByRole('link')
    expect(link.className).toContain('bg-primary')
  })

  it('applies secondary styles when isPrimary is false', () => {
    renderWithRouter(<HeaderLink {...defaultProps} isPrimary={false} />)

    const link = screen.getByRole('link')
    expect(link.className).toContain('text-muted-foreground')
  })

  it('handles mobile styles when isMobile is true', () => {
    renderWithRouter(<HeaderLink {...defaultProps} isMobile={true} />)

    const link = screen.getByRole('link')
    expect(link.className).toContain('w-full')
  })
})
