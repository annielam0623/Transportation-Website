export type CharterQuoteRequest = {
  serviceType: string;
  tripType?: "one_way" | "round_trip";
  pickup: string;
  dropoff: string;
  date: string;
  passengers: number;
  hours?: number;
  vehicleType?: string;
  notes?: string;
};

export type CharterVehicleQuote = {
  vehicleType: string;
  pricingMode: string;
  estimatedTotal: number;
  currency: string;
  remarks?: string[];
};

export type CharterQuoteResponse = {
  success: boolean;
  quotes?: CharterVehicleQuote[];
  error?: string;
};

export async function getCharterQuote(
  payload: CharterQuoteRequest
): Promise<CharterQuoteResponse> {
  const res = await fetch("/api/transportation/charter/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as CharterQuoteResponse;

  if (!res.ok) {
    return {
      success: false,
      error: data?.error || "Failed to get quote.",
    };
  }

  return data;
}