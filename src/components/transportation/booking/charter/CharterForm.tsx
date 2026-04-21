// components/transportation/booking/CharterForm.tsx
// components/transportation/booking/charter/CharterForm.tsx
"use client";

import { useState } from "react";
import {
  getAllCities,
  getActiveCity,
  CityKey,
} from "@/lib/transportation/cities";
import { LasVegas, SearchResult } from "@/lib/transportation/cities/las-vegas";
import { ServiceType } from "@/lib/transportation/charter/types";
import LocationInput from "@/components/transportation/ui/LocationInput";
import CharterQuoteResult from "./CharterQuoteResult";

const SERVICE_TYPES: { value: ServiceType; label: string; group: string }[] = [
  { value: "airport_pickup",              label: "Airport Pick-up",                   group: "Transfers" },
  { value: "airport_dropoff",             label: "Airport Drop-off",                  group: "Transfers" },
  { value: "in_town_transfer",            label: "In Town Transfer",                  group: "Transfers" },
  { value: "grand_canyon_national_park",  label: "Grand Canyon National Park",        group: "Day Tours" },
  { value: "grand_canyon_west_rim",       label: "Grand Canyon West Rim",             group: "Day Tours" },
  { value: "bryce_canyon_zion",           label: "Bryce & Zion",                      group: "Day Tours" },
  { value: "antelope_canyon",             label: "Antelope Canyon",                   group: "Day Tours" },
  { value: "valley_of_fire",              label: "Valley of Fire",                    group: "Day Tours" },
  { value: "custom_out_of_town_transfer", label: "Custom Out-of-Town",               group: "Out of Town" },
];

