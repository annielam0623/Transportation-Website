"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, Users, Briefcase } from "lucide-react";
import EditSearchModal from "./EditSearchModal";

type Props = {
  serviceType: string;
  from: string;
  to: string;
  date: string;
  time: string;
  pax: number;
  luggage: number;
  city?: string;
  airportType?: string;
};

const SERVICE_LABELS: Record<string, string> = {
  airport_pickup: "Airport Pick-up",
  airport_dropoff: "Airport Drop-off",
  in_town: "In-Town Transfer",
  in_town_transfer: "In-Town Transfer",
  grand_canyon_west: "Grand Canyon West Rim",
  grand_canyon_west_rim: "Grand Canyon West Rim",
  grand_canyon_south: "Grand Canyon South Rim",
  grand_canyon_national_park: "Grand Canyon National Park",
  bryce_zion: "Bryce Canyon & Zion",
  bryce_canyon_zion: "Bryce Canyon & Zion",
  antelope_canyon: "Antelope Canyon",
  valley_of_fire: "Valley of Fire",
  custom_out_of_town: "Custom Transfer",
  custom_out_of_town_transfer: "Custom Transfer",
  luxury_suv_service: "Luxury SUV",
  limousine_service: "Limousine",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
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

export default function QuoteSummaryBar({
  serviceType,
  from,
  to,
  date,
  time,
  pax,
  luggage,
  city,
  airportType,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  console.log("QuoteSummaryBar rendered, modalOpen:", modalOpen);

  return (
    <>
      <div className="bg-[#04080F]">
        <div className="px-6 md:px-20 py-6">
          <p className="text-xs tracking-[0.18em] uppercase text-brand-silver mb-4 font-medium">
            {SERVICE_LABELS[serviceType] ?? serviceType}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-brand-silver shrink-0" />
                <span className="text-white text-base">{from}</span>
                {to && (
                  <>
                    <span className="text-white/30 text-sm mx-1">→</span>
                    <span className="text-white text-base">{to}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-brand-silver shrink-0" />
                <span className="text-white/80 text-base">
                  {formatDate(date)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-brand-silver shrink-0" />
                <span className="text-white/80 text-base">
                  {formatTime(time)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={16} className="text-brand-silver shrink-0" />
                <span className="text-white/80 text-base">
                  {pax} Passengers
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase size={16} className="text-brand-silver shrink-0" />
                <span className="text-white/80 text-base">{luggage} Bags</span>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-brand-silver border border-brand-silver/30 px-4 py-2 hover:bg-brand-silver/8 hover:border-brand-silver/50 transition-colors shrink-0 ml-8"
            >
              ✎ Edit Search
            </button>
          </div>
        </div>
        <div className="border-b border-white/10" />
      </div>

      <EditSearchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={{
          city,
          serviceType,
          from,
          to,
          date,
          time,
          pax,
          luggage,
          airportType,
        }}
      />
    </>
  );
}
