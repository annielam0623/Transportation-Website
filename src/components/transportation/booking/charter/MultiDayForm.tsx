// components/transportation/booking/charter/MultiDayForm.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getAllCities,
  getActiveCity,
  CityKey,
} from "@/lib/transportation/cities";
import { SearchResult } from "@/lib/transportation/cities/las-vegas";
import { ServiceType } from "@/lib/transportation/charter/types";
import LocationInput from "@/components/transportation/ui/LocationInput";

// ── Types ──────────────────────────────────────────────────────────────────

type Stop = {
  id: string;
  location: string;
  locationResult?: SearchResult;
};

type DayAddon = {
  meetGreet: boolean;
  bottledWater: number;
  childSeat: number;
  gratuity: string;
  tourGuide: boolean;
  vehicleEntryFee: boolean;
  guestAdmission: boolean;
  admissionAdult: number;
  admissionChild: number;
};

type DayItem = {
  id: string;
  serviceType: ServiceType;
  pickup: string;
  pickupResult?: SearchResult;
  dropoff: string;
  dropoffResult?: SearchResult;
  time: string;
  stops: Stop[];
  addons: DayAddon;
  expanded: boolean;
};

// ── Constants ──────────────────────────────────────────────────────────────

const SERVICE_TYPES: { value: ServiceType; label: string; group: string }[] = [
  { value: "airport_pickup", label: "Airport Pick-up", group: "Transfers" },
  { value: "airport_dropoff", label: "Airport Drop-off", group: "Transfers" },
  { value: "in_town_transfer", label: "In Town Transfer", group: "Transfers" },
  {
    value: "grand_canyon_south",
    label: "Grand Canyon National Park (South Rim)",
    group: "Day Tours",
  },
  {
    value: "grand_canyon_west_rim",
    label: "Grand Canyon West Rim",
    group: "Day Tours",
  },
  { value: "bryce_canyon_zion", label: "Bryce & Zion", group: "Day Tours" },
  { value: "antelope_canyon", label: "Antelope Canyon", group: "Day Tours" },
  { value: "valley_of_fire", label: "Valley of Fire", group: "Day Tours" },
  {
    value: "custom_out_of_town_transfer",
    label: "Custom Out-of-Town",
    group: "Out of Town",
  },
];

const TOUR_TYPES: ServiceType[] = [
  "grand_canyon_south",
  "grand_canyon_west_rim",
  "bryce_canyon_zion",
  "antelope_canyon",
  "valley_of_fire",
];

const SHOW_STOPS_TYPES: ServiceType[] = [
  "in_town_transfer",
  "airport_pickup",
  "airport_dropoff",
];
const OOT_TYPES: ServiceType[] = ["custom_out_of_town_transfer", ...TOUR_TYPES];

const VEHICLE_ENTRY_FEE: Partial<Record<ServiceType, number>> = {
  grand_canyon_west_rim: 150,
  grand_canyon_south: 300,
  bryce_canyon_zion: 140,
  antelope_canyon: 70,
};

function defaultAddon(): DayAddon {
  return {
    meetGreet: false,
    bottledWater: 0,
    childSeat: 0,
    gratuity: "",
    tourGuide: false,
    vehicleEntryFee: false,
    guestAdmission: false,
    admissionAdult: 0,
    admissionChild: 0,
  };
}

function defaultDay(id: string): DayItem {
  return {
    id,
    serviceType: "airport_pickup",
    pickup: "",
    dropoff: "",
    time: "",
    stops: [],
    addons: defaultAddon(),
    expanded: true,
  };
}

function getMinDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
}

function serviceLabel(type: ServiceType): string {
  return SERVICE_TYPES.find((s) => s.value === type)?.label ?? type;
}

// ── Sub-components ─────────────────────────────────────────────────────────

const labelCls = "text-[10px] tracking-widest text-white/40 uppercase mb-1.5";
const inputCls =
  "w-full bg-transparent border-b border-white/20 text-sm text-white outline-none py-1.5";

