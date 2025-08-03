import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import TemperatureIndicator from '../TemperatureIndicator'

describe('TemperatureIndicator Component', () => {
  const defaultProps = {
    val: 25,
    index: 2, // Only renders when index is 2 (Real Feel)
  }

  it('renders temperature indicator when index is 2', () => {
    render(<TemperatureIndicator {...defaultProps} />)

    const indicator = document.querySelector('span[role="img"]')
    expect(indicator).toBeDefined()
  })

  it('does not render when index is not 2', () => {
    render(<TemperatureIndicator val={25} index={1} />)

    const indicator = document.querySelector('span[role="img"]')
    expect(indicator).toBeNull()
  })

  it('applies correct color for hot temperature', () => {
    render(<TemperatureIndicator val={30} index={2} />)

    const indicator = document.querySelector('span[role="img"]')
    expect(indicator?.className).toContain('bg-destructive')
  })

  it('applies correct color for cold temperature', () => {
    render(<TemperatureIndicator val={0} index={2} />)

    const indicator = document.querySelector('span[role="img"]')
    expect(indicator?.className).toContain('bg-primary')
  })

  it('applies correct color for comfortable temperature', () => {
    render(<TemperatureIndicator val={15} index={2} />)

    const indicator = document.querySelector('span[role="img"]')
    expect(indicator?.className).toContain('bg-success')
  })

  it('has proper accessibility attributes', () => {
    render(<TemperatureIndicator val={25} index={2} />)

    const indicator = document.querySelector('span[role="img"]')
    expect(indicator?.getAttribute('role')).toBe('img')
    expect(indicator?.getAttribute('aria-label')).toContain('Warm')
  })
})
