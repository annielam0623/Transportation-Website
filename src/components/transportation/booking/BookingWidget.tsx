"use client";
import { useState } from "react";
import CharterForm from "./CharterForm";
import SelfDriveForm from "./SelfDriveForm";

type Tab = "charter" | "hiredriver" | "selfdrive";

export default function BookingWidget() {
  const [tab, setTab] = useState<Tab>("charter");

  const labelCls =
    "block text-[9px] tracking-[.1em] uppercase text-white/45 mb-2 font-medium font-sans";

  return (
    <section
      id="booking"
      style={{ background: "#020c18" }}
      className="py-20 px-6 md:px-16 lg:px-32"
    >
      {/* Header */}
      <div className="max-w-[1600px] mx-auto mb-10">
        <div className="flex items-center gap-3 text-[10px] tracking-[.18em] uppercase text-[#9AA8B8] mb-4">
          <span className="block w-7 h-px bg-[#9AA8B8]" />
          Book Now
        </div>
        <h2 className="font-serif text-[36px] font-bold text-white leading-tight">
          Start Booking or <span className="text-[#9AA8B8]">Get a Quote</span>
        </h2>
        <p className="text-white/45 text-[14px] font-light mt-2">
          Charter Bus · Hire Driver · Self-Drive — instant quote in seconds
        </p>
      </div>

      {/* Card */}
      <div className="max-w-[1600px] mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {(
            [
              { key: "charter", label: "Charter Bus" },
              { key: "hiredriver", label: "Hire Driver" },
              { key: "selfdrive", label: "Self-Drive" },
            ] as { key: Tab; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-4 text-[11px] tracking-[.1em] uppercase font-semibold transition-colors border-b-2 -mb-px font-sans
                ${
                  tab === t.key
                    ? "text-white border-[#9AA8B8]/60 bg-white/[0.04]"
                    : "text-white/38 border-transparent"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Forms */}
        {tab === "charter" && <CharterForm />}
        {tab === "hiredriver" && (
          <div className="px-5 py-12 text-center text-white/38 text-sm font-sans">
            Hire Driver coming soon.
          </div>
        )}
        {tab === "selfdrive" && <SelfDriveForm />}
      </div>
    </section>
  );
}
