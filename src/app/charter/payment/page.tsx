import Navbar from "@/components/layout/Navbar";
import PaymentForm from "@/components/transportation/booking/charter/PaymentForm";
import PaymentOrderSummary from "@/components/transportation/booking/charter/PaymentOrderSummary";

type SearchParams = Promise<{
  serviceType?: string;
  from?: string;
  to?: string;
  date?: string;
  time?: string;
  pax?: string;
  city?: string;
  vehicleName?: string;
  vehiclePrice?: string;
  vehiclePriceMode?: string;
  paymentOption?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  flightNumber?: string;
}>;

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const tripData = {
    serviceType: params.serviceType ?? "",
    from: params.from ?? "",
    to: params.to ?? "",
    date: params.date ?? "",
    time: params.time ?? "",
    pax: params.pax ?? "1",
    city: params.city ?? "",
    vehicleName: params.vehicleName ?? "",
    vehiclePrice: parseFloat(params.vehiclePrice ?? "0"),
    vehiclePriceMode: params.vehiclePriceMode ?? "flat",
    paymentOption: params.paymentOption ?? "full",
    firstName: params.firstName ?? "",
    lastName: params.lastName ?? "",
    email: params.email ?? "",
    phone: params.phone ?? "",
    flightNumber: params.flightNumber ?? "",
  };

  const totalAmount = tripData.vehiclePrice;
  const dueNow =
    tripData.paymentOption === "deposit"
      ? Math.round(totalAmount * 0.1 * 100) / 100
      : totalAmount;

  return (
    <div className="min-h-screen" style={{ background: "#020c18" }}>
      <Navbar />

      {/* Progress Bar */}
      <div
        className="border-b border-white/5"
        style={{ background: "#040f1e" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase">
            <span className="text-white/30">Trip Info</span>
            <span className="text-white/20">—</span>
            <span className="text-white/30">Review</span>
            <span className="text-white/20">—</span>
            <span style={{ color: "#9AA8B8" }}>Payment</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-2"
            style={{ color: "#6A7A8C" }}
          >
            Charter Bus
          </p>
          <h1 className="font-serif text-2xl font-semibold text-white">
            Secure Payment
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          <PaymentForm
            tripData={tripData}
            dueNow={dueNow}
            totalAmount={totalAmount}
          />
          <PaymentOrderSummary
            tripData={tripData}
            dueNow={dueNow}
            totalAmount={totalAmount}
          />
        </div>
      </div>
    </div>
  );
}
