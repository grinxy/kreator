import Header from "@/components/layout/header"
import HeroSection from "@/components/home-sections/hero/hero-section"
import FeaturesSection from "@/components/home-sections/features/features-section"
import { CTASection } from "@/components/home-sections/cta/cta-section"
import TestimonialsSection from "@/components/home-sections/testimonial/testimonials-section"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
