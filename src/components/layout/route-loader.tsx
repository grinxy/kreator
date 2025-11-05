"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "@/components/ui/loader"

export function RouteLoader() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // No tenemos router.events en el App Router,
    // así que usamos el evento de navegación manualmente
    const handleStart = () => setLoading(true)
    const handleStop = () => setLoading(false)

    // Patch temporal para simular loading global
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes("routeChange")) {
          setLoading(false)
        }
      }
    })

    observer.observe({ entryTypes: ["navigation"] })

    return () => {
      observer.disconnect()
    }
  }, [])

  if (!loading) return null
  return <Loader />
}
