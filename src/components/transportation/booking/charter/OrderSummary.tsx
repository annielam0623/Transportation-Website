"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Briefcase,
  Plane,
  Car,
} from "lucide-react";

const SERVICE_LABELS: Record<string, string> = {
  airport_pickup: "Airport Pick-up",
  airport_dropoff: "Airport Drop-off",
  in_town_transfer: "In-Town Transfer",
  grand_canyon_national_park: "Grand Canyon National Park",
  grand_canyon_west_rim: "Grand Canyon West Rim",
  bryce_canyon_zion: "Bryce Canyon & Zion",
  antelope_canyon: "Antelope Canyon",
  valley_of_fire: "Valley of Fire",
  custom_out_of_town_transfer: "Custom Out-of-Town",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeStr: string) {
  if (!timeStr) return "—";
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

type Props = {
  tripParams: {
    serviceType: string;
    from: string;
    to: string;
    date: string;
    time: string;
    pax: string;
    luggage: string;
    airportType: string;
    city: string;
  };
  vehicleParams: {
    vehicleSlug: string;
    vehicleName: string;
    vehiclePrice: string;
    vehiclePriceMode: string;
  };
  leaderParams: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    flightNumber: string;
  };
};

const divider = "1px solid rgba(154,168,184,0.12)";
const sectionLabelCls =
  "text-xs tracking-[0.18em] uppercase text-brand-silver mb-5 pb-3 block";

