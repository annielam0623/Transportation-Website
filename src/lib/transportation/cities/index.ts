// lib/transportation/cities/index.ts

import { LasVegas } from "./las-vegas";

export const CITIES = {
  "las-vegas": LasVegas,
  "los-angeles": {
    key: "los-angeles",
    label: "Los Angeles",
    active: false,
  },
  "san-francisco": {
    key: "san-francisco",
    label: "San Francisco",
    active: false,
  },
  "phoenix": {
    key: "phoenix",
    label: "Phoenix",
    active: false,
  },
} as const;

export type CityKey = keyof typeof CITIES;

export function getActiveCity(key: CityKey) {
  const city = CITIES[key];
  if (!city.active) return null;
  return city;
}

export function getActiveCities() {
  return Object.values(CITIES).filter((c) => c.active);
}

export function getAllCities() {
  return Object.values(CITIES);
}