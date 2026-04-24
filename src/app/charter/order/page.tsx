// src/app/charter/order/page.tsx
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import OrderSummary from "@/components/transportation/booking/charter/OrderSummary";

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
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  flightNumber?: string;
}>;

export default async function CharterOrderPage({
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
    firstName = "",
    lastName = "",
    email = "",
    phone = "",
    flightNumber = "",
  } = await searchParams;

  if (!serviceType || !from || !vehicleSlug || !firstName) {
    redirect("/#booking");
  }

  return (
    <main className="min-h-screen bg-[#020c18] text-white">
      <Navbar />
      <div className="pt-24 pb-20 px-6 md:px-20 max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.18em] uppercase text-brand-silver mb-2">
          Step 3 of 4
        </p>
        <h1 className="font-serif text-4xl font-bold mb-10">
          Order <span className="text-brand-silver">Summary</span>
        </h1>

        <OrderSummary
          tripParams={{ serviceType, from, to, date, time, pax, luggage, airportType, city }}
          vehicleParams={{ vehicleSlug, vehicleName, vehiclePrice, vehiclePriceMode }}
          leaderParams={{ firstName, lastName, email, phone, flightNumber }}
        />
      </div>
    </main>
  );
}
