"use client"

import { useEffect, useRef } from "react"
import { useState } from "react"
import { forwardRef } from "react"
import { professionsData, regionsData, regions } from "@/data/registration"
import { useRegistrationForm } from "@/hooks/use-registration"
import { useSearchFilter } from "@/hooks/use-search"
import { RegistrationPersonalInfo } from "@/components/registration/form/RegistrationPersonalInfo"
import { RegistrationProfession } from "@/components/registration/form/RegistrationProfession"
import { RegistrationZone } from "@/components/registration/form/RegistrationZone"
import { RegistrationPreferences } from "@/components/registration/form/RegistrationPreferences"
import { RegistrationSubmit } from "@/components/registration/form/RegistrationSubmit"
import { RegistrationAddress } from "@/components/registration/form/RegistrationAddress"

type Props = {
  initialInterestedInLeadership?: boolean
  onFinishedRegistrationForm: (data: { userId: string; email: string; name: string }) => void
}

export const RegistrationForm = forwardRef<HTMLFormElement, Props>(
  ({ initialInterestedInLeadership = false, onFinishedRegistrationForm }, ref) => {
    const [openZone, setOpenZone] = useState(false)
    const [openProfession, setOpenProfession] = useState(false)
    const [openCategory, setOpenCategory] = useState<string | null>(null)
    const [openProvinceKey, setOpenProvinceKey] = useState<string | null>(null)
    const [customProfessionError, setCustomProfessionError] = useState<string | null>(null)

    const { formData, errors, isSubmitting, submitError, updateFormData, handleFieldBlur, handleSubmit, hasSubmitted } =
      useRegistrationForm(initialInterestedInLeadership)

    const popoverZoneRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!formData.zoneSearch) return
      const firstMatch = popoverZoneRef.current?.querySelector("button")
      if (firstMatch) {
        firstMatch.scrollIntoView()
      }
    }, [formData.zoneSearch])

    const { filterNestedData } = useSearchFilter()
    const filteredProfessions = filterNestedData(professionsData, formData.professionSearch || "")

    return (
      <form
        ref={ref}
        onSubmit={async e => {
          e.preventDefault()
          setCustomProfessionError(null)

          // Validation of the "Others" field
          if (formData.profession === "Otros" && !formData.customProfession?.trim()) {
            setCustomProfessionError("Por favor, especifica tu profesión.")
            return
          }

          const result = await handleSubmit(e)

          if (!result) return

          //  Here we connect to RegistrationSection → active Step 2 (Stripe)
          onFinishedRegistrationForm(result)
        }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg mx-auto p-4 sm:p-6 md:p-8 space-y-2"
        noValidate
        aria-label="Formulario de registro a la comunidad Kreator"
      >

        <RegistrationPersonalInfo
          formData={formData}
          errors={errors}
          updateFormData={updateFormData}
          handleFieldBlur={handleFieldBlur}
        />

        <RegistrationAddress
          formData={formData}
          errors={errors}
          hasSubmitted={hasSubmitted}
          updateFormData={updateFormData}
          handleFieldBlur={handleFieldBlur}
        />

        <fieldset>
          <legend className="sr-only">Información profesional</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RegistrationProfession
              formData={formData}
              errors={errors}
              customProfessionError={customProfessionError}
              setCustomProfessionError={setCustomProfessionError}
              updateFormData={updateFormData}
              handleFieldBlur={handleFieldBlur}
              openProfession={openProfession}
              setOpenProfession={setOpenProfession}
              openCategory={openCategory}
              setOpenCategory={setOpenCategory}
              filteredProfessions={filteredProfessions}
            />

            <RegistrationZone
              formData={formData}
              errors={errors}
              updateFormData={updateFormData}
              handleFieldBlur={handleFieldBlur}
              openZone={openZone}
              setOpenZone={setOpenZone}
              openProvinceKey={openProvinceKey}
              setOpenProvinceKey={setOpenProvinceKey}
              regions={regions}
              regionsData={regionsData}
              filterNestedData={filterNestedData}
              popoverZoneRef={popoverZoneRef}
            />
          </div>
        </fieldset>

        <RegistrationPreferences formData={formData} errors={errors} updateFormData={updateFormData} />

        <RegistrationSubmit isSubmitting={isSubmitting} submitError={submitError} />
      </form>
    )
  }
)

RegistrationForm.displayName = "RegistrationForm"
