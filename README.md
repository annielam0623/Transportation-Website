# Travel USA Express

Next.js 14 + PostgreSQL + Prisma + Tailwind CSS + Vercel

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Deployment**: Vercel + Neon (serverless Postgres) or Supabase

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL
```

### 3. Set up database
```bash
# Push schema to your database
npm run db:push

# Seed initial vehicle data
npm run db:seed

# (Optional) Open Prisma Studio to view data
npm run db:studio
```

### 4. Run development server
```bash
npm run dev
# Open http://localhost:3000
```

## Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── bookings/route.ts   # POST/GET charter bookings
│   │   ├── quotes/route.ts     # POST/GET fly & drive quotes
│   │   └── vehicles/route.ts   # GET vehicle list
│   ├── layout.tsx
│   ├── page.tsx                # Home page
│   └── globals.css
├── components/
│   ├── booking/
│   │   ├── BookingWidget.tsx   # Tab switcher
│   │   ├── CharterForm.tsx     # Charter bus form
│   │   └── FlyDriveForm.tsx    # Fly & Drive form
│   ├── layout/
│   │   ├── Topbar.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── StatsBar.tsx
│       ├── ServicesSection.tsx
│       ├── WhyUsSection.tsx
│       └── TestimonialsSection.tsx
├── lib/
│   └── prisma.ts               # Prisma client singleton
└── types/
    └── index.ts
prisma/
├── schema.prisma               # DB schema
└── seed.ts                     # Seed data (5 vehicles)
```

## Database Models
- **Vehicle** — charter bus fleet (type, capacity, pricing, features)
- **Booking** — charter bus bookings (pickup, dropoff, date, passengers)
- **FlyDriveQuote** — fly & drive quotes with AI recommendation

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/bookings | Create charter booking |
| GET | /api/bookings | List all bookings |
| POST | /api/quotes | Create Fly & Drive quote + AI recommendation |
| GET | /api/quotes | List all quotes |
| GET | /api/vehicles | List active vehicles |

## Deploying to Vercel
1. Push code to GitHub
2. Import project on vercel.com
3. Add DATABASE_URL environment variable (use Neon or Supabase for serverless Postgres)
4. Deploy — Vercel auto-detects Next.js
