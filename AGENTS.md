# AI and Developer Operations Guide — MathBattle

This document defines the working standards, collaboration rules, and development practices for both human developers and AI agents working on the MathBattle codebase.

---

## 1. AI Engagement Rules

### 1.1 Context Management
- **Scan first:** Always scan `docs/README.md` and follow the recommended reading order before making architectural or functional decisions.
- **Reference by Symbol:** When discussing classes, functions, files, or components, always provide standard Markdown file links (`file:///...`) or symbol anchors.
- **Incremental changes:** Prefer small, contiguous modifications via targeted file-replacement tools over replacing entire files.

### 1.2 Non-Destructive Modding
- **Keep docstrings:** Do not delete or rewrite docstrings, comments, or documentation that are unrelated to your current task.
- **No placeholders:** Do not introduce empty functions, `// TODO` blocks, or partial code blocks unless explicitly requested. All code must be complete and syntactically valid.

---

## 2. Secrets and Security Policy

- **Environment variables:** Never check in real secrets, API keys, or certificates. Write them only to a local `.env` file (which is git-ignored).
- **Safe placeholders:** Only write safe, generic placeholder values in `.env.example`.
- **Minors' Privacy:** MathBattle is a K-12 educational platform. PII (Personally Identifiable Information) must never be logged, printed to console, or passed to external AI services without encryption or explicit anonymization.

---

## 3. High-Risk Flows

Always request extra reviews or use rigorous test coverage when modifying:
- **WebSocket Match Server:** Synchronization of 1v1 matches, state recovery, and socket connections.
- **Anti-Cheat (Browser Focus):** Timing, detection logic, and warnings sent via Socket.io.
- **AI Question Generation/Import:** Verification gates before questions enter the main published question bank.
- **JWT Authentication & RBAC:** Access token validation, refresh token rotation, and endpoint authorization checks.

---

## 4. Engineering Standards

- **Definition of Done:** Any task is complete only when unit tests cover success/failure paths, ESLint/Prettier runs cleanly, and OpenAPI contracts match the backend routes.
- **Migration policy:** Every database schema change must be written as a Knex/Prisma migration script. Do not modify the database manually.
- **Branching strategy:** Work on short-lived feature branches (`feature/name` or `bugfix/name`). Submit PRs targeting the `main` branch.
