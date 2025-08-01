import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import LocationSearchForm from '../LocationSearchForm'

interface LocationSearchFormProps {
  term: string
  onChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  state: { loading: boolean; error: string | null }
  onClear: () => void
  className?: string
}

describe('LocationSearchForm Component', () => {
  const mockOnChange = vi.fn()
  const mockOnSubmit = vi.fn()
  const mockOnClear = vi.fn()

  const defaultProps: LocationSearchFormProps = {
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
    render(<LocationSearchForm {...defaultProps} />)

    expect(
      screen.getByPlaceholderText('Enter city name (e.g., London, Paris)')
    ).toBeDefined()
    expect(screen.getByText('Get Forecast')).toBeDefined()
    expect(screen.getByText('Clear')).toBeDefined()
  })

  it('calls onChange when typing in input', () => {
    render(<LocationSearchForm {...defaultProps} />)

    const input = screen.getByPlaceholderText(
      'Enter city name (e.g., London, Paris)'
    )
    fireEvent.change(input, { target: { value: 'London' } })

    expect(mockOnChange).toHaveBeenCalledWith('London')
  })

  it('calls onSubmit when form is submitted', () => {
    render(<LocationSearchForm {...defaultProps} term="London" />)

    const form = document.querySelector('form')!
    fireEvent.submit(form)

    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('calls onClear when clear button is clicked', () => {
    render(<LocationSearchForm {...defaultProps} />)

    const clearButton = screen.getByText('Clear')
    fireEvent.click(clearButton)

    expect(mockOnClear).toHaveBeenCalled()
  })

  it('disables submit button when term is empty', () => {
    render(<LocationSearchForm {...defaultProps} term="" />)

    const submitButton = screen.getByText('Get Forecast')
    expect(submitButton).toHaveProperty('disabled', true)
  })

  it('enables submit button when term is provided', () => {
    render(<LocationSearchForm {...defaultProps} term="London" />)

    const submitButton = screen.getByText('Get Forecast')
    expect(submitButton).toHaveProperty('disabled', false)
  })

  it('shows loading state', () => {
    const loadingState = { loading: true, error: null }
    render(<LocationSearchForm {...defaultProps} state={loadingState} />)

    expect(screen.getByText('Getting forecast...')).toBeDefined()
  })

  it('displays error message when there is an error', () => {
    const errorState = { loading: false, error: 'City not found' }
    render(<LocationSearchForm {...defaultProps} state={errorState} />)

    expect(screen.getByText('City not found')).toBeDefined()
  })
})
