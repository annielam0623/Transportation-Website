// lib/transportation/cities/las-vegas/index.ts

import { LAS_VEGAS_AIRPORTS } from "./airports";
import { LAS_VEGAS_LOCATIONS, LocationZone } from "./locations";
import { searchLasVegas, SearchResult } from "./search";
import { getZone, isStandardZone, requiresSurcharge } from "./zones";
import { getAirportTransferPrice, getInTownPrice, ServiceType, PriceRule } from "./pricing";

export const LasVegas = {
  key: "las-vegas",
  label: "Las Vegas",
  active: true,

  airports: LAS_VEGAS_AIRPORTS,
  locations: LAS_VEGAS_LOCATIONS,

  search: (query: string): SearchResult[] => searchLasVegas(query),

  getZone: (locationName: string): LocationZone => getZone(locationName),
  isStandardZone: (zone: LocationZone): boolean => isStandardZone(zone),
  requiresSurcharge: (zone: LocationZone): boolean => requiresSurcharge(zone),

  pricing: {
    airportTransfer: getAirportTransferPrice,
    inTown: getInTownPrice,
  },
};

export type { LocationZone, ServiceType, PriceRule, SearchResult };