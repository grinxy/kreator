import {CookiesPolicy}  from "@/components/legal/cookies-policy"
import {Header} from "@/components/layout/header"
import {Footer} from "@/components/layout/footer"

export default function CookiesPolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CookiesPolicy />
      <Footer />
    </main>
  )
}
