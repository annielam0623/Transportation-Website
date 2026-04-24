"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TripParams = {
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

type VehicleParams = {
  vehicleSlug: string;
  vehicleName: string;
  vehiclePrice: string;
  vehiclePriceMode: string;
};

type Props = {
  tripParams: TripParams;
  vehicleParams: VehicleParams;
  isAirport: boolean;
};

export default function LeaderInfoForm({
  tripParams,
  vehicleParams,
  isAirport,
}: Props) {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hasFlightNumber, setHasFlightNumber] = useState(false);
  const [flightNumber, setFlightNumber] = useState("");

  const labelCls =
    "block text-[0.7rem] tracking-[0.2em] uppercase text-[#9AA8B8] mb-2";
  const inputCls =
    "w-full bg-transparent border-b border-white/20 outline-none text-white text-[15px] pb-2 pt-1 placeholder:text-white/20 focus:border-brand-silver transition-colors";

  function handleSubmit() {
    if (!firstName || !lastName || !email || !phone) return;

    const params = new URLSearchParams({
      ...tripParams,
      ...vehicleParams,
      firstName,
      lastName,
      email,
      phone,
      flightNumber: hasFlightNumber ? flightNumber : "unknown",
    });

    router.push(`/charter/order?${params.toString()}`);
  }

  const isValid =
    firstName &&
    lastName &&
    email &&
    phone &&
    (!isAirport || !hasFlightNumber || flightNumber.trim());

  return (
    <div className="flex flex-col gap-10">
      {/* Contact Info */}
      <div>
        <p
          className="text-xs tracking-[0.18em] uppercase text-brand-silver mb-6 pb-3"
          style={{ borderBottom: "1px solid rgba(154,168,184,0.15)" }}
        >
          Contact Information
        </p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <label className={labelCls}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Smith"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (702) 000-0000"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Flight options */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Option 1 */}
        <div
          className="flex items-start gap-3 cursor-pointer"
          onClick={() => setHasFlightNumber(true)}
        >
          <div
            className="w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center transition-colors"
            style={{
              borderColor: hasFlightNumber
                ? "#9AA8B8"
                : "rgba(154,168,184,0.35)",
            }}
          >
            {hasFlightNumber && (
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#9AA8B8" }}
              />
            )}
          </div>
          <div>
            <p className="text-white/80 text-sm">
              I already have my flight number
            </p>
            {hasFlightNumber && (
              <div className="mt-4">
                <label className={labelCls}>Flight Number</label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) =>
                    setFlightNumber(e.target.value.toUpperCase())
                  }
                  placeholder="e.g. AA1234"
                  className={inputCls}
                  style={{ maxWidth: "280px" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Option 2 */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setHasFlightNumber(false);
            setFlightNumber("");
          }}
        >
          <div
            className="w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors"
            style={{
              borderColor: !hasFlightNumber
                ? "#9AA8B8"
                : "rgba(154,168,184,0.35)",
            }}
          >
            {!hasFlightNumber && (
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#9AA8B8" }}
              />
            )}
          </div>
          <p className="text-white/80 text-sm">
            I don't have my flight number yet
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="px-12 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-200
            disabled:bg-[#2A3A4C] disabled:text-white/30 disabled:cursor-not-allowed"
          style={isValid ? { background: "#9AA8B8", color: "#04080F" } : {}}
        >
          Continue to Order Summary
        </button>
      </div>
    </div>
  );
}
