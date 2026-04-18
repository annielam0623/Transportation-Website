import { VehicleType } from "./types";

export const AIRPORT_DOMESTIC_RATES: Record<VehicleType, number> = {
  executive: 220,
  suv: 240,
  limo: 300,
  mini_van: 280,
  sprinter: 360,
  mini_bus: 420,
  mid_size_motorcoach: 700,
  full_size_motorcoach: 850,
};

export const AIRPORT_INTERNATIONAL_RATES: Record<VehicleType, number> = {
  executive: 260,
  suv: 280,
  limo: 340,
  mini_van: 320,
  sprinter: 420,
  mini_bus: 500,
  mid_size_motorcoach: 780,
  full_size_motorcoach: 950,
};

export const IN_TOWN_HOURLY: Record<VehicleType, number> = {

  full_size_motorcoach: 130,
  mid_size_motorcoach: 120,
  mini_bus: 140,
  executive: 110
  sprinter: 95,
  mini_van: 65,
  suv: 85,
  limo: 110
};

export const MINIMUM_HOURS = {

  full_size_motorcoach: 3,
  mid_size_motorcoach: 3,
  mini_bus: 2,
  executive: 2,
  sprinter: 2,
  mini_van: 2,
  suv: 2,
  limo: 2,
};