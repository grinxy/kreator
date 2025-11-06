import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none font-heading",
  {
    variants: {
      variant: {
        default: "bg-kreator-yellow text-kreator-blue font-medium rounded-md transition-all duration-200 hover:bg-kreator-orange hover:scale-105",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 ",
        outline:
          "border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-500 hover:scale-105 transition-all duration-200 text-sm md:text-base font-semibold",
        primary:
          "bg-kreator-yellow text-kreator-blue rounded-lg hover:bg-orange-500 hover:scale-105 transition-all duration-200 text-lg font-semibold",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "bg-kreator-yellow text-kreator-blue font-bold rounded-lg px-8 py-6 text-lg transition-all duration-200 hover:bg-kreator-orange hover:scale-105",
        navbar:
          "bg-kreator-yellow text-kreator-blue font-medium rounded-md transition-all duration-200 hover:bg-kreator-orange hover:scale-105",
        legal:
          "bg-kreator-yellow text-kreator-blue font-medium rounded-md transition-all duration-200 hover:bg-kreator-orange hover:scale-105",
        form:
          "w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-3 text-lg cursor-pointer",
          
        profileYellow:
          "w-full bg-kreator-yellow text-kreator-blue font-semibold py-6 text-base md:text-lg rounded-lg transition-all duration-200 hover:bg-kreator-orange hover:scale-105",

        profileBlue:
          "w-full bg-kreator-blue text-white font-semibold py-6 text-base md:text-lg rounded-lg transition-all duration-200 hover:bg-kreator-blue hover:scale-105",
        outlineGray:
          "border border-[var(--kreator-gray-dark)] text-[var(--kreator-gray-dark)] rounded-md font-normal text-base transition-all duration-200 hover:bg-[var(--kreator-yellow)]/50 hover:text-[var(--kreator-gray-dark)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kreator-gray-dark)] cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return <Comp ref={ref} data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
