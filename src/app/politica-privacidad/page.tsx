import { PrivacyPolicy } from "@/components/legal/privacy-policy"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PrivacyPolicy />
      <Footer />
    </main>
  )
}
