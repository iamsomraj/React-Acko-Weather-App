import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router'
import Brand from '../Brand'

describe('Brand Component', () => {
  it('renders the logo text correctly', () => {
    const { getByTestId } = render(
      <Router>
        <Brand brandName="test" homePage="test" />
      </Router>
    )
    const element = getByTestId('brand-link')
    expect(element.innerHTML.includes('test')).toBeTruthy()
  })
})
