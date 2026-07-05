# Architecture Diagrams — MathBattle

This directory contains the Mermaid source code files for the architectural and behavioral diagrams of the MathBattle platform.

## Diagram Catalog

### 1. System Architecture
- **[C4 Level 1 — System Context](file:///I:/MathBattle/docs/03-architecture/diagrams/c4-l1-system-context.mmd):** The external actors (students, teachers, admins) and external systems interacting with MathBattle.
- **[C4 Level 2 — Containers](file:///I:/MathBattle/docs/03-architecture/diagrams/c4-l2-containers.mmd):** The logical container components (API, Frontend, WebSockets, Redis, PostgreSQL, Worker, etc.) that make up the platform.
- **[C4 Level 3 — Components](file:///I:/MathBattle/docs/03-architecture/diagrams/c4-l3-components.mmd):** Internal software component structure (Controllers, Services, Repositories).

### 2. Information and Data Flows
- **[Data Flow Diagram (DFD) Level 0](file:///I:/MathBattle/docs/03-architecture/diagrams/dfd-l0-context.mmd):** External interface boundaries.
- **[Data Flow Diagram (DFD) Level 1](file:///I:/MathBattle/docs/03-architecture/diagrams/dfd-l1-platform.mmd):** Platform-level data routing.
- **[Data Flow Diagram (DFD) Level 2](file:///I:/MathBattle/docs/03-architecture/diagrams/dfd-l2-core-flow.mmd):** Detailed data flow for a 1v1 match.

### 3. Core Behaviors
- **[Authentication Flow](file:///I:/MathBattle/docs/03-architecture/diagrams/auth-flow.mmd):** JWT authorization and refresh token rotation sequence.
- **[Main User Flow](file:///I:/MathBattle/docs/03-architecture/diagrams/main-user-flow.mmd):** End-to-end student onboarding, lesson completion, and match setup.
- **[Webhook Processing Flow](file:///I:/MathBattle/docs/03-architecture/diagrams/webhook-processing-flow.mmd):** Validation, queueing, and idempotency logic for inbound hooks.
- **[Payment Flow](file:///I:/MathBattle/docs/03-architecture/diagrams/payment-flow.mmd):** Stripe checkout and webhook processing (Phase 3).
- **[Deployment Topology](file:///I:/MathBattle/docs/03-architecture/diagrams/deployment-topology.mmd):** AWS/Cloud hosting deployment target map.

## Rendering Instructions

Mermaid diagrams can be viewed natively in:
- VS Code using the **Mermaid Preview** or **Markdown Preview Enhanced** extensions.
- GitHub's markdown view (if committed).
- The Mermaid Live Editor at [mermaid.live](https://mermaid.live).
