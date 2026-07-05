# Compliance Architecture — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Maps regulatory requirements to architectural controls for COPPA, FERPA, and GDPR.

---

## Regulatory Scope

| Regulation | Applies When | Primary Concern |
|---|---|---|
| COPPA (US) | Users under 13 | Parental consent, data minimization |
| FERPA (US) | US school deployments | Education record protection |
| GDPR (EU) | EU users/schools | Consent, erasure, portability |
| WCAG 2.1 AA | All users | Accessibility compliance |

---

## Control Matrix

| Requirement | Regulation | Architectural Control | Document |
|---|---|---|---|
| Parental consent for under-13 | COPPA | `parental_consents` table; account locked until consent | Auth-Security.md |
| No PII to AI | COPPA/GDPR | Anonymized prompts only | AI-Architecture.md |
| Education record access control | FERPA | School-scoped RBAC; teacher sees own classes only | Auth-Security.md |
| Audit trail | FERPA | Immutable `audit_logs` with 7-year retention | Audit-Logging-Strategy.md |
| Data minimization | GDPR Art. 5 | Collect only required fields | Data-Dictionary.md |
| Right to erasure | GDPR Art. 17 | Soft delete + 30-day hard delete job | Data-Retention-Policy.md |
| Encryption at rest | GDPR Art. 32 | AES-256 RDS + S3 | Security-Architecture.md |
| Breach notification | GDPR Art. 33 | Incident response playbook; 72-hour process | Incident-Response-Playbook.md |
| Accessibility | ADA/WCAG | WCAG 2.1 AA in frontend | Accessibility-Review.md |
| Data Processing Agreement | GDPR Art. 28 | DPA with AI, email, cloud vendors | Vendor-Risk-Register.md |

---

## School Data Isolation

```
School A data ──► school_id filter on all queries ──► Cannot access School B
```

- Every query scoped by `school_id` from JWT claims
- Platform operators bypass for support (audited)
- Cross-school matchmaking: same grade only within school (Phase 1)

---

## COPPA Consent Flow

```
Student registers (age < 13)
    → status = pending_parental_consent
    → No JWT issued
    → Email to parent with consent link
    → Parent clicks link, confirms
    → status = active
    → Student can log in
```

Token expires after 7 days; re-send available.

---

## FERPA Alignment

- Teachers access only their class roster and assigned students' progress
- Admins access school-wide aggregates, not individual answers from other teachers' classes without permission
- Audit logs track all access to student education records
- Third parties (AI) do not receive education records

---

## GDPR Data Subject Requests

| Request | Phase 1 | Phase 2 |
|---|---|---|
| Access (export) | Manual via support | Self-service JSON export |
| Erasure | Manual via support + automated job | Self-service delete account |
| Rectification | Profile edit in app | Same |
| Portability | Manual | Automated export |

Response SLA: 30 days (GDPR requirement).

---

## Compliance Testing

| Test | Frequency |
|---|---|
| COPPA consent flow E2E | Every release |
| RBAC school isolation | Every PR touching auth/queries |
| PII log scan | Pre-launch + quarterly |
| Accessibility audit | Pre-launch + major UI releases |
| Vendor DPA review | Annually |

---

*See `Compliance-Requirements.md` in requirements folder and `Privacy-Policy.md` for user-facing details.*
