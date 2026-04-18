import { VehicleType } from "./types";

export type Vehicle = {
  type: VehicleType;
  name: string;
  maxPassengers: number;
  maxLuggage: number;
  tier: number;
};

/* Charter Bus Vehicles */

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
    name: "Executive",
    maxPassengers: 16,
    maxLuggage: 10,
    tier: 3,
  },
  {
    type: "mini_bus",
    name: "Mini Bus",
    maxPassengers: 24,
    maxLuggage: 20,
    tier: 4,
  },
  {
    type: "mid_size_motorcoach",
    name: "Mid-Size Motorcoach",
    maxPassengers: 40,
    maxLuggage: 30,
    tier: 5,
  },
  {
    type: "full_size_motorcoach",
    name: "Full-Size Motorcoach",
    maxPassengers: 56,
    maxLuggage: 50,
    tier: 6,
  },
];

/* Black Car Service Vehicles */

export const BLACK_CAR_VEHICLES: Vehicle[] = [
  {
    type: "suv",
    name: "Luxury SUV",
    maxPassengers: 5,
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

/* ===============================
   Black Car Service Vehicles
   =============================== */

export function getMinimumVehicle(
  vehicles: Vehicle[],
  passengers: number,
  luggage: number
) {
  return vehicles.find(
    (v) =>
      passengers <= v.maxPassengers &&
      luggage <= v.maxLuggage
  );
}

export function getAvailableVehicles(
  vehicles: Vehicle[],
  passengers: number,
  luggage: number
) {
  const minVehicle = getMinimumVehicle(vehicles, passengers, luggage);

  if (!minVehicle) return [];

  const index = vehicles.findIndex((v) => v.type === minVehicle.type);

  const results = [minVehicle];

  const nextVehicle = vehicles[index + 1];
  if (nextVehicle) {
    results.push(nextVehicle);
  }

  return results;
}