import { QuoteResult } from "./types";

export type CharterQuoteRequest = {
  serviceType: "charter_bus" | "black_car";
  pickupLocation: string;
  dropoffLocation: string;
  tripDate: string;
  pickupTime: string;
  airportType?: "domestic" | "international";
  passengerCount?: number;
  luggageCount?: number;
  estimatedServiceHours?: number;
};

export type CharterQuoteResponse = {
  success: boolean;
  quote?: QuoteResult;
  error?: string;
};

export async function getCharterQuote(
  payload: CharterQuoteRequest
): Promise<CharterQuoteResponse> {
  const res = await fetch("/api/transportation/charter/estimate", {
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