export default function CharterForm() {
  const allCities = getAllCities();
  const [airportType, setAirportType] = useState<"domestic" | "international">("domestic");
  const [cityKey, setCityKey] = useState<CityKey>("las-vegas");
  const [serviceType, setServiceType] = useState<ServiceType>("airport_pickup");
  const [pickup, setPickup] = useState("");
  const [pickupResult, setPickupResult] = useState<SearchResult | undefined>();
  const [dropoff, setDropoff] = useState("");
  const [dropoffResult, setDropoffResult] = useState<
    SearchResult | undefined
  >();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [luggage, setLuggage] = useState(1);
  const [pax, setPax] = useState(3);
  const [showQuote, setShowQuote] = useState(false);

  const city = getActiveCity(cityKey);
  const cityAirports = city?.airports ?? [];

  function handleSearch(query: string): SearchResult[] {
    if (!city) return [];
    return city.search(query);
  }

  function handleSubmit() {
    if (!pickup || !dropoff || !date || !time) return;
    setShowQuote(true);
  }

  function handleCityChange(key: CityKey) {
    setCityKey(key);
    setPickup("");
    setPickupResult(undefined);
    setDropoff("");
    setDropoffResult(undefined);
    setShowQuote(false);
  }

  function handleServiceTypeChange(type: ServiceType) {
    setServiceType(type);
    setPickup("");
    setPickupResult(undefined);
    setDropoff("");
    setDropoffResult(undefined);
    setShowQuote(false);
  }

  // 机场下拉组件
  function AirportSelect({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (val: string, code: string) => void;
  }) {
    return (
      <div className="w-full">
        <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
          {label}
        </p>
        <select
          value={value}
          onChange={(e) => {
            const selected = cityAirports.find(
              (a) => a.code === e.target.value,
            );
            if (selected)
              onChange(`${selected.code} — ${selected.name}`, selected.code);
          }}
          className="w-full bg-transparent border-b border-white/20 text-sm text-white
                     outline-none py-1.5 cursor-pointer appearance-none"
        >
          <option value="" className="bg-[#0A1E38] text-white/40">
            Select airport...
          </option>
          {cityAirports.map((a) => (
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
  function getMinTime(): string {
    if (!date) return "";
    const tomorrow = new Date(Date.now() + 86400000)
      .toISOString()
      .split("T")[0];
    if (date === tomorrow) {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    }
    return "";
  }
console.log("serviceType:", serviceType);
  return (
    <div className="w-full pt-8">
      {/* Row 1: City / Service Type /Airport Type / pick up / dropoff */}
      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      serviceType === "airport_pickup" || serviceType === "airport_dropoff"
        ? "repeat(5, 1fr)"
        : "repeat(4, 1fr)",
  }}
  className="border-b border-white/10 pb-8 gap-0"
>
        {/* City */}
        <div className="pr-10 border-r border-white/10">
          <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
            City
          </p>
          <select
            value={cityKey}
            onChange={(e) => handleCityChange(e.target.value as CityKey)}
            className="w-full bg-transparent text-sm text-white outline-none cursor-pointer
                       border-b border-white/20 py-1.5 appearance-none"
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

        {/* Service Type */}
         <div className="px-10 border-r border-white/10">
  <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">Service Type</p>
  <select
    value={serviceType}
    onChange={(e) => handleServiceTypeChange(e.target.value as ServiceType)}
    className="w-full bg-transparent text-sm text-white outline-none cursor-pointer
               border-b border-white/20 py-1.5 appearance-none"
  >
    {["Transfers", "Day Tours", "Out of Town"].map((group) => (
      <optgroup key={group} label={`── ${group}`} className="bg-[#020c18] text-white/50">
        {SERVICE_TYPES.filter((s) => s.group === group).map((s) => (
          <option key={s.value} value={s.value} className="bg-[#0A1E38] text-white">
            {s.label}
          </option>
        ))}
      </optgroup>
    ))}
  </select>
</div>

  {/* Airport Type — 条件显示 */}
  {(serviceType === "airport_pickup" || serviceType === "airport_dropoff") && (
    <div className="px-10 border-r border-white/10">
      <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">Flight Type</p>
      <select
        value={airportType}
        onChange={(e) => setAirportType(e.target.value as "domestic" | "international")}
        className="w-full bg-transparent text-sm text-white outline-none cursor-pointer
                   border-b border-white/20 py-1.5 appearance-none"
      >
        <option value="domestic" className="bg-[#0A1E38]">Domestic / Outbound</option>
        <option value="international" className="bg-[#0A1E38]">International Arrival</option>
      </select>
    </div>
  )}
        {/* Pick-up */}
         <div className="px-10 border-r border-white/10">
          {serviceType === "airport_pickup" ? (
            <AirportSelect
              label="Pick-up Location"
              value={pickupResult?.code ?? ""}
              onChange={(val, code) => {
                setPickup(val);
                setPickupResult({
                  name: val,
                  sortName: code,
                  type: "airport",
                  code,
                });
                setShowQuote(false);
              }}
            />
          ) : (
            <LocationInput
              label="Pick-up Location"
              placeholder="Enter Hotel Name or detail address..."
              value={pickup}
              onChange={(val, result) => {
                setPickup(val);
                setPickupResult(result);
                setShowQuote(false);
              }}
              onSearch={handleSearch}
              filterType="location"
              disabled={!city}
            />
          )}
        </div>

        {/* Drop-off */}
         <div className="pl-10">
          {serviceType === "airport_dropoff" ? (
            <AirportSelect
              label="Drop-off Location"
              value={dropoffResult?.code ?? ""}
              onChange={(val, code) => {
                setDropoff(val);
                setDropoffResult({
                  name: val,
                  sortName: code,
                  type: "airport",
                  code,
                });
                setShowQuote(false);
              }}
            />
          ) : (
            <LocationInput
              label="Drop-off Location"
              placeholder="Enter Hotel Name or detail address..."
              value={dropoff}
              onChange={(val, result) => {
                setDropoff(val);
                setDropoffResult(result);
                setShowQuote(false);
              }}
              onSearch={handleSearch}
              filterType="location"
              disabled={!city}
            />
          )}
        </div>
      </div>

      {/* Row 2: Date / Time / Luggage / Pax / Submit */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-0 pt-8 items-end flex-wrap">
        {/* Date */}
        <div className="pr-10 border-r border-white/10">
          <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
            Date
          </p>
          <input
            type="date"
            value={date}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
            className="w-full bg-transparent border-b border-white/20 text-sm text-white
             outline-none py-1.5 cursor-pointer"
          />
        </div>

        {/* Time */}
        <div className="px-10 border-r border-white/10">
          <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
            Time
          </p>

          <input
  type="time"
  value={time}
  onChange={(e) => {
    const selectedTime = e.target.value;
    // 如果是明天，检查时间是否在当前时间之后
    if (date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const selectedDate = new Date(date + "T00:00:00");
      const isTomorrow =
        selectedDate.toDateString() === tomorrow.toDateString();
      if (isTomorrow) {
        const now = new Date();
        const minTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        if (selectedTime < minTime) {
          setTime(minTime);
          return;
        }
      }
    }
    setTime(selectedTime);
  }}
  onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
  min={(() => {
    if (!date) return undefined;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const selectedDate = new Date(date + "T00:00:00");
    const isTomorrow =
      selectedDate.toDateString() === tomorrow.toDateString();
    if (isTomorrow) {
      const now = new Date();
      return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    }
    return undefined;
  })()}
  className="w-full bg-transparent border-b border-white/20 text-sm text-white
             outline-none py-1.5 cursor-pointer"
/>
{date && (() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const selectedDate = new Date(date + "T00:00:00");
  return selectedDate.toDateString() === tomorrow.toDateString();
})() && (
  <p className="text-[10px] text-white/30 mt-1">
    All the bookings require 24 hour advance notice.
  </p>
)}
        </div>

        {/* Luggage */}
        <div className="px-10 border-r border-white/10">
          <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
            Luggage
          </p>
          <div className="flex items-center gap-3 border-b border-white/20 py-1.5">
  <button
    onClick={() => setLuggage((v) => Math.max(0, v - 1))}
    className="text-white/40 hover:text-white transition-colors text-base leading-none"
  >−</button>
  <input
    type="number"
    min={0}
    max={20}
    value={luggage}
    onChange={(e) => setLuggage(Math.min(20, Math.max(0, parseInt(e.target.value) || 0)))}
    className="w-8 text-center text-sm text-white bg-transparent outline-none 
               [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
               [&::-webkit-inner-spin-button]:appearance-none"
  />
  <button
    onClick={() => setLuggage((v) => Math.min(20, v + 1))}
    className="text-white/40 hover:text-white transition-colors text-base leading-none"
  >+</button>
</div>
        </div>

        {/* Pax */}
        <div className="px-10 border-r border-white/10">
          <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
            Pax
          </p>
          <div className="flex items-center gap-3 border-b border-white/20 py-1.5">
  <button
    onClick={() => setPax((v) => Math.max(1, v - 1))}
    className="text-white/40 hover:text-white transition-colors text-base leading-none"
  >−</button>
  <input
    type="number"
    min={0}
    max={200}
    value={pax}
    onChange={(e) => setPax(Math.min(100, Math.max(1, parseInt(e.target.value) || 0)))}
    className="w-8 text-center text-sm text-white bg-transparent outline-none 
               [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
               [&::-webkit-inner-spin-button]:appearance-none"
  />
  <button
    onClick={() => setPax((v) => Math.min(100, v + 1))}
    className="text-white/40 hover:text-white transition-colors text-base leading-none"
  >+</button>
</div>
        </div>

        {/* Submit */}
        <div className="pl-10 max-lg:hidden">
          <button
            onClick={handleSubmit}
            disabled={!pickup || !dropoff || !date || !time}
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)",
            }}
            className="px-8 py-2.5 text-xs tracking-[0.2em] uppercase
             bg-[#6A7A8C] text-white
             hover:bg-[#7A8A9C]
             transition-all duration-200
             disabled:bg-[#2A3A4C] disabled:text-white/60 disabled:cursor-not-allowed"
          >
            Check Vehicles & Price
          </button>
        </div>
      </div>
      <div className="hidden max-lg:flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={!pickup || !dropoff || !date || !time}
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)",
          }}
          className="w-1/2 py-2.5 text-xs tracking-[0.2em] uppercase
               bg-[#6A7A8C] text-white
               hover:bg-[#7A8A9C]
               transition-all duration-200
               disabled:bg-[#2A3A4C] disabled:text-white/60 disabled:cursor-not-allowed"
        >
          Check Vehicles & Price
        </button>
      </div>

      {/* Quote Result */}
      {showQuote && (
        <div className="mt-10 border-t border-white/10 pt-8">
          <CharterQuoteResult
            serviceType={serviceType}
            pickup={pickup}
            pickupResult={pickupResult}
            dropoff={dropoff}
            dropoffResult={dropoffResult}
            pax={pax}
            luggage={luggage}
            city={city ?? LasVegas}
            airportType={airportType}
            date={date}  
          />
        </div>
      )}
    </div>
  );
}
