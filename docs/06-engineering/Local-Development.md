# Local Development — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 20 LTS | API, WebSocket, AI worker, frontend |
| npm or pnpm | Latest stable | Package management |
| Docker Desktop | Latest | PostgreSQL, Redis |
| Git | 2.40+ | Version control |
| OpenSSL | System | Generate RS256 JWT keys |

Optional: VS Code / Cursor with ESLint, Prettier, and Prisma extensions.

---

## Quick Start

```bash
# 1. Clone and install
git clone git@github.com:mathbattle/platform.git
cd platform
npm install

# 2. Start infrastructure
docker compose up -d

# 3. Configure environment
cp .env.example .env
# Edit .env — see Environment-Variables.md

# 4. Generate JWT keys (example)
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
# Base64-encode and set JWT_PRIVATE_KEY / JWT_PUBLIC_KEY

# 5. Run migrations and seed
npm run db:migrate
npm run db:seed

# 6. Start all services (separate terminals or concurrently)
npm run dev:api        # REST API on :3000
npm run dev:ws         # WebSocket server on :3001
npm run dev:worker     # AI worker
npm run dev:frontend   # Vite dev server on :5173
```

---

## Docker Compose Services

| Service | Port | Image |
|---|---|---|
| PostgreSQL | 5432 | postgres:15 |
| Redis | 6379 | redis:7-alpine |

Data persists in named Docker volumes. Reset with `docker compose down -v` (destroys local data).

---

## Service Ports

| Service | Default Port | Env Variable |
|---|---|---|
| REST API | 3000 | `PORT` |
| WebSocket Server | 3001 | `WS_PORT` |
| Frontend (Vite) | 5173 | — |
| PostgreSQL | 5432 | `DATABASE_URL` |
| Redis | 6379 | `REDIS_URL` |

---

## Common Commands

| Command | Purpose |
|---|---|
| `npm run dev:api` | Start API with hot reload |
| `npm run dev:ws` | Start WebSocket match server |
| `npm run dev:worker` | Start BullMQ AI worker |
| `npm run dev:frontend` | Start React dev server |
| `npm run test` | Run all unit tests |
| `npm run test:integration` | Integration tests (requires Docker) |
| `npm run lint` | ESLint across monorepo |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:seed` | Load development seed data |
| `npm run db:reset` | Drop, migrate, seed (destructive) |

---

## Seed Data

Development seed includes:
- 1 demo school (`DEMO01`)
- Admin: `admin@demo.mathbattle.io` / `Demo1234!`
- Teacher: `teacher@demo.mathbattle.io` / `Demo1234!`
- Students (grades 3, 5, 7): `student{N}@demo.mathbattle.io` / `Demo1234!`
- Sample learning path (Grade 5 Math), 20 published questions, 1 sample class

Never use seed credentials in staging or production.

---

## AI Provider in Development

Set `AI_PROVIDER=mock` in `.env` to use the local mock engine. No external API key required. Mock returns deterministic sample questions for testing import and review flows.

---

## Debugging

### API
- NestJS debug: `npm run dev:api -- --debug`
- Attach VS Code debugger to port 9229

### WebSocket
- Use browser DevTools → Network → WS tab
- Test with `wscat -c ws://localhost:3001?token=<jwt>`

### Database
- Connect: `psql postgresql://postgres:postgres@localhost:5432/mathbattle`
- Prisma Studio: `npx prisma studio`

### Redis
- CLI: `redis-cli -u redis://localhost:6379/0`

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Port already in use | Change `PORT` / `WS_PORT` in `.env` or kill conflicting process |
| Migration fails | Ensure PostgreSQL is running; check `DATABASE_URL` |
| JWT invalid | Regenerate keys; ensure base64 encoding has no line breaks |
| WebSocket auth fails | Verify access token not expired; check CORS and WS URL |
| Redis connection refused | `docker compose up -d redis` |

---

## Related Documents

- `Environment-Variables.md` — full env contract
- `Onboarding-Guide.md` — first-day checklist
- `docs/03-architecture/API-Design.md` — API standards
