export const VEHICLES = [
  {
    type: "sedan",
    name: "Luxury Sedan",
    maxPassengers: 3,
    maxLuggage: 3,
    tier: 1,
  },
  {
    type: "suv",
    name: "Luxury SUV",
    maxPassengers: 5,
    maxLuggage: 4,
    tier: 2,
  },
  {
    type: "sprinter",
    name: "Sprinter Van",
    maxPassengers: 14,
    maxLuggage: 10,
    tier: 3,
  },
  {
    type: "minibus",
    name: "Mini Bus",
    maxPassengers: 24,
    maxLuggage: 20,
    tier: 4,
  },
  {
    type: "coach",
    name: "Motor Coach",
    maxPassengers: 56,
    maxLuggage: 50,
    tier: 5,
  },
];

export function getMinimumVehicle(passengers: number, luggage: number) {
  return VEHICLES.find(
    (v) => passengers <= v.maxPassengers && luggage <= v.maxLuggage
  );
}

export function getAvailableVehicles(passengers: number, luggage: number) {
  const minVehicle = getMinimumVehicle(passengers, luggage);

  if (!minVehicle) return [];

  return VEHICLES.filter((v) => v.tier >= minVehicle.tier);
}
