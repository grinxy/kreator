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
        // Tamaño y forma consistente
        "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-[var(--kreator-gray-dark)]/50",
        "bg-transparent shadow-sm transition-colors duration-150 cursor-pointer",
        // Estados
        "hover:bg-[var(--kreator-gray-light)]/40 hover:border-[var(--kreator-gray-dark)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in oklch,var(--kreator-blue)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:border-[var(--kreator-blue)]",
        "data-[state=checked]:bg-[var(--kreator-blue)] data-[state=checked]:border-[var(--kreator-blue)] data-[state=checked]:text-white",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-3 w-3" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
