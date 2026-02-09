import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface LinkTextProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
}

export default function LinkText({ href, children, className = "", target }: LinkTextProps) {
  const isExternal = href.startsWith('http')
  const linkTarget = target ?? (isExternal ? '_blank' : undefined)
  const rel = linkTarget === '_blank' ? 'noopener noreferrer' : undefined

  return (
    <Link
      href={href}
      target={linkTarget}
      rel={rel}
      className={`relative inline-flex items-center gap-0.5 text-sm font-normal transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:gap-1 hover:text-primary hover:after:w-full ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  )
}