function AirportSelect({
  label,
  value,
  onChange,
  airports,
}: {
  label: string;
  value: string;
  onChange: (val: string, code: string) => void;
  airports: { code: string; name: string }[];
}) {
  return (
    <div className="w-full">
      <p className={labelCls}>{label}</p>
      <select
        value={value}
        onChange={(e) => {
          const selected = airports.find((a) => a.code === e.target.value);
          if (selected)
            onChange(`${selected.code} — ${selected.name}`, selected.code);
        }}
        className={`${inputCls} appearance-none cursor-pointer`}
      >
        <option value="" className="bg-[#0A1E38] text-white/40">
          Select airport...
        </option>
        {airports.map((a) => (
          <option
            key={a.code}
            value={a.code}
            className="bg-[#0A1E38] text-white"
          >
            {a.code} — {a.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[10px] tracking-[0.1em] uppercase px-3 py-1 border transition-colors ${
        active
          ? "border-white/50 text-white bg-white/8"
          : "border-white/20 text-white/40 hover:text-white/60"
      }`}
    >
      {children}
    </button>
  );
}

function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="text-white/40 hover:text-white text-base leading-none"
      >
        −
      </button>
      <span className="text-sm text-white min-w-[20px] text-center">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="text-white/40 hover:text-white text-base leading-none"
      >
        +
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function MultiDayForm() {
  const router = useRouter();
  const allCities = getAllCities();
  const [cityKey, setCityKey] = useState<CityKey>("las-vegas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pax, setPax] = useState(8);
  const [days, setDays] = useState<DayItem[]>([defaultDay("day-1")]);

  const city = getActiveCity(cityKey);
  const cityAirports = city?.airports ?? [];

  function handleSearch(query: string): SearchResult[] {
    if (!city) return [];
    return city.search(query);
  }

  function updateDay(id: string, patch: Partial<DayItem>) {
    setDays((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }

  function updateAddon(id: string, patch: Partial<DayAddon>) {
    setDays((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, addons: { ...d.addons, ...patch } } : d,
      ),
    );
  }

  function addDay() {
    const id = `day-${Date.now()}`;
    setDays((prev) => [...prev, defaultDay(id)]);
  }

  function removeDay(id: string) {
    setDays((prev) => prev.filter((d) => d.id !== id));
  }

  function addStop(dayId: string) {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          stops: [...d.stops, { id: `stop-${Date.now()}`, location: "" }],
        };
      }),
    );
  }

  function removeStop(dayId: string, stopId: string) {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d;
        return { ...d, stops: d.stops.filter((s) => s.id !== stopId) };
      }),
    );
  }

  function updateStop(
    dayId: string,
    stopId: string,
    location: string,
    result?: SearchResult,
  ) {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          stops: d.stops.map((s) =>
            s.id === stopId ? { ...s, location, locationResult: result } : s,
          ),
        };
      }),
    );
  }

  const minDate = getMinDate();

  // ── Render Day ──────────────────────────────────────────────────────────

  function renderDay(day: DayItem, index: number) {
    const isTour = TOUR_TYPES.includes(day.serviceType);
    const showStops = SHOW_STOPS_TYPES.includes(day.serviceType);
    const isOOT = OOT_TYPES.includes(day.serviceType);
    const maxStops = isOOT ? 1 : 999;
    const entryFee = VEHICLE_ENTRY_FEE[day.serviceType];

    const summaryText =
      day.pickup && day.dropoff
        ? `${serviceLabel(day.serviceType)} · ${day.pickup} → ${day.dropoff}`
        : serviceLabel(day.serviceType);

    return (
      <div key={day.id} className="border border-white/10 mb-3">
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-white/10 cursor-pointer"
          onClick={() => updateDay(day.id, { expanded: !day.expanded })}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest uppercase text-white/60">
              Day {index + 1}
            </span>
            <span className="text-xs text-white/35">{summaryText}</span>
          </div>
          <div className="flex items-center gap-3">
            {days.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeDay(day.id);
                }}
                className="text-[10px] text-white/30 hover:text-white/60 tracking-widest uppercase"
              >
                Remove
              </button>
            )}
            <span className="text-white/30 text-xs">
              {day.expanded ? "▲" : "▼"}
            </span>
          </div>
        </div>

        {/* Body */}
        {day.expanded && (
          <div className="px-5 py-5">
            {/* Row 1: Service / Pickup / Dropoff / Time */}
            <div className="grid grid-cols-4 gap-0 border-b border-white/10 pb-5 mb-5">
              {/* Service Type */}
              <div className="pr-8 border-r border-white/10">
                <p className={labelCls}>Service Type</p>
                <select
                  value={day.serviceType}
                  onChange={(e) =>
                    updateDay(day.id, {
                      serviceType: e.target.value as ServiceType,
                      pickup: "",
                      pickupResult: undefined,
                      dropoff: "",
                      dropoffResult: undefined,
                      stops: [],
                      addons: defaultAddon(),
                    })
                  }
                  className={`${inputCls} appearance-none cursor-pointer`}
                >
                  {["Transfers", "Day Tours", "Out of Town"].map((group) => (
                    <optgroup
                      key={group}
                      label={`── ${group}`}
                      className="bg-[#020c18] text-white/50"
                    >
                      {SERVICE_TYPES.filter((s) => s.group === group).map(
                        (s) => (
                          <option
                            key={s.value}
                            value={s.value}
                            className="bg-[#0A1E38] text-white"
                          >
                            {s.label}
                          </option>
                        ),
                      )}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Pick-up */}
              <div className="px-8 border-r border-white/10">
                {day.serviceType === "airport_pickup" ? (
                  <AirportSelect
                    label="Pick-up Location"
                    value={day.pickupResult?.code ?? ""}
                    airports={cityAirports}
                    onChange={(val, code) =>
                      updateDay(day.id, {
                        pickup: val,
                        pickupResult: {
                          name: val,
                          sortName: code,
                          type: "airport",
                          code,
                        },
                      })
                    }
                  />
                ) : (
                  <LocationInput
                    label="Pick-up Location"
                    placeholder="Hotel name or address..."
                    value={day.pickup}
                    onChange={(val, result) =>
                      updateDay(day.id, { pickup: val, pickupResult: result })
                    }
                    onSearch={handleSearch}
                    filterType="location"
                    disabled={!city}
                  />
                )}
              </div>

              {/* Drop-off */}
              <div className="px-8 border-r border-white/10">
                {day.serviceType === "airport_dropoff" ? (
                  <AirportSelect
                    label="Drop-off Location"
                    value={day.dropoffResult?.code ?? ""}
                    airports={cityAirports}
                    onChange={(val, code) =>
                      updateDay(day.id, {
                        dropoff: val,
                        dropoffResult: {
                          name: val,
                          sortName: code,
                          type: "airport",
                          code,
                        },
                      })
                    }
                  />
                ) : (
                  <LocationInput
                    label="Drop-off Location"
                    placeholder="Hotel name or address..."
                    value={day.dropoff}
                    onChange={(val, result) =>
                      updateDay(day.id, { dropoff: val, dropoffResult: result })
                    }
                    onSearch={handleSearch}
                    filterType="location"
                    disabled={!city}
                  />
                )}
              </div>

              {/* Time */}
              <div className="pl-8">
                <p className={labelCls}>Arrival Time</p>
                <input
                  type="time"
                  value={day.time}
                  onChange={(e) => updateDay(day.id, { time: e.target.value })}
                  onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Stops */}
            {showStops && (
              <div className="mb-5">
                {day.stops.map((stop, si) => (
                  <div key={stop.id} className="flex items-end gap-4 mb-3">
                    <div className="flex-1">
                      <LocationInput
                        label={`Stop ${si + 1}`}
                        placeholder="Address or hotel name..."
                        value={stop.location}
                        onChange={(val, result) =>
                          updateStop(day.id, stop.id, val, result)
                        }
                        onSearch={handleSearch}
                        filterType="location"
                        disabled={!city}
                      />
                    </div>
                    <button
                      onClick={() => removeStop(day.id, stop.id)}
                      className="text-[10px] text-white/30 hover:text-white/60 uppercase tracking-widest pb-1.5"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {day.stops.length < maxStops && (
                  <button
                    onClick={() => addStop(day.id)}
                    className="text-[10px] tracking-widest uppercase text-white/40 hover:text-white/60 border-b border-white/20 pb-0.5"
                  >
                    + Add Stop
                  </button>
                )}
              </div>
            )}

            {/* Add-ons */}
            <div className="border-t border-white/8 pt-4">
              <p className="text-[10px] tracking-widest uppercase text-white/30 mb-3">
                Add-ons
              </p>

              {/* Meet & Greet — airport_pickup only */}
              {day.serviceType === "airport_pickup" && (
                <div className="flex items-center justify-between py-2 border-b border-white/6">
                  <span className="text-xs text-white/60">
                    Meet & Greet Sign
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-white/30">$50</span>
                    <div className="flex gap-1.5">
                      <ToggleBtn
                        active={day.addons.meetGreet}
                        onClick={() => updateAddon(day.id, { meetGreet: true })}
                      >
                        Yes
                      </ToggleBtn>
                      <ToggleBtn
                        active={!day.addons.meetGreet}
                        onClick={() =>
                          updateAddon(day.id, { meetGreet: false })
                        }
                      >
                        No
                      </ToggleBtn>
                    </div>
                  </div>
                </div>
              )}

              {/* Tour Guide — Tour only */}
              {isTour && (
                <div className="flex items-center justify-between py-2 border-b border-white/6">
                  <span className="text-xs text-white/60">Tour Guide</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-white/30">$200/day</span>
                    <div className="flex gap-1.5">
                      <ToggleBtn
                        active={day.addons.tourGuide}
                        onClick={() => updateAddon(day.id, { tourGuide: true })}
                      >
                        Yes
                      </ToggleBtn>
                      <ToggleBtn
                        active={!day.addons.tourGuide}
                        onClick={() =>
                          updateAddon(day.id, { tourGuide: false })
                        }
                      >
                        No
                      </ToggleBtn>
                    </div>
                  </div>
                </div>
              )}

              {/* Vehicle Entry Fee — Tour only */}
              {isTour && entryFee && (
                <div className="flex items-center justify-between py-2 border-b border-white/6">
                  <div>
                    <span className="text-xs text-white/60">
                      Vehicle Entry Fee
                    </span>
                    <p className="text-[11px] text-white/30 mt-0.5">
                      {serviceLabel(day.serviceType)} — per vehicle
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-white/30">
                      ${entryFee}
                    </span>
                    <div className="flex gap-1.5">
                      <ToggleBtn
                        active={day.addons.vehicleEntryFee}
                        onClick={() =>
                          updateAddon(day.id, { vehicleEntryFee: true })
                        }
                      >
                        Yes
                      </ToggleBtn>
                      <ToggleBtn
                        active={!day.addons.vehicleEntryFee}
                        onClick={() =>
                          updateAddon(day.id, { vehicleEntryFee: false })
                        }
                      >
                        No
                      </ToggleBtn>
                    </div>
                  </div>
                </div>
              )}

              {/* Guest Admission — Tour only */}
              {isTour && (
                <div className="py-2 border-b border-white/6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs text-white/60">
                        Guest Admission
                      </span>
                      <p className="text-[11px] text-white/30 mt-0.5">
                        We collect on your behalf
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <ToggleBtn
                        active={day.addons.guestAdmission}
                        onClick={() =>
                          updateAddon(day.id, { guestAdmission: true })
                        }
                      >
                        Yes
                      </ToggleBtn>
                      <ToggleBtn
                        active={!day.addons.guestAdmission}
                        onClick={() =>
                          updateAddon(day.id, { guestAdmission: false })
                        }
                      >
                        No
                      </ToggleBtn>
                    </div>
                  </div>
                  {day.addons.guestAdmission && (
                    <div className="flex gap-8 pt-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-white/40">Adult</span>
                        <Stepper
                          value={day.addons.admissionAdult}
                          onChange={(v) =>
                            updateAddon(day.id, { admissionAdult: v })
                          }
                        />
                        <span className="text-[11px] text-white/30">
                          TBC/person
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-white/40">Child</span>
                        <Stepper
                          value={day.addons.admissionChild}
                          onChange={(v) =>
                            updateAddon(day.id, { admissionChild: v })
                          }
                        />
                        <span className="text-[11px] text-white/30">
                          TBC/person
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottled Water */}
              <div className="flex items-center justify-between py-2 border-b border-white/6">
                <span className="text-xs text-white/60">Bottled Water</span>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-white/30">$20/pack</span>
                  <Stepper
                    value={day.addons.bottledWater}
                    onChange={(v) => updateAddon(day.id, { bottledWater: v })}
                  />
                </div>
              </div>

              {/* Child Seat */}
              <div className="flex items-center justify-between py-2 border-b border-white/6">
                <span className="text-xs text-white/60">Child Seat</span>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-white/30">$25/each</span>
                  <Stepper
                    value={day.addons.childSeat}
                    onChange={(v) => updateAddon(day.id, { childSeat: v })}
                  />
                </div>
              </div>

              {/* Gratuity */}
              <div className="flex items-start justify-between py-2">
                <div>
                  <span className="text-xs text-white/60">Driver Gratuity</span>
                  <p className="text-[11px] text-white/30 mt-0.5 max-w-xs leading-relaxed">
                    Not included. Recommended: 15–20% of charter price or
                    $3.00/person, whichever is greater.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs text-white/40">$</span>
                  <input
                    type="number"
                    min={0}
                    value={day.addons.gratuity}
                    onChange={(e) =>
                      updateAddon(day.id, { gratuity: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-20 bg-transparent border-b border-white/20 text-sm text-white outline-none py-1 text-right
                               [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Global Info */}
      <div className="grid grid-cols-4 gap-0 border-b border-white/10 pb-8 mb-8">
        <div className="pr-10 border-r border-white/10">
          <p className={labelCls}>City</p>
          <select
            value={cityKey}
            onChange={(e) => setCityKey(e.target.value as CityKey)}
            className={`${inputCls} appearance-none cursor-pointer`}
          >
            {allCities.map((c) => (
              <option
                key={c.key}
                value={c.key}
                disabled={!c.active}
                className="bg-[#0A1E38] text-white disabled:text-white/30"
              >
                {c.label}
                {!c.active ? " (Coming Soon)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="px-10 border-r border-white/10">
          <p className={labelCls}>Start Date</p>
          <input
            type="date"
            value={startDate}
            min={minDate}
            onChange={(e) => setStartDate(e.target.value)}
            onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
            className={inputCls}
          />
        </div>

        <div className="px-10 border-r border-white/10">
          <p className={labelCls}>End Date</p>
          <input
            type="date"
            value={endDate}
            min={startDate || minDate}
            onChange={(e) => setEndDate(e.target.value)}
            onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
            className={inputCls}
          />
        </div>

        <div className="pl-10">
          <p className={labelCls}>Total Passengers</p>
          <div className="flex items-center gap-3 border-b border-white/20 py-1.5">
            <button
              onClick={() => setPax((v) => Math.max(1, v - 1))}
              className="text-white/40 hover:text-white text-base leading-none"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={200}
              value={pax}
              onChange={(e) =>
                setPax(
                  Math.min(200, Math.max(1, parseInt(e.target.value) || 1)),
                )
              }
              className="w-8 text-center text-sm text-white bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={() => setPax((v) => Math.min(200, v + 1))}
              className="text-white/40 hover:text-white text-base leading-none"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Days */}
      {days.map((day, index) => renderDay(day, index))}

      {/* Add Day */}
      <button
        onClick={addDay}
        className="w-full py-3 mb-8 border border-dashed border-white/15 text-[10px] tracking-widest uppercase
                   text-white/40 hover:text-white/60 hover:border-white/30 transition-colors"
      >
        + Add Another Day
      </button>

      {/* Driver accommodation notice */}
      <p className="text-[11px] text-white/30 mb-8 leading-relaxed">
        Driver accommodation for overnight stays is required and will be added
        to your quote.
      </p>

      {/* Submit */}
      <div className="flex justify-end border-t border-white/10 pt-6">
        <button
          onClick={() => router.push("/charter/multi-day/quote")}
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)",
          }}
          className="px-10 py-3 text-xs tracking-[0.2em] uppercase bg-[#6A7A8C] text-white hover:bg-[#7A8A9C] transition-all duration-200"
        >
          Request Quote →
        </button>
      </div>
    </div>
  );
}
