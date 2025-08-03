import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import FunElement from '../FunElement'

describe('FunElement Component', () => {
  const defaultProps = {
    position: 'top-10 left-10',
    translate: 'translate-x-4 translate-y-4',
  }

  it('renders without crashing', () => {
    render(<FunElement {...defaultProps} />)

    expect(document.body).toBeDefined()
  })

  it('applies position classes correctly', () => {
    const { container } = render(<FunElement {...defaultProps} />)
    const innerDiv = container.querySelector('.absolute')

    expect(innerDiv?.className).toContain('top-10')
    expect(innerDiv?.className).toContain('left-10')
  })

  it('applies translate classes correctly', () => {
    const { container } = render(<FunElement {...defaultProps} />)
    const innerDiv = container.querySelector('.absolute')

    expect(innerDiv?.className).toContain('translate-x-4')
    expect(innerDiv?.className).toContain('translate-y-4')
  })

  it('has absolute positioning on inner element', () => {
    const { container } = render(<FunElement {...defaultProps} />)
    const innerDiv = container.querySelector('.absolute')

    expect(innerDiv?.className).toContain('absolute')
  })

  it('has responsive visibility classes', () => {
    const { container } = render(<FunElement {...defaultProps} />)
    const wrapper = container.firstChild as HTMLElement

    expect(wrapper.className).toContain('hidden')
    expect(wrapper.className).toContain('lg:block')
  })
})
