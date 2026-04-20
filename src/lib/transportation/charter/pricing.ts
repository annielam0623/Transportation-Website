import { VehicleType } from "./types";

// ── In Town: Airport One-Way ──────────────────────────────────────
export const AIRPORT_DOMESTIC_RATES: Record<VehicleType, number> = {
  mini_van:             110,
  sprinter:             135,
  mini_bus:             135,
  executive:            160,
  suv:                  180,
  mid_size_motorcoach:  320,
  full_size_motorcoach: 375,
  limo:                 0,
};

export const AIRPORT_INTERNATIONAL_RATES: Record<VehicleType, number> = {
  mini_van:             130,  // domestic + $20
  sprinter:             150,
  mini_bus:             150,
  executive:            185,
  suv:                  200,
  mid_size_motorcoach:  370,
  full_size_motorcoach: 395,
  limo:                 0,
};

export const AIRPORT_FEE: Record<VehicleType, number> = {
  mini_van:             10,
  sprinter:             10,
  mini_bus:             10,
  executive:            10,
  suv:                  10,
  mid_size_motorcoach:  25,
  full_size_motorcoach: 25,
  limo:                 10,
};

export const AIRPORT_MAX_HOURS: Record<VehicleType, number> = {
  mini_van:             2,
  sprinter:             2,
  mini_bus:             2,
  executive:            2,
  suv:                  2,
  mid_size_motorcoach:  3,
  full_size_motorcoach: 3,
  limo:                 2,
};

// ── In Town: Hourly (min price already includes minimum hours) ────
export const IN_TOWN_MIN_PRICE: Record<VehicleType, number> = {
  mini_van:             120,
  sprinter:             165,
  mini_bus:             165,
  executive:            190,
  suv:                  180,
  mid_size_motorcoach:  380,
  full_size_motorcoach: 400,
  limo:                 0,
};

export const MINIMUM_HOURS: Record<VehicleType, number> = {
  mini_van:             2,
  sprinter:             2,
  mini_bus:             2,
  executive:            2,
  suv:                  2,
  mid_size_motorcoach:  3,
  full_size_motorcoach: 3,
  limo:                 2,
};

export const ADDITIONAL_HOUR_RATE: Record<VehicleType, number> = {
  mini_van:             95,
  sprinter:             95,
  mini_bus:             95,
  executive:            110,
  suv:                  120,
  mid_size_motorcoach:  120,
  full_size_motorcoach: 130,
  limo:                 0,
};

// ── Out of Town: LAX Airport ──────────────────────────────────────
export const LAX_RATES: Record<VehicleType, number> = {
  mini_van:             0,    // TODO: price TBD
  sprinter:             0,    // N/A
  mini_bus:             0,    // N/A
  executive:            1700,
  suv:                  0,    // N/A
  mid_size_motorcoach:  2550,
  full_size_motorcoach: 2650,
  limo:                 0,
};

export const LAX_DRIVER_ROOM: Record<VehicleType, number> = {
  mini_van:             0,    // TODO: price TBD
  sprinter:             0,
  mini_bus:             0,
  executive:            150,
  suv:                  0,
  mid_size_motorcoach:  180,
  full_size_motorcoach: 180,
  limo:                 0,
};

// ── Out of Town: Preset Destinations ─────────────────────────────
export const PRESET_RATES: Record<string, Partial<Record<VehicleType, number>>> = {
  grand_canyon_west_rim: {
    mini_van:             0,    // TODO: price TBD
    executive:            1100,
    mid_size_motorcoach:  1275,
    full_size_motorcoach: 1375,
  },
  grand_canyon_national_park: {
    executive:            1700,
    mid_size_motorcoach:  2550,
    full_size_motorcoach: 2650,
  },
  bryce_canyon_zion: {
    executive:            1700,
    mid_size_motorcoach:  2550,
    full_size_motorcoach: 2650,
  },
  antelope_canyon: {
    mini_van:             0,    // TODO: price TBD
    executive:            1700,
    mid_size_motorcoach:  2550,
    full_size_motorcoach: 2650,
  },
};

export const PRESET_ENTRY_FEES: Record<string, Partial<Record<VehicleType, number>>> = {
  grand_canyon_west_rim: {
    executive:            150,
    mid_size_motorcoach:  150,
    full_size_motorcoach: 150,
  },
  grand_canyon_national_park: {
    executive:            200,
    mid_size_motorcoach:  300,
    full_size_motorcoach: 300,
  },
  bryce_canyon_zion: {
    executive:            140,
    mid_size_motorcoach:  140,
    full_size_motorcoach: 140,
  },
  antelope_canyon: {
    executive:            70,
    mid_size_motorcoach:  140,
    full_size_motorcoach: 140,
  },
};

// ── Out of Town: Custom Transfer ──────────────────────────────────
export const OUT_OF_TOWN_BASE: Record<VehicleType, number> = {
  mini_van:             0,    // TODO: price TBD
  sprinter:             0,    // N/A
  mini_bus:             0,    // N/A
  executive:            1300,
  suv:                  0,    // N/A
  mid_size_motorcoach:  1500,
  full_size_motorcoach: 1600,
  limo:                 0,
};

export const OUT_OF_TOWN_EXTRA_MILE: Record<VehicleType, number> = {
  mini_van:             0,    // TODO: price TBD
  sprinter:             0,
  mini_bus:             0,
  executive:            3.6,
  suv:                  0,
  mid_size_motorcoach:  3.8,
  full_size_motorcoach: 4.0,
  limo:                 0,
};

export const OUT_OF_TOWN_MAX_MILEAGE = 270;
export const OUT_OF_TOWN_MAX_HOURS = 12;

// ── Special Events ────────────────────────────────────────────────
export const SPECIAL_EVENT_RATES: Record<VehicleType, number> = {
  mini_van:             0,
  sprinter:             950,
  mini_bus:             950,
  executive:            1100,
  suv:                  1200,
  mid_size_motorcoach:  1400,
  full_size_motorcoach: 1500,
  limo:                 0,
};

export const SPECIAL_EVENT_MIN_HOURS = 10;

// ── Other ─────────────────────────────────────────────────────────
export const STATE_EXCISE_TAX = 0.03;