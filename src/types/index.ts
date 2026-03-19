// src/types/index.ts

export type BookingFormData = {
  pickupAddress: string
  dropoffAddress: string
  departureDate: string
  departureTime: string
  passengerCount: number
  luggageCount: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  notes?: string
}

export type FlyDriveFormData = {
  originCity: string
  destination: string
  departureDate: string
  tripDays: number
  travelerCount: number
  travelMode: 'AI_RECOMMEND' | 'SELF_DRIVE' | 'CHAUFFEUR' | 'HYBRID'
  email: string
  firstName?: string
  lastName?: string
}

export type Vehicle = {
  id: string
  name: string
  type: string
  capacity: number
  pricePerHour: number | null
  pricePerDay: number | null
  minHours: number
  imageUrl: string | null
  features: string[]
  perfectFor: string[]
  description: string | null
  isActive: boolean
}

export type Booking = {
  id: string
  bookingRef: string
  type: string
  status: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  pickupAddress: string
  dropoffAddress: string
  departureDate: string
  departureTime: string
  passengerCount: number
  luggageCount: number
  notes: string | null
  quotedPrice: number | null
  finalPrice: number | null
  createdAt: string
  vehicle?: Vehicle
}

export type FlyDriveQuote = {
  id: string
  quoteRef: string
  status: string
  email: string
  originCity: string
  destination: string
  departureDate: string
  tripDays: number
  travelerCount: number
  travelMode: string
  aiRecommendation: string | null
  aiReason: string | null
  createdAt: string
}

export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}
