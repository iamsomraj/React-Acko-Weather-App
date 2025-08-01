import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { WeatherActionType } from '../../../state/action-types'
import Form from '../Form'

interface FormProps {
  term: string
  onChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  state: { loading: boolean; error: string | null }
  onInit: () => { type: WeatherActionType }
  className?: string
}

describe('Form Component', () => {
  const mockOnChange = vi.fn()
  const mockOnSubmit = vi.fn()
  const mockOnInit = vi.fn(() => ({ type: WeatherActionType.INIT_STATE }))

  const defaultProps: FormProps = {
    term: '',
    onChange: mockOnChange,
    onSubmit: mockOnSubmit,
    onInit: mockOnInit,
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
    expect(screen.getByText('Use My Location')).toBeDefined()
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
})
