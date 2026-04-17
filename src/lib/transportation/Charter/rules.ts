export const CHARTER_RULES = {
  in_town: {
    minimumHours: 3,
    includedMileage: 30,
    overtimePerHour: 95,
  },
  out_of_town: {
    minimumHours: 12,
    maxDrivingHoursIncluded: 10,
    overtimePerHour: 120,
    driverHotelRequiredAfterHours: 14,
  },
  black_car: {
    minimumHours: 2,
    airportMeetAndGreetFee: 35,
    waitingGraceMinutes: 15,
  },
} as const;