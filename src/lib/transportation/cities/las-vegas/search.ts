// lib/transportation/cities/las-vegas/search.ts

import { LasVegasLocation, LAS_VEGAS_LOCATIONS } from "./locations";
import { LAS_VEGAS_AIRPORTS } from "./airports";

export interface SearchResult {
  name: string;
  sortName: string;
  type: "location" | "airport";
  zone?: LasVegasLocation["zone"];
  code?: string;
}

export function searchLasVegas(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();

  const locationResults: SearchResult[] = LAS_VEGAS_LOCATIONS
    .filter((loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.sortName.toLowerCase().includes(q)
    )
    .map((loc) => ({
      name: loc.name,
      sortName: loc.sortName,
      type: "location",
      zone: loc.zone,
    }));

  const airportResults: SearchResult[] = LAS_VEGAS_AIRPORTS
    .filter((a) =>
      a.name.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q)
    )
    .map((a) => ({
      name: `${a.code} — ${a.name}`,
      sortName: a.code,
      type: "airport",
      code: a.code,
    }));

  return [...airportResults, ...locationResults].slice(0, 8);
}