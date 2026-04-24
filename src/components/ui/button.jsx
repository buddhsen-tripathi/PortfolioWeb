"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { vibrateLight } from "@/lib/haptics";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-cera text-sm transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-black/10 bg-black/4 text-foreground hover:bg-black/8 dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/12 button-highlighted-shadow",
        noShadow:
          "border border-black/10 bg-black/4 text-foreground dark:border-white/10 dark:bg-white/6",
        link: "underline-offset-4 hover:underline text-foreground",
        neutral:
          "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 button-highlighted-shadow",
        outline:
          "border border-black/10 bg-transparent text-foreground hover:bg-black/4 dark:border-white/10 dark:hover:bg-white/6",
        ghost:
          "hover:bg-black/4 text-foreground dark:hover:bg-white/6",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const handleClick = (e) => {
      vibrateLight();
      onClick?.(e);
    };
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
