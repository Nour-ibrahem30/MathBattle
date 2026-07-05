# Team Workflow — MathBattle Engineering

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Overview

Daily workflow for the MathBattle engineering team: planning, development, review, and release.

---

## Ceremonies

| Ceremony | Frequency | Duration | Participants |
|---|---|---|---|
| Standup | Daily | 15 min | Engineering team |
| Sprint Planning | Bi-weekly (Monday) | 1 hour | Engineering + PM |
| Backlog Refinement | Weekly (Wednesday) | 45 min | Engineering + PM |
| Demo / Review | Bi-weekly (Friday) | 30 min | Engineering + PM + Stakeholders |
| Retro | Bi-weekly | 30 min | Engineering |

---

## Sprint Cycle (2 Weeks)

```
Week 1                          Week 2
Mon: Planning                   Mon: Development continues
Tue–Fri: Development            Tue–Thu: Development + PR reviews
                                Fri: Demo, Retro, Release prep
```

---

## Ticket Lifecycle

```
Backlog → Ready → In Progress → In Review → QA → Done
```

| State | Owner | Exit Criteria |
|---|---|---|
| Backlog | PM | Prioritized, not yet refined |
| Ready | PM + Eng | AC written, estimated, no blockers |
| In Progress | Engineer | Branch created, work started |
| In Review | Engineer | PR open, CI passing |
| QA | QA / Engineer | Staging verified against AC |
| Done | — | Merged, deployed to staging, DoD met |

---

## Development Flow

1. Pick ticket from **Ready** column (Linear/Jira)
2. Create branch: `feature/MB-XXX-short-description`
3. Develop with tests; commit frequently
4. Self-review diff; run `npm run lint && npm run test`
5. Open PR using template; assign reviewer
6. Address review feedback within 1 business day
7. Squash merge after approval + green CI
8. Verify on staging; move ticket to Done

---

## Code Review SLA

| Priority | First Review Within |
|---|---|
| Normal | 4 business hours |
| High (blocker) | 1 business hour |
| Hotfix | 30 minutes |

---

## Environments

| Environment | Branch Trigger | Purpose |
|---|---|---|
| Local | Developer machine | Development |
| Staging | Merge to `main` | QA, demos, integration tests |
| Production | Tagged release | Live users |

---

## Communication Channels

| Channel | Use |
|---|---|
| `#engineering` | General dev discussion |
| `#alerts` | Automated CI/monitoring alerts |
| `#releases` | Release announcements and coordination |
| PR comments | Code-specific feedback |
| Linear/Jira | Ticket status and AC |

---

## On-Call (Post-MVP)

- Primary on-call: rotates weekly
- Escalation: Tech Lead → Engineering Manager
- Incident response: see `Incident-Response-Playbook.md`

---

*See `Git-Branching-Strategy.md`, `Pull-Request-Template.md`, and `Definition-of-Done.md`.*
