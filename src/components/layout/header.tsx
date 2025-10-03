import { Navbar } from "@/components/layout/navbar"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Navbar />
    </header>
  )
}

export default Header
