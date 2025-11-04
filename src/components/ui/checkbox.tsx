"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "mt-0.5 flex items-center justify-center",
        "size-5 rounded-md border border-[var(--kreator-gray-dark)]/50 bg-transparent shadow-sm transition-[color,box-shadow,border-color]",
        "hover:bg-[var(--kreator-gray-light)]/50 hover:border-[var(--kreator-gray-dark)] cursor-pointer",
        "focus-visible:border-[var(--kreator-blue)] focus-visible:ring-2 focus-visible:ring-[color-mix(in oklch,var(--kreator-blue)_40%,transparent)] focus-visible:ring-offset-1",
        "data-[state=checked]:bg-[var(--kreator-blue)] data-[state=checked]:border-[var(--kreator-blue)] data-[state=checked]:text-white",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-3.5 w-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
