export type TripScope = "in_town" | "out_of_town";

export type AirportTransferType =
  | "domestic"
  | "international";

export type PriceCategory =
  | "airport_one_way"
  | "in_town_transfer"
  | "lax_airport"
  | "preset_destination"
  | "out_of_town_transfer";

export type VehicleType =
  | "executive"
  | "suv"
  | "limo"
  | "mini_van"
  | "sprinter"
  | "mini_bus"
  | "mid_size_motorcoach"
  | "full_size_motorcoach";

export interface CharterQuoteInput {
  pickupLocation: string;
  dropoffLocation: string;
  tripDate: string;
  pickupTime: string;

  serviceType?: "charter_bus" | "black_car";
  airportType?: AirportTransferType;

  vehicleType: VehicleType;
  passengerCount?: number;
  luggageCount?: number;

  estimatedServiceHours?: number;
  sameDayReturnToYard?: boolean;
}

export interface ClassificationResult {
  tripScope: TripScope;
  priceCategory: PriceCategory;
  specialConditions: string[];
}

export interface QuoteResult extends ClassificationResult {
  vehicleType?: VehicleType;
  estimatedPrice: number;
  pricingMode: string;
}