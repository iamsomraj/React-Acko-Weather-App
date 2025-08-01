function FooterBottom() {
  /**
   * Bottom Footer component used at the bottom of the page
   */
  return (
    <div className="py-6 mt-16 md:flex justify-between items-center border-t border-border text-sm text-center md:text-left space-y-4 md:space-y-0">
      <div data-testid="copyright-element" className="text-muted-foreground">
        Copyright &copy; {new Date().getFullYear()} WeatherNow. All rights
        reserved.
      </div>
      <div className="text-muted-foreground">
        Made with{' '}
        <span
          className="text-primary mx-1"
          role="img"
          aria-label="purple heart"
        >
          💜
        </span>
        by{' '}
        <a
          data-testid="link-element"
          className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
          href="https://github.com/iamsomraj/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Somraj's GitHub profile (opens in new tab)"
        >
          Somraj
        </a>
      </div>
    </div>
  )
}

export default FooterBottom
