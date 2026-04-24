// src/app/charter/booking/page.tsx
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import LeaderInfoForm from "@/components/transportation/booking/charter/LeaderInfoForm";

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
  vehicleSlug?: string;
  vehicleName?: string;
  vehiclePrice?: string;
  vehiclePriceMode?: string;
}>;

export default async function CharterBookingPage({
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
    vehicleSlug = "",
    vehicleName = "",
    vehiclePrice = "0",
    vehiclePriceMode = "",
  } = await searchParams;

  if (!serviceType || !from || !vehicleSlug) {
    redirect("/#booking");
  }

  const isAirport =
    serviceType === "airport_pickup" || serviceType === "airport_dropoff";

  return (
    <main className="min-h-screen bg-[#020c18] text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-6 md:px-20 max-w-4xl mx-auto">
        {/* Page header */}
        <p className="text-xs tracking-[0.18em] uppercase text-brand-silver mb-2">
          Step 2 of 4
        </p>
        <h1 className="font-serif text-4xl font-bold mb-10">
          Leader <span className="text-brand-silver">Information</span>
        </h1>

        <LeaderInfoForm
          tripParams={{
            serviceType,
            from,
            to,
            date,
            time,
            pax,
            luggage,
            airportType,
            city,
          }}
          vehicleParams={{
            vehicleSlug,
            vehicleName,
            vehiclePrice,
            vehiclePriceMode,
          }}
          isAirport={isAirport}
        />
      </div>
    </main>
  );
}
