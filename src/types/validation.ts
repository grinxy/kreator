export interface ValidationErrorProps {
  message: string
  variant?: "error" | "warning" | "info" | "success"
  size?: "sm" | "md"
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

export type ValidationVariant = "error" | "warning" | "info" | "success"
export type ValidationSize = "sm" | "md"