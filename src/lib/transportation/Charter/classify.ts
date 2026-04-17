import { CharterQuoteInput, ClassificationResult } from "./types";

const LOCAL_CITIES = [
  "las vegas",
  "henderson",
  "boulder city"
];

function containsAny(text: string, values: string[]) {
  const t = text.toLowerCase();
  return values.some(v => t.includes(v));
}

function isLocalAddress(input: CharterQuoteInput) {
  const text = `${input.pickupLocation} ${input.dropoffLocation}`.toLowerCase();
  return containsAny(text, LOCAL_CITIES);
}

function isAirport(text: string) {
  const t = text.toLowerCase();
  return (
    t.includes("airport") ||
    t.includes("las") ||
    t.includes("harry reid")
  );
}

function isLAX(text: string) {
  const t = text.toLowerCase();
  return t.includes("lax") || t.includes("los angeles");
}

export function classifyCharterTrip(
  input: CharterQuoteInput
): ClassificationResult {

  const specialConditions: string[] = [];

  const pickup = input.pickupLocation.toLowerCase();
  const dropoff = input.dropoffLocation.toLowerCase();

  if (isLAX(pickup) || isLAX(dropoff)) {

    specialConditions.push(
      "Driver must arrive one day prior to pickup.",
      "Driver hotel is required and paid by client."
    );

    return {
      tripScope: "out_of_town",
      priceCategory: "lax_airport",
      specialConditions
    };
  }

  if (isAirport(pickup) || isAirport(dropoff)) {
    return {
      tripScope: "in_town",
      priceCategory: "airport_one_way",
      specialConditions
    };
  }

  if (isLocalAddress(input) || input.sameDayReturnToYard) {
    return {
      tripScope: "in_town",
      priceCategory: "in_town_transfer",
      specialConditions
    };
  }

  return {
    tripScope: "out_of_town",
    priceCategory: "out_of_town_transfer",
    specialConditions
  };
}