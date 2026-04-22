// src/lib/transportation/charter/mockQuote.ts

export type MockVehicleOption = {
  type: string
  slug: string
  name: string
  capacity: number
  luggageCapacity: number
  priceTotal: number
  priceMode: string
  features: string[]
  imageUrl: string | null
  available: boolean
  tag?: 'recommended'
}

export type MockQuoteResult = {
  options: MockVehicleOption[]
}

export function getMockQuote(
  passengerCount: number,
  _luggageCount: number
): MockQuoteResult {
  const allOptions: MockVehicleOption[] = [
    {
      type: 'SPRINTER',
      slug: 'sprinter-van',
      name: 'Sprinter Van',
      capacity: 10,
      luggageCapacity: 8,
      priceTotal: 420,
      priceMode: 'flat rate',
      features: ['WiFi', 'A/C', 'Leather Seats', 'USB Outlets'],
      imageUrl: null,
      available: true,
    },
    {
      type: 'EXECUTIVE_SPRINTER',
      slug: 'executive-sprinter',
      name: 'Executive Sprinter',
      capacity: 16,
      luggageCapacity: 12,
      priceTotal: 580,
      priceMode: 'flat rate',
      features: ['WiFi', 'A/C', 'Premium Leather', 'USB Outlets', 'Mood Lighting'],
      imageUrl: null,
      available: true,
    },
    {
      type: 'MINIBUS',
      slug: 'mini-bus',
      name: 'Mini Bus',
      capacity: 22,
      luggageCapacity: 18,
      priceTotal: 750,
      priceMode: 'flat rate',
      features: ['WiFi', 'A/C', 'Reclining Seats', 'Luggage Bay'],
      imageUrl: null,
      available: true,
    },
    {
      type: 'COACH',
      slug: 'mid-size-coach',
      name: 'Mid-Size Coach',
      capacity: 40,
      luggageCapacity: 35,
      priceTotal: 1100,
      priceMode: 'flat rate',
      features: ['WiFi', 'A/C', 'Reclining Seats', 'Restroom', 'Luggage Bay', 'PA System'],
      imageUrl: null,
      available: false, // mock unavailable
    },
    {
      type: 'COACH',
      slug: 'full-size-coach',
      name: 'Full-Size Coach',
      capacity: 56,
      luggageCapacity: 50,
      priceTotal: 1450,
      priceMode: 'flat rate',
      features: ['WiFi', 'A/C', 'Reclining Seats', 'Restroom', 'Luggage Bay', 'PA System', 'TV'],
      imageUrl: null,
      available: true,
    },
  ]

  // 找最小匹配车型
  const minMatch = allOptions.find(v => v.capacity >= passengerCount)
  if (!minMatch) return { options: [] }

  const minIndex = allOptions.indexOf(minMatch)
  const nextUp = allOptions[minIndex + 1] ?? null

  const options: MockVehicleOption[] = [minMatch]

  if (nextUp) {
    options.push({ ...nextUp, tag: 'recommended' })
  }

  return { options }
}
