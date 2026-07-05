# Onboarding Guide — MathBattle Engineering

**Version:** 1.0.0

---

## Project Overview

MathBattle is an AI-powered educational SaaS web platform for K–12 mathematics learning. It serves students, teachers, and administrators through a single responsive web application. This guide gets a new engineer from zero to their first PR in one day.

---

## Before Day One

- [ ] GitHub access granted (repo: `mathbattle/platform`)
- [ ] AWS account access (staging environment)
- [ ] Slack workspace access (#engineering, #alerts, #releases)
- [ ] Secrets manager access (staging secrets only)
- [ ] Linear/Jira project access
- [ ] Read `docs/README.md` (documentation index)

---

## Required Background Reading (in order)

1. `docs/01-product/Executive-Summary.md` — What MathBattle is
2. `docs/01-product/PRD.md` — What we are building
3. `docs/03-architecture/System-Architecture.md` — How it is built
4. `docs/03-architecture/ERD.md` — Data model
5. `docs/03-architecture/API-Design.md` — API standards
6. `docs/02-requirements/FRS-Detailed.md` — Function specifications
7. `docs/03-architecture/Auth-Security.md` — Security rules
8. This document — Engineering workflow

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, TailwindCSS |
| Backend | Node.js 20, NestJS, TypeScript |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Job Queue | BullMQ |
| Real-time | Socket.io |
| ORM | Prisma (or TypeORM — confirm with team) |
| Testing | Jest, Vitest, Playwright |
| CI/CD | GitHub Actions |
| Infrastructure | AWS (ECS, RDS, ElastiCache, S3, CloudFront) |

---

## Repository Structure

```
mathbattle/
  src/
    modules/          ← Feature modules (auth, learning, questions, ai, matches, gamification, dashboard, admin, notifications)
    shared/           ← Guards, pipes, filters, decorators, utils
    database/         ← Migrations, seeds
    config/           ← Environment configuration
    main.ts
  frontend/
    src/
      components/     ← Shared UI components
      pages/          ← Route-level page components
      hooks/          ← Custom React hooks
      services/       ← API client functions
      store/          ← State management
  docs/               ← This documentation package
  ai/                 ← AI agent rules and runbooks
  .env.example        ← Environment variable contract
  docker-compose.yml  ← Local development stack
```

---

## Local Setup

### Prerequisites
- Node.js 20+
- Docker Desktop
- Git

### Steps

```bash
# 1. Clone repository
git clone https://github.com/mathbattle/platform.git
cd platform

# 2. Copy environment file
cp .env.example .env
# Fill in values from secrets manager (staging secrets)

# 3. Start infrastructure
docker compose up -d

# 4. Install dependencies
npm install

# 5. Run database migrations
npm run db:migrate

# 6. Seed development data
npm run db:seed

# 7. Start API server
npm run dev:api

# 8. Start frontend (separate terminal)
npm run dev:frontend

# 9. Start WebSocket server (separate terminal)
npm run dev:ws
```

**Verify:** Open `http://localhost:5173` — login page should appear.
**API health:** `http://localhost:3000/health` should return `{ "status": "ok" }`

---

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_PRIVATE_KEY` | RS256 private key (base64 encoded) |
| `JWT_PUBLIC_KEY` | RS256 public key (base64 encoded) |
| `AI_PROVIDER` | `openai` or `anthropic` or `mock` |
| `AI_PROVIDER_API_KEY` | AI provider API key |
| `EMAIL_SERVICE_API_KEY` | Email service API key |

**Never commit real secrets.** Use `mock` for AI provider in local development.

---

## Running Tests

```bash
# Unit tests
npm run test

# Unit tests with coverage
npm run test:coverage

# Integration tests
npm run test:integration

# E2E tests (requires running stack)
npm run test:e2e

# All tests (CI mode)
npm run test:ci
```

**Coverage target:** ≥ 80% overall; 100% for auth and match scoring.

---

## Critical Flows to Understand

Before writing code, manually test these flows in your local environment:

1. Register as a student → complete first lesson → earn XP
2. Register as a teacher → create a question → publish it
3. Two students complete a match → verify scoring
4. Teacher generates questions via AI (use mock provider)

---

## First Tasks

New engineers start with:
1. A bug fix or small enhancement (P3 backlog item)
2. Adding a unit test to an existing module
3. Reviewing a PR from a teammate

Do not start with: match engine, AI provider integration, or database migrations on your first week.

---

## Working Rules

- **Branch naming:** `feature/B-XXX-short-description`, `fix/B-XXX-short-description`
- **PR size:** ≤ 400 lines changed (excluding generated files and migrations)
- **PR requires:** 1 approval from a senior engineer; all CI gates passing
- **Commit messages:** `feat(module): description` / `fix(module): description` (Conventional Commits)
- **No direct commits to `main`**
- **Migrations:** Every schema change requires a migration; no direct DDL
- **Secrets:** Never in code, never in commits, never in logs
- **Documentation:** Update relevant docs in the same PR as the code change

---

## PR Template

See `.github/pull_request_template.md` for the required PR format.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `docker compose up` fails | Check Docker Desktop is running; check port conflicts (5432, 6379, 3000) |
| Database migration fails | Check `DATABASE_URL` in `.env`; run `npm run db:migrate:reset` to reset |
| JWT validation fails | Check `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` are correctly base64 encoded |
| AI generation returns mock data | Set `AI_PROVIDER=mock` in `.env` for local development |
| WebSocket connection refused | Ensure WebSocket server is running on port 3001 |

---

## Contacts and Ownership

| Area | Owner | Slack |
|---|---|---|
| Architecture decisions | Engineering Lead | @engineering-lead |
| Backend / API | Backend Lead | @backend-lead |
| Frontend | Frontend Lead | @frontend-lead |
| AI Engine | AI Engineer | @ai-engineer |
| DevOps / Infrastructure | DevOps Engineer | @devops |
| Security | Security Lead | @security-lead |
| Product questions | Product Manager | @product-manager |

---

*See `06-engineering/Team-Workflow.md` for team collaboration rules and `06-engineering/Code-Review-Checklist.md` for PR review standards.*
