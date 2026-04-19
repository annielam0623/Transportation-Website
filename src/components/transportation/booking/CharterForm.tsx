"use client";
import { useState, useRef, useEffect } from "react";
import {
  getCharterQuote,
  CharterQuoteResponse,
} from "@/lib/transportation/charter/client";
import CharterQuoteResult from "./CharterQuoteResult";
import { ServiceType } from "@/lib/transportation/charter/types";

type DropdownOption =
  | { type: "divider"; label: string }
  | { type: "option"; value: ServiceType; label: string };

const SERVICE_OPTIONS: DropdownOption[] = [
  { type: "divider", label: "── Transfers" },
  { type: "option", value: "airport_pickup", label: "Airport Pick-up" },
  { type: "option", value: "airport_dropoff", label: "Airport Drop-off" },
  { type: "option", value: "in_town_transfer", label: "In Town Transfer" },
  {
    type: "option",
    value: "lax_airport_transfer",
    label: "LAX Airport Transfer",
  },
  { type: "divider", label: "── Day Tours" },
  {
    type: "option",
    value: "grand_canyon_national_park",
    label: "Grand Canyon National Park",
  },
  {
    type: "option",
    value: "grand_canyon_west_rim",
    label: "Grand Canyon West Rim",
  },
  { type: "option", value: "bryce_canyon_zion", label: "Bryce Canyon & Zion" },
  { type: "option", value: "antelope_canyon", label: "Antelope Canyon" },
  { type: "option", value: "valley_of_fire", label: "Valley of Fire" },
  {
    type: "option",
    value: "custom_out_of_town_transfer",
    label: "Custom Out-of-Town",
  },
  { type: "divider", label: "── Black Car" },
  { type: "option", value: "luxury_suv_service", label: "Luxury SUV Service" },
  { type: "option", value: "limousine_service", label: "Limousine Service" },
];

function ServiceDropdown({
  value,
  onChange,
  inputCls,
  labelCls,
}: {
  value: ServiceType | "";
  onChange: (v: ServiceType) => void;
  inputCls: string;
  labelCls: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = SERVICE_OPTIONS.find(
    (o) => o.type === "option" && o.value === value,
  ) as { type: "option"; value: ServiceType; label: string } | undefined;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className={labelCls}>Service Type</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${inputCls} flex items-center justify-between w-full text-left`}
        style={{ color: value ? "#fff" : "rgba(255,255,255,0.28)" }}
      >
        <span>{selected?.label ?? "Select service..."}</span>
        <span className="text-white/40 text-[10px]">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 w-full border border-white/10 overflow-y-auto"
          style={{ background: "#020c18", maxHeight: "320px" }}
        >
          {SERVICE_OPTIONS.map((opt, i) => {
            if (opt.type === "divider") {
              return (
                <div
                  key={i}
                  className="px-4 py-2 text-[9px] tracking-[.12em] uppercase text-white/30 font-medium font-sans"
                >
                  {opt.label}
                </div>
              );
            }
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="w-full text-left px-6 py-2.5 text-[13px] font-sans transition-colors"
                style={{
                  background: isSelected ? "#9AA8B8" : "transparent",
                  color: isSelected ? "#020c18" : "#fff",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "rgba(154,168,184,0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CharterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<CharterQuoteResponse | null>(null);

  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [luggage, setLuggage] = useState(0);
  const [pax, setPax] = useState(1);
  const [airportType, setAirportType] = useState<"domestic" | "international">(
    "domestic",
  );

  const isAirport =
    serviceType === "airport_pickup" || serviceType === "airport_dropoff";

  const labelCls =
    "block text-[9px] tracking-[.1em] uppercase text-white/45 mb-2 font-medium font-sans";
  const inputCls =
    "w-full bg-transparent border-none border-b border-white/10 pb-2 pt-1 text-[13px] text-white outline-none font-sans placeholder:text-white/28 focus:border-b-[#9AA8B8]/50 transition-colors cursor-pointer";
  const cellCls = "px-5 py-[18px] border-b border-white/10";
  const cell2Cls = "px-5 py-4";
  const counterCls = "flex items-center border-b border-white/10 h-[34px]";
  const counterBtnCls =
    "w-6 text-[#9AA8B8] text-base bg-transparent border-none cursor-pointer font-sans";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceType) return;
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const data = await getCharterQuote({
        serviceType,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        tripDate: date,
        pickupTime: time,
        passengerCount: pax,
        luggageCount: luggage,
        airportType: isAirport ? airportType : undefined,
      });

      if (!data.success) throw new Error(data.error || "Quote failed");
      setResponse(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Row 1 — Service Type / Pick-up / Drop-off */}
        <div className="grid grid-cols-[1fr_1fr_1fr]">
          <div className={cellCls}>
            <ServiceDropdown
              value={serviceType}
              onChange={setServiceType}
              inputCls={inputCls}
              labelCls={labelCls}
            />
          </div>

          <div className={cellCls}>
            <label className={labelCls}>Pick-up Location</label>
            <input
              required
              className={inputCls}
              placeholder="Enter pick-up address"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>

          <div className={cellCls}>
            <label className={labelCls}>Drop-off Location</label>
            <input
              required
              className={inputCls}
              placeholder="Enter drop-off address"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
          </div>
        </div>

        {/* Airport Type */}
        {isAirport && (
          <div className="grid grid-cols-[1fr]">
            <div className={cellCls}>
              <label className={labelCls}>Airport Transfer Type</label>
              <select
                className={inputCls}
                value={airportType}
                onChange={(e) =>
                  setAirportType(e.target.value as "domestic" | "international")
                }
                style={{ colorScheme: "dark" }}
              >
                <option value="domestic" className="bg-[#020c18]">
                  Domestic Arrival / Outbound
                </option>
                <option value="international" className="bg-[#020c18]">
                  International Arrival
                </option>
              </select>
            </div>
          </div>
        )}

        {/* Row 2 — Date / Time / Luggage / Pax / Submit */}
        <div className="grid grid-cols-[160px_160px_140px_140px_minmax(180px,1fr)]">
          <div className={cell2Cls}>
            <label className={labelCls}>Date</label>
            <input
              required
              type="date"
              className={inputCls}
              style={{ colorScheme: "dark" }}
              onClick={(e) => (e.target as HTMLInputElement).showPicker()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className={cell2Cls}>
            <label className={labelCls}>Time</label>
            <input
              type="time"
              className={inputCls}
              style={{ colorScheme: "dark" }}
              onClick={(e) => (e.target as HTMLInputElement).showPicker()}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className={cell2Cls}>
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

          <div className={cell2Cls}>
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
              {loading ? "Checking..." : "Check Vehicles & Price"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm font-sans px-5 py-3">{error}</p>
        )}
      </form>

      {response?.success && response.quote && (
        <CharterQuoteResult
          vehicles={response.quote.vehicles}
          serviceType={serviceType}
          passengerCount={pax}
          luggageCount={luggage}
        />
      )}
    </div>
  );
}
