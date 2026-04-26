"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TripData {
  serviceType: string;
  from: string;
  to: string;
  date: string;
  time: string;
  pax: string;
  city: string;
  vehicleName: string;
  vehiclePrice: number;
  vehiclePriceMode: string;
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

const inputClass =
  "w-full bg-transparent border-b text-white text-sm py-2 outline-none placeholder:text-white/25 transition-colors focus:border-[#9AA8B8]";
const inputStyle = { borderColor: "rgba(154,168,184,0.25)" };

const labelClass = "block text-[9px] tracking-[0.2em] uppercase mb-2";
const labelStyle = { color: "#6A7A8C" };

export default function PaymentForm({ tripData, dueNow, totalAmount }: Props) {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState(
    `${tripData.firstName} ${tripData.lastName}`.trim(),
  );
  const [sameBilling, setSameBilling] = useState<boolean>(false);
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handleSubmit = () => {
    const params = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(tripData).map(([k, v]) => [k, String(v)]),
      ),
      dueNow: String(dueNow),
    });
    router.push(`/charter/confirmation?${params.toString()}`);
  };

  const isValid =
    cardNumber.replace(/\s/g, "").length === 16 &&
    expiry.length === 5 &&
    cvv.length >= 3 &&
    cardName.trim().length > 0;

  useEffect(() => {
    const handler = () => {
      if (isValid) handleSubmit();
    };
    window.addEventListener("charter-payment-submit", handler);
    return () => window.removeEventListener("charter-payment-submit", handler);
  }, [isValid, cardNumber, expiry, cvv, cardName]);

  return (
    <div className="space-y-8">
      {/* Payment Method */}
      <div
        className="rounded-sm border p-6"
        style={{ borderColor: "rgba(154,168,184,0.1)", background: "#040f1e" }}
      >
        <h2
          className="text-[9px] tracking-[0.2em] uppercase mb-6"
          style={{ color: "#6A7A8C" }}
        >
          Payment Method
        </h2>

        {/* Card Option (active) */}
        <div
          className="flex items-center gap-3 mb-6 p-3 rounded-sm border"
          style={{
            borderColor: "rgba(154,168,184,0.2)",
            background: "rgba(154,168,184,0.04)",
          }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
            style={{ borderColor: "#9AA8B8" }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#9AA8B8" }}
            />
          </div>
          <span className="text-white/80 text-sm">Credit / Debit Card</span>
          <div className="ml-auto flex gap-2 items-center">
            {["VISA", "MC", "AMEX"].map((b) => (
              <span
                key={b}
                className="text-[9px] tracking-wider px-1.5 py-0.5 rounded border"
                style={{
                  color: "#6A7A8C",
                  borderColor: "rgba(106,122,140,0.3)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Card inputs */}
        <div className="space-y-5">
          {/* Card Number */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Card Number
            </label>
            <div className="relative">
              <input
                className={inputClass}
                style={inputStyle}
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
              />
              <svg
                className="absolute right-0 bottom-2.5 w-4 h-4 opacity-30"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                style={{ color: "#9AA8B8" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass} style={labelStyle}>
                Expiry Date
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>
                CVV
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                placeholder="000"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className={labelClass} style={labelStyle}>
              Cardholder Name
            </label>
            <input
              className={inputClass}
              style={inputStyle}
              placeholder="As shown on card"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
        </div>

        {/* Disabled options */}
        <div className="mt-6 space-y-3">
          {["PayPal", "Zelle"].map((method) => (
            <div
              key={method}
              className="flex items-center gap-3 p-3 rounded-sm border opacity-35"
              style={{ borderColor: "rgba(154,168,184,0.1)" }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                style={{ borderColor: "rgba(154,168,184,0.3)" }}
              />
              <span className="text-white/50 text-sm">{method}</span>
              <span
                className="ml-auto text-[9px] tracking-[0.15em] uppercase"
                style={{ color: "#6A7A8C" }}
              >
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Address */}
      <div
        className="rounded-sm border p-6"
        style={{ borderColor: "rgba(154,168,184,0.1)", background: "#040f1e" }}
      >
        <h2
          className="text-[9px] tracking-[0.2em] uppercase mb-5"
          style={{ color: "#6A7A8C" }}
        >
          Billing Address
        </h2>

        {/* Same as contact toggle */}
        <div
          className="flex items-center gap-3 mb-5 cursor-pointer"
          onClick={() => setSameBilling(!sameBilling)}
        >
          <div
            className="w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0"
            style={{
              borderColor: sameBilling ? "#9AA8B8" : "rgba(154,168,184,0.3)",
              background: sameBilling
                ? "rgba(154,168,184,0.15)"
                : "transparent",
            }}
          >
            {sameBilling && (
              <svg
                className="w-2.5 h-2.5"
                fill="none"
                stroke="#9AA8B8"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}
          </div>
          <span className="text-white/60 text-sm">
            Same as contact information
          </span>
        </div>

        {!sameBilling && (
          <div className="space-y-5">
            <div>
              <label className={labelClass} style={labelStyle}>
                Street Address
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                placeholder="123 Main St"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className={labelClass} style={labelStyle}>
                  City
                </label>
                <input
                  className={inputClass}
                  style={inputStyle}
                  placeholder="City"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  State
                </label>
                <input
                  className={inputClass}
                  style={inputStyle}
                  placeholder="CA"
                  value={billingState}
                  onChange={(e) =>
                    setBillingState(e.target.value.toUpperCase().slice(0, 2))
                  }
                />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>
                  ZIP
                </label>
                <input
                  className={inputClass}
                  style={inputStyle}
                  placeholder="90001"
                  value={billingZip}
                  onChange={(e) =>
                    setBillingZip(e.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit — desktop */}
      <div className="hidden lg:block">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full py-4 text-xs tracking-[0.2em] uppercase transition-colors"
          style={{
            background: isValid ? "#6A7A8C" : "#2A3A4C",
            color: isValid ? "#fff" : "rgba(255,255,255,0.3)",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          Pay ${dueNow.toFixed(2)}
        </button>
      </div>

      {/* Submit — mobile only (desktop button is in sidebar) */}
      <div className="lg:hidden">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full py-4 text-xs tracking-[0.2em] uppercase transition-colors"
          style={{
            background: isValid ? "#6A7A8C" : "#2A3A4C",
            color: isValid ? "#fff" : "rgba(255,255,255,0.3)",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          Pay ${dueNow.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
