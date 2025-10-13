import { LoginSection } from "@/components/login/login-section"
import Header from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <LoginSection />
      <Footer />
    </main>
  )
}
