# AI Agent Runbook — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Common commands, debugging steps, and operational procedures for AI agents working on MathBattle.

---

## Environment Setup

```bash
cp .env.example .env
docker compose up -d
npm install
npm run db:migrate
npm run db:seed
```

Set `AI_PROVIDER=mock` and `EMAIL_PROVIDER=mock` for local development.

---

## Development Commands

| Command | Purpose |
|---|---|
| `npm run dev:api` | Start REST API (:3000) |
| `npm run dev:ws` | Start WebSocket server (:3001) |
| `npm run dev:worker` | Start BullMQ AI worker |
| `npm run dev:frontend` | Start Vite dev server (:5173) |
| `npm run test` | Unit tests |
| `npm run test:integration` | Integration tests |
| `npm run lint` | ESLint + Prettier check |
| `npm run db:migrate` | Apply migrations |
| `npm run db:seed` | Seed dev data |
| `npm run db:reset` | Drop + migrate + seed |

---

## Database Operations

```bash
# Create new migration (Prisma example)
npx prisma migrate dev --name descriptive_name

# Inspect DB
npx prisma studio

# Connect via psql
psql postgresql://postgres:postgres@localhost:5432/mathbattle
```

**Rule:** Never modify production DB manually. All schema changes via migration scripts.

---

## Debugging Checklist

### API returns 401
1. Check JWT not expired (15 min TTL)
2. Verify `Authorization: Bearer <token>` header
3. Check user status not `suspended` or `pending_parental_consent`

### WebSocket won't connect
1. Verify WS URL includes valid access token
2. Check `WS_PORT=3001` and server running
3. Check Redis connectivity (match state)

### AI job stuck
1. Check worker running: `npm run dev:worker`
2. Inspect Redis queue: `redis-cli LLEN bull:ai-jobs:wait`
3. Check DLQ: `bull:ai-jobs:failed`

### Migration fails
1. Ensure PostgreSQL running: `docker compose ps`
2. Check `DATABASE_URL` in `.env`
3. Never edit applied migrations — create forward fix

---

## Code Generation Rules

1. Read relevant docs from `AI-Context-Index.md` before coding
2. Match existing module patterns in `src/modules/`
3. Every protected route: JWT guard + RBAC guard
4. Every mutation: audit log entry
5. Every API change: update `openapi/openapi.yaml`
6. No PII in logs or AI prompts
7. AI content status = `draft` until teacher publishes

---

## Testing Requirements

Before marking work complete:
```bash
npm run lint
npm run test
# If API/DB changes:
npm run test:integration
```

---

## File Conventions

| Type | Location |
|---|---|
| NestJS module | `src/modules/{name}/` |
| Shared guards/pipes | `src/shared/` |
| Migrations | `src/database/migrations/` |
| React pages | `frontend/src/pages/` |
| React components | `frontend/src/components/` |
| API client | `frontend/src/services/` |

---

## Seed Credentials (Dev Only)

| Role | Email | Password |
|---|---|---|
| Admin | admin@demo.mathbattle.io | Demo1234! |
| Teacher | teacher@demo.mathbattle.io | Demo1234! |
| Student | student1@demo.mathbattle.io | Demo1234! |

---

*See `ai/AI-Agent-Rules.md` for coding standards and `docs/06-engineering/Local-Development.md` for full setup.*
