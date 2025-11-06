import { HeroSection } from "@/sections/home/hero/HeroSection"
import { HowItWorksSection } from "@/sections/home/how-it-works/HowItWorksSection"
import { AboutSection } from "@/sections/home/about/AboutSection"
import { ProfilesSection } from "@/sections/home/profiles/ProfilesSection"
import { BenefitsSection } from "@/sections/home/benefits/BenefitsSection"
import { FinalCtaSection } from "@/sections/home/final-cta/FinalCtaSection"
import { TestimonialsSection } from "@/sections/home/testimonial/TestimonialsSection"
import { FAQSection } from "@/sections/home/faq/FaqSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <HowItWorksSection />
        <AboutSection />
        <ProfilesSection />
        <BenefitsSection />
        <FAQSection />
        <FinalCtaSection />
        <TestimonialsSection />
      </main>
    </div>
  )
}
