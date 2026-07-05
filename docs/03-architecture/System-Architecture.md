# System Architecture — MathBattle

**Version:** 1.0.0

---

## Architecture Document Map

| Document | Purpose |
|---|---|
| This document | C4 Level 1 and Level 2 architecture, architecture style, key decisions |
| `Component-Architecture.md` | C4 Level 3 component breakdown |
| `API-Design.md` | REST API standards and endpoint catalog |
| `ERD.md` | Entity-relationship model |
| `Data-Architecture.md` | Data flow, ownership, lifecycle |
| `Auth-Security.md` | Authentication and authorization design |
| `AI-Architecture.md` | AI engine design and provider integration |
| `Deployment-Operations.md` | Infrastructure topology and deployment |
| `diagrams/` | Mermaid source files for all diagrams |

---

## Architecture Style

MathBattle uses a **modular monolith** architecture for Phase 1, designed for extraction into microservices in Phase 3+. This approach:
- Reduces operational complexity during early phases
- Maintains clear module boundaries for future extraction
- Allows a small team to move quickly without distributed systems overhead

The WebSocket match server is the only component deployed separately from the main API in Phase 1, due to its distinct connection management requirements.

---

## Architecture Goals

| Goal | Approach |
|---|---|
| Education-first | AI and gamification are modules, not the core; learning path is the primary flow |
| Scalability | Stateless API, horizontal scaling, Redis caching, read replicas |
| Security | JWT + RBAC, encryption at rest and in transit, anti-cheat, rate limiting |
| Maintainability | Module boundaries, OpenAPI contracts, migration-only schema changes |
| Reliability | Zero-downtime deployments, background job retries, WebSocket reconnect |
| Privacy | Data minimization, soft delete, audit logs, GDPR/COPPA compliance |

---

## C4 Level 1 — System Context Diagram

```
Diagram: MathBattle System Context

External Actors:
  [Student] ──────────────────────────────────────────────────────────────────┐
  [Teacher] ──────────────────────────────────────────────────────────────────┤
  [Administrator] ─────────────────────────────────────────────────────────── ▼
                                                                    ┌─────────────────┐
                                                                    │   MathBattle     │
                                                                    │   Web Platform  │
                                                                    └────────┬────────┘
                                                                             │
                              ┌──────────────────────────────────────────────┤
                              │                          │                   │
                    ┌─────────▼──────┐        ┌─────────▼──────┐  ┌────────▼───────┐
                    │  AI Provider   │        │  Email Service │  │  Cloud Storage │
                    │ (OpenAI/etc.)  │        │  (Transactional│  │  (Documents,   │
                    └────────────────┘        │   Email)       │  │   Exports)     │
                                              └────────────────┘  └────────────────┘
```

**Description:**
- Students, Teachers, and Administrators interact with the MathBattle Web Platform via a browser.
- The platform communicates with an AI Provider for question generation and analysis.
- The platform uses an Email Service for transactional emails (welcome, password reset, notifications).
- The platform uses Cloud Storage for document imports, report exports, and static assets.

---

## C4 Level 2 — Container Architecture

```
Diagram: MathBattle Container Architecture

┌─────────────────────────────────────────────────────────────────────────────┐
│                          MathBattle Platform                                 │
│                                                                             │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────────┐  │
│  │   Web Frontend   │    │   REST API       │    │  WebSocket Server    │  │
│  │   (React SPA)    │◄──►│   (Node.js /     │    │  (Match Engine)      │  │
│  │   CDN-served     │    │   Express/NestJS) │    │  (Node.js / Socket.io│  │
│  └──────────────────┘    └────────┬─────────┘    └──────────┬───────────┘  │
│                                   │                          │              │
│                          ┌────────▼─────────────────────────▼──────────┐   │
│                          │              PostgreSQL                      │   │
│                          │         (Primary + Read Replica)             │   │
│                          └──────────────────────────────────────────────┘   │
│                                   │                                         │
│                          ┌────────▼──────────┐   ┌──────────────────────┐  │
│                          │   Redis Cache      │   │   Job Queue          │  │
│                          │   (Sessions,       │   │   (BullMQ / Redis)   │  │
│                          │    Leaderboards,   │   │   AI jobs, Notifs,   │  │
│                          │    Rate Limiting)  │   │   Analytics          │  │
│                          └────────────────────┘   └──────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                        AI Worker Service                             │  │
│  │              (Question Generation, Weakness Analysis,                │  │
│  │               Difficulty Estimation, Duplicate Detection)            │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
         │                    │                    │
┌────────▼──────┐   ┌─────────▼──────┐   ┌────────▼───────┐
│  AI Provider  │   │  Email Service │   │  Cloud Storage │
│  (External)   │   │  (External)    │   │  (External)    │
└───────────────┘   └────────────────┘   └────────────────┘
```

### Container Descriptions

| Container | Technology | Responsibility |
|---|---|---|
| Web Frontend | React, TypeScript, Vite | Student, teacher, and admin UI; served via CDN |
| REST API | Node.js, NestJS (or Express) | All business logic, authentication, data access |
| WebSocket Server | Node.js, Socket.io | Real-time match sessions; separate process |
| PostgreSQL | PostgreSQL 15+ | Primary data store; read replica for analytics |
| Redis | Redis 7+ | Session cache, rate limiting, leaderboard cache, job queue |
| Job Queue | BullMQ (Redis-backed) | AI processing, notifications, analytics events, report generation |
| AI Worker Service | Node.js | Consumes AI jobs; calls AI provider; writes results to DB |

---

## External Actors and Providers

| Actor/Provider | Direction | Purpose |
|---|---|---|
| AI Provider (OpenAI/Anthropic) | Outbound | Question generation, difficulty estimation, weakness analysis |
| Email Service (SendGrid/Postmark) | Outbound | Transactional emails: welcome, password reset, notifications |
| Cloud Storage (AWS S3/GCS) | Outbound | Document import storage, report export storage, static assets |
| CDN (CloudFront/Cloudflare) | Outbound | Frontend asset delivery |

---

## Key Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Architecture style | Modular monolith (Phase 1) | Reduces complexity for small team; clear module boundaries for future extraction |
| API style | REST (Phase 1), GraphQL layer (Phase 2) | REST is simpler for Phase 1; GraphQL added for flexible client queries in Phase 2 |
| Real-time | WebSocket (Socket.io) | Required for match synchronization; separate server for isolation |
| Database | PostgreSQL | Relational model fits structured learning data; strong ACID guarantees |
| Cache | Redis | Session management, rate limiting, leaderboard caching, job queue |
| Job queue | BullMQ | Redis-backed, reliable, supports retries and dead-letter queues |
| Frontend | React SPA | Component-based, large ecosystem, good accessibility tooling |
| Auth | JWT + refresh tokens | Stateless API scaling; short-lived access tokens for security |

---

## Quality Attribute Priorities

1. Security (student data, especially minors)
2. Reliability (match integrity, learning progress persistence)
3. Performance (real-time match latency, dashboard load time)
4. Scalability (100,000 concurrent students)
5. Maintainability (module boundaries, documentation, test coverage)
6. Accessibility (WCAG 2.1 AA)

---

*See `Component-Architecture.md` for C4 Level 3 breakdown and `Deployment-Operations.md` for infrastructure topology.*
