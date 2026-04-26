import Navbar from "@/components/layout/Navbar";
import ConfirmationView from "@/components/transportation/booking/charter/ConfirmationView";

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
  paymentOption?: string;
  dueNow?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  flightNumber?: string;
}>;

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const data = {
    serviceType: params.serviceType ?? "",
    from: params.from ?? "",
    to: params.to ?? "",
    date: params.date ?? "",
    time: params.time ?? "",
    pax: params.pax ?? "1",
    city: params.city ?? "",
    vehicleName: params.vehicleName ?? "",
    vehiclePrice: parseFloat(params.vehiclePrice ?? "0"),
    paymentOption: params.paymentOption ?? "full",
    dueNow: parseFloat(params.dueNow ?? "0"),
    firstName: params.firstName ?? "",
    lastName: params.lastName ?? "",
    email: params.email ?? "",
    phone: params.phone ?? "",
    flightNumber: params.flightNumber ?? "",
  };

  return (
    <div className="min-h-screen" style={{ background: "#020c18" }}>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <ConfirmationView data={data} />
      </div>
    </div>
  );
}
