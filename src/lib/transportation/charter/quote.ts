import { classifyCharterTrip } from "./classify";
import {
  CharterQuoteInput,
  QuoteResult,
  VehicleOption,
  VehicleType,
} from "./types";
import { CHARTER_BUS_VEHICLES, BLACK_CAR_VEHICLES, selectVehicles } from "./vehicles";
import {
  AIRPORT_DOMESTIC_RATES,
  AIRPORT_INTERNATIONAL_RATES,
  AIRPORT_FEE,
  IN_TOWN_HOURLY,
  MINIMUM_HOURS,
  LAX_RATES,
  LAX_DRIVER_ROOM,
  PRESET_RATES,
  OUT_OF_TOWN_BASE,
} from "./pricing";

function buildVehicleOption(
  type: VehicleType,
  name: string,
  maxPassengers: number,
  maxLuggage: number,
  price: number,
  pricingMode: "fixed" | "hourly" | "manual_review",
  isRecommended: boolean,
  extras?: { minHours?: number; airportFee?: number }
): VehicleOption {
  return {
    type,
    name,
    maxPassengers,
    maxLuggage,
    price,
    pricingMode,
    isRecommended,
    ...extras,
  };
}

export function generateCharterQuote(input: CharterQuoteInput): QuoteResult {
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
    return {
      ...classification,
      vehicles: [],
    };
  }

  const buildOptions = (
    getPrice: (type: VehicleType) => number,
    mode: "fixed" | "hourly" | "manual_review",
    extras?: (type: VehicleType) => { minHours?: number; airportFee?: number }
  ): VehicleOption[] => {
    const options: VehicleOption[] = [];

    options.push(
      buildVehicleOption(
        match.type,
        match.name,
        match.maxPassengers,
        match.maxLuggage,
        getPrice(match.type),
        mode,
        false,
        extras?.(match.type)
      )
    );

    if (recommended) {
      options.push(
        buildVehicleOption(
          recommended.type,
          recommended.name,
          recommended.maxPassengers,
          recommended.maxLuggage,
          getPrice(recommended.type),
          mode,
          true,
          extras?.(recommended.type)
        )
      );
    }

    return options;
  };

  // ── Airport One-Way ───────────────────────────────────────────
if (classification.priceCategory === "airport_one_way") {
    const isIntl = input.airportType === "international";
    const rates = isIntl ? AIRPORT_INTERNATIONAL_RATES : AIRPORT_DOMESTIC_RATES;
    const options: VehicleOption[] = []
    for (const v of [match, recommended].filter(Boolean) as typeof CHARTER_BUS_VEHICLES) {
      const price = rates[v.type]
      if (price === 0) continue
      options.push({
        type: v.type,
        name: v.name,
        maxPassengers: v.maxPassengers,
        maxLuggage: v.maxLuggage,
        price,
        pricingMode: "fixed",
        isRecommended: v.type === recommended?.type,
        airportFee: AIRPORT_FEE[v.type],
      })
    }
    return { ...classification, vehicles: options }
  }


    // ── In Town Transfer (hourly) ─────────────────────────────────
  if (classification.priceCategory === "in_town_transfer") {
    return {
      ...classification,
      vehicles: buildOptions(
        (t) => IN_TOWN_HOURLY[t] * Math.max(Math.ceil(input.estimatedServiceHours ?? 0), MINIMUM_HOURS[t]),
        "hourly",
        (t) => ({ minHours: MINIMUM_HOURS[t] })
      ),
    };
  }

  // ── LAX Airport ───────────────────────────────────────────────
  if (classification.priceCategory === "lax_airport") {
    return {
      ...classification,
      vehicles: buildOptions(
        (t) => LAX_RATES[t],
        LAX_RATES[match.type] > 0 ? "fixed" : "manual_review",
        (t) => ({ airportFee: LAX_DRIVER_ROOM[t] })
      ),
    };
  }

  // ── Preset Destination ────────────────────────────────────────
  if (classification.priceCategory === "preset_destination") {
    const rates = PRESET_RATES[input.serviceType] ?? {};
    return {
      ...classification,
      vehicles: buildOptions(
        (t) => rates[t] ?? 0,
        "fixed"
      ),
    };
  }

  // ── Custom Out-of-Town ────────────────────────────────────────
  if (classification.priceCategory === "out_of_town_transfer") {
    return {
      ...classification,
      vehicles: buildOptions(
        (t) => OUT_OF_TOWN_BASE[t],
        OUT_OF_TOWN_BASE[match.type] > 0 ? "fixed" : "manual_review"
      ),
    };
  }

  // ── Black Car ─────────────────────────────────────────────────
  if (classification.priceCategory === "black_car") {
    const isIntl = input.airportType === "international";
    const rates = isIntl ? AIRPORT_INTERNATIONAL_RATES : AIRPORT_DOMESTIC_RATES;
    return {
      ...classification,
      vehicles: buildOptions(
        (t) => rates[t],
        "fixed",
        (t) => ({ airportFee: AIRPORT_FEE[t] })
      ),
    };
  }

  return {
    ...classification,
    vehicles: [],
  };
}
