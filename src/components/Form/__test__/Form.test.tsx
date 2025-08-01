import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import Form from '../Form'

interface FormProps {
  term: string
  onChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  state: { loading: boolean; error: string | null }
  onClear: () => void
  className?: string
}

describe('Form Component', () => {
  const mockOnChange = vi.fn()
  const mockOnSubmit = vi.fn()
  const mockOnClear = vi.fn()

  const defaultProps: FormProps = {
    term: '',
    onChange: mockOnChange,
    onSubmit: mockOnSubmit,
    onClear: mockOnClear,
    state: { loading: false, error: null },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the form with input and buttons', () => {
    render(<Form {...defaultProps} />)

    expect(
      screen.getByPlaceholderText('Enter city or location name...')
    ).toBeDefined()
    expect(screen.getByText('Get Forecast')).toBeDefined()
    expect(screen.getByText('Clear')).toBeDefined()
  })

  it('calls onChange when typing in input', () => {
    render(<Form {...defaultProps} />)

    const input = screen.getByPlaceholderText('Enter city or location name...')
    fireEvent.change(input, { target: { value: 'London' } })

    expect(mockOnChange).toHaveBeenCalledWith('London')
  })

  it('displays error message when error exists', () => {
    const errorProps: FormProps = {
      ...defaultProps,
      state: { loading: false, error: 'City not found' },
    }
    render(<Form {...errorProps} />)

    expect(screen.getByText('City not found')).toBeDefined()
  })

  it('calls onClear when Clear button is clicked', () => {
    render(<Form {...defaultProps} />)

    const clearButton = screen.getByText('Clear')
    fireEvent.click(clearButton)

    expect(mockOnClear).toHaveBeenCalledTimes(1)
  })
})
