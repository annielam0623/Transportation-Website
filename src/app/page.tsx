// src/app/page.tsx
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
