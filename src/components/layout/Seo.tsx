import { env } from '@/config/env'
import { APP_NAME } from '@/lib/constants'

interface SeoProps {
  title?: string
  description: string
  /** Path used for the canonical URL, e.g. "/about" */
  path: string
  noIndex?: boolean
}

/**
 * Per-route document metadata. React 19 hoists <title>, <meta> and <link>
 * rendered anywhere in the tree into <head>.
 */
export function Seo({ title, description, path, noIndex = false }: SeoProps) {
  const fullTitle = title
    ? `${title} · ${APP_NAME}`
    : `${APP_NAME} — Weather forecasts, beautifully clear`
  const url = new URL(path, env.siteUrl).toString()

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  )
}
