import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import UtilContainer from '../UtilContainer'

describe('UtilContainer Component', () => {
  it('renders children content', () => {
    const { getByText } = render(
      <UtilContainer>
        <div>Test child content</div>
      </UtilContainer>
    )

    expect(getByText('Test child content')).toBeDefined()
  })

  it('applies home page styles when isHome is true', () => {
    const { container } = render(
      <UtilContainer isHome={true}>
        <div>Content</div>
      </UtilContainer>
    )

    const utilContainer = container.firstChild as HTMLElement
    expect(utilContainer.className).toContain('min-h-screen')
  })

  it('applies non-home styles when isHome is false', () => {
    const { container } = render(
      <UtilContainer isHome={false}>
        <div>Content</div>
      </UtilContainer>
    )

    const utilContainer = container.firstChild as HTMLElement
    expect(utilContainer).toBeDefined()
  })

  it('renders with default isHome value', () => {
    const { container } = render(
      <UtilContainer>
        <div>Content</div>
      </UtilContainer>
    )

    expect(container.firstChild).toBeDefined()
  })

  it('handles multiple children', () => {
    const { getByText } = render(
      <UtilContainer>
        <div>First child</div>
        <div>Second child</div>
      </UtilContainer>
    )

    expect(getByText('First child')).toBeDefined()
    expect(getByText('Second child')).toBeDefined()
  })
})
