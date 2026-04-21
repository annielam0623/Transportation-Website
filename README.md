# Travel USA Express

Charter Bus and ground transportation platform for the US Southwest market.

**Live:** https://transportation-website-1qdl.vercel.app/  
**Branch:** `charter` (active development)

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Prisma + PostgreSQL
- **Deployment:** Vercel
- **Node:** v20
- **Package flags:** `legacy-peer-deps=true`

---

## Services

| Service | Status |
|---|---|
| Charter Bus | ✅ Active |
| Hire Driver | 🚧 In Progress |
| Self-Drive | 🚧 Placeholder |

---

## Project Structure
src/
├── app/
│   ├── api/transportation/charter/estimate/
│   └── page.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── BookingSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── WhyUsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── Footer.tsx
│   └── transportation/
│       ├── booking/
│       │   ├── BookingWidget.tsx
│       │   ├── charter/
│       │   │   ├── CharterForm.tsx
│       │   │   └── CharterQuoteResult.tsx
│       │   ├── hire-driver/
│       │   │   └── HireDriverForm.tsx
│       │   └── self-drive/
│       │       └── SelfDriveForm.tsx
│       └── ui/
│           └── LocationInput.tsx
└── lib/
└── transportation/
└── cities/
├── index.ts
└── las-vegas/
├── index.ts
├── airports.ts
├── locations.ts
├── zones.ts
├── search.ts
└── pricing.ts

---

## City Architecture

Designed for multi-city expansion. Each city implements a standard interface:

```typescript
interface CityModule {
  key: string
  label: string
  active: boolean
  airports: Airport[]
  search: (query: string) => SearchResult[]
  getZone: (locationName: string) => LocationZone
  pricing: CityPricing
}
```

To add a new city:
1. Create `cities/{city-name}/` folder with the standard files
2. Register in `cities/index.ts` with `active: true`

**Currently active:** Las Vegas  
**Coming soon:** Los Angeles, San Francisco, Phoenix

---

## Las Vegas Pricing Zones

| Zone | Rate |
|---|---|
| Strip (32 hotels) | Standard |
| Downtown | Standard |
| Off-Strip | + Surcharge |
| Henderson | + Surcharge |

---

## Airport Coverage (17 airports)

| Region | Airports |
|---|---|
| Las Vegas | LAS, HND |
| Los Angeles & San Diego | LAX, BUR, LGB, SNA, ONT, VNY, SAN, CLD |
| San Francisco Bay Area | SFO, OAK, SJC |
| Phoenix / Arizona | PHX, SDL, FLG, PGA |

---

## Design System

- **Theme:** Deep navy / black
- **Primary:** `#0A1E38` (Navy), `#0A428C` (Blue)
- **Silver:** `#E8ECF2`, `#C8D0DA`, `#A8B4C2`
- **Fonts:** Playfair Display (headings), Inter (body) via Google Fonts CDN

---

## Local Development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Deployment

Vercel install command:
```bash
npm install --legacy-peer-deps
```
