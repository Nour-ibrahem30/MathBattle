# AI Team Routing — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines how to route tasks to specialized AI agents (or human specialists) based on domain.

---

## Agent Roles

| Agent Role | Scope | Required Reading |
|---|---|---|
| Backend Agent | NestJS API, services, migrations | ERD, API-Design, Auth-Security, FRS-Detailed |
| Frontend Agent | React SPA, components, pages | UX-Flows, Information-Architecture, Accessibility-Review |
| Match Agent | WebSocket server, match engine, anti-cheat | Component-Architecture, Caching-Strategy, Auth-Security |
| AI/ML Agent | AI worker, prompts, import pipeline | AI-Architecture, Compliance-Architecture, Queue-and-Jobs |
| DevOps Agent | CI/CD, Docker, deployment, env config | Deployment-Operations, Environment-Variables |
| QA Agent | Tests, acceptance criteria verification | Testing-Strategy, Acceptance-Criteria, FRS-Detailed |
| Security Agent | Auth, RBAC, threat mitigation | Threat-Model, Security-Architecture, Auth-Security |

---

## Routing Rules

| Task Pattern | Route To | Escalate If |
|---|---|---|
| New REST endpoint | Backend Agent | Touches auth or cross-module events |
| Database migration | Backend Agent | Affects user PII or match data |
| React page/component | Frontend Agent | Real-time WebSocket UI |
| Match logic change | Match Agent | Always pair with QA Agent |
| AI prompt/provider change | AI/ML Agent | Always pair with Security Agent |
| GitHub Actions / deploy | DevOps Agent | Production config change |
| Test writing | QA Agent | High-risk module |
| Security audit | Security Agent | Any finding rated critical |

---

## Multi-Agent Coordination

### Example: Implement Match Feature
```
1. Match Agent → WebSocket server + match engine
2. Backend Agent → Match REST endpoints (history, create)
3. Frontend Agent → Match lobby + arena UI
4. QA Agent → Integration tests for match flow
5. Security Agent → Review anti-cheat + auth on WS connect
```

### Handoff Protocol
- Each agent outputs: files changed, tests added, open questions
- Next agent reads previous handoff before starting
- Conflicts resolved by referencing canonical docs (ERD, openapi.yaml)

---

## High-Risk Gate

Changes to these areas require **Security Agent review** before merge:
- JWT / refresh token logic
- WebSocket authentication
- AI question import verification
- Anti-cheat detection
- school_id query scoping
- Parental consent flow

---

## Human Escalation

Escalate to human tech lead when:
- Architectural decision not covered by ADRs
- Conflicting requirements in docs
- Security finding rated critical
- External vendor/API contract change needed

---

*See `ai/AI-Agent-Runbook.md` for commands and `ai/AI-Context-Index.md` for doc mapping.*
