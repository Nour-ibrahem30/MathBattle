# Component Architecture — MathQuest

**Version:** 1.0.0

---

## C4 Level 3 — REST API Components

```
Diagram: REST API Internal Components

┌─────────────────────────────────────────────────────────────────────────────┐
│                              REST API                                       │
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Auth Module │  │ Learning     │  │  Question    │  │  Match       │   │
│  │              │  │  Module      │  │  Bank Module │  │  Module      │   │
│  │ - Register   │  │ - Paths      │  │ - CRUD       │  │ - Create     │   │
│  │ - Login      │  │ - Lessons    │  │ - Import     │  │ - History    │   │
│  │ - Refresh    │  │ - Progress   │  │ - Search     │  │ - Results    │   │
│  │ - Reset      │  │ - Assessment │  │ - Versioning │  │              │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                  │                  │           │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐   │
│  │  AI Module   │  │ Gamification │  │  Dashboard   │  │  Admin       │   │
│  │              │  │  Module      │  │  Module      │  │  Module      │   │
│  │ - Generate   │  │ - XP/Rank    │  │ - Student    │  │ - Users      │   │
│  │ - Analyze    │  │ - Achieve.   │  │ - Teacher    │  │ - School     │   │
│  │ - Recommend  │  │ - Missions   │  │ - Admin      │  │ - Reports    │   │
│  │ - Duplicate  │  │ - Streaks    │  │              │  │ - Audit      │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                  │                  │           │
│  ┌──────▼─────────────────▼──────────────────▼──────────────────▼───────┐  │
│  │                    Shared Services Layer                              │  │
│  │  - AuthGuard (JWT validation)    - RateLimiter (Redis)               │  │
│  │  - RBAC Guard                    - AuditLogger                       │  │
│  │  - ValidationPipe                - EventEmitter (internal events)    │  │
│  │  - ErrorHandler                  - CacheService (Redis)              │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│  ┌─────────────────────────────────▼──────────────────────────────────────┐ │
│  │                      Data Access Layer                                 │ │
│  │  - Repository pattern per entity                                       │ │
│  │  - Query builder (TypeORM / Prisma)                                    │ │
│  │  - Transaction management                                              │ │
│  │  - Soft delete enforcement                                             │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## C4 Level 3 — WebSocket Server Components

```
Diagram: WebSocket Server Components

┌─────────────────────────────────────────────────────────────────────────────┐
│                          WebSocket Server                                   │
│                                                                             │
│  ┌──────────────────────┐    ┌──────────────────────┐                      │
│  │  Connection Manager  │    │  Match Session Store │                      │
│  │  - Auth validation   │    │  - Active matches    │                      │
│  │  - Room management   │    │  - Player state      │                      │
│  │  - Reconnect logic   │    │  - Card queue        │                      │
│  └──────────┬───────────┘    └──────────┬───────────┘                      │
│             │                           │                                   │
│  ┌──────────▼───────────────────────────▼───────────┐                      │
│  │                  Match Engine                     │                      │
│  │  - Card distribution (weighted random)            │                      │
│  │  - Question delivery (server-authoritative)       │                      │
│  │  - Answer validation                              │                      │
│  │  - Score calculation (correct: +pts, wrong: -1)  │                      │
│  │  - Timer management (30s per card)                │                      │
│  │  - Anti-cheat event processing                    │                      │
│  │  - Forfeit logic                                  │                      │
│  └──────────────────────────────────────────────────┘                      │
│                                                                             │
│  ┌──────────────────────────────────────────────────┐                      │
│  │              Result Processor                     │                      │
│  │  - Final score calculation                        │                      │
│  │  - Winner determination                           │                      │
│  │  - XP/rank update event emission                  │                      │
│  │  - Match record persistence (via REST API call)   │                      │
│  └──────────────────────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## C4 Level 3 — AI Worker Components

