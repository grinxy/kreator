"use client"

import { FieldWrapper } from "@/components/ui/validation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { RefObject } from "react"

type Props = {
  formData: any
  errors: any
  updateFormData: any
  handleFieldBlur: any
  openZone: boolean
  setOpenZone: any
  openProvinceKey: string | null
  setOpenProvinceKey: any
  regions: string[]
  regionsData: any
  filterNestedData: any
  popoverZoneRef: RefObject<HTMLDivElement | null>
}

export function RegistrationZone({
  formData,
  errors,
  updateFormData,
  handleFieldBlur,
  openZone,
  setOpenZone,
  openProvinceKey,
  setOpenProvinceKey,
  regions,
  regionsData,
  filterNestedData,
  popoverZoneRef,
}: Props) {
  return (
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
            <span className="truncate">{formData.zone?.comarca || "Selecciona tu zona"}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "border border-[var(--kreator-gray-dark)] rounded-md bg-white cursor-pointer",
            "w-[var(--radix-popover-trigger-width)] max-w-[90vw] max-h-[360px]",
            "shadow-sm overflow-auto p-0"
          )}
        >
          <div ref={popoverZoneRef} className="p-2 space-y-2">
            <Input
              id="zoneSearch"
              placeholder="Buscar comarca o provincia..."
              className="w-full mb-2"
              onChange={e => updateFormData("zoneSearch", e.target.value)}
              value={formData.zoneSearch || ""}
              tabIndex={0}
            />

            <div className="space-y-3">
              {regions.map(region => {
                const provincesObj = regionsData[region]
                if (!provincesObj) return null

                const filteredProvinces = filterNestedData(provincesObj, formData.zoneSearch || "")

                return (
                  <div key={region} className="space-y-1">
                    <p className="px-2 py-1 text-sm font-semibold uppercase tracking-wide text-[var(--kreator-blue)]">
                      {region}
                    </p>

                    {Object.keys(filteredProvinces).map(province => {
                      const provinceKey = `${region}-${province}`
                      const isOpenProvince = (formData.zoneSearch || "").length > 0 || openProvinceKey === provinceKey

                      return (
                        <div
                          key={provinceKey}
                          className="border border-[var(--kreator-gray-dark)]/40 rounded-md overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenProvinceKey(isOpenProvince ? null : provinceKey)}
                            className="flex w-full items-center justify-between bg-white py-1.5 px-2 text-sm font-semibold text-[var(--kreator-gray-dark)] hover:bg-[var(--kreator-yellow)]/50"
                          >
                            {province}
                            <ChevronDown
                              className={cn("h-4 w-4 transition-transform", isOpenProvince && "rotate-180")}
                            />
                          </button>

                          {isOpenProvince && (
                            <div className="bg-white px-3 pb-2 space-y-1">
                              {filteredProvinces[province].map((comarca: string) => {
                                const isSelected = formData.zone?.comarca === comarca

                                return (
                                  <button
                                    key={`${provinceKey}-${comarca}`}
                                    type="button"
                                    tabIndex={0}
                                    onClick={() => {
                                      updateFormData("zone", {
                                        region,
                                        province,
                                        comarca,
                                      })
                                      setOpenZone(false)
                                      setOpenProvinceKey(null)
                                      updateFormData("zoneSearch", "")
                                    }}
                                    className={cn(
                                      "flex w-full items-center text-left text-sm text-[var(--kreator-gray-dark)]",
                                      "hover:bg-[var(--kreator-yellow)]/50 py-1 rounded-md"
                                    )}
                                  >
                                    <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
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
  )
}
