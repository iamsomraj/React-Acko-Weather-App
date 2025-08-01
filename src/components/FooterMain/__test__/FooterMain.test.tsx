import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FooterMain from '../FooterMain'

describe('FooterMain Component', () => {
  it('should render form heading correctly in the footer main section', () => {
    const { getByTestId } = render(
      <div>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <FooterMain />
        </BrowserRouter>
      </div>
    )
    const element = getByTestId('form-heading-element')
    expect(element.textContent).toBe('Stay updated with weather insights')
  })
})