```
Diagram: AI Worker Components

┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI Worker Service                                 │
│                                                                             │
│  ┌──────────────────────┐    ┌──────────────────────┐                      │
│  │  Job Consumer        │    │  Prompt Builder      │                      │
│  │  - generate_question │    │  - Template engine   │                      │
│  │  - analyze_weakness  │    │  - Parameter inject  │                      │
│  │  - estimate_difficulty│   │  - Safety filters    │                      │
│  │  - detect_duplicate  │    └──────────┬───────────┘                      │
│  └──────────┬───────────┘               │                                  │
│             │                           │                                   │
│  ┌──────────▼───────────────────────────▼───────────┐                      │
│  │              AI Provider Client                   │                      │
│  │  - Request/response handling                      │                      │
│  │  - Token budget enforcement                       │                      │
│  │  - Retry logic (3 attempts, exponential backoff)  │                      │
│  │  - Timeout handling (30s)                         │                      │
│  │  - Response parsing and validation                │                      │
│  └──────────────────────────────────────────────────┘                      │
│                                                                             │
│  ┌──────────────────────┐    ┌──────────────────────┐                      │
│  │  Duplicate Detector  │    │  Difficulty Estimator│                      │
│  │  - Semantic similarity│   │  - Bloom's level     │                      │
│  │  - Exact match check │    │  - Complexity scoring│                      │
│  │  - Threshold config  │    │  - Grade calibration │                      │
│  └──────────────────────┘    └──────────────────────┘                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Frontend Component Architecture

```
Diagram: React Frontend Component Tree (High Level)

App
├── AuthProvider (JWT context, refresh logic)
├── Router
│   ├── PublicRoutes
│   │   ├── LoginPage
│   │   ├── RegisterPage
│   │   └── PasswordResetPage
│   └── ProtectedRoutes (role-based)
│       ├── StudentLayout
│       │   ├── StudentDashboard
│       │   ├── LearningPathView
│       │   ├── LessonView
│       │   ├── MatchLobby
│       │   ├── MatchArena (WebSocket)
│       │   ├── AchievementsView
│       │   └── ProfileView
│       ├── TeacherLayout
│       │   ├── TeacherDashboard
│       │   ├── ClassManagement
│       │   ├── AssignmentBuilder
│       │   ├── QuestionBankView
│       │   ├── AIGenerationPanel
│       │   └── ReportsView
│       └── AdminLayout
│           ├── AdminDashboard
│           ├── UserManagement
│           ├── SchoolConfiguration
│           └── ReportsView
└── SharedComponents
    ├── NotificationCenter
    ├── ErrorBoundary
    ├── LoadingSpinner
    └── ToastNotifications
```

---

## Module Boundaries and Code Ownership

| Module | Owns | Does Not Own |
|---|---|---|
| Auth Module | User identity, tokens, sessions | User profile data (owned by respective profile modules) |
| Learning Module | Learning paths, lessons, progress, enrollments | Question content (owned by Question Bank) |
| Question Bank Module | Question CRUD, versioning, import, tagging | Question delivery in lessons (owned by Learning Module) |
| AI Module | Generation, analysis, recommendations | Question storage (writes via Question Bank module) |
| Match Module | Match sessions, scoring, history | Question selection (reads from Question Bank) |
| Gamification Module | XP, ranks, achievements, missions, streaks | Match results (reads events from Match Module) |
| Dashboard Module | Aggregated views | Source data (reads from all other modules) |
| Admin Module | User management, school config, reports | Learning content (read-only access) |

---

## Repository and Module Structure

```
src/
  modules/
    auth/
    learning/
    questions/
    ai/
    matches/
    gamification/
    dashboard/
    admin/
    notifications/
  shared/
    guards/
    pipes/
    filters/
    decorators/
    utils/
  database/
    migrations/
    seeds/
  config/
  main.ts
```

---

*See `System-Architecture.md` for C4 Level 1 and 2 and `API-Design.md` for endpoint specifications.*
