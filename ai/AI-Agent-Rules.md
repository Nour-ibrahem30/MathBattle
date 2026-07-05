# AI Agent Rules — MathBattle

These rules govern code generation, refactoring, and general updates to the MathBattle codebase.

---

## 1. Code Standards

### 1.1 Backend (NestJS / Node.js)
- **TypeScript:** Strict type checking is required. Do not use `any` unless absolutely necessary, and if so, document why.
- **REST standards:** All routes must implement the response envelopes and error types defined in [API-Design.md](file:///I:/MathBattle/docs/03-architecture/API-Design.md) and [openapi.yaml](file:///I:/MathBattle/docs/03-architecture/openapi/openapi.yaml).
- **Dependency injection:** Always use standard constructor injection in NestJS controllers and services.

### 1.2 Frontend (React SPA)
- **TypeScript & Vite:** Use functional components and hooks. Maintain proper type signatures for all components.
- **Styling:** Use Vanilla CSS. Respect the visual guidelines (vibrant colors, clean accessibility ratios).

---

## 2. Database & Data Model Rules

- **Database Entity Name:** Use the entity definitions in [ERD.md](file:///I:/MathBattle/docs/03-architecture/ERD.md) exactly.
- **Migrations:** Never modify the database schema directly. Always generate schema migrations.
- **Query performance:** Verify queries use indices on columns like `user_id`, `school_id`, `match_id`, and `grade`.

---

## 3. Security & Safety Gates

- **JWT/RBAC Enforcement:** Ensure every controller endpoint checks JWT authorization and verifies the user's role against [Auth-Security.md](file:///I:/MathBattle/docs/03-architecture/Auth-Security.md).
- **COPPA/FERPA Compliance:** PII (names, emails, ages) must not leak to logs or third-party AI requests.
- **Mocking AI Providers:** In local/development modes, always route AI tasks to the local mock generation engine.
