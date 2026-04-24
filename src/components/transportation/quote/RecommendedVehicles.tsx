"use client";

import { Users, Briefcase, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { MockVehicleOption } from "@/lib/transportation/charter/mockQuote";

type TripParams = {
  serviceType: string;
  from: string;
  to: string;
  date: string;
  time: string;
  pax: number;
  luggage: number;
  airportType?: string;
  city?: string;
};

export default function RecommendedVehicles({
  options,
  tripParams,
}: {
  options: MockVehicleOption[];
  tripParams: TripParams;
}) {
  const router = useRouter();

  function handleBook(v: MockVehicleOption) {
    const params = new URLSearchParams({
      serviceType: tripParams.serviceType,
      from: tripParams.from,
      to: tripParams.to,
      date: tripParams.date,
      time: tripParams.time,
      pax: String(tripParams.pax),
      luggage: String(tripParams.luggage),
      airportType: tripParams.airportType ?? "domestic",
      city: tripParams.city ?? "las_vegas",
      vehicleSlug: v.slug,
      vehicleName: v.name,
      vehiclePrice: String(v.priceTotal),
      vehiclePriceMode: v.priceMode,
    });
    router.push(`/charter/booking?${params.toString()}`);
  }

  if (!options.length) {
    return (
      <div className="text-center py-16 text-white/50 text-base">
        No vehicles available for your group size. Please contact us for
        assistance.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {options.map((v) => (
        <div
          key={v.slug}
          className="relative w-full"
          style={{
            background: v.tag === "recommended" ? "#061628" : "#04080F",
            borderBottom: "1px solid rgba(154,168,184,0.1)",
          }}
        >
          {/* Recommended bar */}
          {v.tag === "recommended" && (
            <div
              className="px-8 py-2"
              style={{
                borderBottom: "1px solid rgba(154,168,184,0.15)",
                background: "rgba(154,168,184,0.06)",
              }}
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-brand-silver font-semibold">
                Recommended
              </span>
            </div>
          )}

          {/* Main layout */}
          <div className="flex min-h-[280px]">
            {/* Image — left */}
            <div className="w-[45%] shrink-0 relative overflow-hidden bg-[#071020]">
              {v.imageUrl ? (
                <img
                  src={v.imageUrl}
                  alt={v.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10 text-sm tracking-widest uppercase">
                  {v.name}
                </div>
              )}
            </div>

            {/* Info — right */}
            <div className="flex-1 px-10 py-8 flex flex-col">
              {/* Available badge */}
              <div className="flex justify-end mb-6">
                {v.available ? (
                  <div className="flex items-center gap-1.5 text-green-400 text-xs tracking-wide">
                    <CheckCircle size={13} />
                    <span>Available</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-white/30 text-xs tracking-wide">
                    <XCircle size={13} />
                    <span>Unavailable</span>
                  </div>
                )}
              </div>

              {/* 车辆名 */}
              <h3
                className="text-2xl text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {v.name}
              </h3>

              {/* Specs */}
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Users size={13} className="text-brand-silver" />
                  Up to {v.capacity} passengers
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Briefcase size={13} className="text-brand-silver" />
                  {v.luggageCapacity} bags
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-auto">
                {v.features.map((f) => (
                  <span
                    key={f}
                    className="text-[11px] tracking-wide text-white/40 px-3 py-1"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div
                className="flex items-center justify-between pt-5 mt-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">
                    {v.priceMode}
                  </span>
                  <span className="text-4xl font-semibold text-white">
                    ${v.priceTotal.toLocaleString()}
                  </span>
                </div>

                {v.available ? (
                  <button
                    onClick={() => handleBook(v)}
                    className="text-[11px] tracking-[0.15em] uppercase font-semibold px-8 py-3 transition-colors"
                    style={
                      v.tag === "recommended"
                        ? { background: "#9AA8B8", color: "#04080F" }
                        : {
                            border: "1px solid rgba(154,168,184,0.25)",
                            color: "rgba(255,255,255,0.6)",
                          }
                    }
                  >
                    Book This Vehicle
                  </button>
                ) : (
                  <span
                    className="text-[11px] tracking-[0.15em] uppercase text-white/20 px-8 py-3"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    Not Available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
