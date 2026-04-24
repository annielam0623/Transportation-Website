// src/app/charter/quote/page.tsx
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import FleetGrid from "@/components/transportation/fleet/FleetGrid";
import QuoteSummaryBar from "@/components/transportation/quote/QuoteSummaryBar";
import RecommendedVehicles from "@/components/transportation/quote/RecommendedVehicles";
import { getMockQuote } from "@/lib/transportation/charter/mockQuote";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{
  serviceType?: string;
  from?: string;
  to?: string;
  date?: string;
  time?: string;
  pax?: string;
  luggage?: string;
  airportType?: string;
  city?: string;
}>;

async function getFleetVehicles() {
  try {
    return await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { capacity: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function CharterQuotePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    serviceType = "",
    from = "",
    to = "",
    date = "",
    time = "",
    pax = "1",
    luggage = "0",
    airportType = "domestic",
    city = "las_vegas",
  } = await searchParams;

  if (!serviceType || !from || !to || !date) {
    redirect("/#booking");
  }

  const passengerCount = parseInt(pax, 10) || 1;
  const luggageCount = parseInt(luggage, 10) || 0;

  const { options } = getMockQuote(passengerCount, luggageCount);
  const fleetVehicles = await getFleetVehicles();

  const tripParams = {
    serviceType,
    from,
    to,
    date,
    time,
    pax: passengerCount,
    luggage: luggageCount,
    airportType,
    city,
  };

  return (
    <main className="min-h-screen bg-[#020c18] text-white">
      <Navbar />

      {/* Summary bar */}
      <div className="pt-16">
        <QuoteSummaryBar
          serviceType={serviceType}
          from={from}
          to={to}
          date={date}
          time={time}
          pax={passengerCount}
          luggage={luggageCount}
          city={city}
          airportType={airportType}
        />
      </div>

      {/* 标题区 */}
      <div className="pt-10 pb-6 px-6 md:px-20">
        <p className="text-xs tracking-[0.18em] uppercase text-brand-silver mb-2">
          Your Quote
        </p>
        <h1 className="font-serif text-4xl font-bold">
          Available <span className="text-brand-silver">Vehicles</span>
        </h1>
      </div>

      {/* 车辆卡片 */}
      <Suspense
        fallback={
          <div className="text-white/35 text-sm px-[15%]">Loading...</div>
        }
      >
        <RecommendedVehicles options={options} tripParams={tripParams} />
      </Suspense>

      <div className="border-t border-white/5" />

      {/* Full fleet */}
      <div className="px-[15%]">
        <section className="py-14">
          <div className="mb-10">
            <p className="text-xs tracking-[0.18em] uppercase text-brand-silver mb-2">
              Our Fleet
            </p>
            <h2 className="font-serif text-3xl font-bold">
              Browse All <span className="text-brand-silver">Vehicles</span>
            </h2>
            <p className="text-white/50 text-base mt-2 max-w-lg">
              Every vehicle is commercially licensed, DOT-compliant, and
              maintained to the highest standard.
            </p>
          </div>

          {fleetVehicles.length > 0 ? (
            <FleetGrid vehicles={fleetVehicles as any} />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Sprinter Van",
                "Executive Sprinter",
                "Mini Bus",
                "Mid-Size Coach",
                "Full-Size Coach",
              ].map((name) => (
                <div
                  key={name}
                  className="bg-[#0A1628] border border-white/6 p-6 text-white/20 text-sm"
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
