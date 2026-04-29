# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/scripts run seed` — seed RapidAid demo data (Bengaluru)

## Project: RapidAid

AI-assisted Rapid Crisis Analysis & Emergency Coordination platform.

- **Frontend artifact**: `artifacts/crisis-response` (React + Vite, react-leaflet on OpenStreetMap, recharts, framer-motion)
- **API artifact**: `artifacts/api-server` (Express, mounted at `/api`, port 8080)
- **DB tables** (`lib/db/src/schema`): `incidents`, `safetyZones`, `fogZones`, `trafficStagnation`, `hospitals`, `alerts`, `locationPings`
  - `incidents` and `alerts` carry `source` / `externalId` / `url` for live-feed dedup & attribution.
- **Pages**: Live Map (`/`), Safe Route (`/safe-route`), Incidents (`/incidents`), Report (`/report`), Alerts (`/alerts`), Dashboard (`/dashboard`), Hospitals (`/hospitals`)
- **Map provider**: OpenStreetMap tiles (no API keys required)
- **Codegen**: Orval generates React Query hooks + Zod schemas from `lib/api-spec/openapi.yaml`. Convention: request body schemas use the `Input` suffix (e.g. `CreateIncidentInput`) to avoid collisions with auto-generated `Body` types.

### Live data pipeline (no API keys required)

- `artifacts/api-server/src/lib/external/`:
  - `weather.ts` — Open-Meteo (free, no key): fog / cyclone / heavy-rain alerts + fog zones
  - `news.ts` — GDELT 2.0 DOC API (free, no key): nearby incidents/protests/rallies as user-visible incidents
  - `traffic.ts` — clusters `locationPings` and time-of-day-weighted hotspots (Bengaluru/Gwalior) into traffic-stagnation zones; promotes high suspicion (≥75) into AI accident alerts
  - `cities.ts` — coverage city centers
- `lib/ingest.ts` — orchestrator with dedup-by-`externalId`, runs every 10 minutes after boot
- `lib/seed.ts` — Gwalior user-reported incidents + Gwalior/Bengaluru hospitals + safety zones (idempotent)
- `routes/live.ts` — `POST /api/live/refresh` (manual refresh, supports `?lat&lng&name=` for a user's area), `GET /api/live/weather`
- Frontend: `pages/home.tsx` shows live feed with source badges (Weather / News / Traffic AI / User), refresh button, and 30–60s auto-refetch.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