export default function OrderSummary({
  tripParams,
  vehicleParams,
  leaderParams,
}: Props) {
  const router = useRouter();
  const [paymentOption, setPaymentOption] = useState<"full" | "deposit">(
    "full",
  );

  const price = parseFloat(vehicleParams.vehiclePrice) || 0;
  const deposit = Math.round(price * 0.1);
  const remainder = price - deposit;

  // 14 days before trip date
  const tripDate = new Date(tripParams.date + "T00:00:00");
  const dueDate = new Date(tripDate);
  dueDate.setDate(dueDate.getDate() - 14);
  const dueDateStr = dueDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isAirport =
    tripParams.serviceType === "airport_pickup" ||
    tripParams.serviceType === "airport_dropoff";

  function handleConfirm() {
    const params = new URLSearchParams({
      ...tripParams,
      ...vehicleParams,
      ...leaderParams,
      paymentOption,
      amountDue: String(paymentOption === "full" ? price : deposit),
    });
    router.push(`/charter/payment?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Trip Details */}
      <div>
        <span className={sectionLabelCls} style={{ borderBottom: divider }}>
          Trip Details
        </span>
        <div className="flex items-center gap-3">
          <Calendar size={15} className="text-brand-silver shrink-0" />
          <p className="text-white/80 text-sm">{formatDate(tripParams.date)}</p>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={15} className="text-brand-silver shrink-0" />
          <p className="text-white/80 text-sm">{formatTime(tripParams.time)}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <MapPin size={15} className="text-brand-silver shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm">{tripParams.from}</p>
              {tripParams.to && (
                <>
                  <p className="text-white/30 text-xs my-1">↓</p>
                  <p className="text-white text-sm">{tripParams.to}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users size={15} className="text-brand-silver shrink-0" />
            <p className="text-white/80 text-sm">
              {tripParams.pax} Passengers · {tripParams.luggage} Bags
            </p>
          </div>
          {isAirport && (
            <div className="flex items-center gap-3">
              <Plane size={15} className="text-brand-silver shrink-0" />
              <p className="text-white/80 text-sm">
                {tripParams.airportType === "international"
                  ? "International"
                  : "Domestic"}{" "}
                Flight
                {leaderParams.flightNumber &&
                  leaderParams.flightNumber !== "unknown" && (
                    <span className="ml-2 text-brand-silver">
                      · {leaderParams.flightNumber}
                    </span>
                  )}
                {(!leaderParams.flightNumber ||
                  leaderParams.flightNumber === "unknown") && (
                  <span className="ml-2 text-white/30">
                    · Flight number TBD
                  </span>
                )}
              </p>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Car size={15} className="text-brand-silver shrink-0" />
            <p className="text-white/80 text-sm">{vehicleParams.vehicleName}</p>
          </div>
        </div>
      </div>

      {/* Leader Info */}
      <div>
        <span className={sectionLabelCls} style={{ borderBottom: divider }}>
          Contact Information
        </span>
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
              Name
            </p>
            <p className="text-white">
              {leaderParams.firstName} {leaderParams.lastName}
            </p>
          </div>
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
              Phone
            </p>
            <p className="text-white">{leaderParams.phone}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
              Email
            </p>
            <p className="text-white">{leaderParams.email}</p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div>
        <span className={sectionLabelCls} style={{ borderBottom: divider }}>
          Price
        </span>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">
              {SERVICE_LABELS[tripParams.serviceType] ?? tripParams.serviceType}
            </span>
            <span className="text-white">${price.toLocaleString()}</span>
          </div>
          <div
            className="flex justify-between text-sm"
            style={{ borderTop: divider, paddingTop: "12px", marginTop: "4px" }}
          >
            <span className="text-white/80 font-medium">Total</span>
            <span className="text-white text-2xl font-semibold">
              ${price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div>
        <span className={sectionLabelCls} style={{ borderBottom: divider }}>
          Payment Option
        </span>
        <div className="flex flex-col gap-4">
          {/* Full payment */}
          <div
            className="flex items-start gap-4 cursor-pointer p-5 transition-colors"
            style={{
              border:
                paymentOption === "full"
                  ? "1px solid rgba(154,168,184,0.4)"
                  : "1px solid rgba(154,168,184,0.12)",
              background:
                paymentOption === "full"
                  ? "rgba(154,168,184,0.05)"
                  : "transparent",
            }}
            onClick={() => setPaymentOption("full")}
          >
            <div
              className="w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center"
              style={{
                borderColor:
                  paymentOption === "full"
                    ? "#9AA8B8"
                    : "rgba(154,168,184,0.35)",
              }}
            >
              {paymentOption === "full" && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#9AA8B8" }}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-white text-sm font-medium">Pay in Full</p>
                <p className="text-white text-lg font-semibold">
                  ${price.toLocaleString()}
                </p>
              </div>
              <p className="text-white/40 text-xs mt-1">
                Full amount charged today
              </p>
            </div>
          </div>

          {/* Deposit */}
          <div
            className="flex items-start gap-4 cursor-pointer p-5 transition-colors"
            style={{
              border:
                paymentOption === "deposit"
                  ? "1px solid rgba(154,168,184,0.4)"
                  : "1px solid rgba(154,168,184,0.12)",
              background:
                paymentOption === "deposit"
                  ? "rgba(154,168,184,0.05)"
                  : "transparent",
            }}
            onClick={() => setPaymentOption("deposit")}
          >
            <div
              className="w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center"
              style={{
                borderColor:
                  paymentOption === "deposit"
                    ? "#9AA8B8"
                    : "rgba(154,168,184,0.35)",
              }}
            >
              {paymentOption === "deposit" && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#9AA8B8" }}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-white text-sm font-medium">
                  Reserve with 10% Deposit
                </p>
                <p className="text-white text-lg font-semibold">
                  ${deposit.toLocaleString()}{" "}
                  <span className="text-white/40 text-sm font-normal">
                    today
                  </span>
                </p>
              </div>
              <p className="text-white/40 text-xs mt-1">
                Remaining ${remainder.toLocaleString()} due by {dueDateStr}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="pt-2">
        <button
          onClick={handleConfirm}
          className="px-12 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-200"
          style={{ background: "#9AA8B8", color: "#04080F" }}
        >
          Confirm & Proceed to Payment
        </button>
      </div>
    </div>
  );
}
