"use client"

import { useEffect, useRef } from "react"
import { useState } from "react"
import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldWrapper, ValidationError } from "@/components/ui/validation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { professionsData, regionsData, regions } from "@/data/registration"
import { useRegistrationForm } from "@/hooks/use-registration"
import { RegistrationSuccess } from "@/components/registration/RegistrationSuccess"
import { useSearchFilter } from "@/hooks/use-search"

type Props = {
  initialInterestedInLeadership?: boolean
}

export const RegistrationForm = forwardRef<HTMLFormElement, Props>(({ initialInterestedInLeadership = false }, ref) => {
  const [openZone, setOpenZone] = useState(false)
  const [openProfession, setOpenProfession] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openProvinceKey, setOpenProvinceKey] = useState<string | null>(null)
  const [customProfessionError, setCustomProfessionError] = useState<string | null>(null)

  const {
    formData,
    errors,
    isSubmitting,
    registrationSuccess,
    userEmail,
    submitError,
    updateFormData,
    handleFieldBlur,
    handleSubmit,
    resetForm,
  } = useRegistrationForm(initialInterestedInLeadership)

  const popoverZoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!formData.zoneSearch) return
    const firstMatch = popoverZoneRef.current?.querySelector("button")
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [formData.zoneSearch])

  const { filterNestedData } = useSearchFilter()
  const filteredProfessions = filterNestedData(professionsData, formData.professionSearch || "")

  if (registrationSuccess) {
    return <RegistrationSuccess email={userEmail} onClose={resetForm} />
  }

  return (
    <form
      ref={ref}
      onSubmit={e => {
        e.preventDefault()
        setCustomProfessionError(null)

        // If you select "Other" and leave the field blank, we will flag the error.
        if (formData.profession === "Otros" && !formData.customProfession?.trim()) {
          setCustomProfessionError("Por favor, especifica tu profesión.")
        }

        handleSubmit(e)
      }}
      className="w-full max-w-3xl bg-white rounded-xl shadow-lg mx-auto p-4 sm:p-6 md:p-8 space-y-2"
      noValidate
      aria-label="Formulario de registro a la comunidad Kreator"
    >
      <fieldset>
        <legend className="sr-only">Información personal</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper label="Nombre" required error={errors.firstName}>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={e => updateFormData("firstName", e.target.value)}
              onBlur={() => handleFieldBlur("firstName")}
              className={errors.firstName ? "border-red-300 focus:border-red-500" : ""}
              placeholder="Tu nombre"
              aria-required="true"
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              autoComplete="given-name"
            />
          </FieldWrapper>

          <FieldWrapper label="Apellidos" required error={errors.lastName}>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={e => updateFormData("lastName", e.target.value)}
              onBlur={() => handleFieldBlur("lastName")}
              className={errors.lastName ? "border-red-300 focus:border-red-500" : ""}
              placeholder="Tus apellidos"
              aria-required="true"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              autoComplete="family-name"
            />
          </FieldWrapper>
        </div>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Información de contacto</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper label="Email" required error={errors.email}>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => updateFormData("email", e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              className={errors.email ? "border-red-300 focus:border-red-500" : ""}
              placeholder="tu@email.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : "email-description"}
              autoComplete="email"
            />
            <div id="email-description" className="sr-only">
              Introduce un email válido con formato usuario@dominio.extensión
            </div>
          </FieldWrapper>

          <FieldWrapper label="Teléfono" required error={errors.phone}>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={e => updateFormData("phone", e.target.value)}
              onBlur={() => handleFieldBlur("phone")}
              className={errors.phone ? "border-red-300 focus:border-red-500" : ""}
              placeholder="600 000 000"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : "phone-description"}
              autoComplete="tel"
            />
            <div id="phone-description" className="sr-only">
              Introduce un teléfono con al menos 9 dígitos
            </div>
          </FieldWrapper>

          <FieldWrapper label="NIF/CIF/NIE" required error={errors.nifCif}>
            <Input
              id="nifCif"
              type="text"
              value={formData.nifCif || ""}
              onChange={e => updateFormData("nifCif", e.target.value.toUpperCase())}
              onBlur={() => handleFieldBlur("nifCif")}
              className={errors.nifCif ? "border-red-300 focus:border-red-500" : ""}
              placeholder="12345678Z · A12345674 · X1234567L"
              aria-required="true"
              aria-invalid={!!errors.nifCif}
              aria-describedby={errors.nifCif ? "nifCif-error" : "nifCif-description"}
              maxLength={9}
            />
            <div id="nifCif-description" className="sr-only">
              Introduce tu NIF (DNI), CIF de empresa o NIE.
            </div>
          </FieldWrapper>
        </div>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Información profesional</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PROFESSION: Category + sub-profession */}
          <FieldWrapper label="Profesión" required error={errors.profession}>
            <Popover
              open={openProfession}
              onOpenChange={open => {
                setOpenProfession(open)
                if (!open && formData.profession) handleFieldBlur("profession")
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outlineGray"
                  role="combobox"
                  aria-expanded={openProfession}
                  aria-required="true"
                  aria-invalid={!!errors.profession}
                  aria-describedby={errors.profession ? "profession-error" : undefined}
                  className={cn(
                    "w-full justify-between font-semibold text-foreground cursor-pointer",
                    "overflow-hidden",
                    !formData.profession && "text-muted-foreground",
                    errors.profession && "border-red-300 focus:border-red-500"
                  )}
                >
                  <span className="truncate">{formData.profession || "Selecciona tu profesión"}</span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-80" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className={cn(
                  "border border-[var(--kreator-gray-dark)] rounded-md bg-white text-left cursor-pointer",
                  "w-[var(--radix-popover-trigger-width)] max-w-[90vw] max-h-[360px]",
                  "shadow-sm overflow-auto p-0"
                )}
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <div className="p-2 space-y-2">
                  {/* 🔍 Search */}
                  <Input
                    id="professionSearch"
                    placeholder="Buscar profesión..."
                    className="w-full mb-2"
                    onChange={e => updateFormData("professionSearch", e.target.value)}
                    value={formData.professionSearch || ""}
                    tabIndex={0}
                    aria-label="Buscar profesión"
                    onKeyDown={e => {
                      if (e.key === "Escape") {
                        e.preventDefault()
                        setOpenProfession(false)
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault()
                        // Forces focus to the first button within the open popover
                        const content = document.querySelector<HTMLElement>("[data-slot='popover-content']")
                        const firstButton = content?.querySelector<HTMLButtonElement>("button")
                        firstButton?.focus()
                      }
                    }}
                  />

                  {/* Filtered list */}
                  <div className="divide-y divide-[var(--kreator-gray-dark)]/20">
                    {Object.keys(filteredProfessions).map(category => {
                      const isOpen = (formData.professionSearch || "").length > 0 || openCategory === category

                      return (
                        <div key={category}>
                          <button
                            type="button"
                            onClick={() => setOpenCategory(isOpen ? null : category)}
                            className="flex w-full items-start bg-white py-1.5 px-2 text-sm text-[var(--kreator-gray-dark)] hover:bg-[var(--kreator-yellow)]/40 transition cursor-pointer"
                          >
                            <span className="flex-1 text-left leading-snug font-semibold">{category}</span>
                            <ChevronDown
                              className={cn(
                                "ml-2 h-4 w-4 mt-[2px] flex-shrink-0 transition-transform",
                                isOpen && "rotate-180"
                              )}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-3 pb-2 space-y-1">
                              {filteredProfessions[category].map(profession => (
                                <button
                                  key={profession}
                                  type="button"
                                  tabIndex={0}
                                  onClick={() => {
                                    updateFormData("profession", profession)
                                    updateFormData("professionSearch", "")
                                    setOpenProfession(false)
                                    setOpenCategory(null)
                                  }}
                                  onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault()
                                      updateFormData("profession", profession)
                                      updateFormData("professionSearch", "")
                                      setOpenProfession(false)
                                      setOpenCategory(null)
                                    } else if (e.key === "Escape") {
                                      e.preventDefault()
                                      setOpenProfession(false)
                                    }
                                  }}
                                  className={cn(
                                    "flex w-full items-center text-left text-sm text-[var(--kreator-gray-dark)] cursor-pointer",
                                    "border border-[var(--kreator-gray-dark)]/20 rounded-md py-1.5 px-2",
                                    "hover:bg-[var(--kreator-yellow)]/40 focus:bg-[var(--kreator-yellow)]/40",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kreator-blue)] focus-visible:ring-offset-2",
                                    "transition"
                                  )}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.profession === profession ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {profession}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* "Other" option */}
                  <div className="pt-2 border-t border-[var(--kreator-gray-dark)]/20">
                    <button
                      type="button"
                      onClick={() => {
                        updateFormData("profession", "Otros")
                        setOpenProfession(false)
                      }}
                      className="w-full text-left text-sm px-3 py-1.5 rounded-md hover:bg-[var(--kreator-yellow)]/40 font-medium text-[var(--kreator-gray-dark)]"
                    >
                      Otros (especifica tu profesión)
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Additional field if you select "Other" */}
            {formData.profession === "Otros" && (
              <div className="mt-2">
                <Label htmlFor="customProfession">Especifica tu profesión</Label>
                <Input
                  id="customProfession"
                  placeholder="Ej. Consultoría en sostenibilidad"
                  value={formData.customProfession || ""}
                  onChange={e => {
                    updateFormData("customProfession", e.target.value)
                    if (customProfessionError) setCustomProfessionError(null)
                  }}
                  className={customProfessionError ? "border-red-300 focus:border-red-500" : ""}
                  required
                />
                {customProfessionError && <ValidationError message={customProfessionError} variant="error" size="sm" />}
              </div>
            )}
          </FieldWrapper>

          <FieldWrapper label="Zona/Región" required error={errors.zone}>
            <Popover
              open={openZone}
              onOpenChange={open => {
                setOpenZone(open)
                if (!open && formData.zone) handleFieldBlur("zone")
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outlineGray"
                  role="combobox"
                  aria-expanded={openZone}
                  className={cn(
                    "w-full justify-between font-semibold text-foreground",
                    "overflow-hidden",
                    !formData.zone && "text-muted-foreground",
                    errors.zone && "border-red-300 focus:border-red-500"
                  )}
                >
                  <span className="truncate ">{formData.zone?.comarca || "Selecciona tu zona"}</span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className={cn(
                  "border border-[var(--kreator-gray-dark)] rounded-md bg-white cursor-pointer",
                  "w-[var(--radix-popover-trigger-width)] max-w-[90vw] max-h-[360px]",
                  "shadow-sm overflow-auto p-0"
                )}
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <div ref={popoverZoneRef} className="p-2 space-y-2">
                  {/* 🔍 Search */}
                  <Input
                    id="zoneSearch"
                    placeholder="Buscar comarca o provincia..."
                    className="w-full mb-2"
                    onChange={e => updateFormData("zoneSearch", e.target.value)}
                    value={formData.zoneSearch || ""}
                    tabIndex={0}
                    aria-label="Buscar comarca o provincia"
                    onKeyDown={e => {
                      if (e.key === "Escape") {
                        e.preventDefault()
                        setOpenZone(false)
                        setOpenProvinceKey(null)
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault()
                        const firstButton = popoverZoneRef.current?.querySelector<HTMLButtonElement>("button")
                        firstButton?.focus()
                      }
                    }}
                  />

                  <div className="space-y-3">
                    {regions.map(region => {
                      const provincesObj = regionsData[region]
                      if (!provincesObj) return null

                      // Filtering with the common utility
                      const filteredProvinces = filterNestedData(provincesObj, formData.zoneSearch || "")

                      return (
                        <div key={region} className="space-y-1">
                          <p className="px-2 py-1 text-sm font-semibold uppercase tracking-wide text-[var(--kreator-blue)]">
                            {region}
                          </p>

                          {Object.keys(filteredProvinces).map(province => {
                            const provinceKey = `${region}-${province}`
                            const isOpenProvince =
                              (formData.zoneSearch || "").length > 0 || openProvinceKey === provinceKey

                            return (
                              <div
                                key={provinceKey}
                                className="border border-[var(--kreator-gray-dark)]/40 rounded-md overflow-hidden"
                              >
                                <button
                                  type="button"
                                  onClick={() => setOpenProvinceKey(isOpenProvince ? null : provinceKey)}
                                  className="flex w-full items-center justify-between bg-white py-1.5 px-2 text-sm font-semibold text-[var(--kreator-gray-dark)] hover:bg-[var(--kreator-yellow)]/50 transition cursor-pointer"
                                >
                                  {province}
                                  <ChevronDown
                                    className={cn("h-4 w-4 transition-transform", isOpenProvince && "rotate-180")}
                                  />
                                </button>

                                {isOpenProvince && (
                                  <div className="bg-white pb-1">
                                    {filteredProvinces[province].map(comarca => {
                                      const isSelected = formData.zone?.comarca === comarca
                                      return (
                                        <button
                                          key={`${provinceKey}-${comarca}`}
                                          type="button"
                                          tabIndex={0}
                                          onClick={() => {
                                            updateFormData("zone", { region, province, comarca })
                                            setOpenZone(false)
                                            setOpenProvinceKey(null)
                                            updateFormData("zoneSearch", "")
                                          }}
                                          onKeyDown={e => {
                                            if (e.key === "Enter" || e.key === " ") {
                                              e.preventDefault()
                                              updateFormData("zone", { region, province, comarca })
                                              setOpenZone(false)
                                              setOpenProvinceKey(null)
                                              updateFormData("zoneSearch", "")
                                            } else if (e.key === "Escape") {
                                              e.preventDefault()
                                              setOpenZone(false)
                                              setOpenProvinceKey(null)
                                            }
                                          }}
                                          className={cn(
                                            "flex w-full items-center text-left text-sm text-[var(--kreator-gray-dark)]",
                                            "hover:bg-[var(--kreator-yellow)]/50 focus:bg-[var(--kreator-yellow)]/50",
                                            "py-1 px-3 rounded-md transition cursor-pointer",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kreator-blue)] focus-visible:ring-offset-2"
                                          )}
                                        >
                                          <Check
                                            className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
                                          />
                                          {comarca}
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </FieldWrapper>
        </div>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Preferencias adicionales</legend>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id="leadership"
              checked={formData.interestedInLeadership}
              onCheckedChange={checked => updateFormData("interestedInLeadership", checked)}
              aria-describedby="leadership-description"
            />
            <Label
              htmlFor="leadership"
              className="text-sm cursor-pointer leading-relaxed text-[var(--kreator-gray-dark)]"
            >
              <span id="leadership-description">Estoy abierto/a a asumir el rol de Jefe/a de Equipo más adelante.</span>
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={checked => updateFormData("acceptTerms", !!checked)}
              aria-required="true"
              aria-invalid={!!errors.acceptTerms}
              aria-describedby="terms-description"
              className={cn("translate-y-[1px]", errors.acceptTerms && "border-red-500")}
            />
            <div className="flex-1">
              <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed text-[var(--kreator-gray-dark)]">
                <span id="terms-description">
                  Acepto la{" "}
                  <a
                    href="/politica-privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--kreator-orange)] hover:underline font-medium"
                  >
                    Política de Privacidad
                  </a>{" "}
                  y los{" "}
                  <a
                    href="/terminos-condiciones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--kreator-orange)] hover:underline font-medium"
                  >
                    Términos y Condiciones
                  </a>
                  .{" "}
                  <span className="text-red-500" aria-label="obligatorio">
                    *
                  </span>
                </span>
              </Label>
              {errors.acceptTerms && <ValidationError message={errors.acceptTerms} variant="error" size="sm" />}
            </div>
          </div>
        </div>
      </fieldset>

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
          aria-describedby="submit-description"
        >
          {isSubmitting ? "Enviando..." : "Únete a la Comunidad"}
        </Button>

        <div id="submit-description" className="sr-only">
          {isSubmitting
            ? "Enviando formulario de registro, por favor espera"
            : "Enviar formulario de registro a la comunidad Kreator"}
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center" aria-live="polite">
        Los campos marcados con * son obligatorios
      </p>
    </form>
  )
})

RegistrationForm.displayName = "RegistrationForm"
