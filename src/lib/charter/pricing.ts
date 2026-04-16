import { VehicleType } from "./types";

export const AIRPORT_ONE_WAY_RATES: Record<VehicleType, number> = {

  full_size_motorcoach: 850,
  mid_size_motorcoach: 700,
  mini_bus: 420,
  sprinter: 360,
  mini_van: 280,
  suv: 240,
  limo: 300
};

export const IN_TOWN_HOURLY: Record<VehicleType, number> = {

  full_size_motorcoach: 250,
  mid_size_motorcoach: 220,
  mini_bus: 140,
  sprinter: 120,
  mini_van: 95,
  suv: 85,
  limo: 110
};

export const MINIMUM_HOURS = {

  full_size_motorcoach: 5,
  mid_size_motorcoach: 5,
  mini_bus: 4,
  sprinter: 4,
  mini_van: 3,
  suv: 3,
  limo: 3
};