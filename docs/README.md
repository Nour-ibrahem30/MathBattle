# MathBattle — Documentation Index

MathBattle is an AI-powered educational SaaS web platform that uses gamification to improve mathematics learning for students in grades K–12. This documentation package is enterprise-grade and implementation-ready.

---

## Folder Structure

| Folder / File | Contents |
|---|---|
| `01-product/` | Executive Summary, Product Vision, PRD, Scope, Personas, User Journeys, Success Metrics, Risks & Assumptions, Roadmap, Market Context, Stakeholder Map |
| `02-requirements/` | BRS, FRS (short + detailed), NFR (short + detailed), User Stories, Acceptance Criteria, RTM, Glossary, Compliance Requirements, SLOs |
| `03-architecture/` | System Architecture, Component Architecture, Domain Model, API Design, Error Handling, Auth & Security, Security Architecture, Threat Model, Data Architecture, ERD, Data Dictionary, DFD, Indexing Strategy, Migration Plan, Integration Architecture, Third-Party Integrations, Webhook Strategy, Queue & Jobs, Caching Strategy, Testing Strategy, Deployment Operations, Deployment Checklist, Monitoring & Alerting, Backup & Recovery, Incident Response, Privacy Policy, Audit Logging, Data Retention, Vendor Risk Register, Compliance Architecture, ADR/ |
| `03-architecture/diagrams/` | Mermaid source files for all architecture and flow diagrams |
| `03-architecture/openapi/` | OpenAPI 3.1 specification skeleton |
| `04-ux-and-flows/` | Information Architecture, Low/Medium/High Fidelity Wireframes, UX Flows, Use Case Diagrams, Admin Flows, Empty/Loading/Error States, Accessibility Review |
| `05-project-plan/` | Project Plan, Milestones, Delivery Risks, Backlog, Release Plan, Release Governance |
| `06-engineering/` | Onboarding Guide, Team Workflow, Git Branching Strategy, Code Review Checklist, Definition of Done, PR Template, Local Development, Environment Variables, Incident Postmortem Template |
| `ai/` | AI Agent Rules, Runbook, Context Index, Team Routing, Implementation Backlog, Phase Prompts, Definition of Done |
| `logs/` | ACTIVITY.md, WORKLOG.md |

---

## Recommended Reading Order

### For Stakeholders and Product Owners
1. `01-product/Executive-Summary.md`
2. `01-product/Product-Vision.md`
3. `01-product/PRD.md`
4. `01-product/Roadmap.md`

### For Architects and Tech Leads
1. `03-architecture/System-Architecture.md`
2. `03-architecture/Component-Architecture.md`
3. `03-architecture/Domain-Model.md`
4. `03-architecture/API-Design.md`
5. `03-architecture/ERD.md`
6. `03-architecture/AI-Architecture.md`

### For Engineers
1. `06-engineering/Onboarding-Guide.md`
2. `02-requirements/FRS-Detailed.md`
3. `03-architecture/API-Design.md`
4. `03-architecture/Data-Dictionary.md`
5. `03-architecture/openapi/openapi.yaml`

### For QA and Security
1. `03-architecture/Testing-Strategy.md`
2. `03-architecture/Threat-Model.md`
3. `03-architecture/Auth-Security.md`
4. `02-requirements/Acceptance-Criteria.md`

### For AI Agents
1. `ai/README.md`
2. `ai/AI-Agent-Rules.md`
3. `ai/AI-Context-Index.md`
4. `ai/AI-Team-Routing.md`

---

## Canonical Files

- **Single source of truth for data model:** `03-architecture/ERD.md` + `03-architecture/Data-Dictionary.md`
- **Single source of truth for API contracts:** `03-architecture/openapi/openapi.yaml`
- **Single source of truth for requirements:** `02-requirements/FRS-Detailed.md`
- **Single source of truth for security rules:** `03-architecture/Auth-Security.md` + `03-architecture/Threat-Model.md`

---

## Audience Guidance

- Non-technical stakeholders: read `01-product/` only.
- Product managers: read `01-product/` and `02-requirements/`.
- Engineers: read `06-engineering/Onboarding-Guide.md` first, then follow the reading order above.
- AI agents: always start with `ai/README.md`.

---

*Documentation version: 1.0.0 — MathBattle Enterprise Pack*
