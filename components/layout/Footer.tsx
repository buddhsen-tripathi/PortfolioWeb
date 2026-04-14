'use client'

import { ViewCounter } from '@/components/common'
import { footerContent } from '@/data/layoutContent'

export default function Footer() {
  return (
    <footer className="border-t border-muted-foreground/10">
      <div className="max-w-[800px] mx-auto px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {footerContent.ownerName}
          </p>
          <ViewCounter type="visitors" readOnly={false} />
        </div>
      </div>
    </footer>
  )
}
