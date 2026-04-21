// lib/transportation/charter/classify.ts

import { CharterQuoteInput, ClassificationResult } from "./types";

export function classifyCharterTrip(
  input: CharterQuoteInput
): ClassificationResult {
  const specialConditions: string[] = [];

  if (
    input.serviceType === "luxury_suv_service" ||
    input.serviceType === "limousine_service"
  ) {
    return { tripScope: "in_town", priceCategory: "black_car", specialConditions };
  }

  if (input.serviceType === "lax_airport_transfer") {
    specialConditions.push(
      "Driver must arrive one day prior to pickup.",
      "Driver hotel is required and paid by client."
    );
    return { tripScope: "out_of_town", priceCategory: "lax_airport", specialConditions };
  }

  if (
    input.serviceType === "airport_pickup" ||
    input.serviceType === "airport_dropoff"
  ) {
    return { tripScope: "in_town", priceCategory: "airport_one_way", specialConditions };
  }

  if (input.serviceType === "in_town_transfer") {
    return { tripScope: "in_town", priceCategory: "in_town_transfer", specialConditions };
  }

  if (input.serviceType === "valley_of_fire") {
    return { tripScope: "in_town", priceCategory: "in_town_transfer", specialConditions };
  }

  if (
    input.serviceType === "grand_canyon_west_rim" ||
    input.serviceType === "grand_canyon_national_park" ||
    input.serviceType === "bryce_canyon_zion" ||
    input.serviceType === "antelope_canyon"
  ) {
    return { tripScope: "out_of_town", priceCategory: "preset_destination", specialConditions };
  }

  return { tripScope: "out_of_town", priceCategory: "out_of_town_transfer", specialConditions };
}