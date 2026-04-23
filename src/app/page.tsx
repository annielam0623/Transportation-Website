// src/app/page.tsx
import HeroSection from "@/components/transportation/sections/HeroSection";
import BookingSection from "@/components/transportation/sections/BookingSection";
import ServicesSection from "@/components/transportation/sections/ServicesSection";
import WhyUsSection from "@/components/transportation/sections/WhyUsSection";
import TestimonialsSection from "@/components/transportation/sections/TestimonialsSection";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <BookingSection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
