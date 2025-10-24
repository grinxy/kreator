export interface BaseAuthErrors {
  email?: string
  general?: string
}

export interface AuthFormData {
  email: string
}

export interface EmailFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export interface PasswordFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  showStrength?: boolean
}

export interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

export interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}