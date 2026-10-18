"use client"

import { useEffect, useState, type ComponentProps } from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  const [position, setPosition] = useState<ToasterProps["position"]>("top-right")

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = (e: MediaQueryList | MediaQueryListEvent) =>
      setPosition(e.matches ? "top-center" : "top-right")
    update(mq)
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position={position}
      expand={false}
      richColors={false}
      style={{ fontFamily: "inherit" }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-start gap-3 w-[356px] rounded-lg border border-border bg-popover/95 p-4 text-foreground shadow-lg backdrop-blur-md",
          icon: "mt-0.5 shrink-0",
          content: "flex flex-col gap-0.5 flex-1 min-w-0",
          title: "text-[13px] font-medium leading-tight",
          description: "font-mono text-[11px] text-muted-foreground leading-snug",
          actionButton:
            "mt-2 h-6 shrink-0 rounded-md border border-border bg-muted/50 px-2 text-[12px] font-medium text-foreground",
          cancelButton:
            "mt-2 h-6 shrink-0 rounded-md border border-border bg-transparent px-2 text-[12px] text-foreground",
          closeButton:
            "absolute right-2 top-2 rounded-md border border-border bg-background text-foreground",
          error:
            "border-destructive/30! bg-destructive/10! text-foreground!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
