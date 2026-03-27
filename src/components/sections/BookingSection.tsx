"use client";
import { useState } from "react";

type Tab = "charter" | "flydrive";
type ServiceType =
  | ""
  | "AIRPORT_PICKUP"
  | "AIRPORT_DROPOFF"
  | "IN_TOWN"
  | "GRAND_CANYON"
  | "BRYCE_ZION"
  | "GRAND_CANYON_WEST"
  | "ANTELOPE"
  | "FIRE_VALLEY";

export default function BookingSection() {
  const [tab, setTab] = useState<Tab>("charter");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [luggage, setLuggage] = useState(0);
  const [pax, setPax] = useState(1);

  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [tripDays, setTripDays] = useState("");
  const [mode, setMode] = useState("AI_RECOMMEND");
  const [travelers, setTravelers] = useState(1);

  const submitCharter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "CHARTER",
          serviceType,
          pickupAddress: pickup,
          dropoffAddress: dropoff,
          departureDate: date,
          departureTime: time,
          luggageCount: luggage,
          passengerCount: pax,
          email: "",
          firstName: "",
          lastName: "",
        }),
      });
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const submitFlyDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originCity: origin,
          destination: dest,
          departureDate: tripDate,
          tripDays: parseInt(tripDays) || 1,
          travelMode: mode,
          travelerCount: travelers,
        }),
      });
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const labelCls =
    "block text-[9px] tracking-[.1em] uppercase text-white/45 mb-2 font-medium font-sans";
  const inputCls =
    "w-full bg-transparent border-none border-b border-white/10 pb-2 pt-1 text-[13px] text-white outline-none font-sans placeholder:text-white/28 focus:border-b-[#9AA8B8]/50 transition-colors cursor-pointer";
  const cellCls = "px-5 py-[18px] border-b border-white/10";
  const cell3Cls = "px-5 py-4";
  const counterCls = "flex items-center border-b border-white/10 h-[34px]";
  const counterBtnCls =
    "w-6 text-[#9AA8B8] text-base bg-transparent border-none cursor-pointer font-sans";

  return (
    <section
      id="booking"
      style={{ background: "#020c18" }}
      className="py-20 px-6 md:px-16 lg:px-32"
    >
      {/* Header */}
      <div className="max-w-[1600px]  mb-10 text-center">
        <div className="flex items-center gap-3 text-[10px] tracking-[.18em] uppercase text-[#9AA8B8] mb-4">
          <span className="block w-7 h-px bg-[#9AA8B8]" />
          Book Now
        </div>
        <h2 className="font-serif text-[36px] font-bold text-white leading-tight">
          Start Booking or <span className="text-[#9AA8B8]">Get a Quote</span>
        </h2>
        <p className="text-white/45 text-[14px] font-light mt-2">
          Charter bus or Fly &amp; Drive — instant quote in seconds
        </p>
      </div>

      {/* Card */}
      <div className="max-w-[1600px] mx-auto">
        {success ? (
          <div className="p-8 text-center border-b border-white/10">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="font-serif text-xl mb-2 text-white">
              Request Received!
            </h3>
            <p className="text-white/50 text-sm">
              We'll get back to you within 2 hours.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 text-[#9AA8B8] text-sm underline"
            >
              Submit another
            </button>
          </div>
        ) : (
          <div>
            {/* Row 1 — Tabs */}
            <div className="flex border-b border-white/10">
              {(["charter", "flydrive"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-4 text-[11px] tracking-[.1em] uppercase font-semibold transition-colors border-b-2 -mb-px font-sans
                    ${tab === t ? "text-white border-[#9AA8B8]/60 bg-white/4" : "text-white/38 border-transparent"}`}
                >
                  {t === "charter" ? "Charter Bus" : "Fly & Drive"}
                </button>
              ))}
            </div>

            {tab === "charter" && (
              <form onSubmit={submitCharter}>
                {/* Row 2 — Service Type / Pick-up / Drop-off */}
                <div className="grid grid-cols-[1fr_1fr_1fr]">
                  <div className={cellCls}>
                    <label className={labelCls}>Service Type</label>
                    <select
                      className={inputCls}
                      value={serviceType}
                      onChange={(e) =>
                        setServiceType(e.target.value as ServiceType)
                      }
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" className="bg-[#020c18]">
                        Select service...
                      </option>
                      <optgroup label="── Transfers" className="bg-[#020c18]">
                        <option value="AIRPORT_PICKUP" className="bg-[#020c18]">
                          Airport Pick-up
                        </option>
                        <option
                          value="AIRPORT_DROPOFF"
                          className="bg-[#020c18]"
                        >
                          Airport Drop-off
                        </option>
                        <option value="IN_TOWN" className="bg-[#020c18]">
                          In Town Transfer
                        </option>
                      </optgroup>
                      <optgroup label="── Day Tours" className="bg-[#020c18]">
                        <option value="GRAND_CANYON" className="bg-[#020c18]">
                          Grand Canyon National Park 1 Day Tour
                        </option>
                        <option value="BRYCE_ZION" className="bg-[#020c18]">
                          Bryce & Zion One Day Tour
                        </option>
                        <option
                          value="GRAND_CANYON_WEST"
                          className="bg-[#020c18]"
                        >
                          Grand Canyon West Rim One Day Tour
                        </option>
                        <option value="ANTELOPE" className="bg-[#020c18]">
                          Antelope Canyon One Day Tour
                        </option>
                        <option value="FIRE_VALLEY" className="bg-[#020c18]">
                          Fire of Valley One Day Tour
                        </option>
                      </optgroup>
                    </select>
                  </div>
                  <div className={cellCls}>
                    <label className={labelCls}>Pick-up Location</label>
                    <input
                      className={inputCls}
                      placeholder="Enter pick-up address"
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </div>
                  <div className={cellCls}>
                    <label className={labelCls}>Drop-off Location</label>
                    <input
                      className={inputCls}
                      placeholder="Enter drop-off address"
                      onChange={(e) => setDropoff(e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 3 — Date / Time / Luggage / Pax / Submit */}
                <div className="grid grid-cols-[160px_160px_140px_140px_1fr]">
                  <div className={cell3Cls}>
                    <label className={labelCls}>Date</label>
                    <input
                      type="date"
                      className={inputCls}
                      style={{ colorScheme: "dark" }}
                      onClick={(e) =>
                        (e.target as HTMLInputElement).showPicker()
                      }
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className={cell3Cls}>
                    <label className={labelCls}>Time</label>
                    <input
                      type="time"
                      className={inputCls}
                      style={{ colorScheme: "dark" }}
                      onClick={(e) =>
                        (e.target as HTMLInputElement).showPicker()
                      }
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className={cell3Cls}>
                    <label className={labelCls}>Luggage</label>
                    <div className={counterCls}>
                      <button
                        type="button"
                        onClick={() => setLuggage(Math.max(0, luggage - 1))}
                        className={counterBtnCls}
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-[13px] text-white">
                        {luggage}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLuggage(luggage + 1)}
                        className={counterBtnCls}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={cell3Cls}>
                    <label className={labelCls}>Pax</label>
                    <div className={counterCls}>
                      <button
                        type="button"
                        onClick={() => setPax(Math.max(1, pax - 1))}
                        className={counterBtnCls}
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-[13px] text-white">
                        {pax}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPax(pax + 1)}
                        className={counterBtnCls}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-2/3 py-2.5 bg-[#9AA8B8] text-[#020c18] text-[10px] tracking-[.12em] uppercase font-bold hover:bg-[#B8C4D4] transition-colors disabled:opacity-60 font-sans"
                    >
                      {loading ? "Checking..." : "Check Vehicles"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {tab === "flydrive" && (
              <form onSubmit={submitFlyDrive}>
                {/* Row 2 — Origin / Destination / Travel Mode */}
                <div className="grid grid-cols-[1fr_1fr_1fr]">
                  <div className={cellCls}>
                    <label className={labelCls}>Travel Mode</label>
                    <select
                      className={inputCls}
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="AI_RECOMMEND" className="bg-[#020c18]">
                        AI Recommend
                      </option>
                      <option value="SELF_DRIVE" className="bg-[#020c18]">
                        Self-Drive
                      </option>
                      <option value="CHAUFFEUR" className="bg-[#020c18]">
                        Chauffeur
                      </option>
                      <option value="HYBRID" className="bg-[#020c18]">
                        Hybrid
                      </option>
                    </select>
                  </div>
                  <div className={cellCls}>
                    <label className={labelCls}>Origin City / Airport</label>
                    <input
                      className={inputCls}
                      placeholder="e.g. Los Angeles, LAX"
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                  <div className={cellCls}>
                    <label className={labelCls}>Destination</label>
                    <input
                      className={inputCls}
                      placeholder="e.g. Las Vegas"
                      onChange={(e) => setDest(e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 3 — Date / Trip Days / Travelers / Submit */}
                <div className="grid grid-cols-[160px_160px_140px_1fr]">
                  <div className={cell3Cls}>
                    <label className={labelCls}>Date</label>
                    <input
                      type="date"
                      className={inputCls}
                      style={{ colorScheme: "dark" }}
                      onClick={(e) =>
                        (e.target as HTMLInputElement).showPicker()
                      }
                      onChange={(e) => setTripDate(e.target.value)}
                    />
                  </div>
                  <div className={cell3Cls}>
                    <label className={labelCls}>Trip Days</label>
                    <select
                      className={inputCls}
                      onChange={(e) => setTripDays(e.target.value)}
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" className="bg-[#020c18]">
                        How long?
                      </option>
                      <option value="1" className="bg-[#020c18]">
                        1 day
                      </option>
                      <option value="3" className="bg-[#020c18]">
                        2–3 days
                      </option>
                      <option value="5" className="bg-[#020c18]">
                        4–7 days
                      </option>
                      <option value="8" className="bg-[#020c18]">
                        7+ days
                      </option>
                    </select>
                  </div>
                  <div className={cell3Cls}>
                    <label className={labelCls}>Travelers</label>
                    <div className={counterCls}>
                      <button
                        type="button"
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className={counterBtnCls}
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-[13px] text-white">
                        {travelers}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTravelers(travelers + 1)}
                        className={counterBtnCls}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-2/3 py-2.5 bg-[#9AA8B8] text-[#020c18] text-[10px] tracking-[.12em] uppercase font-bold hover:bg-[#B8C4D4] transition-colors disabled:opacity-60 font-sans"
                    >
                      {loading ? "Processing..." : "Get AI Recommendation"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
