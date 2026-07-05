# Architecture Documentation — MathBattle

**Version:** 1.0.0

---

## Purpose

Index of all architecture documents for MathBattle Phase 1.

---

## Core Architecture

| Document | Description |
|---|---|
| [System-Architecture.md](file:///I:/MathBattle/docs/03-architecture/System-Architecture.md) | C4 L1/L2, architecture style, key decisions |
| [Component-Architecture.md](file:///I:/MathBattle/docs/03-architecture/Component-Architecture.md) | C4 L3 module breakdown |
| [Domain-Model.md](file:///I:/MathBattle/docs/03-architecture/Domain-Model.md) | Bounded contexts, aggregates, domain events |
| [AI-Architecture.md](file:///I:/MathBattle/docs/03-architecture/AI-Architecture.md) | AI engine design |

---

## Data

| Document | Description |
|---|---|
| [ERD.md](file:///I:/MathBattle/docs/03-architecture/ERD.md) | Entity-relationship model (canonical schema) |
| [Data-Dictionary.md](file:///I:/MathBattle/docs/03-architecture/Data-Dictionary.md) | Column-level metadata and PII classification |
| [Data-Architecture.md](file:///I:/MathBattle/docs/03-architecture/Data-Architecture.md) | Data flow and ownership |
| [Data-Flow-Diagram.md](file:///I:/MathBattle/docs/03-architecture/Data-Flow-Diagram.md) | DFD narrative and diagram index |
| [Indexing-Strategy.md](file:///I:/MathBattle/docs/03-architecture/Indexing-Strategy.md) | Database indexes |
| [Migration-Plan.md](file:///I:/MathBattle/docs/03-architecture/Migration-Plan.md) | Schema migration strategy |
| [Caching-Strategy.md](file:///I:/MathBattle/docs/03-architecture/Caching-Strategy.md) | Redis caching patterns |

---

## API & Integration

| Document | Description |
|---|---|
| [API-Design.md](file:///I:/MathBattle/docs/03-architecture/API-Design.md) | REST standards and endpoint catalog |
| [openapi/openapi.yaml](file:///I:/MathBattle/docs/03-architecture/openapi/openapi.yaml) | OpenAPI 3.1 contract |
| [Integration-Architecture.md](file:///I:/MathBattle/docs/03-architecture/Integration-Architecture.md) | External system integration patterns |
| [Third-Party-Integrations.md](file:///I:/MathBattle/docs/03-architecture/Third-Party-Integrations.md) | Vendor registry |
| [Webhook-Strategy.md](file:///I:/MathBattle/docs/03-architecture/Webhook-Strategy.md) | Inbound/outbound webhook standards |
| [Queue-and-Jobs-Architecture.md](file:///I:/MathBattle/docs/03-architecture/Queue-and-Jobs-Architecture.md) | BullMQ job system |

---

## Security & Compliance

| Document | Description |
|---|---|
| [Auth-Security.md](file:///I:/MathBattle/docs/03-architecture/Auth-Security.md) | Auth flows and RBAC |
| [Security-Architecture.md](file:///I:/MathBattle/docs/03-architecture/Security-Architecture.md) | Defense-in-depth overview |
| [Threat-Model.md](file:///I:/MathBattle/docs/03-architecture/Threat-Model.md) | STRIDE analysis |
| [Compliance-Architecture.md](file:///I:/MathBattle/docs/03-architecture/Compliance-Architecture.md) | COPPA/FERPA/GDPR controls |
| [Privacy-Policy.md](file:///I:/MathBattle/docs/03-architecture/Privacy-Policy.md) | Privacy architecture summary |
| [Audit-Logging-Strategy.md](file:///I:/MathBattle/docs/03-architecture/Audit-Logging-Strategy.md) | Audit event catalog |
| [Data-Retention-Policy.md](file:///I:/MathBattle/docs/03-architecture/Data-Retention-Policy.md) | Retention and deletion |
| [Vendor-Risk-Register.md](file:///I:/MathBattle/docs/03-architecture/Vendor-Risk-Register.md) | Third-party risk tracking |

---

## Operations

| Document | Description |
|---|---|
| [Deployment-Operations.md](file:///I:/MathBattle/docs/03-architecture/Deployment-Operations.md) | Infrastructure topology |
| [Deployment-Checklist.md](file:///I:/MathBattle/docs/03-architecture/Deployment-Checklist.md) | Release checklist |
| [Monitoring-Alerting-Plan.md](file:///I:/MathBattle/docs/03-architecture/Monitoring-Alerting-Plan.md) | Observability |
| [Backup-Recovery-Plan.md](file:///I:/MathBattle/docs/03-architecture/Backup-Recovery-Plan.md) | DR procedures |
| [Incident-Response-Playbook.md](file:///I:/MathBattle/docs/03-architecture/Incident-Response-Playbook.md) | Incident handling |
| [Support-Operations-Runbook.md](file:///I:/MathBattle/docs/03-architecture/Support-Operations-Runbook.md) | Support procedures |
| [Testing-Strategy.md](file:///I:/MathBattle/docs/03-architecture/Testing-Strategy.md) | Test approach |
| [Error-Handling-Strategy.md](file:///I:/MathBattle/docs/03-architecture/Error-Handling-Strategy.md) | Error formats and handling |

---

## Diagrams & ADRs

| Resource | Description |
|---|---|
| [diagrams/](file:///I:/MathBattle/docs/03-architecture/diagrams/README.md) | Mermaid source files |
| [ADR/](file:///I:/MathBattle/docs/03-architecture/ADR/README.md) | Architecture Decision Records |

---

## Reading Order for New Architects

1. System-Architecture.md
2. Component-Architecture.md
3. Domain-Model.md
4. ERD.md
5. API-Design.md
6. Auth-Security.md
