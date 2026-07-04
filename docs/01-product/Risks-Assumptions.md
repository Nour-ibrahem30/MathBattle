# Risks and Assumptions — MathQuest

**Version:** 1.0.0

---

## Assumptions

| ID | Assumption | Impact if Wrong | Mitigation |
|---|---|---|---|
| A-01 | Schools provide device access for all students (BYOD or school-issued) | Students cannot access platform | Design for low-end devices; provide offline-capable PWA in Phase 2 |
| A-02 | Teachers have basic digital literacy | Low adoption, high support burden | Guided onboarding wizard, in-app tooltips, video walkthroughs |
| A-03 | AI provider (OpenAI/Anthropic/equivalent) is selected before Phase 1 development | AI module cannot be built | Confirm provider selection as Phase 1 prerequisite |
| A-04 | Curriculum alignment is based on a generalized K–12 mathematics framework | Questions misaligned with specific national curricula | Design question metadata to support curriculum mapping; add specific frameworks in Phase 2 |
| A-05 | Institutional billing is handled externally; no in-platform payment processing | Revenue collection blocked | Confirm billing model before Beta launch |
| A-06 | Student age data is available at account creation | COPPA compliance cannot be enforced | Require date of birth or grade level at registration; enforce parental consent flow for under-13 |
| A-07 | Schools will designate a platform administrator | No one manages user accounts | Include admin onboarding in institutional sales process |
| A-08 | Match opponents are always from the same school | Cross-school matching raises privacy concerns | Restrict matching to same school in Phase 1; design for opt-in cross-school in Phase 2 |

---

## Risk Register

### Technical Risks

| ID | Risk | Probability | Impact | Severity | Mitigation |
|---|---|---|---|---|---|
| R-T01 | AI-generated question quality below acceptable threshold | High | High | Critical | Mandatory teacher review gate before any AI question is used in class; quality scoring in AI pipeline |
| R-T02 | Match synchronization failures causing unfair outcomes | Medium | High | High | WebSocket with reconnect logic; server-authoritative scoring; forfeit rules |
| R-T03 | Database performance degradation at scale | Medium | High | High | Indexing strategy, read replicas, Redis caching, load testing before launch |
| R-T04 | AI provider outage or rate limiting | Medium | Medium | Medium | Graceful degradation: disable AI features, show manual fallback; provider SLA review |
| R-T05 | Document import (PDF/Word) parsing failures | High | Medium | Medium | Validation pipeline with error reporting; manual correction UI |
| R-T06 | Browser focus detection false positives | Medium | High | High | Configurable sensitivity; teacher override; warning before forfeit |
| R-T07 | Session token compromise | Low | Critical | High | Short-lived JWT, refresh token rotation, device fingerprinting |

### Product Risks

| ID | Risk | Probability | Impact | Severity | Mitigation |
|---|---|---|---|---|---|
| R-P01 | Low teacher adoption due to onboarding friction | Medium | High | High | Guided onboarding, AI-first question creation, minimal-click dashboard |
| R-P02 | Gamification mechanics distract from learning | Medium | High | High | Gamification restricted to in-activity contexts; education-first design review gate |
| R-P03 | Match fairness perceived as unfair by students | Medium | Medium | Medium | Transparent scoring display; grade-level matching; difficulty calibration |
| R-P04 | Students game the achievement system without learning | Medium | High | High | Achievements tied to correct answers and lesson completion, not attempts |
| R-P05 | Curriculum misalignment reduces teacher trust | Medium | High | High | Teacher review required; curriculum mapping metadata; teacher feedback loop |

### Privacy and Compliance Risks

| ID | Risk | Probability | Impact | Severity | Mitigation |
|---|---|---|---|---|---|
| R-C01 | Student data breach (minors) | Low | Critical | Critical | Privacy-by-design architecture; encryption at rest and in transit; legal review before launch |
| R-C02 | COPPA non-compliance for under-13 students | Medium | Critical | Critical | Age gate at registration; parental consent flow; legal review |
| R-C03 | GDPR non-compliance for EU students | Medium | High | High | Data residency controls; right-to-erasure implementation; DPA agreements with providers |
| R-C04 | AI provider retains student data | Medium | High | High | Review AI provider data retention policies; use anonymized prompts where possible |

### Business Risks

| ID | Risk | Probability | Impact | Severity | Mitigation |
|---|---|---|---|---|---|
| R-B01 | Low institutional sales velocity | Medium | High | High | Focus on pilot schools; measure and publish learning outcomes |
| R-B02 | Competitor launches similar product | Medium | Medium | Medium | Accelerate AI differentiation; build teacher loyalty through time-saving tools |
| R-B03 | Key engineering team member departure | Low | High | Medium | Documentation-first culture; knowledge sharing; bus factor review |
| R-B04 | AI provider pricing increase | Medium | Medium | Medium | Monitor usage costs; implement token budgets; design for provider switching |

---

## Open Decisions

| ID | Decision Needed | Owner | Deadline |
|---|---|---|---|
| OD-01 | Confirm AI provider (OpenAI, Anthropic, or other) | CTO | Before Phase 1 sprint 1 |
| OD-02 | Confirm target national curriculum framework(s) for Phase 1 | Product | Before Phase 1 sprint 2 |
| OD-03 | Confirm legal review of privacy policy for minors | Legal | Before Beta launch |
| OD-04 | Confirm parental consent flow requirements for under-13 | Legal + Product | Before Beta launch |
| OD-05 | Confirm browser focus detection method and legal acceptability per jurisdiction | Legal + Engineering | Before Phase 1 launch |
| OD-06 | Confirm data residency requirements for target markets | Legal + DevOps | Before Phase 1 launch |
| OD-07 | Confirm institutional billing model and invoicing process | Business | Before Beta launch |

---

*See `03-architecture/Threat-Model.md` for security-specific risk analysis and `05-project-plan/Delivery-Risks.md` for delivery-specific risks.*
