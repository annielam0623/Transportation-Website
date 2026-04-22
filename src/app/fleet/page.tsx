// src/app/fleet/page.tsx
<<<<<<< HEAD
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import FleetGrid from '@/components/fleet/fleetGrid'
=======
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import FleetGrid from "@/components/transportation/fleet/FleetGrid";
>>>>>>> 63f696b3b2d3e0fa07485001f85c482b56452e43

export const revalidate = 60; // revalidate every 60s

async function getVehicles() {
  try {
    return await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { capacity: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function FleetPage() {
  const vehicles = await getVehicles();

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="bg-[#04080F] px-6 md:px-20 pt-20 pb-12 border-b border-white/5">
        <div className="section-label">Our Fleet</div>
        <h1 className="font-serif text-5xl font-bold mb-3">
          Commanding <span className="text-brand-silver">Presence</span>
        </h1>
        <p className="text-white/55 text-base font-light max-w-xl">
          From executive sprinters to full-size coaches — every vehicle is
          commercially licensed, DOT-compliant, and maintained to the highest
          standard.
        </p>
      </section>

      {/* Fleet grid */}
      <section className="bg-[#071020] px-6 md:px-20 py-16">
        <FleetGrid vehicles={vehicles as any} />
      </section>

      {/* CTA */}
      <section className="bg-[#0A428C] px-6 md:px-20 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold mb-3">
          Need Help Choosing?
        </h2>
        <p className="text-white/70 mb-7 max-w-lg mx-auto">
          Tell us your group size, route, and date — we'll recommend the right
          vehicle and send you a quote within 2 hours.
        </p>
        <a
          href="/booking"
          className="inline-block bg-white text-brand-blue font-semibold text-sm tracking-widest uppercase px-8 py-3 hover:bg-brand-silver transition-colors"
        >
          Get a Free Quote →
        </a>
      </section>
    </main>
  );
}
