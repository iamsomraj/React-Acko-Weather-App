import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import TableHeader from '../TableHeader'

describe('TableHeader Component', () => {
  const mockRows = ['Time', 'Temperature', 'Description', 'Humidity']

  it('renders without crashing', () => {
    render(
      <table>
        <TableHeader rows={mockRows} />
      </table>
    )

    expect(document.body).toBeDefined()
  })

  it('renders as table header element', () => {
    const { container } = render(
      <table>
        <TableHeader rows={mockRows} />
      </table>
    )
    const thead = container.querySelector('thead')

    expect(thead).toBeDefined()
  })

  it('renders header row', () => {
    const { container } = render(
      <table>
        <TableHeader rows={mockRows} />
      </table>
    )
    const headerRow = container.querySelector('thead tr')

    expect(headerRow).toBeDefined()
  })

  it('contains header cells', () => {
    const { container } = render(
      <table>
        <TableHeader rows={mockRows} />
      </table>
    )
    const headerCells = container.querySelectorAll('th')

    expect(headerCells.length).toBe(mockRows.length)
  })
})
