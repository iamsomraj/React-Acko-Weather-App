import { ReactNode } from 'react'

interface HighlighterProps {
  children: ReactNode
}

export function Highlighter({ children }: HighlighterProps) {
  /**
   * basic reusable text highlighter component
   */
  return (
    <span className="italic text-green-500 text-md font-bold tracking-wide">
      {children}
    </span>
  )
}

export default Highlighter
