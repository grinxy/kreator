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
        "cursor-pointer relative flex items-center justify-center rounded-full border transition-all duration-200",
        "size-4 shrink-0 aspect-square",
        "border-[var(--kreator-blue)]",
        "data-[state=checked]:border-[var(--kreator-blue)] data-[state=checked]:bg-[var(--kreator-blue)]",
        "hover:border-[var(--kreator-blue-dark)]",
        "disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-[var(--kreator-orange)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CircleIcon
          className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-white"
          stroke="none"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
