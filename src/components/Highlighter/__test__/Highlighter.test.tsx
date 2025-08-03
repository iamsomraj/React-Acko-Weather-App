import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Highlighter from '../Highlighter'

describe('Highlighter Component', () => {
  it('renders children text', () => {
    render(<Highlighter>Hello world</Highlighter>)

    expect(screen.getByText('Hello world')).toBeDefined()
  })

  it('applies correct highlighting styles', () => {
    render(<Highlighter>Highlighted text</Highlighter>)

    const highlightedElement = screen.getByText('Highlighted text')
    expect(highlightedElement.tagName.toLowerCase()).toBe('span')
    expect(highlightedElement.className).toContain('italic')
    expect(highlightedElement.className).toContain('text-green-500')
    expect(highlightedElement.className).toContain('font-bold')
  })

  it('renders with different types of children', () => {
    render(
      <Highlighter>
        <span>Nested content</span>
      </Highlighter>
    )

    expect(screen.getByText('Nested content')).toBeDefined()
  })

  it('applies tracking and text size classes', () => {
    render(<Highlighter>Test text</Highlighter>)

    const element = screen.getByText('Test text')
    expect(element.className).toContain('tracking-wide')
    expect(element.className).toContain('text-md')
  })
})
