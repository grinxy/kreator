"use client"

import { FieldWrapper, ValidationError } from "@/components/ui/validation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  formData: any
  errors: any
  customProfessionError: string | null
  setCustomProfessionError: (value: string | null) => void
  updateFormData: any
  handleFieldBlur: any
  openProfession: boolean
  setOpenProfession: any
  openCategory: string | null
  setOpenCategory: any
  filteredProfessions: Record<string, string[]>
}

export function RegistrationProfession({
  formData,
  errors,
  customProfessionError,
  setCustomProfessionError,
  updateFormData,
  handleFieldBlur,
  openProfession,
  setOpenProfession,
  openCategory,
  setOpenCategory,
  filteredProfessions,
}: Props) {
  return (
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
            className={cn(
              "w-full justify-between font-semibold text-foreground cursor-pointer",
              "overflow-hidden",
              !formData.profession && "text-muted-foreground",
              errors.profession && "border-red-300 focus:border-red-500"
            )}
          >
            <span className="truncate">
              {formData.profession || "Selecciona tu profesión"}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-80" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "border border-[var(--kreator-gray-dark)] rounded-md bg-white text-left cursor-pointer",
            "w-[var(--radix-popover-trigger-width)] max-w-[90vw] max-h-[360px]",
            "shadow-sm overflow-auto p-0"
          )}
        >
          <div className="p-2 space-y-2">
            <Input
              id="professionSearch"
              placeholder="Buscar profesión..."
              className="w-full mb-2"
              onChange={e => updateFormData("professionSearch", e.target.value)}
              value={formData.professionSearch || ""}
              tabIndex={0}
            />

            <div className="divide-y divide-[var(--kreator-gray-dark)]/20">
              {Object.keys(filteredProfessions).map(category => {
                const isOpen =
                  (formData.professionSearch || "").length > 0 ||
                  openCategory === category

                return (
                  <div key={category}>
                    <button
                      type="button"
                      onClick={() => setOpenCategory(isOpen ? null : category)}
                      className="flex w-full items-start bg-white py-1.5 px-2 text-sm text-[var(--kreator-gray-dark)] hover:bg-[var(--kreator-yellow)]/40"
                    >
                      <span className="flex-1 text-left leading-snug font-semibold">
                        {category}
                      </span>
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
                            className={cn(
                              "flex w-full items-center text-left text-sm text-[var(--kreator-gray-dark)] cursor-pointer",
                              "border border-[var(--kreator-gray-dark)]/20 rounded-md py-1.5 px-2",
                              "hover:bg-[var(--kreator-yellow)]/40"
                            )}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.profession === profession
                                  ? "opacity-100"
                                  : "opacity-0"
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

            {/* Otros */}
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
            className={
              customProfessionError ? "border-red-300 focus:border-red-500" : ""
            }
            required
          />
          {customProfessionError && (
            <ValidationError
              message={customProfessionError}
              variant="error"
              size="sm"
            />
          )}
        </div>
      )}
    </FieldWrapper>
  )
}
