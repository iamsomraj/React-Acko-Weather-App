import type { ReactNode } from 'react'

/** Shared layout for long-form content pages. */
export function ProsePage({
  title,
  lead,
  children,
}: {
  title: string
  lead: string
  children: ReactNode
}) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <header className="mb-10 space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="text-lg text-pretty text-muted-foreground">{lead}</p>
      </header>
      <div className="space-y-8 leading-7 text-foreground/90 [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  )
}
