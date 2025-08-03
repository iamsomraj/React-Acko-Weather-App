import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AccessibilityReport } from '../AccessibilityReport'

describe('AccessibilityReport Component', () => {
  it('renders accessibility report with all sections', () => {
    render(<AccessibilityReport />)

    expect(screen.getByText('Accessibility Improvements Report')).toBeDefined()
    expect(screen.getByText('Semantic HTML')).toBeDefined()
    expect(screen.getByText('Keyboard Navigation')).toBeDefined()
    expect(screen.getByText('Screen Reader Support')).toBeDefined()
    expect(screen.getByText('WCAG 2.1 Compliance Level')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <AccessibilityReport className="custom-class" />
    )
    expect((container.firstChild as HTMLElement)?.className).toContain(
      'custom-class'
    )
  })

  it('displays improvement items for each category', () => {
    render(<AccessibilityReport />)

    // Check for some specific improvement items
    expect(screen.getByText(/proper semantic elements/i)).toBeDefined()
    expect(screen.getByText(/keyboard accessible/i)).toBeDefined()
    expect(screen.getByText(/aria-labels/i)).toBeDefined()
  })
})
