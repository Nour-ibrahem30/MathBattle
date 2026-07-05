# Data Flow Diagram — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Narrative companion to DFD Mermaid diagrams in `diagrams/`. Describes data movement between actors, processes, and stores.

---

## DFD Level 0 — Context

**Diagram:** `diagrams/dfd-l0-context.mmd`

| External Entity | Data Flows |
|---|---|
| Student | Login credentials → Platform; receives lessons, match updates, progress |
| Teacher | Questions, assignments → Platform; receives class analytics, AI drafts |
| Administrator | User management commands → Platform; receives school reports |
| AI Provider | Prompts → Provider; generated content → Platform |
| Email Service | Send requests → Provider; delivery status → Platform |
| Cloud Storage | Files → Storage; processed content → Platform |

---

## DFD Level 1 — Platform

**Diagram:** `diagrams/dfd-l1-platform.mmd`

| Process | Inputs | Outputs | Data Stores |
|---|---|---|---|
| 1.0 Authenticate | Credentials | JWT, session | users, refresh_tokens |
| 2.0 Manage Learning | Student actions | Progress, scores | learning_paths, lesson_attempts |
| 3.0 Manage Questions | Teacher content | Published questions | questions, question_versions |
| 4.0 Run Match | Player answers | Scores, events | matches, match_cards, match_events |
| 5.0 Gamify | Completion events | XP, achievements | xp_history, student_achievements |
| 6.0 Process AI Jobs | Generation requests | Draft questions | questions (draft) |
| 7.0 Notify | Domain events | In-app notifications | notifications |
| 8.0 Audit | All mutations | Audit records | audit_logs |

**Shared Stores:** PostgreSQL (primary), Redis (cache, match state, queues)

---

## DFD Level 2 — Match Flow

**Diagram:** `diagrams/dfd-l2-core-flow.mmd`

```
Student A ──invite──► Match Lobby ──pair──► Match Engine
Student B ──accept──►                    │
                                         ├──► Select 10 questions (Question Bank)
                                         ├──► Store state (Redis)
                                         ├──► Deliver cards (WebSocket)
                                         ├──► Validate answers (Match Engine)
                                         ├──► Track anti-cheat (Match Events)
                                         └──► Persist result (PostgreSQL)
                                                    │
                                                    ├──► Award XP (Gamification)
                                                    └──► Create notification
```

---

## Data Classification in Flows

| Flow | Contains PII | Encryption |
|---|---|---|
| Login | Yes (email) | TLS |
| Lesson answers | No | TLS |
| AI prompt | No | TLS |
| Email send | Yes (recipient) | TLS |
| Audit log | Partial (masked) | TLS + at-rest |
| Match events | No | TLS |

---

## Diagram Index

| File | Level | Focus |
|---|---|---|
| `dfd-l0-context.mmd` | 0 | System boundary |
| `dfd-l1-platform.mmd` | 1 | Internal processes |
| `dfd-l2-core-flow.mmd` | 2 | 1v1 match detail |

---

*See `Data-Architecture.md` for ownership rules and `diagrams/README.md` for all diagram sources.*
