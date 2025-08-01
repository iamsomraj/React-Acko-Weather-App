import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner Component', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)

    expect(screen.getByText('Loading...')).toBeDefined()
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Fetching weather data..." />)

    expect(screen.getByText('Fetching weather data...')).toBeDefined()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = document.querySelector('.animate-spin')
    expect(spinner?.classList.contains('w-4')).toBe(true)
    expect(spinner?.classList.contains('h-4')).toBe(true)

    rerender(<LoadingSpinner size="md" />)
    spinner = document.querySelector('.animate-spin')
    expect(spinner?.classList.contains('w-8')).toBe(true)
    expect(spinner?.classList.contains('h-8')).toBe(true)

    rerender(<LoadingSpinner size="lg" />)
    spinner = document.querySelector('.animate-spin')
    expect(spinner?.classList.contains('w-12')).toBe(true)
    expect(spinner?.classList.contains('h-12')).toBe(true)
  })

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner text="Custom loading message" />)

    const container = screen.getByRole('status')
    expect(container.getAttribute('aria-label')).toBe('Custom loading message')

    const spinner = document.querySelector('.animate-spin')
    expect(spinner?.getAttribute('aria-hidden')).toBe('true')
  })
})
