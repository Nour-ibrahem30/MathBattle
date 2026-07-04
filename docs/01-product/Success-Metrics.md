# Success Metrics — MathQuest

**Version:** 1.0.0

---

## Metric Categories

### 1. Learning Outcomes (Primary)

| Metric | Target | Measurement Method | Review Cadence |
|---|---|---|---|
| Student score improvement (pre vs. post assessment) | ≥ 15% improvement within one semester | Assessment score comparison | Per semester |
| Lesson completion rate | ≥ 70% of started lessons completed | Lesson completion events | Weekly |
| Practice question accuracy improvement | ≥ 10% improvement over 4 weeks | Answer correctness tracking | Monthly |
| Final assessment pass rate | ≥ 75% of students pass on first attempt | Assessment results | Per unit |

### 2. Engagement (Secondary)

| Metric | Target | Measurement Method | Review Cadence |
|---|---|---|---|
| Daily Active Students (DAS) | Growing month-over-month | Session events | Daily |
| Weekly Active Students (WAS) | ≥ 60% of enrolled students | Session events | Weekly |
| Average session length | ≥ 15 minutes | Session start/end events | Weekly |
| 30-day retention rate | ≥ 60% | Cohort retention analysis | Monthly |
| Streak maintenance rate | ≥ 40% of active students maintain 7-day streak | Streak tracking | Weekly |
| Match completion rate | ≥ 80% of started matches completed | Match events | Weekly |

### 3. Teacher Adoption

| Metric | Target | Measurement Method | Review Cadence |
|---|---|---|---|
| Teacher dashboard weekly usage | ≥ 3 sessions/week per active teacher | Session events | Weekly |
| Assignments created per teacher per week | ≥ 2 | Assignment creation events | Weekly |
| AI question acceptance rate | ≥ 75% of generated questions accepted | Review events | Weekly |
| Time to first assignment (new teacher) | ≤ 3 days from account creation | Onboarding funnel | Monthly |

### 4. Platform Health

| Metric | Target | Measurement Method | Review Cadence |
|---|---|---|---|
| Platform uptime | ≥ 99.5% | Uptime monitoring | Continuous |
| API P95 response time | ≤ 500ms | APM tooling | Continuous |
| Page load time P95 | ≤ 2 seconds | RUM / Lighthouse | Weekly |
| Error rate (5xx) | ≤ 0.1% of requests | Error monitoring | Continuous |
| Support ticket volume | Decreasing month-over-month | Support system | Monthly |

### 5. Business Metrics

| Metric | Target | Measurement Method | Review Cadence |
|---|---|---|---|
| Institutional accounts (schools) | 10 by end of Beta | CRM | Monthly |
| Student seats activated | 5,000 by end of V1 | User records | Monthly |
| Net Promoter Score (teachers) | ≥ 40 | In-app survey | Quarterly |
| Churn rate (institutional) | ≤ 5% annually | Contract tracking | Quarterly |

---

## Metric Ownership

| Category | Owner |
|---|---|
| Learning Outcomes | Product + Education Lead |
| Engagement | Product + Engineering |
| Teacher Adoption | Product + Customer Success |
| Platform Health | Engineering + DevOps |
| Business Metrics | Product + Business Development |

---

## Instrumentation Requirements

All metrics require corresponding analytics events. See `03-architecture/Data-Architecture.md` for analytics pipeline design and `03-architecture/Monitoring-Alerting-Plan.md` for alerting thresholds.

---

*See `01-product/PRD.md` for product goals and `05-project-plan/Milestones.md` for delivery targets.*
