import { PrismaClient, VehicleType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.vehicle.createMany({
    data: [
      {
        name: 'Sprinter 10',
        type: VehicleType.SPRINTER_10,
        capacity: 10,
        pricePerHour: 85,
        pricePerDay: 650,
        description: 'Compact luxury sprinter, ideal for small groups and airport transfers.',
        features: ['AC', 'USB Charging', 'Leather Seats'],
      },
      {
        name: 'Executive Sprinter 16',
        type: VehicleType.EXECUTIVE_SPRINTER_16,
        capacity: 16,
        pricePerHour: 120,
        pricePerDay: 950,
        description: 'Premium executive sprinter for corporate travel and VIP transfers.',
        features: ['WiFi', 'AC', 'USB Charging', 'Tinted Windows', 'Leather Seats'],
      },
      {
        name: 'MiniBus 22',
        type: VehicleType.MINIBUS_22,
        capacity: 22,
        pricePerHour: 135,
        pricePerDay: 1100,
        description: 'Perfect for medium-sized groups, city tours, and corporate events.',
        features: ['WiFi', 'AC', 'USB Charging', 'PA System'],
      },
      {
        name: 'Mid-Size Coach 40',
        type: VehicleType.MIDSIZE_COACH_40,
        capacity: 40,
        pricePerHour: 180,
        pricePerDay: 1400,
        description: 'Full-size comfort coach for large groups and multi-day charters.',
        features: ['WiFi', 'AC', 'USB Charging', 'PA System', 'Restroom', 'Overhead Storage'],
      },
      {
        name: 'Full-Size Coach 56',
        type: VehicleType.FULLSIZE_COACH_56,
        capacity: 56,
        pricePerHour: 220,
        pricePerDay: 1800,
        description: 'Maximum capacity coach for conventions, school trips, and large events.',
        features: ['WiFi', 'AC', 'USB Charging', 'PA System', 'Restroom', 'DVD/Entertainment', 'Overhead Storage'],
      },
    ],
    skipDuplicates: true,
  })
  console.log('✅ Seed complete')
}

main().catch(console.error).finally(() => prisma.$disconnect())
