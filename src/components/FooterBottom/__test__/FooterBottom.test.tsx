import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import FooterBottom from '../FooterBottom'

describe('FooterBottom Component', () => {
  it('should render copyright text and year correctly', () => {
    const { getByTestId } = render(<FooterBottom />)
    const ele = getByTestId('copyright-element')
    expect(ele.textContent?.includes('Copyright')).toBeTruthy()
    expect(
      ele.textContent?.includes(new Date().getFullYear().toString())
    ).toBeTruthy()
  })

  it('should render footer link correctly', () => {
    const { getByTestId } = render(<FooterBottom />)
    const ele = getByTestId('link-element')
    expect(ele.textContent?.includes('Somraj')).toBeTruthy()
  })
})
