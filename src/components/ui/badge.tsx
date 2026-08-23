import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-marine focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-marine text-white hover:bg-marine/80",
        secondary:
          "border-transparent bg-slate/10 text-ink hover:bg-slate/20",
        success:
          "border-transparent bg-success-light text-success",
        warning:
          "border-transparent bg-warning-light text-warning",
        danger:
          "border-transparent bg-danger-light text-danger",
        info:
          "border-transparent bg-info-light text-info",
        outline: "text-ink border-mist",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
