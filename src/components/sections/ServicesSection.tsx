// src/components/sections/ServicesSection.tsx
import Image from 'next/image'

const services = [
  {
    title: 'Charter Bus',
    subtitle: '40+ COMMERCIAL BUSES FITS ALL THE GROUP SIZE',
    bullets: [
      'MICE (Meetings, Incentives, Conferences, Exhibitions)',
      'Sports teams',
      'Weddings and group events',
      'Schools and churches',
      'Government and military',
      'Corporate and business transportation',
    ],
    image: '/bus-interior.png',
    imageAlt: 'Charter Bus Interior',
    href: '#booking',
  },
  {
    title: 'Fly & Drive',
    subtitle: 'FOR THOSE WHO VALUE INDEPENDENCE AND SPONTANEITY',
    bullets: [
      'Full control of schedule',
      'Lower base cost (short trips)',
      'Easy for simple, short routes',
      'One-way rental options available',
    ],
    image: '/car.png',
    imageAlt: 'Cadillac Escalade in Desert',
    href: '#booking',
  },
  {
    title: 'Professional Chauffeur',
    subtitle: 'A LICENSED, SAFETY-COMPLIANT PROFESSIONAL DRIVER DEDICATED TO YOUR ITINERARY.',
    bullets: [
      'Door-to-door convenience',
      'No parking or traffic stress',
      'Professional route planning',
      'Traffic awareness & timing optimization',
      'Acts like a driver + assistant',
      'Ideal for multi-day or complex itineraries',
    ],
    image: '/chauffeur.png',
    imageAlt: 'Professional Chauffeur',
    href: '#booking',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" style={{ background: '#020c18' }}>
      {/* Section header */}
      <div className="px-6 md:px-12 pt-28 pb-10">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
          Our Service
        </h2>
      </div>

      {/* 3-column card grid */}
      <div className="px-6 md:px-12 pb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((svc) => (
          <div key={svc.title} className="flex flex-col">
            {/* Image */}
            <div className="relative w-full rounded-sm overflow-hidden mb-6" style={{ aspectRatio: '4/3' }}>
              <Image
                src={svc.image}
                alt={svc.imageAlt}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
              {svc.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[#B8C4D4] text-[0.6rem] tracking-[0.13em] uppercase font-medium mb-4">
              {svc.subtitle}
            </p>

            {/* Bullets — flex-grow pushes button to bottom */}
            <ul className="flex-grow space-y-1.5 mb-8">
              {svc.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-light text-white/65">
                  <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0 bg-white/40" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Button pinned to bottom */}
            <a
              href={svc.href}
              className="self-start text-[0.7rem] tracking-[0.15em] uppercase font-semibold px-6 py-2.5 border border-white/30 text-white hover:border-white hover:bg-white/5 transition-all"
            >
              Check here
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
