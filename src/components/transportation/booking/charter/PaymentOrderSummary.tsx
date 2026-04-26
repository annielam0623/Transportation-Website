"use client";

import { useRouter } from "next/navigation";

interface TripData {
  serviceType: string;
  from: string;
  to: string;
  date: string;
  time: string;
  pax: string;
  vehicleName: string;
  vehiclePrice: number;
  paymentOption: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  flightNumber: string;
}

interface Props {
  tripData: TripData;
  dueNow: number;
  totalAmount: number;
}

export default function PaymentOrderSummary({
  tripData,
  dueNow,
  totalAmount,
}: Props) {
  const isDeposit = tripData.paymentOption === "deposit";
  const remaining = Math.round((totalAmount - dueNow) * 100) / 100;

  const formatDate = (d: string) => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatServiceType = (s: string) => {
    const map: Record<string, string> = {
      airport_pickup: "Airport Pickup",
      airport_dropoff: "Airport Drop-off",
      in_town: "In-Town Transfer",
      out_of_town: "Out-of-Town Transfer",
      grand_canyon_west: "Grand Canyon West Rim",
      grand_canyon_south: "Grand Canyon South Rim",
      bryce_zion: "Bryce & Zion",
      antelope_canyon: "Antelope Canyon",
      valley_of_fire: "Valley of Fire",
    };
    return map[s] ?? s;
  };

  return (
    <div className="lg:sticky lg:top-6 space-y-4">
      {/* Summary card */}
      <div
        className="rounded-sm border p-5"
        style={{ borderColor: "rgba(154,168,184,0.1)", background: "#040f1e" }}
      >
        <h2
          className="text-[9px] tracking-[0.2em] uppercase mb-5"
          style={{ color: "#6A7A8C" }}
        >
          Order Summary
        </h2>

        {/* Route */}
        <div className="mb-4">
          <p className="text-white font-medium text-sm">
            {tripData.from && tripData.to
              ? `${tripData.from} → ${tripData.to}`
              : formatServiceType(tripData.serviceType)}
          </p>
          <p className="text-white/40 text-xs mt-1">
            {formatDate(tripData.date)}
            {tripData.time ? ` · ${tripData.time}` : ""}
            {tripData.pax ? ` · ${tripData.pax} PAX` : ""}
          </p>
        </div>

        {/* Vehicle */}
        <div
          className="flex items-center justify-between py-3 border-t"
          style={{ borderColor: "rgba(154,168,184,0.08)" }}
        >
          <span className="text-white/60 text-xs">{tripData.vehicleName}</span>
          <span className="text-white text-sm">${totalAmount.toFixed(2)}</span>
        </div>

        {/* Payment breakdown */}
        <div
          className="pt-3 border-t space-y-2"
          style={{ borderColor: "rgba(154,168,184,0.08)" }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[9px] tracking-[0.15em] uppercase"
              style={{ color: "#6A7A8C" }}
            >
              {isDeposit ? "10% Deposit Due Now" : "Payment"}
            </span>
            <span className="text-white font-medium text-sm">
              ${dueNow.toFixed(2)}
            </span>
          </div>

          {isDeposit && (
            <div className="flex items-center justify-between">
              <span
                className="text-[9px] tracking-[0.15em] uppercase"
                style={{ color: "#6A7A8C" }}
              >
                Remaining Balance
              </span>
              <span className="text-white/50 text-sm">
                ${remaining.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {isDeposit && (
          <p className="text-[10px] mt-3" style={{ color: "#6A7A8C" }}>
            Remaining balance due 14 days before trip date.
          </p>
        )}

        {/* Divider */}
        <div
          className="my-4 border-t"
          style={{ borderColor: "rgba(154,168,184,0.08)" }}
        />

        {/* Total */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ color: "#9AA8B8" }}
          >
            Total
          </span>
          <span className="text-white font-semibold">
            ${totalAmount.toFixed(2)}
          </span>
        </div>

        <p
          className="hidden lg:block text-[10px] text-center"
          style={{ color: "#6A7A8C" }}
        >
          Complete the form on the left to proceed.
        </p>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 px-1">
        <svg
          className="w-3.5 h-3.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          style={{ color: "#6A7A8C" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
        <span className="text-[10px]" style={{ color: "#6A7A8C" }}>
          256-bit SSL encrypted · Powered by Stripe
        </span>
      </div>
    </div>
  );
}
