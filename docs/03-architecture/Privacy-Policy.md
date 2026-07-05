# Privacy Policy — MathBattle (Technical Summary)

**Version:** 1.0.0  
**Status:** Draft — Legal Review Required

---

## Purpose

Technical privacy architecture summary for engineering. The user-facing privacy policy will be published separately after legal review.

---

## Data We Collect

| Data | Purpose | Legal Basis | PII |
|---|---|---|---|
| Email, name | Account identity | Contract / Consent (COPPA) | Yes |
| Date of birth | Age verification (COPPA) | Legal obligation | Yes |
| Grade, school | Learning path assignment | Contract | No |
| Lesson answers | Learning progress | Contract | No |
| Match results | Gamification | Contract | No |
| IP address (hashed) | Security, audit | Legitimate interest | Partial |
| Usage analytics | Product improvement | Legitimate interest | No (anonymized) |

---

## Data We Do NOT Collect

- Precise geolocation
- Social media profiles
- Biometric data
- Advertising identifiers
- Third-party tracking cookies (Phase 1)

---

## Children's Privacy (COPPA)

- Users under 13 require verifiable parental consent before account activation
- Consent flow: parent email → secure token link → explicit approval
- Parents can review, export, or delete child's data via support request
- No behavioral advertising to minors
- AI services receive no child PII

---

## Data Sharing

| Recipient | Data Shared | Purpose |
|---|---|---|
| AI Provider | Grade, subject, topic (anonymized) | Question generation |
| Email Provider | Recipient email, template content | Transactional email |
| Cloud Provider (AWS) | All stored data (encrypted) | Infrastructure |
| No other third parties | — | — |

We do not sell student data.

---

## Security Measures

- TLS 1.2+ in transit
- AES-256 encryption at rest
- RBAC access controls
- Audit logging
- Regular security assessments

See `Security-Architecture.md`.

---

## User Rights (GDPR / COPPA)

| Right | Implementation |
|---|---|
| Access | Export endpoint (Phase 2); support request (Phase 1) |
| Rectification | Profile edit in app |
| Erasure | Account deletion flow + 30-day grace |
| Portability | JSON export (Phase 2) |
| Objection | Opt-out of non-essential analytics |
| Parental rights | Consent management, deletion on request |

---

## Data Retention

See `Data-Retention-Policy.md` for full schedule.

---

## Contact

- Privacy inquiries: privacy@mathbattle.io
- Data Protection Officer: TBD (required before EU launch)

---

**Note:** This document is an engineering reference. Publish the legal privacy policy on the marketing site before public launch.
