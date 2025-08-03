import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders card content', () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      )

      expect(screen.getByText('Card content')).toBeDefined()
    })

    it('applies custom className', () => {
      const { container } = render(
        <Card className="custom-card">
          <div>Content</div>
        </Card>
      )

      expect((container.firstChild as HTMLElement)?.className).toContain(
        'custom-card'
      )
    })
  })

  describe('CardHeader', () => {
    it('renders header content', () => {
      render(
        <CardHeader>
          <div>Header content</div>
        </CardHeader>
      )

      expect(screen.getByText('Header content')).toBeDefined()
    })
  })

  describe('CardTitle', () => {
    it('renders title text', () => {
      render(<CardTitle>Card Title</CardTitle>)

      expect(screen.getByText('Card Title')).toBeDefined()
    })
  })

  describe('CardDescription', () => {
    it('renders description text', () => {
      render(<CardDescription>Card description</CardDescription>)

      expect(screen.getByText('Card description')).toBeDefined()
    })
  })

  describe('CardContent', () => {
    it('renders content', () => {
      render(
        <CardContent>
          <div>Content area</div>
        </CardContent>
      )

      expect(screen.getByText('Content area')).toBeDefined()
    })
  })

  describe('CardFooter', () => {
    it('renders footer content', () => {
      render(
        <CardFooter>
          <div>Footer content</div>
        </CardFooter>
      )

      expect(screen.getByText('Footer content')).toBeDefined()
    })
  })
})
