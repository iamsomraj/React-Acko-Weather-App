import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from '../input'

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()
  })

  it('accepts placeholder text', () => {
    render(<Input placeholder="Enter text here" />)

    const input = screen.getByPlaceholderText('Enter text here')
    expect(input).toBeDefined()
  })

  it('accepts type attribute', () => {
    render(<Input type="email" />)

    const input = screen.getByRole('textbox')
    expect(input.getAttribute('type')).toBe('email')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" />)

    const input = screen.getByRole('textbox')
    expect(input.className).toContain('custom-input')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />)

    const input = screen.getByRole('textbox')
    expect(input.hasAttribute('disabled')).toBe(true)
  })

  it('accepts value and onChange props', () => {
    const handleChange = () => {}
    render(<Input value="test value" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    expect((input as HTMLInputElement).value).toBe('test value')
  })
})
