// lib/transportation/charter/cities/las-vegas/quote.ts

import { classifyCharterTrip } from "../../classify";
import { CharterQuoteInput, QuoteResult, VehicleOption } from "../../types";
import { CHARTER_BUS_VEHICLES, BLACK_CAR_VEHICLES, selectVehicles } from "../../vehicles";
import {
  AIRPORT_DOMESTIC_RATES,
  AIRPORT_INTERNATIONAL_RATES,
  AIRPORT_FEE,
  AIRPORT_MAX_HOURS,
  IN_TOWN_MIN_PRICE,
  MINIMUM_HOURS,
  ADDITIONAL_HOUR_RATE,
  LAX_RATES,
  LAX_DRIVER_ROOM,
  PRESET_RATES,
  PRESET_ENTRY_FEES,
  OUT_OF_TOWN_BASE,
  OUT_OF_TOWN_EXTRA_MILE,
  OUT_OF_TOWN_MAX_MILEAGE,
} from "./pricing";

export function generateLasVegasQuote(input: CharterQuoteInput): QuoteResult {
  const classification = classifyCharterTrip(input);
  const isBlackCar =
    input.serviceType === "luxury_suv_service" ||
    input.serviceType === "limousine_service";

  const fleet = isBlackCar ? BLACK_CAR_VEHICLES : CHARTER_BUS_VEHICLES;
  const { match, recommended } = selectVehicles(
    fleet,
    input.passengerCount ?? 1,
    input.luggageCount ?? 0
  );

  if (!match) {
    return { ...classification, vehicles: [] };
  }

  const candidates = [match, recommended].filter(Boolean) as typeof CHARTER_BUS_VEHICLES;

  // ── Airport One-Way ───────────────────────────────────────────
  if (classification.priceCategory === "airport_one_way") {
    const isIntl = input.airportType === "international";
    const rates = isIntl ? AIRPORT_INTERNATIONAL_RATES : AIRPORT_DOMESTIC_RATES;

    const options: VehicleOption[] = [];
    for (const v of candidates) {
      const price = rates[v.type];
      if (!price || price === 0) continue;
      options.push({
        type: v.type,
        name: v.name,
        maxPassengers: v.maxPassengers,
        maxLuggage: v.maxLuggage,
        price,
        pricingMode: "fixed",
        isRecommended: v.type === recommended?.type,
        airportFee: AIRPORT_FEE[v.type],
        maxHours: AIRPORT_MAX_HOURS[v.type],
        additionalHourRate: ADDITIONAL_HOUR_RATE[v.type],
      });
    }
    return { ...classification, vehicles: options };
  }

  // ── In Town Transfer ──────────────────────────────────────────
  if (classification.priceCategory === "in_town_transfer") {
    const options: VehicleOption[] = [];
    for (const v of candidates) {
      const price = IN_TOWN_MIN_PRICE[v.type];
      if (!price || price === 0) continue;
      options.push({
        type: v.type,
        name: v.name,
        maxPassengers: v.maxPassengers,
        maxLuggage: v.maxLuggage,
        price,
        pricingMode: "hourly",
        isRecommended: v.type === recommended?.type,
        minHours: MINIMUM_HOURS[v.type],
        additionalHourRate: ADDITIONAL_HOUR_RATE[v.type],
      });
    }
    return { ...classification, vehicles: options };
  }

  // ── LAX Airport ───────────────────────────────────────────────
  if (classification.priceCategory === "lax_airport") {
    const options: VehicleOption[] = [];
    for (const v of candidates) {
      const price = LAX_RATES[v.type];
      if (!price || price === 0) continue;
      options.push({
        type: v.type,
        name: v.name,
        maxPassengers: v.maxPassengers,
        maxLuggage: v.maxLuggage,
        price,
        pricingMode: "fixed",
        isRecommended: v.type === recommended?.type,
        airportFee: LAX_DRIVER_ROOM[v.type],
        additionalHourRate: ADDITIONAL_HOUR_RATE[v.type],
      });
    }
    return { ...classification, vehicles: options };
  }

  // ── Preset Destination ────────────────────────────────────────
  if (classification.priceCategory === "preset_destination") {
    const rates = PRESET_RATES[input.serviceType] ?? {};
    const entryFees = PRESET_ENTRY_FEES[input.serviceType] ?? {};
    const options: VehicleOption[] = [];
    for (const v of candidates) {
      const price = rates[v.type] ?? 0;
      if (price === 0) continue;
      options.push({
        type: v.type,
        name: v.name,
        maxPassengers: v.maxPassengers,
        maxLuggage: v.maxLuggage,
        price,
        pricingMode: "fixed",
        isRecommended: v.type === recommended?.type,
        entryFee: entryFees[v.type],
      });
    }
    return { ...classification, vehicles: options };
  }

  // ── Custom Out-of-Town ────────────────────────────────────────
  if (classification.priceCategory === "out_of_town_transfer") {
    const options: VehicleOption[] = [];
    for (const v of candidates) {
      const price = OUT_OF_TOWN_BASE[v.type];
      if (!price || price === 0) continue;
      options.push({
        type: v.type,
        name: v.name,
        maxPassengers: v.maxPassengers,
        maxLuggage: v.maxLuggage,
        price,
        pricingMode: "fixed",
        isRecommended: v.type === recommended?.type,
        maxMileage: OUT_OF_TOWN_MAX_MILEAGE,
        extraMileRate: OUT_OF_TOWN_EXTRA_MILE[v.type],
        additionalHourRate: ADDITIONAL_HOUR_RATE[v.type],
      });
    }
    return { ...classification, vehicles: options };
  }

  return { ...classification, vehicles: [] };
}