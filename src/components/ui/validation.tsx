import React from "react"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ValidationErrorProps {
  message: string
  variant?: "error" | "warning" | "info" | "success"
  size?: "sm" | "md" | "lg"
  className?: string
}

export interface FieldWrapperProps {
  label: string
  required?: boolean
  error?: string
  success?: string
  hint?: string
  children: React.ReactNode
}

export function ValidationError({ message, variant = "error", size = "md", className }: ValidationErrorProps) {
  const variants = {
    error: "text-red-600 bg-red-50 border-red-200",
    warning: "text-amber-600 bg-amber-50 border-amber-200",
    info: "text-blue-600 bg-blue-50 border-blue-200",
    success: "text-green-600 bg-green-50 border-green-200",
  }

  // Improved sizes - more readable and professional
  const sizes = {
    sm: "text-xs px-2.5 py-1.5", // Small but readable - 12px font, better padding
    md: "text-sm px-3 py-2", // Good default - 14px font, comfortable padding
    lg: "text-base px-4 py-2.5", // Large for important messages - 16px font
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-4 w-4",
  }

  const icons = {
    error: AlertCircle,
    warning: AlertCircle,
    info: Info,
    success: CheckCircle,
  }

  const Icon = icons[variant]

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border animate-in slide-in-from-top-1 duration-200",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <Icon className={cn(iconSizes[size], "flex-shrink-0")} aria-hidden="true" />
      <span className="leading-tight">{message}</span>
    </div>
  )
}

export function FieldWrapper({ label, required, error, success, hint, children }: FieldWrapperProps) {
  const fieldId = React.useId()
  const errorId = `${fieldId}-error`
  const successId = `${fieldId}-success`
  const hintId = `${fieldId}-hint`

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="obligatorio">
            *
          </span>
        )}
      </label>

      {children}

      <div>
        {error && (
          <div id={errorId} role="alert" aria-live="polite">
            <ValidationError message={error} variant="error" size="md" />
          </div>
        )}
        {success && (
          <div id={successId} role="status" aria-live="polite">
            <ValidationError message={success} variant="success" size="md" />
          </div>
        )}
        {hint && !error && !success && (
          <p id={hintId} className="text-sm text-gray-500 px-1">
            {hint}
          </p>
        )}
      </div>
    </div>
  )
}
