// lib/transportation/charter/types.ts

export type TripScope = "in_town" | "out_of_town";

export type AirportTransferType = "domestic" | "international";

export type PriceCategory =
  | "airport_one_way"
  | "in_town_transfer"
  | "lax_airport"
  | "preset_destination"
  | "out_of_town_transfer"
  | "black_car";

export type VehicleType =
  | "mini_van"
  | "sprinter"
  | "executive"
  | "mini_bus"
  | "mid_size_motorcoach"
  | "full_size_motorcoach"
  | "suv"
  | "limo";

export type ServiceType =
  | "airport_pickup"
  | "airport_dropoff"
  | "in_town_transfer"
  | "lax_airport_transfer"
  | "grand_canyon_west_rim"
  | "grand_canyon_south"
  | "bryce_canyon_zion"
  | "antelope_canyon"
  | "valley_of_fire"
  | "custom_out_of_town_transfer"
  | "luxury_suv_service"
  | "limousine_service";

export interface CharterQuoteInput {
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation: string;
  tripDate: string;
  pickupTime: string;
  passengerCount: number;
  luggageCount: number;
  airportType?: AirportTransferType;
  estimatedServiceHours?: number;
}

export interface VehicleOption {
  type: VehicleType;
  name: string;
  maxPassengers: number;
  maxLuggage: number;
  price: number;
  pricingMode: "fixed" | "hourly" | "manual_review";
  isRecommended: boolean;
  airportFee?: number;
  maxHours?: number;
  minHours?: number;
  additionalHourRate?: number;
  entryFee?: number;
  maxMileage?: number;
  extraMileRate?: number;
}

export interface ClassificationResult {
  tripScope: TripScope;
  priceCategory: PriceCategory;
  specialConditions: string[];
}

export interface QuoteResult extends ClassificationResult {
  vehicles: VehicleOption[];
}
