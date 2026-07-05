# Git Branching Strategy — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Model

MathBattle uses **trunk-based development** with short-lived feature branches merging to `main`.

```
main ─────●─────●─────●─────●─────► (always deployable)
           \   /       \   /
            ● ●         ● ●
         feature/*   bugfix/*
```

---

## Branch Types

| Prefix | Purpose | Lifetime | Merge Target |
|---|---|---|---|
| `main` | Production-ready trunk | Permanent | — |
| `feature/<ticket>-<slug>` | New functionality | ≤ 3 days | `main` |
| `bugfix/<ticket>-<slug>` | Non-urgent fixes | ≤ 2 days | `main` |
| `hotfix/<ticket>-<slug>` | Production emergencies | Hours | `main` (+ tag) |
| `release/<version>` | Release stabilization (optional) | ≤ 1 week | `main` |

### Naming Examples
- `feature/MB-142-match-reconnect`
- `bugfix/MB-201-login-rate-limit`
- `hotfix/MB-305-jwt-expiry`

---

## Workflow

1. Create branch from latest `main`: `git checkout -b feature/MB-142-match-reconnect`
2. Commit frequently with conventional messages (see below)
3. Open PR when ready; link Linear/Jira ticket
4. Require 1 approval (2 for high-risk: auth, WebSocket, AI import)
5. Squash merge to `main` after CI passes
6. Delete branch after merge

---

## Commit Message Format

```
<type>(<scope>): <short description>

[optional body]

Refs: MB-142
```

| Type | Use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change, no behavior change |
| `test` | Tests only |
| `chore` | Build, deps, tooling |

---

## Protected Branch Rules (`main`)

- Direct pushes blocked
- PR required with passing CI (lint, unit tests, integration tests)
- No force push
- Branch must be up to date before merge

---

## High-Risk Change Policy

Changes touching these areas require **2 reviewers** and integration test evidence:
- WebSocket match server
- JWT / RBAC / refresh token rotation
- AI question import verification gates
- Anti-cheat detection logic
- Database migrations affecting user data

---

## Release Tagging

Production releases are tagged on `main`:
```
v1.0.0-mvp
v1.1.0-beta
```

Tags follow [Semantic Versioning](https://semver.org/).

---

*See `Team-Workflow.md` for day-to-day process and `Pull-Request-Template.md` for PR checklist.*
