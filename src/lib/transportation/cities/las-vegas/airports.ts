// lib/transportation/cities/las-vegas/airports.ts

export const LAS_VEGAS_AIRPORTS = [
  { code: "LAS", name: "Harry Reid International Airport" },
  { code: "HND", name: "Henderson Executive Airport" },
] as const;

export type LasVegasAirportCode = typeof LAS_VEGAS_AIRPORTS[number]["code"];