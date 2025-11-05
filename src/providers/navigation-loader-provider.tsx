"use client"

import { createContext, useContext, useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Loader } from "@/components/ui/loader"

interface NavigationLoaderContextProps {
  showLoader: () => void
  hideLoader: () => void
}

const NavigationLoaderContext = createContext<NavigationLoaderContextProps>({
  showLoader: () => {},
  hideLoader: () => {},
})

export function NavigationLoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const manualTrigger = useRef(false)

  const showLoader = () => {
    manualTrigger.current = true
    // Wait 400 ms before displaying the loader
    timerRef.current = setTimeout(() => {
      setLoading(true)
    }, 400)
  }

  const hideLoader = () => {
    manualTrigger.current = false
    if (timerRef.current) clearTimeout(timerRef.current)
    setLoading(false)
  }

  // When the path changes → close loader if it was open
  useEffect(() => {
    if (manualTrigger.current) {
      hideLoader()
    }
  }, [pathname])

  return (
    <NavigationLoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && <Loader />}
    </NavigationLoaderContext.Provider>
  )
}

export const useNavigationLoader = () => useContext(NavigationLoaderContext)
