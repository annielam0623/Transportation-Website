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
): { match: Vehicle | null; recommended: Vehicle | null; extra: Vehicle | null } {
  // 超过54人，需要两辆车
  if (passengers > 54) {
    const n = passengers - 54;
    const fullSize = vehicles.find((v) => v.type === "full_size_motorcoach") ?? null;
    
    if (n < 10) {
      // 加 Sprinter
      const sprinter = vehicles.find((v) => v.type === "sprinter") ?? null;
      return { match: fullSize, recommended: sprinter, extra: null };
    } else {
      // 加 Mid-Size 或 Full-Size
      const midSize = vehicles.find((v) => v.type === "mid_size_motorcoach") ?? null;
      const fullSize2 = vehicles.find((v) => v.type === "full_size_motorcoach") ?? null;
      return { match: fullSize, recommended: midSize ?? fullSize2, extra: null };
    }
  }

  // 正常单车逻辑
  const matchIndex = vehicles.findIndex(
    (v) => v.maxPassengers >= passengers && v.maxLuggage >= luggage
  );

  if (matchIndex === -1) {
    return { match: null, recommended: null, extra: null };
  }

  const match = vehicles[matchIndex];
  const recommended =
    vehicles.find(
      (v) => v.type !== match.type && v.maxPassengers >= passengers + 5
    ) ?? null;

  return { match, recommended, extra: null };
}