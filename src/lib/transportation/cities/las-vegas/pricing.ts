// lib/transportation/cities/las-vegas/pricing.ts

import { LocationZone } from "./locations";

export type ServiceType = "in-town" | "airport-pickup" | "airport-dropoff" | "out-of-town";

export interface PriceRule {
  basePrice: number;
  surcharge?: number;
  surchargeLabel?: string;
  isFixed: boolean;
}

// 机场接送固定价格（标准区）
const AIRPORT_TRANSFER_PRICING: Record<string, Record<string, PriceRule>> = {
  LAS: {
    "mini-van":  { basePrice: 110, surcharge: 10, surchargeLabel: "airport fee", isFixed: true },
    "sprinter":  { basePrice: 135, surcharge: 10, surchargeLabel: "airport fee", isFixed: true },
    "coach-bus": { basePrice: 350, surcharge: 10, surchargeLabel: "airport fee", isFixed: true },
  },
  HND: {
    "mini-van":  { basePrice: 130, surcharge: 10, surchargeLabel: "airport fee", isFixed: true },
    "sprinter":  { basePrice: 155, surcharge: 10, surchargeLabel: "airport fee", isFixed: true },
    "coach-bus": { basePrice: 380, surcharge: 10, surchargeLabel: "airport fee", isFixed: true },
  },
};

// 区域附加费
const ZONE_SURCHARGE: Record<LocationZone, number> = {
  strip: 0,
  downtown: 0,
  "off-strip": 25,
  henderson: 40,
  other: 50,
};

// 本地接送基础价格
const IN_TOWN_BASE_PRICING: Record<string, number> = {
  "mini-van":  95,
  "sprinter":  120,
  "coach-bus": 300,
};

export function getAirportTransferPrice(
  airportCode: string,
  vehicleType: string,
  destinationZone: LocationZone
): PriceRule | null {
  const rule = AIRPORT_TRANSFER_PRICING[airportCode]?.[vehicleType];
  if (!rule) return null;

  const zoneSurcharge = ZONE_SURCHARGE[destinationZone];
  return {
    ...rule,
    surcharge: (rule.surcharge ?? 0) + zoneSurcharge,
    surchargeLabel: zoneSurcharge > 0
      ? `airport fee + $${zoneSurcharge} area surcharge`
      : rule.surchargeLabel,
  };
}

export function getInTownPrice(
  vehicleType: string,
  zone: LocationZone
): PriceRule {
  const base = IN_TOWN_BASE_PRICING[vehicleType] ?? 95;
  const surcharge = ZONE_SURCHARGE[zone];
  return {
    basePrice: base,
    surcharge: surcharge > 0 ? surcharge : undefined,
    surchargeLabel: surcharge > 0 ? "area surcharge" : undefined,
    isFixed: false,
  };
}