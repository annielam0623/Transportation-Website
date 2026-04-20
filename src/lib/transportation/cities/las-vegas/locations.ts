// lib/transportation/cities/las-vegas/locations.ts

export type LocationZone = "strip" | "downtown" | "off-strip" | "henderson" | "other";

export interface LasVegasLocation {
  name: string;
  sortName: string;
  zone: LocationZone;
}

export const LAS_VEGAS_LOCATIONS: LasVegasLocation[] = [
  // ===== STRIP =====
  { name: "Aria Resort & Casino", sortName: "Aria Resort & Casino", zone: "strip" },
  { name: "Bellagio", sortName: "Bellagio", zone: "strip" },
  { name: "Caesars Palace", sortName: "Caesars Palace", zone: "strip" },
  { name: "Circus Circus", sortName: "Circus Circus", zone: "strip" },
  { name: "The Cosmopolitan", sortName: "Cosmopolitan", zone: "strip" },
  { name: "The Cromwell", sortName: "Cromwell", zone: "strip" },
  { name: "Delano Las Vegas", sortName: "Delano Las Vegas", zone: "strip" },
  { name: "Encore at Wynn", sortName: "Encore at Wynn", zone: "strip" },
  { name: "Excalibur", sortName: "Excalibur", zone: "strip" },
  { name: "Flamingo Las Vegas", sortName: "Flamingo Las Vegas", zone: "strip" },
  { name: "Fontainebleau Las Vegas", sortName: "Fontainebleau Las Vegas", zone: "strip" },
  { name: "Four Seasons Hotel Las Vegas", sortName: "Four Seasons Hotel Las Vegas", zone: "strip" },
  { name: "Harrah's Las Vegas", sortName: "Harrah's Las Vegas", zone: "strip" },
  { name: "Horseshoe Las Vegas", sortName: "Horseshoe Las Vegas", zone: "strip" },
  { name: "The LINQ Hotel", sortName: "LINQ Hotel", zone: "strip" },
  { name: "Luxor", sortName: "Luxor", zone: "strip" },
  { name: "Mandalay Bay", sortName: "Mandalay Bay", zone: "strip" },
  { name: "MGM Grand", sortName: "MGM Grand", zone: "strip" },
  { name: "New York-New York", sortName: "New York-New York", zone: "strip" },
  { name: "NoMad Las Vegas", sortName: "NoMad Las Vegas", zone: "strip" },
  { name: "Nobu Hotel at Caesars Palace", sortName: "Nobu Hotel at Caesars Palace", zone: "strip" },
  { name: "The Palazzo", sortName: "Palazzo", zone: "strip" },
  { name: "Paris Las Vegas", sortName: "Paris Las Vegas", zone: "strip" },
  { name: "Park MGM", sortName: "Park MGM", zone: "strip" },
  { name: "Planet Hollywood", sortName: "Planet Hollywood", zone: "strip" },
  { name: "Resorts World Las Vegas", sortName: "Resorts World Las Vegas", zone: "strip" },
  { name: "Sahara Las Vegas", sortName: "Sahara Las Vegas", zone: "strip" },
  { name: "The Signature at MGM Grand", sortName: "Signature at MGM Grand", zone: "strip" },
  { name: "The Venetian Resort", sortName: "Venetian Resort", zone: "strip" },
  { name: "Vdara Hotel & Spa", sortName: "Vdara Hotel & Spa", zone: "strip" },
  { name: "Waldorf Astoria Las Vegas", sortName: "Waldorf Astoria Las Vegas", zone: "strip" },
  { name: "Wynn Las Vegas", sortName: "Wynn Las Vegas", zone: "strip" },

  // ===== DOWNTOWN =====
  { name: "Circa Resort & Casino", sortName: "Circa Resort & Casino", zone: "downtown" },
  { name: "Downtown Grand Las Vegas", sortName: "Downtown Grand Las Vegas", zone: "downtown" },
  { name: "El Cortez Hotel & Casino", sortName: "El Cortez Hotel & Casino", zone: "downtown" },
  { name: "Four Queens Hotel", sortName: "Four Queens Hotel", zone: "downtown" },
  { name: "Fremont Hotel & Casino", sortName: "Fremont Hotel & Casino", zone: "downtown" },
  { name: "Golden Nugget Las Vegas", sortName: "Golden Nugget Las Vegas", zone: "downtown" },

  // ===== OFF-STRIP =====
  { name: "Palms Casino Resort", sortName: "Palms Casino Resort", zone: "off-strip" },
  { name: "Palace Station Hotel & Casino", sortName: "Palace Station Hotel & Casino", zone: "off-strip" },
  { name: "Red Rock Casino Resort & Spa", sortName: "Red Rock Casino Resort & Spa", zone: "off-strip" },
  { name: "Rio All-Suite Hotel & Casino", sortName: "Rio All-Suite Hotel & Casino", zone: "off-strip" },
  { name: "Santa Fe Station Hotel & Casino", sortName: "Santa Fe Station Hotel & Casino", zone: "off-strip" },
  { name: "Virgin Hotels Las Vegas", sortName: "Virgin Hotels Las Vegas", zone: "off-strip" },

  // ===== HENDERSON =====
  { name: "Boulder Station Hotel & Casino", sortName: "Boulder Station Hotel & Casino", zone: "henderson" },
  { name: "Green Valley Ranch Resort", sortName: "Green Valley Ranch Resort", zone: "henderson" },
  { name: "Sunset Station Hotel & Casino", sortName: "Sunset Station Hotel & Casino", zone: "henderson" },
];