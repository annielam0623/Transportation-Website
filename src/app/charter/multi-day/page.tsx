// app/charter/multi-day/page.tsx
import MultiDayForm from "@/components/transportation/booking/charter/MultiDayForm";

export default function MultiDayPage() {
  return (
    <main className="min-h-screen bg-[#020c18]">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-10">
          <p className="text-[10px] tracking-widest text-white/40 uppercase mb-3">
            Charter Bus — Multi-Day
          </p>
          <h1 className="text-3xl font-serif text-white mb-2">
            Multi-Day Itinerary
          </h1>
          <p className="text-sm text-white/50">
            Dedicated driver · 2 or more consecutive days · Mixed services
          </p>
        </div>
        <MultiDayForm />
      </div>
    </main>
  );
}
