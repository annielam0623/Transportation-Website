import { classifyCharterTrip } from "./classify";
import { CharterQuoteInput, QuoteResult } from "./types";
import {
  CHARTER_BUS_VEHICLES,
  BLACK_CAR_VEHICLES,
  getAvailableVehicles,
} from "./vehicles";
import {
  AIRPORT_DOMESTIC_RATES,
  AIRPORT_INTERNATIONAL_RATES,
  IN_TOWN_HOURLY,
  MINIMUM_HOURS
} from "./pricing";

export function generateCharterQuote(
  input: CharterQuoteInput
): QuoteResult {
  const classification = classifyCharterTrip(input);

  const vehicles =
    input.serviceType === "black_car"
      ? getAvailableVehicles(
          BLACK_CAR_VEHICLES,
          input.passengerCount ?? 1,
          input.luggageCount ?? 0
        )
      : getAvailableVehicles(
          CHARTER_BUS_VEHICLES,
          input.passengerCount ?? 1,
          input.luggageCount ?? 0
        );

  const selectedVehicle = vehicles[0];

  if (!selectedVehicle) {
    return {
      ...classification,
      estimatedPrice: 0,
      pricingMode: "manual_review"
    };
  }

  if (classification.priceCategory === "airport_one_way") {
    const isInternational = input.airportType === "international";

    const price = isInternational
      ? AIRPORT_INTERNATIONAL_RATES[selectedVehicle.type]
      : AIRPORT_DOMESTIC_RATES[selectedVehicle.type];

    return {
      ...classification,
      vehicleType: selectedVehicle.type,
      estimatedPrice: price,
      pricingMode: "fixed"
    };
  }

  if (classification.priceCategory === "in_town_transfer") {
    const hourly = IN_TOWN_HOURLY[selectedVehicle.type];
    const minHours = MINIMUM_HOURS[selectedVehicle.type];

    const serviceHours = Math.ceil(input.estimatedServiceHours || 0);
    const billable = Math.max(serviceHours, minHours);

    return {
      ...classification,
      vehicleType: selectedVehicle.type,
      estimatedPrice: billable * hourly,
      pricingMode: "hourly"
    };
  }

  return {
    ...classification,
    vehicleType: selectedVehicle.type,
    estimatedPrice: 0,
    pricingMode: "manual_review"
  };
}