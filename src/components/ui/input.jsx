import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-full border border-silver/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric focus-visible:border-electric disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
