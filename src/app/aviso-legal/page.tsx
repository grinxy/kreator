import LegalNotice from "@/components/legal/LegalNotice"
import Header from "@/components/layout/header"
import {Footer} from "@/components/layout/footer"

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <LegalNotice />
      <Footer />
    </main>
  )
}
