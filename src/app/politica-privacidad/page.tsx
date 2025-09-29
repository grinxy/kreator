import PrivacyPolicy  from "@/components/legal/PrivacyPolicy"
import Header from "@/components/layout/header"
import {Footer} from "@/components/layout/footer"

export default function PrivacyPoliticyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PrivacyPolicy />
      <Footer />
    </main>
  )
}
