export type TripScope = "in_town" | "out_of_town";

export type PriceCategory =
  | "airport_one_way"
  | "in_town_transfer"
  | "lax_airport"
  | "preset_destination"
  | "out_of_town_transfer";

export type VehicleType =
  | "full_size_motorcoach"
  | "mid_size_motorcoach"
  | "mini_bus"
  | "sprinter"
  | "mini_van"
  | "suv"
  | "limo";

export interface CharterQuoteInput {
  pickupLocation: string;
  dropoffLocation: string;
  tripDate: string;
  pickupTime: string;
  vehicleType: VehicleType;
  passengerCount?: number;
  estimatedServiceHours?: number;
  sameDayReturnToYard?: boolean;
}

export interface ClassificationResult {
  tripScope: TripScope;
  priceCategory: PriceCategory;
  specialConditions: string[];
}

export interface QuoteResult extends ClassificationResult {
  estimatedPrice: number;
  pricingMode: string;
}