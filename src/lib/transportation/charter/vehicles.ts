import { VehicleType } from "./types";

export type Vehicle = {
  type: VehicleType;
  name: string;
  maxPassengers: number;
  maxLuggage: number;
  tier: number;
};

// ── Charter Bus Fleet ─────────────────────────────────────────────
export const CHARTER_BUS_VEHICLES: Vehicle[] = [
  {
  type: "mini_van",
  name: "Mini Van",
  maxPassengers: 6,
  maxLuggage: 4,
  tier: 1,
  },
  {
    type: "sprinter",
    name: "Sprinter",
    maxPassengers: 10,
    maxLuggage: 8,
    tier: 2,
  },
  {
    type: "executive",
    name: "Executive Sprinter",
    maxPassengers: 16,
    maxLuggage: 10,
    tier: 3,
  },
  {
    type: "mini_bus",
    name: "Mini Bus",
    maxPassengers: 22,
    maxLuggage: 18,
    tier: 4,
  },
  {
    type: "mid_size_motorcoach",
    name: "Mid-Size Coach",
    maxPassengers: 40,
    maxLuggage: 30,
    tier: 5,
  },
  {
    type: "full_size_motorcoach",
    name: "Full-Size Coach",
    maxPassengers: 56,
    maxLuggage: 50,
    tier: 6,
  },
];

// ── Black Car Fleet ───────────────────────────────────────────────
export const BLACK_CAR_VEHICLES: Vehicle[] = [
  {
    type: "suv",
    name: "Luxury SUV",
    maxPassengers: 6,
    maxLuggage: 4,
    tier: 1,
  },
  {
    type: "limo",
    name: "Limousine",
    maxPassengers: 8,
    maxLuggage: 3,
    tier: 2,
  },
];

// ── Vehicle Selection Logic ───────────────────────────────────────
// Returns [matched vehicle, recommended vehicle (+1 tier)]
export function selectVehicles(
  vehicles: Vehicle[],
  passengers: number,
  luggage: number
): { match: Vehicle | null; recommended: Vehicle | null } {
  const matchIndex = vehicles.findIndex(
    (v) => v.maxPassengers >= passengers && v.maxLuggage >= luggage
  );

  if (matchIndex === -1) {
    return { match: null, recommended: null };
  }

  const match = vehicles[matchIndex];

  // recommended = 能装下 passengers+5 的最小车型（排除 match 本身）
  const recommended =
    vehicles.find(
      (v) => v.type !== match.type && v.maxPassengers >= passengers + 5
    ) ?? null;

  return { match, recommended };
}