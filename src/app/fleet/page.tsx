// src/app/fleet/page.tsx

import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import FleetGrid from "@/components/transportation/fleet/FleetGrid";


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

   
    </main>
  );
}
