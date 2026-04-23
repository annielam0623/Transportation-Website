"use client";

import { searchLasVegas } from "@/lib/transportation/cities/las-vegas";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import LocationInput from "@/components/transportation/ui/LocationInput";

interface EditSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: {
    city?: string;
    serviceType: string;
    from: string;
    to: string;
    date: string;
    time: string;
    pax: number;
    luggage: number;
    airportType?: string;
  };
}

const SERVICE_TYPES = [
  { value: "airport_pickup", label: "Airport Transfer — Pick Up" },
  { value: "airport_dropoff", label: "Airport Transfer — Drop Off" },
  { value: "in_town", label: "In-Town Hourly" },
  { value: "grand_canyon_west", label: "Grand Canyon West Rim" },
  { value: "grand_canyon_south", label: "Grand Canyon South Rim" },
  { value: "bryce_zion", label: "Bryce Canyon & Zion" },
  { value: "antelope_canyon", label: "Antelope Canyon" },
  { value: "valley_of_fire", label: "Valley of Fire" },
  { value: "custom_out_of_town", label: "Custom Out-of-Town" },
];

const AIRPORTS_BY_CITY: Record<string, { code: string; name: string }[]> = {
  las_vegas: [
    { code: "LAS", name: "Harry Reid International" },
    { code: "HND", name: "Henderson Executive" },
  ],
  los_angeles: [
    { code: "LAX", name: "Los Angeles International" },
    { code: "BUR", name: "Hollywood Burbank" },
    { code: "LGB", name: "Long Beach Airport" },
    { code: "SNA", name: "John Wayne (Orange County)" },
    { code: "ONT", name: "Ontario International" },
    { code: "VNY", name: "Van Nuys Airport" },
    { code: "SAN", name: "San Diego International" },
    { code: "CLD", name: "McClellan-Palomar (Carlsbad)" },
  ],
  san_francisco: [
    { code: "SFO", name: "San Francisco International" },
    { code: "OAK", name: "Oakland International" },
    { code: "SJC", name: "San Jose International" },
  ],
  phoenix: [
    { code: "PHX", name: "Phoenix Sky Harbor" },
    { code: "SDL", name: "Scottsdale Airport" },
    { code: "FLG", name: "Flagstaff Pulliam" },
    { code: "PGA", name: "Page Municipal" },
  ],
};

const isAirportPickup = (st: string) => st === "airport_pickup";
const isAirportDropoff = (st: string) => st === "airport_dropoff";
const isAirport = (st: string) => isAirportPickup(st) || isAirportDropoff(st);

