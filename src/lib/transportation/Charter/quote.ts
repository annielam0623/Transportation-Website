import { classifyCharterTrip } from "./classify";
import { CharterQuoteInput, QuoteResult } from "./types";
import {
  AIRPORT_ONE_WAY_RATES,
  IN_TOWN_HOURLY,
  MINIMUM_HOURS
} from "./pricing";

export function generateCharterQuote(
  input: CharterQuoteInput
): QuoteResult {

  const classification = classifyCharterTrip(input);

  if (classification.priceCategory === "airport_one_way") {

    const price = AIRPORT_ONE_WAY_RATES[input.vehicleType];

    return {
      ...classification,
      estimatedPrice: price,
      pricingMode: "fixed"
    };
  }

  if (classification.priceCategory === "in_town_transfer") {

    const hourly = IN_TOWN_HOURLY[input.vehicleType];
    const minHours = MINIMUM_HOURS[input.vehicleType];

    const serviceHours = Math.ceil(input.estimatedServiceHours || 0);

    const billable = Math.max(serviceHours, minHours);

    return {
      ...classification,
      estimatedPrice: billable * hourly,
      pricingMode: "hourly"
    };
  }

  return {
    ...classification,
    estimatedPrice: 0,
    pricingMode: "manual_review"
  };
}