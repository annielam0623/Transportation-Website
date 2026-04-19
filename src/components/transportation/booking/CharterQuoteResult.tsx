"use client";
import { VehicleOption } from "@/lib/transportation/charter/types";

interface Props {
  vehicles: VehicleOption[];
  serviceType: string;
  passengerCount: number;
  luggageCount: number;
}

const PRICING_MODE_LABEL: Record<string, string> = {
  fixed: "Fixed rate",
  hourly: "Hourly rate",
  manual_review: "Contact us",
};

export default function CharterQuoteResult({
  vehicles,
  serviceType,
  passengerCount,
  luggageCount,
}: Props) {
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="mt-10 text-center py-8 border-t border-white/10">
        <p className="text-white/50 text-sm font-sans">
          No vehicles available for this configuration.{" "}
          <a
            href="mailto:info@travelusaexpress.com"
            className="text-[#9AA8B8] underline"
          >
            Contact us
          </a>{" "}
          for a custom quote.
        </p>
      </div>
    );
  }

  const labelCls =
    "block text-[9px] tracking-[.10em] uppercase text-white/38 mb-4 font-medium font-sans";

  return (
    <div className="mt-10 border-t border-white/10 pt-8 px-5">
      <span className={labelCls}>
        Available Vehicles — {serviceType.replace(/_/g, " ")} · {passengerCount}{" "}
        Pax · {luggageCount} Luggage
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 items-stretch">
        {vehicles.map((v) => (
          <div
            key={v.type}
            className={`border p-6 relative flex flex-col ${
              v.isRecommended ? "border-[#9AA8B8]/40" : "border-white/10"
            }`}
            style={{ background: "#020c18" }}
          >
            {v.isRecommended && (
              <span className="absolute top-4 right-4 text-[9px] tracking-[.10em] uppercase text-[#9AA8B8] border border-[#9AA8B8]/35 px-2 py-[3px] font-semibold font-sans">
                Recommended
              </span>
            )}

            <p className="font-serif text-[17px] text-white mb-1">{v.name}</p>
            <p className="text-[11px] text-white/38 mb-4 font-sans">
              Up to {v.maxPassengers} pax · {v.maxLuggage} luggage
            </p>

            {v.pricingMode === "manual_review" ? (
              <p className="text-[22px] font-bold text-white/60 mb-1 font-sans">
                Request a Quote
              </p>
            ) : (
              <>
                <p
                  className="text-[28px] font-bold text-white mb-1 font-sans"
                  style={{ letterSpacing: "-.02em" }}
                >
                  ${v.price.toLocaleString()}
                </p>
                {v.airportFee && v.airportFee > 0 && (
                  <p className="text-[11px] text-white/38 font-sans mb-1">
                    + ${v.airportFee} airport fee
                  </p>
                )}
                {v.pricingMode === "hourly" && v.minHours && (
                  <p className="text-[11px] text-white/38 font-sans mb-1">
                    {v.minHours} hr minimum
                  </p>
                )}
              </>
            )}

            <p className="text-[10px] text-white/30 uppercase tracking-[.10em] mb-5 font-sans">
              {PRICING_MODE_LABEL[v.pricingMode]}
            </p>

            <button className="mt-auto w-full py-[9px] text-[10px] tracking-[.12em] uppercase font-semibold font-sans transition-colors bg-transparent border border-white/15 text-white/50 hover:bg-[#9AA8B8] hover:text-[#020c18] hover:border-[#9AA8B8]">
              Select This Vehicle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
