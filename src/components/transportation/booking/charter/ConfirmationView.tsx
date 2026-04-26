"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BookingData {
  serviceType: string;
  from: string;
  to: string;
  date: string;
  time: string;
  pax: string;
  city: string;
  vehicleName: string;
  vehiclePrice: number;
  paymentOption: string;
  dueNow: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  flightNumber: string;
}

interface Props {
  data: BookingData;
}

export default function ConfirmationView({ data }: Props) {
  const router = useRouter();
  const [confirmationNo, setConfirmationNo] = useState("");

  useEffect(() => {
    const digits = Math.floor(10000000 + Math.random() * 90000000);
    setConfirmationNo(`TUE-${digits}`);
  }, []);

  const isDeposit = data.paymentOption === "deposit";
  const remaining = Math.round((data.vehiclePrice - data.dueNow) * 100) / 100;

  const formatDate = (d: string) => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
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
      grand_canyon_south: "Grand Canyon National Park (South Rim)",
      bryce_zion: "Bryce & Zion",
      antelope_canyon: "Antelope Canyon",
      valley_of_fire: "Valley of Fire",
    };
    return map[s] ?? s;
  };

  const sectionClass = "rounded-sm border p-5 mb-4";
  const sectionStyle = {
    borderColor: "rgba(154,168,184,0.1)",
    background: "#040f1e",
  };
  const labelClass = "text-[9px] tracking-[0.2em] uppercase mb-4 block";
  const labelStyle = { color: "#6A7A8C" };
  const rowClass =
    "flex items-start justify-between py-2.5 border-b last:border-0";
  const rowStyle = { borderColor: "rgba(154,168,184,0.07)" };
  const keyClass = "text-white/40 text-xs";
  const valClass = "text-white text-xs text-right max-w-[60%]";

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        {/* Check icon */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{
            background: "rgba(154,168,184,0.08)",
            border: "1px solid rgba(154,168,184,0.2)",
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="#9AA8B8"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="font-serif text-2xl font-semibold text-white mb-2">
          Booking Confirmed
        </h1>
        <p className="text-white/40 text-sm mb-3">
          Thank you, {data.firstName}. We'll be in touch shortly.
        </p>
        {confirmationNo && (
          <div
            className="inline-block px-4 py-1.5 rounded-sm border"
            style={{
              borderColor: "rgba(154,168,184,0.2)",
              background: "rgba(154,168,184,0.05)",
            }}
          >
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "#9AA8B8" }}
            >
              {confirmationNo}
            </span>
          </div>
        )}
      </div>

      {/* Trip Details */}
      <div className={sectionClass} style={sectionStyle}>
        <span className={labelClass} style={labelStyle}>
          Trip Details
        </span>
        <div>
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>Service</span>
            <span className={valClass}>
              {formatServiceType(data.serviceType)}
            </span>
          </div>
          {data.from && data.to && (
            <div className={rowClass} style={rowStyle}>
              <span className={keyClass}>Route</span>
              <span className={valClass}>
                {data.from} → {data.to}
              </span>
            </div>
          )}
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>Date</span>
            <span className={valClass}>{formatDate(data.date)}</span>
          </div>
          {data.time && (
            <div className={rowClass} style={rowStyle}>
              <span className={keyClass}>Pick-up Time</span>
              <span className={valClass}>{data.time}</span>
            </div>
          )}
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>Passengers</span>
            <span className={valClass}>{data.pax} PAX</span>
          </div>
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>Vehicle</span>
            <span className={valClass}>{data.vehicleName}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className={sectionClass} style={sectionStyle}>
        <span className={labelClass} style={labelStyle}>
          Contact Information
        </span>
        <div>
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>Name</span>
            <span className={valClass}>
              {data.firstName} {data.lastName}
            </span>
          </div>
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>Email</span>
            <span className={valClass}>{data.email}</span>
          </div>
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>Phone</span>
            <span className={valClass}>{data.phone}</span>
          </div>
          {data.flightNumber && (
            <div className={rowClass} style={rowStyle}>
              <span className={keyClass}>Flight Number</span>
              <span className={valClass}>{data.flightNumber}</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Summary */}
      <div className={sectionClass} style={sectionStyle}>
        <span className={labelClass} style={labelStyle}>
          Payment Summary
        </span>
        <div>
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>Total</span>
            <span className={valClass}>${data.vehiclePrice.toFixed(2)}</span>
          </div>
          <div className={rowClass} style={rowStyle}>
            <span className={keyClass}>
              {isDeposit ? "Deposit Paid (10%)" : "Amount Paid"}
            </span>
            <span
              className="text-xs text-right font-medium"
              style={{ color: "#9AA8B8" }}
            >
              ${data.dueNow.toFixed(2)}
            </span>
          </div>
          {isDeposit && (
            <div className={rowClass} style={rowStyle}>
              <span className={keyClass}>Remaining Balance</span>
              <span className={valClass}>${remaining.toFixed(2)}</span>
            </div>
          )}
        </div>
        {isDeposit && (
          <p className="text-[10px] mt-3" style={{ color: "#6A7A8C" }}>
            Remaining balance of ${remaining.toFixed(2)} is due 14 days before
            your trip date.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => router.push("/")}
          className="flex-1 py-3.5 text-xs tracking-[0.2em] uppercase border transition-colors"
          style={{
            borderColor: "rgba(154,168,184,0.2)",
            color: "#9AA8B8",
            background: "transparent",
          }}
        >
          Back to Home
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 py-3.5 text-xs tracking-[0.2em] uppercase transition-colors"
          style={{ background: "#6A7A8C", color: "#fff" }}
        >
          Print / Save
        </button>
      </div>
    </div>
  );
}
