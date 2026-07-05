# Data Retention Policy — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines how long MathBattle retains data by category, deletion procedures, and compliance alignment (COPPA, FERPA, GDPR).

---

## Retention Schedule

| Data Category | Retention Period | Deletion Method | Regulation |
|---|---|---|---|
| User accounts (active) | While account active | Soft delete on request | GDPR Art. 17 |
| User accounts (deleted) | 30 days post soft delete | Hard delete + anonymize references | GDPR |
| Student education records | Duration of enrollment + 1 year | Archive then delete | FERPA |
| Questions & versions | Indefinite | Never hard delete (archived) | — |
| Match records | 2 years | Hard delete | — |
| Lesson attempts | 2 years | Hard delete | FERPA |
| XP history | 2 years | Hard delete with profile | — |
| Audit logs | 7 years | Archive to cold storage at 1 year | FERPA/SOX-adjacent |
| Notifications (read) | 90 days | Hard delete | — |
| Notifications (unread) | 180 days | Hard delete | — |
| Refresh tokens | 30 days post expiry | Hard delete | — |
| Parental consent records | Until student turns 18 + 1 year | Hard delete | COPPA |
| Import files (S3) | 30 days post processing | S3 lifecycle rule | — |
| Application logs | 90 days | Log aggregator TTL | — |
| Analytics events | 13 months | Aggregated; raw deleted | GDPR |
| Backup snapshots | 30 days rolling | Automated rotation | — |

---

## Deletion Procedures

### User-Requested Deletion (GDPR Right to Erasure)

1. Verify identity of requestor (account owner or verified parent/guardian)
2. Soft delete user record (`deleted_at = now()`)
3. Revoke all refresh tokens immediately
4. After 30-day grace period:
   - Hard delete user, profile, and PII fields
   - Anonymize references in audit logs (`user_id → NULL, action retained`)
   - Retain anonymized lesson/match statistics for aggregate analytics

### Automated Cleanup Jobs

| Job | Schedule | Action |
|---|---|---|
| `cleanup_expired_tokens` | Daily | Delete expired refresh tokens |
| `cleanup_read_notifications` | Daily | Delete read notifications > 90 days |
| `cleanup_match_records` | Weekly | Delete matches > 2 years |
| `cleanup_import_files` | Daily | S3 lifecycle enforcement |
| `archive_audit_logs` | Monthly | Export logs > 1 year to S3 cold storage |

---

## COPPA-Specific Rules

- Users under 13: account inactive until parental consent
- Consent records retained until student turns 18 + 1 year
- Parent may request deletion of child's data at any time
- No behavioral advertising data collected from minors

---

## Data Minimization

- Collect only fields defined in `Data-Dictionary.md`
- No collection of: geolocation (beyond country), biometric, social media profiles
- AI prompts contain no student identifiers

---

## Backup Retention

| Backup Type | Frequency | Retention |
|---|---|---|
| RDS automated snapshot | Daily | 30 days |
| RDS manual snapshot | Pre-release | 90 days |
| S3 cross-region replication | Continuous | Matches source lifecycle |

---

*See `Privacy-Policy.md` for user-facing policy and `Compliance-Architecture.md` for controls.*
