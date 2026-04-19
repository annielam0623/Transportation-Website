import { VehicleType } from "./types";

// ── In Town: Airport One-Way ──────────────────────────────────────
export const AIRPORT_DOMESTIC_RATES: Record<VehicleType, number> = {
  mini_van: 110,
  sprinter: 135,
  executive: 160,
  mini_bus: 135,
  mid_size_motorcoach: 320,
  full_size_motorcoach: 375,
  suv: 180,
  limo: 0, // manual review
};

export const AIRPORT_INTERNATIONAL_RATES: Record<VehicleType, number> = {
  mini_van: 125,
  sprinter: 150,
  executive: 185,
  mini_bus: 150,
  mid_size_motorcoach: 370,
  full_size_motorcoach: 395,
  suv: 200,
  limo: 0,
};

export const AIRPORT_FEE: Record<VehicleType, number> = {
  mini_van: 10,
  sprinter: 10,
  executive: 10,
  mini_bus: 10,
  mid_size_motorcoach: 25,
  full_size_motorcoach: 25,
  suv: 10,
  limo: 10,
};

// ── In Town: Hourly ───────────────────────────────────────────────
export const IN_TOWN_HOURLY: Record<VehicleType, number> = {
  mini_van: 60,
  sprinter: 95,
  executive: 110,
  mini_bus: 95,
  mid_size_motorcoach: 120,
  full_size_motorcoach: 130,
  suv: 120,
  limo: 110,
};

export const MINIMUM_HOURS: Record<VehicleType, number> = {
  mini_van: 2,
  sprinter: 2,
  executive: 2,
  mini_bus: 2,
  mid_size_motorcoach: 3,
  full_size_motorcoach: 3,
  suv: 2,
  limo: 2,
};

// ── Out of Town: LAX Airport ──────────────────────────────────────
export const LAX_RATES: Record<VehicleType, number> = {
  mini_van: 1800,
  sprinter: 0,       // N/A
  executive: 1700,
  mini_bus: 0,       // N/A
  mid_size_motorcoach: 2550,
  full_size_motorcoach: 2650,
  suv: 0,            // N/A
  limo: 0,           // N/A
};

export const LAX_DRIVER_ROOM: Record<VehicleType, number> = {
    mini_van: 200,
  sprinter: 0,
  executive: 150,
  mini_bus: 0,
  mid_size_motorcoach: 200,
  full_size_motorcoach: 200,
  suv: 0,
  limo: 0,
};

// ── Out of Town: Preset Destinations ─────────────────────────────
export const PRESET_RATES: Record<string, Partial<Record<VehicleType, number>>> = {
  grand_canyon_west_rim: {
    mini_van: 800,
    executive: 1100,
    mid_size_motorcoach: 1275,
    full_size_motorcoach: 1375,
  },
  grand_canyon_national_park: {
    executive: 1700,
    mid_size_motorcoach: 2550,
    full_size_motorcoach: 2650,
  },
  bryce_canyon_zion: {
    executive: 1700,
    mid_size_motorcoach: 2550,
    full_size_motorcoach: 2650,
  },
  antelope_canyon: {
    mini_van: 1200,
    executive: 1700,
    mid_size_motorcoach: 2550,
    full_size_motorcoach: 2650,
  },
};

export const PRESET_ENTRY_FEES: Record<string, Partial<Record<VehicleType, number>>> = {
  grand_canyon_west_rim: {
    mini_van: 150,
    executive: 150,
    mid_size_motorcoach: 150,
    full_size_motorcoach: 150,
  },
  grand_canyon_national_park: {
    executive: 200,
    mid_size_motorcoach: 300,
    full_size_motorcoach: 300,
  },
  bryce_canyon_zion: {
    executive: 140,
    mid_size_motorcoach: 140,
    full_size_motorcoach: 140,
  },
  antelope_canyon: {
    mini_van: 70,
    executive: 70,
    mid_size_motorcoach: 140,
    full_size_motorcoach: 140,
  },
};

// ── Out of Town: Custom Transfer ──────────────────────────────────
export const OUT_OF_TOWN_BASE: Record<VehicleType, number> = {
  mini_van: 1200,
  sprinter: 0,       // N/A
  executive: 1300,
  mini_bus: 0,       // N/A
  mid_size_motorcoach: 1500,
  full_size_motorcoach: 1600,
  suv: 0,            // N/A
  limo: 0,           // N/A
};

export const OUT_OF_TOWN_EXTRA_MILE: Record<VehicleType, number> = {
  mini_van: 3.5,
  sprinter: 0,
  executive: 3.6,
  mini_bus: 0,
  mid_size_motorcoach: 3.8,
  full_size_motorcoach: 4,
  suv: 0,
  limo: 0,
};

export const OUT_OF_TOWN_MAX_MILEAGE = 270;
export const OUT_OF_TOWN_MAX_HOURS = 12;