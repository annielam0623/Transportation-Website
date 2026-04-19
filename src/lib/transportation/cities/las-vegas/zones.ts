// lib/transportation/cities/las-vegas/zones.ts

import { LocationZone } from "./locations";
import { LAS_VEGAS_LOCATIONS } from "./locations";

export function getZone(locationName: string): LocationZone {
  const match = LAS_VEGAS_LOCATIONS.find(
    (loc) => loc.name.toLowerCase() === locationName.toLowerCase()
  );
  return match?.zone ?? "other";
}

export function isStandardZone(zone: LocationZone): boolean {
  return zone === "strip" || zone === "downtown";
}

export function requiresSurcharge(zone: LocationZone): boolean {
  return zone === "off-strip" || zone === "henderson" || zone === "other";
}