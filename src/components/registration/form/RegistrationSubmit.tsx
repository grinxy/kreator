"use client"

import { Button } from "@/components/ui/button"

type Props = {
  isSubmitting: boolean
  submitError: string | null
}

export function RegistrationSubmit({ isSubmitting, submitError }: Props) {
  return (
    <>
      <div className="pt-4">
        {submitError && (
          <p
            className="mb-4 text-sm text-center text-red-700 bg-red-50 border border-red-200 rounded-md py-2 px-3 font-medium"
            role="alert"
          >
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="cta"
          className="w-full bg-[var(--kreator-yellow)] hover:bg-[var(--kreator-yellow)]/90 text-primary font-semibold py-3 text-lg cursor-pointer"
        >
          {isSubmitting ? "Enviando..." : "Únete a la Comunidad"}
        </Button>
      </div>

      <p className="text-sm text-gray-500 text-center" aria-live="polite">
        Los campos marcados con * son obligatorios
      </p>
    </>
  )
}
