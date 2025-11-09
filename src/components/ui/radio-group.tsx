"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("flex gap-6 items-center", className)} {...props} />
  )
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // base structure
        "relative inline-flex items-center justify-center rounded-full border border-[var(--kreator-blue)] transition-colors",
        // size and accessibility
        "size-4 shrink-0 aspect-square cursor-pointer",
        // states
        "data-[state=checked]:bg-[var(--kreator-blue)] data-[state=checked]:border-[var(--kreator-blue)]",
        "hover:border-[var(--kreator-blue-dark)] disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-[var(--kreator-orange)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CircleIcon
          className="size-2 fill-white"
          stroke="none"
          aria-hidden="true"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}


export { RadioGroup, RadioGroupItem }
