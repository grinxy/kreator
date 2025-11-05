"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FieldWrapper, ValidationError } from "@/components/ui/validation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { professionsData, professionCategories, regionsData, regions } from "@/data/registration"
import { useRegistrationForm } from "@/hooks/use-registration"
import { RegistrationSuccess } from "@/components/registration/registration-success"

export function RegistrationForm() {
  const [openZone, setOpenZone] = useState(false)
  const [openProfession, setOpenProfession] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openProvinceKey, setOpenProvinceKey] = useState<string | null>(null)

  const {
    formData,
    errors,
    isSubmitting,
    registrationSuccess,
    userEmail,
    updateFormData,
    handleFieldBlur,
    handleSubmit,
    resetForm,
  } = useRegistrationForm()

  if (registrationSuccess) {
    return <RegistrationSuccess email={userEmail} onClose={resetForm} />
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl bg-white rounded-xl shadow-lg mx-auto p-4 sm:p-6 md:p-8 space-y-2"
      noValidate
      aria-label="Formulario de registro a la comunidad Kreator"
    >
      <fieldset className="space-y-4">
        <legend className="text-sm font-medium text-gray-700">
          Tipo de Registro{" "}
          <span className="text-red-500 ml-1" aria-label="obligatorio">
            *
          </span>
        </legend>
        <RadioGroup
          value={formData.role}
          onValueChange={value => updateFormData("role", value)}
          className="flex gap-6"
          aria-required="true"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="professional" id="professional" />
            <Label htmlFor="professional" className="cursor-pointer">
              Profesional
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="team-leader" id="team-leader" />
            <Label htmlFor="team-leader" className="cursor-pointer">
              Jefe de Equipo
            </Label>
          </div>
        </RadioGroup>
      </fieldset>

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

          <FieldWrapper label="NIF/CIF" required error={errors.nifCif}>
            <Input
              id="nifCif"
              type="text"
              value={formData.nifCif || ""}
              onChange={e => updateFormData("nifCif", e.target.value.toUpperCase())}
              onBlur={() => handleFieldBlur("nifCif")}
              className={errors.nifCif ? "border-red-300 focus:border-red-500" : ""}
              placeholder="12345678Z o A12345674"
              aria-required="true"
              aria-invalid={!!errors.nifCif}
              aria-describedby={errors.nifCif ? "nifCif-error" : "nifCif-description"}
              maxLength={9}
            />
            <div id="nifCif-description" className="sr-only">
              Introduce tu NIF (DNI) o CIF de empresa
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
                if (!open && formData.profession) {
                  handleFieldBlur("profession")
                }
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
                    "w-full justify-between font-normal text-foreground",
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
                  "border border-[var(--kreator-gray-dark)] rounded-md bg-white",
                  "w-full sm:w-[380px] md:w-[420px] max-w-[90vw] max-h-[300px]",
                  "shadow-sm transition-[color,box-shadow,border-color] outline-none overflow-auto p-0"
                )}
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <div className="divide-y divide-[var(--kreator-gray-dark)]/30">
                  {professionCategories.map(category => {
                    const isOpen = openCategory === category
                    return (
                      <div key={category}>
                        <button
                          type="button"
                          onClick={() => setOpenCategory(isOpen ? null : category)}
                          className="flex w-full items-center justify-between bg-white py-1.5 px-2 text-sm font-semibold text-[var(--kreator-gray-dark)] hover:bg-[var(--kreator-yellow)]/50 transition cursor-pointer"
                        >
                          {category}
                          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-2 space-y-1">
                            {professionsData[category].map(profession => (
                              <button
                                key={profession}
                                type="button"
                                onClick={() => {
                                  updateFormData("profession", profession)
                                  setOpenProfession(false)
                                  setOpenCategory(null)
                                }}
                                className="flex w-full border border-[var(--kreator-gray-dark)]/20 items-center text-left text-sm text-[var(--kreator-gray-dark)] hover:bg-[var(--kreator-yellow)]/50 py-1.5 rounded-md transition cursor-pointer"
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
              </PopoverContent>
            </Popover>
          </FieldWrapper>

          {/* AREA/REGION: Province + districts */}
          <FieldWrapper label="Zona/Región" required error={errors.zone}>
            <Popover
              open={openZone}
              onOpenChange={open => {
                setOpenZone(open)
                if (!open && formData.zone) {
                  handleFieldBlur("zone")
                }
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outlineGray"
                  role="combobox"
                  aria-expanded={openZone}
                  aria-required="true"
                  aria-invalid={!!errors.zone}
                  aria-describedby={errors.zone ? "zone-error" : undefined}
                  className={cn(
                    "w-full justify-between font-normal text-foreground",
                    "overflow-hidden",
                    !formData.zone && "text-muted-foreground",
                    errors.zone && "border-red-300 focus:border-red-500"
                  )}
                >
                  <span className="truncate">{formData.zone?.comarca || "Selecciona tu zona"}</span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className={cn(
                  "border border-[var(--kreator-gray-dark)] rounded-md bg-white",
                  "w-full sm:w-[380px] md:w-[420px] max-w-[90vw] max-h-[300px]",
                  "shadow-sm transition-[color,box-shadow,border-color] outline-none overflow-auto p-0"
                )}
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <div className="space-y-3 p-2">
                  {regions.map(region => {
                    const provincesObj = regionsData[region]
                    if (!provincesObj) return null

                    const provinces = Object.keys(provincesObj)

                    return (
                      <div key={region} className="space-y-1">
                        <p className="px-2 py-1 text-sm font-semibold uppercase tracking-wide text-[var(--kreator-blue)]">
                          {region}
                        </p>

                        <div className="space-y-1">
                          {provinces.map(province => {
                            const provinceKey = `${region}-${province}`
                            const isOpenProvince = openProvinceKey === provinceKey
                            const comarcas = provincesObj[province]

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
                                    {comarcas.map(comarca => {
                                      const isSelected = formData.zone?.comarca === comarca

                                      return (
                                        <button
                                          key={`${provinceKey}-${comarca}`}
                                          type="button"
                                          onClick={() => {
                                            updateFormData("zone", {
                                              region,
                                              province,
                                              comarca,
                                            })
                                            setOpenZone(false)
                                            setOpenProvinceKey(null)
                                          }}
                                          className="flex w-full items-center text-left text-sm text-[var(--kreator-gray-dark)] hover:bg-[var(--kreator-yellow)]/50 py-1 px-3 transition cursor-pointer"
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
                      </div>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </FieldWrapper>
        </div>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Preferencias adicionales</legend>
        <div className="space-y-4">
          {formData.role === "professional" && (
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
                <span id="leadership-description">Estoy abierto/a a asumir el rol de Jefe de Equipo más adelante.</span>
              </Label>
            </div>
          )}

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
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="cta"
          className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-3 text-lg cursor-pointer"
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
}
