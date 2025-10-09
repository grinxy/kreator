import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ValidationErrorProps, FieldWrapperProps } from "@/types/validation"

export function ValidationError({ 
  message, 
  variant = "error", 
  size = "sm",
  className 
}: ValidationErrorProps) {
  const variants = {
    error: "text-red-600 bg-red-50 border-red-200",
    warning: "text-amber-600 bg-amber-50 border-amber-200", 
    info: "text-blue-600 bg-blue-50 border-blue-200",
    success: "text-green-600 bg-green-50 border-green-200"
  }

  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-2"
  }

  const icons = {
    error: AlertCircle,
    warning: AlertCircle,
    info: Info,
    success: CheckCircle
  }

  const Icon = icons[variant]

  return (
    <div className={cn(
      "flex items-center gap-1.5 rounded-md border animate-in slide-in-from-top-1 duration-200",
      variants[variant],
      sizes[size],
      className
    )}>
      <Icon className="h-3 w-3 flex-shrink-0" />
      <span className="text-xs leading-tight">{message}</span>
    </div>
  )
}

export function FieldWrapper({ 
  label, 
  required, 
  error, 
  success, 
  hint, 
  children 
}: FieldWrapperProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {children}
      
      <div className="min-h-[20px] space-y-1">
        {error && <ValidationError message={error} variant="error" />}
        {success && <ValidationError message={success} variant="success" />}
        {hint && !error && !success && (
          <p className="text-xs text-gray-500">{hint}</p>
        )}
      </div>
    </div>
  )
}