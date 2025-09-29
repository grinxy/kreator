import { RegistrationSection } from "@/components/registration/registration-section"
import Header from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function RegistroPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <RegistrationSection />
      <Footer />
    </main>
  )
}
