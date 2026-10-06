import { Link } from 'react-router'
import { Seo } from '@/components/layout/Seo'
import { Button } from '@/components/ui/button'
import { routes } from '@/lib/routes'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <Seo
        title="Page not found"
        description="This page does not exist."
        path="/404"
        noIndex
      />
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Lost in the clouds
      </h1>
      <p className="text-muted-foreground">
        We couldn't find the page you were looking for.
      </p>
      <div className="flex gap-2">
        <Button asChild>
          <Link to={routes.home}>Go home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={routes.weather}>Check the weather</Link>
        </Button>
      </div>
    </div>
  )
}
