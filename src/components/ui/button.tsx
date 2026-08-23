import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marine focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-marine text-white hover:bg-marine/90 shadow-sm",
        destructive: "bg-danger text-white hover:bg-danger/90 shadow-sm",
        outline: "border border-mist bg-surface hover:bg-slate/5 text-ink",
        secondary: "bg-slate/10 text-ink hover:bg-slate/20",
        ghost: "hover:bg-slate/10 hover:text-ink",
        link: "text-marine underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 py-1 text-xs",
        sm: "h-7 rounded-md px-2 text-xs",
        lg: "h-9 rounded-lg px-4 text-sm",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
