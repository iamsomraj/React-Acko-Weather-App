import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { WeatherActionType } from '../../../state/action-types'
import Form from '../Form'
import type { IFormProp } from '../../../types'

describe('Form Component', () => {
  const mockOnChange = vi.fn()
  const mockOnSubmit = vi.fn()
  const mockOnInit = vi.fn(() => ({ type: WeatherActionType.INIT_STATE }))

  const defaultProps: IFormProp = {
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
    render(<Form {...(defaultProps as any)} />)

    expect(screen.getByPlaceholderText('Enter city name...')).toBeDefined()
    expect(screen.getByText('Search Weather')).toBeDefined()
    expect(screen.getByText('Use Location')).toBeDefined()
  })

  it('calls onChange when typing in input', () => {
    render(<Form {...(defaultProps as any)} />)

    const input = screen.getByPlaceholderText('Enter city name...')
    fireEvent.change(input, { target: { value: 'London' } })

    expect(mockOnChange).toHaveBeenCalledWith('London')
  })

  it('displays error message when error exists', () => {
    const errorProps = {
      ...defaultProps,
      state: { loading: false, error: 'City not found' },
    }
    render(<Form {...(errorProps as any)} />)

    expect(screen.getByText('City not found')).toBeDefined()
  })
})
