# Compliance Requirements — MathQuest

**Version:** 1.0.0
**Note:** This document is a technical compliance reference. It does not constitute legal advice. Legal review is required before launch.

---

## COPPA (Children's Online Privacy Protection Act — US)

**Applicability:** All students under 13 on the platform.

| Requirement | Implementation |
|---|---|
| Parental consent before data collection | Age gate at registration; parental consent email flow; account activation blocked until consent received |
| Data minimization | Collect only: name, email (parent), grade, school. No behavioral advertising data. |
| No third-party data sharing | AI provider prompts anonymized; no student PII in AI requests |
| Parental access and deletion rights | Admin can export and delete student data on parental request |
| Clear privacy notice | Privacy policy written in plain language; linked at registration |

**Open Decision:** Confirm parental consent flow implementation with legal counsel before Beta launch. (See `01-product/Risks-Assumptions.md` OD-04)

---

## FERPA (Family Educational Rights and Privacy Act — US)

**Applicability:** All K–12 students in US schools.

| Requirement | Implementation |
|---|---|
| School controls student education records | School administrator manages all student accounts; no student data accessible without school authorization |
| No disclosure without consent | Student data not shared with third parties; AI provider DPA required |
| Parent/student access rights | Admin can export student data on request |
| Legitimate educational interest | Platform access restricted to enrolled students, their teachers, and school administrators |

---

## GDPR (General Data Protection Regulation — EU)

**Applicability:** All users in EU member states.

| Requirement | Implementation |
|---|---|
| Lawful basis for processing | Legitimate interest (education); contractual necessity (platform use) |
| Data minimization | Only necessary data collected per role |
| Right to erasure | Student data deletable within 30 days of request; soft delete with 30-day purge job |
| Data portability | Student data exportable in CSV format |
| Data residency | EU student data stored in EU-region infrastructure |
| DPA with processors | Data Processing Agreements required with AI provider, email provider, cloud provider |
| Privacy by design | Privacy controls built into architecture, not added post-launch |

**Open Decision:** Confirm EU data residency region and cloud provider before Phase 1 launch. (See `01-product/Risks-Assumptions.md` OD-06)

---

## Data Retention Policy

| Data Type | Retention Period | Deletion Method |
|---|---|---|
| Student learning records | Duration of enrollment + 1 year | Soft delete → hard delete after 30 days |
| Match history | 2 years | Soft delete → hard delete |
| Audit logs | 7 years | Archived to cold storage after 1 year |
| AI generation logs | 90 days | Hard delete |
| Session tokens | 30 days (refresh token expiry) | Automatic expiry |
| Parental consent records | Duration of student enrollment + 3 years | Archived |

---

## Compliance Architecture

See `03-architecture/Compliance-Architecture.md` for implementation details.

---

*Legal review required before Beta launch. See `01-product/Risks-Assumptions.md` for compliance risk register.*
