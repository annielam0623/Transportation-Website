// components/transportation/booking/charter/CharterQuoteResult.tsx
"use client";

import {
  SearchResult,
  ServiceType,
} from "@/lib/transportation/cities/las-vegas";
import { LasVegas } from "@/lib/transportation/cities/las-vegas";

interface Vehicle {
  type: string;
  label: string;
  capacity: number;
  luggage: number;
  description: string;
}

const VEHICLES: Vehicle[] = [
  {
    type: "mini-van",
    label: "Mini Van",
    capacity: 6,
    luggage: 4,
    description: "Up to 6 pax · 4 luggage",
  },
  {
    type: "sprinter",
    label: "Sprinter",
    capacity: 10,
    luggage: 8,
    description: "Up to 10 pax · 8 luggage",
  },
  {
    type: "coach-bus",
    label: "Coach Bus",
    capacity: 55,
    luggage: 30,
    description: "Up to 55 pax · 30 luggage",
  },
];

interface Props {
  serviceType: ServiceType;
  pickup: string;
  pickupResult?: SearchResult;
  dropoff: string;
  dropoffResult?: SearchResult;
  pax: number;
  luggage: number;
  city: typeof LasVegas;
}

export default function CharterQuoteResult({
  serviceType,
  pickup,
  pickupResult,
  dropoff,
  dropoffResult,
  pax,
  luggage,
  city,
}: Props) {
  // 筛选合适车辆
  const eligible = VEHICLES.filter(
    (v) => v.capacity >= pax && v.luggage >= luggage,
  );
  const recommended =
    eligible[eligible.length - 1] ?? VEHICLES[VEHICLES.length - 1];

  // 获取报价
  function getPrice(vehicle: Vehicle) {
    if (serviceType === "airport-pickup" || serviceType === "airport-dropoff") {
      const airportCode =
        serviceType === "airport-pickup"
          ? pickupResult?.code
          : dropoffResult?.code;
      const destinationName =
        serviceType === "airport-pickup" ? dropoff : pickup;
      const zone = city.getZone(destinationName);
      if (airportCode) {
        return city.pricing.airportTransfer(airportCode, vehicle.type, zone);
      }
    }
    if (serviceType === "in-town") {
      const zone = city.getZone(pickup);
      return city.pricing.inTown(vehicle.type, zone);
    }
    return null;
  }

  // 服务标签
  const serviceLabel: Record<ServiceType, string> = {
    "airport-pickup": "Airport Pick-up",
    "airport-dropoff": "Airport Drop-off",
    "in-town": "In Town Transfer",
    "out-of-town": "Out of Town",
  };

  return (
    <div className="w-full">
      {/* Header */}
      <p className="text-[10px] tracking-widest text-white/40 uppercase mb-6">
        Available Vehicles — {serviceLabel[serviceType]} · {pax} Pax · {luggage}{" "}
        Luggage
      </p>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-2 gap-4">
        {eligible.map((vehicle) => {
          const price = getPrice(vehicle);
          const isRecommended = vehicle.type === recommended.type;

          return (
            <div
              key={vehicle.type}
              className={`relative border rounded p-6 transition-colors duration-200
                ${
                  isRecommended
                    ? "border-white/30 bg-white/[0.03]"
                    : "border-white/10 bg-transparent"
                }`}
            >
              {isRecommended && (
                <span
                  className="absolute top-4 right-4 text-[9px] tracking-widest
                                 uppercase border border-white/20 text-white/50 px-2 py-1"
                >
                  Recommended
                </span>
              )}

              <p className="text-lg font-medium text-white mb-1">
                {vehicle.label}
              </p>
              <p className="text-xs text-white/40 mb-5">
                {vehicle.description}
              </p>

              {price ? (
                <>
                  <p className="text-3xl font-medium text-white mb-1">
                    ${price.basePrice}
                  </p>
                  {price.surcharge && price.surcharge > 0 && (
                    <p className="text-xs text-white/40 mb-1">
                      + ${price.surcharge} {price.surchargeLabel}
                    </p>
                  )}
                  <p className="text-[10px] tracking-widest text-white/30 uppercase mb-6">
                    {price.isFixed ? "Fixed Rate" : "Starting From"}
                  </p>
                </>
              ) : (
                <p className="text-sm text-white/40 mb-6">Price on request</p>
              )}

              <button
                className="w-full border border-white/15 text-white/60 text-[10px]
                                 tracking-widest uppercase py-3 hover:border-white/40
                                 hover:text-white transition-all duration-200"
              >
                Select This Vehicle
              </button>
            </div>
          );
        })}
      </div>

      {/* No eligible vehicle */}
      {eligible.length === 0 && (
        <p className="text-sm text-white/40">
          No single vehicle fits your group size. Please contact us for a custom
          quote.
        </p>
      )}
    </div>
  );
}
