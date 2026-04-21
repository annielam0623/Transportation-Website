// components/transportation/booking/charter/CharterQuoteResult.tsx
"use client";

import { useEffect, useState } from "react";
import { getCharterQuote } from "@/lib/transportation/charter/client";
import { VehicleOption, ServiceType } from "@/lib/transportation/charter/types";
import { SearchResult } from "@/lib/transportation/cities/las-vegas";
import { LasVegas } from "@/lib/transportation/cities/las-vegas";

interface Props {
  serviceType: ServiceType;
  pickup: string;
  pickupResult?: SearchResult;
  dropoff: string;
  dropoffResult?: SearchResult;
  pax: number;
  luggage: number;
  city: typeof LasVegas;
  date: string;
  airportType: "domestic" | "international";
}

const SERVICE_TYPE_MAP: Record<string, ServiceType> = {
  "airport-pickup":               "airport_pickup",
  "airport-dropoff":              "airport_dropoff",
  "in-town":                      "in_town_transfer",
  "out-of-town":                  "custom_out_of_town_transfer",
  "airport_pickup":               "airport_pickup",
  "airport_dropoff":              "airport_dropoff",
  "in_town_transfer":             "in_town_transfer",
  "grand_canyon_national_park":   "grand_canyon_national_park",
  "grand_canyon_west_rim":        "grand_canyon_west_rim",
  "bryce_canyon_zion":            "bryce_canyon_zion",
  "antelope_canyon":              "antelope_canyon",
  "valley_of_fire":               "valley_of_fire",
  "custom_out_of_town_transfer":  "custom_out_of_town_transfer",
};

const SERVICE_LABEL: Record<string, string> = {
  "airport_pickup":             "Airport Pick-up",
  "airport_dropoff":            "Airport Drop-off",
  "in_town_transfer":           "In Town Transfer",
  "grand_canyon_national_park": "Grand Canyon National Park",
  "grand_canyon_west_rim":      "Grand Canyon West Rim",
  "bryce_canyon_zion":          "Bryce & Zion",
  "antelope_canyon":            "Antelope Canyon",
  "valley_of_fire":             "Valley of Fire",
  "custom_out_of_town_transfer":"Custom Out-of-Town",
};

export default function CharterQuoteResult({
  serviceType,
  airportType,
  pickup,
  pickupResult,
  dropoff,
  dropoffResult,
  pax,
  luggage,
  city,
  date,
}: Props) {
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuote() {
      setLoading(true);
      setError("");
      try {
        const mappedServiceType = SERVICE_TYPE_MAP[serviceType] ?? "in_town_transfer";

        const data = await getCharterQuote({
          serviceType: mappedServiceType,
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          tripDate: date ? new Date(date).toISOString().split("T")[0] : "",
          pickupTime: "",
          passengerCount: pax,
          luggageCount: luggage,
          airportType,  
          cityKey: "las-vegas",
} as any);

        if (!data.success || !data.quote) {
          throw new Error(data.error || "Quote failed");
        }
        setVehicles(data.quote.vehicles);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, [serviceType, pickup, dropoff, pax, luggage]);

  if (loading) {
    return (
      <p className="text-sm text-white/40 animate-pulse">
        Getting available vehicles...
      </p>
    );
  }

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  if (vehicles.length === 0) {
    return (
      <p className="text-sm text-white/40">
        No vehicles available for your selection. Please contact us for a custom quote.
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
       <p className="text-[10px] tracking-widest text-white/40 uppercase mb-6">
        Available Vehicles — {SERVICE_LABEL[serviceType]} · {pax} Pax · {luggage} Luggage
        {pax > 54 && (
          <span className="ml-3 text-[9px] border border-white/20 text-white/40 px-2 py-0.5">
            2 Vehicles Required
          </span>
        )}
      </p>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-2 gap-4">
        {vehicles.map((v, index) => (
          <div
            key={v.type}
            className={`relative border p-6 transition-colors duration-200
              ${v.isRecommended
                ? "border-white/30 bg-white/[0.03]"
                : "border-white/10 bg-transparent"
              }`}
          >
          {/* Bus 1 / Bus 2 标签 */}
            {pax > 54 && (
              <span className="absolute top-4 left-4 text-[9px] tracking-widest
                               uppercase border border-white/20 text-white/50 px-2 py-1">
                Bus {index + 1}
              </span>
            )}

            {v.isRecommended && pax <= 54 && (
              <span className="absolute top-4 right-4 text-[9px] tracking-widest
                               uppercase border border-white/20 text-white/50 px-2 py-1">
                Recommended
              </span>
            )}

            <p className={`text-lg font-medium text-white mb-1 ${pax > 54 ? "mt-6" : ""}`}>
              {v.name}
            </p>
            <p className="text-xs text-white/40 mb-5">
              Up to {v.maxPassengers} pax · {v.maxLuggage} luggage
            </p>

            {/* Price */}
            <p className="text-3xl font-medium text-white mb-1">${v.price}</p>

            {/* Surcharges */}
            <div className="text-xs text-white/40 mb-1 space-y-0.5">
              {v.airportFee && v.airportFee > 0 && (
                <p>+ ${v.airportFee} airport fee</p>
              )}
              {v.entryFee && v.entryFee > 0 && (
                <p>+ ${v.entryFee} entry fee (optional)</p>
              )}
              {v.extraMileRate && v.extraMileRate > 0 && (
                <p>+ ${v.extraMileRate}/mile over {v.maxMileage} miles</p>
              )}
            </div>

            {/* Pricing mode */}
            <p className="text-[10px] tracking-widest text-white/30 uppercase mb-1">
              {v.pricingMode === "fixed" ? "Fixed Rate" : "Starting From"}
            </p>

            {/* Hours info */}
            {v.minHours && (
              <p className="text-xs text-white/30 mb-1">
                {v.minHours}hr minimum · +${v.additionalHourRate}/hr after
              </p>
            )}
            {v.maxHours && (
              <p className="text-xs text-white/30 mb-4">
                Includes up to {v.maxHours}hrs · +${v.additionalHourRate}/hr after
              </p>
            )}

            <button className="w-full border border-white/15 text-white/60 text-[10px]
                               tracking-widest uppercase py-3 hover:border-white/40
                               hover:text-white transition-all duration-200 mt-4">
              Select This Vehicle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}