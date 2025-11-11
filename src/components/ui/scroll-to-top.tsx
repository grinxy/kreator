"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { IconWrapper } from "@/components/ui/icon-wrapper"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    const isOldSafari =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && /Version\/1[0-6]\./.test(navigator.userAgent) // detect Safari ≤16.x

    window.scrollTo({
      top: 0,
      behavior: isOldSafari ? "auto" : "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
      aria-label="Volver al inicio de la página"
    >
      <IconWrapper icon={ArrowUp} size="sm" aria-hidden={false} />
    </Button>
  )
}
