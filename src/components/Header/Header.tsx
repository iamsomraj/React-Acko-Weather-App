import { useState } from 'react'
import data from '@/data'
import { IHeaderProps } from '@/types'
import Brand from '@/components/Brand/Brand'
import HeaderLink from '@/components/HeaderLink/HeaderLink'
import { cn } from '@/util/cn'

const Header: React.FC<IHeaderProps> = () => {
  const { brand, navLinks } = data
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-border shadow-sm"
      role="banner"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Brand Section */}
          <div className="flex items-center space-x-4">
            <Brand homePage={brand.path} brandName={brand.text} />
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-3"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <HeaderLink
                key={link.path + link.text}
                isPrimary={link.isPrimary}
                path={link.path}
                text={link.text}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            </span>
            {/* Hamburger icon */}
            <svg
              className={cn(
                'h-6 w-6 transition-transform',
                isMobileMenuOpen && 'rotate-90'
              )}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden border-t border-border transition-all duration-300 ease-in-out',
            isMobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <nav
            className="px-2 pt-2 pb-3 space-y-1 bg-white/95"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <HeaderLink
                key={link.path + link.text}
                isPrimary={link.isPrimary}
                path={link.path}
                text={link.text}
                isMobile={true}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
