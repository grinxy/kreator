"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface LocationData {
  address: string
  postalCode: string
}

interface GoogleMapsProps {
  onLocationSelect?: (location: LocationData) => void
  className?: string
}

export function GoogleMaps({ onLocationSelect, className }: GoogleMapsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mapSrc, setMapSrc] = useState(
    // Default Spain map
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6074150.307002305!2d-9.39288367659808!3d39.89478219010553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb09c7c634c5cebd%3A0x1de8a92be3c32dd7!2sSpain!5e0!3m2!1sen!2ses!4v1698765432000!5m2!1sen!2ses"
  )
  const [feedback, setFeedback] = useState<string>("")

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFeedback("❌ Por favor, escribe una ubicación o código postal")
      return
    }

    const encodedQuery = encodeURIComponent(searchQuery.trim())
    const newMapSrc = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    
    setMapSrc(newMapSrc)

    const postalCodeMatch = searchQuery.match(/\b(\d{5})\b/)
    if (postalCodeMatch && onLocationSelect) {
      onLocationSelect({
        address: searchQuery,
        postalCode: postalCodeMatch[1]
      })
      setFeedback(`✅ Ubicación encontrada: ${searchQuery}`)
    } else {
      setFeedback(`📍 Mostrando ubicación: ${searchQuery}`)
    }

    setTimeout(() => setFeedback(""), 4000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    
    // Clear previous feedback when user starts typing
    if (feedback) setFeedback("")

    // Auto-search when user types a complete postal code (5 digits)
    const postalCodeMatch = value.match(/\b(\d{5})\b/)
    if (postalCodeMatch && value.length >= 5) {
      // Small delay to avoid too many requests
      setTimeout(() => {
        if (searchQuery === value) { // Only search if input hasn't changed
          handleAutoSearch(value, postalCodeMatch[1])
        }
      }, 1000)
    }
  }

  const handleAutoSearch = (query: string, postalCode: string) => {
    const encodedQuery = encodeURIComponent(query.trim())
    const newMapSrc = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    
    setMapSrc(newMapSrc)
    
    if (onLocationSelect) {
      onLocationSelect({
        address: query,
        postalCode: postalCode
      })
    }
    
    setFeedback(`🔍 Auto-búsqueda: ${query}`)
    setTimeout(() => setFeedback(""), 3000)
  }

  const resetMap = () => {
    const defaultSpainMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6074150.307002305!2d-9.39288367659808!3d39.89478219010553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb09c7c634c5cebd%3A0x1de8a92be3c32dd7!2sSpain!5e0!3m2!1sen!2ses!4v1698765432000!5m2!1sen!2ses"
    setMapSrc(defaultSpainMap)
    setSearchQuery("")
    setFeedback("🏠 Mapa reiniciado a España")
    setTimeout(() => setFeedback(""), 2000)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-sm space-y-2">
        <p className="font-medium text-gray-700 flex items-center gap-2">
          🗺️ <strong>Referencia Visual Opcional</strong>
        </p>
        <p className="text-gray-600">
          Este mapa te ayuda a visualizar tu zona basada en el código postal, pero <strong>no es obligatorio</strong> para completar el registro.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Buscar ubicación..."
          className="flex-1"
        />
        <Button 
          type="button"
          onClick={handleSearch}
          variant="outline"
          size="sm"
        >
          🔍 Buscar
        </Button>
        <Button 
          type="button"
          onClick={resetMap}
          variant="outline"
          size="sm"
        >
          🏠
        </Button>
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div className={`text-sm p-2 rounded ${
          feedback.includes('✅') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : feedback.includes('❌')
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {feedback}
        </div>
      )}

      {/* Dynamic Google Maps Embed */}
      <div className="w-full h-64 rounded-lg overflow-hidden border bg-gray-50">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Referencia visual opcional de tu zona geográfica - Este mapa es solo para ayudarte a visualizar tu ubicación, no es obligatorio para el registro"
          aria-label="Mapa interactivo opcional que muestra una referencia visual de tu zona geográfica según el código postal introducido"
        />
      </div>

      {/* Detailed instructions - MOVED TO BOTTOM */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 <strong>Cómo usar:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Búsqueda automática:</strong> Escribe un código postal completo (5 dígitos)</li>
          <li><strong>Reiniciar:</strong> Haz clic en 🏠 para volver al mapa de España</li>
        </ul>
      </div>
    </div>
  )
}