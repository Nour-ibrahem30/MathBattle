# AI Context Index — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Maps architectural components and features to the documentation and code locations AI agents should read before making changes.

---

## Quick Start for AI Agents

1. Read `ai/AI-Agent-Rules.md`
2. Read `AGENTS.md` (root)
3. Use this index to find relevant docs for your task
4. Follow `ai/AI-Definition-of-Done.md` before marking work complete

---

## Component → Documentation Map

| Component / Feature | Primary Docs | Code Location (expected) |
|---|---|---|
| Authentication | Auth-Security.md, FRS-Detailed §1 | `src/modules/auth/` |
| Learning paths | ERD §7-12, FRS-Detailed §2 | `src/modules/learning/` |
| Question bank | ERD §13-14, AI-Architecture.md | `src/modules/questions/` |
| AI generation | AI-Architecture.md, Queue-and-Jobs-Architecture.md | `src/modules/ai/`, worker |
| Matches | Component-Architecture.md (WS), FRS-Detailed §4 | `src/modules/matches/`, WS server |
| Gamification | ERD §18-22, Domain-Model.md | `src/modules/gamification/` |
| Classroom | ERD §24-27, Admin-Flows.md | `src/modules/classroom/` |
| Dashboard | UX-Flows.md, Medium-Fidelity-Wireframes.md | `frontend/src/pages/` |
| Notifications | ERD §23, Queue-and-Jobs-Architecture.md | `src/modules/notifications/` |
| Admin | Admin-Flows.md, Audit-Logging-Strategy.md | `src/modules/admin/` |
| Shared guards | Auth-Security.md, Security-Architecture.md | `src/shared/guards/` |
| Database | ERD.md, Data-Dictionary.md, Migration-Plan.md | `src/database/` |
| API contracts | API-Design.md, openapi/openapi.yaml | `docs/03-architecture/openapi/` |

---

## Task → Reading List

| Task Type | Read First |
|---|---|
| New API endpoint | API-Design.md, Auth-Security.md, openapi.yaml, FRS-Detailed.md |
| Database change | ERD.md, Migration-Plan.md, Indexing-Strategy.md |
| WebSocket/match change | Component-Architecture.md, Auth-Security.md, Caching-Strategy.md |
| AI feature | AI-Architecture.md, Compliance-Architecture.md, Queue-and-Jobs-Architecture.md |
| Frontend page | Information-Architecture.md, UX-Flows.md, Accessibility-Review.md |
| Security fix | Threat-Model.md, Security-Architecture.md, Auth-Security.md |
| DevOps/deploy | Deployment-Operations.md, Environment-Variables.md |

---

## High-Risk Files (Extra Review Required)

- WebSocket match server and match engine
- JWT/refresh token logic
- AI question import verification gates
- Anti-cheat detection
- RBAC guards and school_id scoping
- Database migrations affecting user data

---

## Canonical Sources of Truth

| Topic | Canonical File |
|---|---|
| Data model | `docs/03-architecture/ERD.md` |
| API contract | `docs/03-architecture/openapi/openapi.yaml` |
| Requirements | `docs/02-requirements/FRS-Detailed.md` |
| Security | `docs/03-architecture/Auth-Security.md` |
| Env vars | `.env.example` |

---

*See `ai/AI-Team-Routing.md` for multi-agent task routing.*
