import { useState, useId } from 'react'
import { Link } from 'react-router-dom'
import data from '@/data'
import FooterLink from '@/components/HeaderLink/HeaderLink'

const FooterMain: React.FC = () => {
  /**
   * Email State for handling subscription
   * TODO: `can be used for sending newsletters or updates in future`
   */
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const emailId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage('')

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccessMessage(
      `Thank you for subscribing to weather updates! Email: ${email}`
    )
    setEmail('')
    setIsSubmitting(false)

    setTimeout(() => setSuccessMessage(''), 5000)
  }

  return (
    <div className="lg:flex justify-between items-start space-y-12 lg:space-y-0 lg:space-x-12">
      <div className="flex flex-col justify-center lg:flex-1">
        <h4
          data-testid="form-heading-element"
          className="mb-4 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500"
        >
          Stay updated with weather insights
        </h4>
        <p className="mb-4 text-sm text-muted-foreground">
          Get the latest weather updates and forecasts delivered to your inbox.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={handleSubmit}
          aria-label="Newsletter subscription"
        >
          <label htmlFor={emailId} className="sr-only">
            Email address for weather updates
          </label>
          <input
            id={emailId}
            autoComplete="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="flex-1 p-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
            disabled={isSubmitting}
            aria-describedby={`${emailId}-help`}
          />
          <p id={`${emailId}-help`} className="sr-only">
            Enter your email address to receive weather updates
          </p>
          <button
            type="submit"
            disabled={email.trim().length === 0 || isSubmitting}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            aria-describedby={isSubmitting ? `${emailId}-status` : undefined}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
          {isSubmitting && (
            <div
              id={`${emailId}-status`}
              role="status"
              aria-live="polite"
              className="sr-only"
            >
              Subscribing to weather updates...
            </div>
          )}
        </form>
        {successMessage && (
          <div
            role="status"
            aria-live="polite"
            className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm"
          >
            {successMessage}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center text-left lg:text-right lg:flex-shrink-0">
        <Link
          to={data.brand.path}
          className="mb-4 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
          aria-label={`${data.brand.text} - Go to homepage`}
        >
          {data.brand.text}
        </Link>
        <nav aria-label="Footer navigation" className="space-y-2">
          {data.navLinks.map((link) => (
            <FooterLink
              key={link.path + link.text}
              path={link.path}
              isPrimary={false}
              text={link.text}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default FooterMain
