# Admin Flows — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

UX flows for school administrators and platform operators. Student and teacher flows are in `UX-Flows.md`.

---

## Admin Personas

| Role | Scope | Primary Goals |
|---|---|---|
| School Admin | Single school | User management, school settings, performance overview |
| Platform Operator | All schools (internal) | Moderation, AI oversight, system health |

---

## Flow A1 — School Admin Dashboard

```
[Admin Login] → [Admin Dashboard]
  ├── KPI Cards: Total students, active teachers, avg completion rate
  ├── Chart: Weekly active users (line chart)
  ├── Table: Top/bottom performing classes
  └── Quick Actions: Add user, View reports, School settings
```

---

## Flow A2 — User Management

```
[Admin Dashboard] → [Users List]
  │ Filters: role, status, grade, search by name/email
  │
  ├── [Add User]
  │     Form: email, name, role, grade (if student)
  │     → Create → Send welcome email with temp password
  │
  ├── [Edit User]
  │     Update name, role, status
  │     Cannot change email (security)
  │
  ├── [Suspend User]
  │     Confirm dialog → status = suspended
  │     → Revoke all refresh tokens
  │
  └── [Bulk Import] (Phase 2)
        Upload CSV → Validate → Preview → Confirm import
```

---

## Flow A3 — School Settings

```
[Admin Dashboard] → [School Settings]
  ├── General: School name, timezone, country
  ├── Registration: School code (read-only), allow self-registration toggle
  ├── Curriculum: Default learning paths per grade
  ├── Notifications: Enable/disable notification types
  └── Save → Confirm toast
```

---

## Flow A4 — School Performance Report

```
[Admin Dashboard] → [Reports]
  │ Select: Date range, grade filter
  ▼
[Performance Report]
  ├── Summary: Enrollment, completion rate, avg score, match participation
  ├── By Grade: Bar chart comparison
  ├── By Class: Table with teacher name, student count, avg progress
  └── Export CSV button
```

---

## Flow A5 — Audit Log Review

```
[Admin Dashboard] → [Audit Logs]
  │ Filters: action type, user, date range
  ▼
[Audit Log Table]
  │ Columns: timestamp, user, action, entity, details
  │ Click row → Expand JSON diff (PII masked)
  └── Export for compliance (Phase 2)
```

---

## Flow O1 — Platform Operator: Content Moderation

```
[Operator Dashboard] → [Question Review Queue]
  │ Lists: AI-generated questions pending review (platform-wide)
  │ Actions: Approve, Reject, Flag for teacher
  └── Audit logged
```

---

## Flow O2 — Platform Operator: System Health

```
[Operator Dashboard] → [System Health]
  ├── Service status: API, WebSocket, Worker, DB, Redis
  ├── Queue depths: ai-jobs, email-jobs, DLQ counts
  ├── Error rate chart (last 24h)
  └── Active WebSocket connections
```

---

## Navigation (Admin)

```
/admin/dashboard
/admin/users
/admin/users/:id
/admin/settings
/admin/reports
/admin/audit-logs
```

Operator routes (role: operator):
```
/operator/dashboard
/operator/moderation
/operator/system
```

---

*See `Information-Architecture.md` for full sitemap and `UX-Flows.md` for student/teacher flows.*
