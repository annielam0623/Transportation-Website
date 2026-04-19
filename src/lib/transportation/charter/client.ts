import { CharterQuoteInput, QuoteResult } from "./types";

export type CharterQuoteResponse = {
  success: boolean;
  quote?: QuoteResult;
  error?: string;
};

export async function getCharterQuote(
  payload: CharterQuoteInput
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