export default function EditSearchModal({
  isOpen,
  onClose,
  initialValues,
}: EditSearchModalProps) {
  const router = useRouter();

  const [city, setCity] = useState(initialValues.city || "las_vegas");
  const [serviceType, setServiceType] = useState(
    initialValues.serviceType || "airport_pickup",
  );
  const [airport, setAirport] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(initialValues.date || "");
  const [time, setTime] = useState(initialValues.time || "");
  const [pax, setPax] = useState(initialValues.pax || 1);
  const [luggage, setLuggage] = useState(initialValues.luggage || 0);
  const [airportType, setAirportType] = useState(
    initialValues.airportType || "domestic",
  );

  useEffect(() => {
    if (!isOpen) return;
    setCity(initialValues.city || "las_vegas");
    setServiceType(initialValues.serviceType || "airport_pickup");
    setDate(initialValues.date || "");
    setTime(initialValues.time || "");
    setPax(initialValues.pax || 1);
    setLuggage(initialValues.luggage || 0);
    setAirportType(initialValues.airportType || "domestic");
    if (isAirportPickup(initialValues.serviceType)) {
      setAirport(initialValues.from || "");
      setLocation(initialValues.to || "");
    } else if (isAirportDropoff(initialValues.serviceType)) {
      setLocation(initialValues.from || "");
      setAirport(initialValues.to || "");
    } else {
      setLocation(initialValues.from || "");
    }
  }, [isOpen]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const minDate = tomorrow.toISOString().split("T")[0];
  const tomorrowStr = minDate;
  const minTime =
    date === tomorrowStr
      ? `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
      : undefined;

  const airports = AIRPORTS_BY_CITY[city] || AIRPORTS_BY_CITY["las_vegas"];
  const searchFn = searchLasVegas;

  const handleSubmit = () => {
    let fromVal = "";
    let toVal = "";
    if (isAirportPickup(serviceType)) {
      fromVal = airport;
      toVal = location;
    } else if (isAirportDropoff(serviceType)) {
      fromVal = location;
      toVal = airport;
    } else {
      fromVal = location;
    }

    const params = new URLSearchParams({
      city,
      serviceType,
      from: fromVal,
      to: toVal,
      date,
      time,
      pax: String(pax),
      luggage: String(luggage),
      ...(isAirport(serviceType) ? { airportType } : {}),
    });

    onClose();
    router.push(`/charter/quote?${params.toString()}`);
  };

  if (!isOpen) return null;

  const labelCls =
    "block text-[0.7rem] tracking-[0.2em] uppercase text-[#9AA8B8] mb-1.5";
  const borderB = "1px solid rgba(154,168,184,0.35)";

  const SelectWrap = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      {children}
      <span className="absolute right-1 top-1.5 text-[#6A7A8C] text-[10px] pointer-events-none">
        ▼
      </span>
    </div>
  );

  const selectCls =
    "w-full bg-transparent border-none outline-none text-[#E8ECF2] text-[15px] pb-2 pt-1 pr-5 appearance-none cursor-pointer";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(2,12,24,0.85)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-[820px] rounded-lg overflow-hidden"
        style={{
          background: "#020c18",
          border: "0.5px solid rgba(154,168,184,0.25)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "0.5px solid rgba(154,168,184,0.15)" }}
        >
          <span
            className="text-[#E8ECF2] text-[17px]"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.02em",
            }}
          >
            Edit Search
          </span>
          <button
            onClick={onClose}
            className="text-[#6A7A8C] hover:text-[#E8ECF2] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* City + Service Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>City</label>
              <SelectWrap>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setAirport("");
                  }}
                  className={selectCls}
                  style={{ borderBottom: borderB }}
                >
                  <option value="las_vegas" style={{ background: "#0A1E38" }}>
                    Las Vegas
                  </option>
                  <option value="los_angeles" style={{ background: "#0A1E38" }}>
                    Los Angeles
                  </option>
                  <option
                    value="san_francisco"
                    style={{ background: "#0A1E38" }}
                  >
                    San Francisco
                  </option>
                  <option value="phoenix" style={{ background: "#0A1E38" }}>
                    Phoenix
                  </option>
                </select>
              </SelectWrap>
            </div>
            <div>
              <label className={labelCls}>Service Type</label>
              <SelectWrap>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className={selectCls}
                  style={{ borderBottom: borderB }}
                >
                  {SERVICE_TYPES.map((s) => (
                    <option
                      key={s.value}
                      value={s.value}
                      style={{ background: "#0A1E38" }}
                    >
                      {s.label}
                    </option>
                  ))}
                </select>
              </SelectWrap>
            </div>
          </div>

          {/* Airport Pick-up */}
          {isAirportPickup(serviceType) && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Pick-up Airport</label>
                <SelectWrap>
                  <select
                    value={airport}
                    onChange={(e) => setAirport(e.target.value)}
                    className={selectCls}
                    style={{ borderBottom: borderB }}
                  >
                    <option value="" style={{ background: "#0A1E38" }}>
                      Select airport
                    </option>
                    {airports.map((a) => (
                      <option
                        key={a.code}
                        value={`${a.code} — ${a.name}`}
                        style={{ background: "#0A1E38" }}
                      >
                        {a.code} — {a.name}
                      </option>
                    ))}
                  </select>
                </SelectWrap>
              </div>
              <div>
                <label className={labelCls}>Drop-off Location</label>
                <LocationInput
                  value={location}
                  onChange={setLocation}
                  onSearch={searchFn}
                  placeholder="Hotel or address..."
                />
              </div>
            </div>
          )}

          {/* Airport Drop-off */}
          {isAirportDropoff(serviceType) && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Pick-up Location</label>
                <LocationInput
                  value={location}
                  onChange={setLocation}
                  onSearch={searchFn}
                  placeholder="Hotel or address..."
                />
              </div>
              <div>
                <label className={labelCls}>Drop-off Airport</label>
                <SelectWrap>
                  <select
                    value={airport}
                    onChange={(e) => setAirport(e.target.value)}
                    className={selectCls}
                    style={{ borderBottom: borderB }}
                  >
                    <option value="" style={{ background: "#0A1E38" }}>
                      Select airport
                    </option>
                    {airports.map((a) => (
                      <option
                        key={a.code}
                        value={`${a.code} — ${a.name}`}
                        style={{ background: "#0A1E38" }}
                      >
                        {a.code} — {a.name}
                      </option>
                    ))}
                  </select>
                </SelectWrap>
              </div>
            </div>
          )}

          {/* Non-airport */}
          {!isAirport(serviceType) && (
            <div>
              <label className={labelCls}>Location</label>
              <LocationInput
                value={location}
                onChange={setLocation}
                onSearch={searchFn}
                placeholder="Hotel or address..."
              />
            </div>
          )}

          {/* Flight Type (airport only) */}
          {isAirport(serviceType) && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Flight Type</label>
                <SelectWrap>
                  <select
                    value={airportType}
                    onChange={(e) => setAirportType(e.target.value)}
                    className={selectCls}
                    style={{ borderBottom: borderB }}
                  >
                    <option value="domestic" style={{ background: "#0A1E38" }}>
                      Domestic
                    </option>
                    <option
                      value="international"
                      style={{ background: "#0A1E38" }}
                    >
                      International
                    </option>
                  </select>
                </SelectWrap>
              </div>
            </div>
          )}

          {/* Date / Time / Pax / Luggage */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className={labelCls}>Date</label>
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[#E8ECF2] text-[15px] pb-2 pt-1"
                style={{ borderBottom: borderB, colorScheme: "dark" }}
              />
            </div>
            <div>
              <label className={labelCls}>Time</label>
              <input
                type="time"
                value={time}
                min={minTime}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[#E8ECF2] text-[15px] pb-2 pt-1"
                style={{ borderBottom: borderB, colorScheme: "dark" }}
              />
            </div>
            <div>
              <label className={labelCls}>Passengers</label>
              <div
                className="flex items-center gap-3 pb-2 pt-1"
                style={{ borderBottom: borderB }}
              >
                <button
                  type="button"
                  onClick={() => setPax(Math.max(1, pax - 1))}
                  className="text-[#9AA8B8] hover:text-white bg-transparent border-none text-base leading-none"
                >
                  −
                </button>
                <span className="text-[#E8ECF2] text-[15px] w-5 text-center">
                  {pax}
                </span>
                <button
                  type="button"
                  onClick={() => setPax(pax + 1)}
                  className="text-[#9AA8B8] hover:text-white bg-transparent border-none text-base leading-none"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className={labelCls}>Luggage</label>
              <div
                className="flex items-center gap-3 pb-2 pt-1"
                style={{ borderBottom: borderB }}
              >
                <button
                  type="button"
                  onClick={() => setLuggage(Math.max(0, luggage - 1))}
                  className="text-[#9AA8B8] hover:text-white bg-transparent border-none text-base leading-none"
                >
                  −
                </button>
                <span className="text-[#E8ECF2] text-[15px] w-5 text-center">
                  {luggage}
                </span>
                <button
                  type="button"
                  onClick={() => setLuggage(luggage + 1)}
                  className="text-[#9AA8B8] hover:text-white bg-transparent border-none text-base leading-none"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleSubmit}
            className="w-full text-[#E8ECF2] text-[11px] tracking-[0.2em] uppercase py-3 rounded transition-colors hover:opacity-90"
            style={{ background: "#6A7A8C" }}
          >
            Update Quote
          </button>
        </div>
      </div>
    </div>
  );
}
