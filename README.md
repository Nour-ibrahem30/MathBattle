# MathBattle — Quick Start

## Prerequisites

- Node.js 20+
- npm 10+

## Run the frontend (demo mode)

The frontend runs with **local mock data** (localStorage) — no backend required for UI demo.

```bash
npm install
cd frontend && npm install
npm run dev
```

Open http://localhost:5173

### Demo login

| Role | Email | Password |
|------|-------|----------|
| Student | student1@demo.mathbattle.io | Demo1234! |
| Teacher | teacher@demo.mathbattle.io | Demo1234! |
| Admin | admin@demo.mathbattle.io | Demo1234! |

## Infrastructure (optional)

```bash
docker compose up -d
```

Starts PostgreSQL (5432) and Redis (6379) for future backend development.

## Documentation

See `docs/README.md` for full documentation index.

## Project structure

```
frontend/          React + Vite + TypeScript + Tailwind
docs/              Enterprise documentation pack
ai/                AI agent rules and runbooks
docker-compose.yml Local PostgreSQL + Redis
```
