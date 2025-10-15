import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/home-sections/hero/hero-section"
import { HowItWorksSection } from "@/components/home-sections/how-it-works/how-it-works-section"
import { AboutSection } from "@/components/home-sections/about/about-section"
import { ProfilesSection } from "@/components/home-sections/profiles/profiles-section"
import { BenefitsSection } from "@/components/home-sections/benefits/benefits-section"
import { FinalCTASection } from "@/components/home-sections/final-cta/final-cta-section"
import { TestimonialsSection } from "@/components/home-sections/testimonial/testimonials-section"
import { Footer } from "@/components/layout/footer"
import { FAQSection } from "@/components/home-sections/faq/faq-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <AboutSection />
        <ProfilesSection />
        <BenefitsSection />
        <FAQSection />
        <FinalCTASection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
