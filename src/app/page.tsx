// src/app/page.tsx
import HeroSection from '@/components/sections/HeroSection'
import BookingSection from '@/components/sections/BookingSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import Footer from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="px-[15%]">
      <HeroSection />
      <ServicesSection /> 
      <BookingSection />
      <WhyUsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
