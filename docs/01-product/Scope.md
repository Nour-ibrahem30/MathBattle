# Scope — MathBattle

**Version:** 1.0.0

---

## Scope Table

| Area | Phase 1 (MVP) Scope | Phase 2 (Beta) Scope | Out of Scope | Future |
|---|---|---|---|---|
| Authentication | Register, login, logout, password reset, JWT, RBAC (student/teacher/admin) | Social login (Google), 2FA for teachers | SSO/SAML enterprise | SAML/SSO for districts |
| Learning Paths | Grade → Subject → Unit → Lesson → Practice → Challenge → Final Assessment | AI next-activity recommendation | Adaptive branching paths | Full adaptive learning engine |
| Question Bank | Create, edit, tag, version, publish, archive; full metadata schema | AI difficulty calibration, bulk operations | Peer-reviewed question marketplace | Open curriculum marketplace |
| AI — Generation | Generate questions from text prompts | Generate from lesson objectives, Bloom's level targeting | Autonomous curriculum creation | Full curriculum authoring AI |
| AI — Import | PDF, Word, Excel, CSV import with duplicate detection | Image/scan OCR import | Video transcript import | Multimodal import |
| AI — Analysis | Weakness detection per student | Predictive failure detection | Real-time tutoring | NLP tutoring assistant |
| Matches | 1v1 same-grade hidden-card matches, 10-card format, weighted scoring | Tournaments, class-wide challenges | Team matches | National competition infrastructure |
| Gamification | Ranks, achievements, streaks, missions | Leaderboards, cosmetics, tournaments | Social sharing | Global leaderboards, sponsored competitions |
| Student Dashboard | Progress, missions, achievements, match history | Detailed analytics, AI recommendations | Parent visibility | Parent portal |
| Teacher Dashboard | Classes, assignments, question management, basic reports | Advanced analytics, AI generation UI, class rankings | Gradebook integration | LMS gradebook sync |
| Admin Dashboard | User management, school configuration | School-wide performance reports | District-level multi-school | District management portal |
| Notifications | In-app notifications | Email notifications, push (web) | SMS | Mobile push (native app) |
| Security | JWT, RBAC, encryption, rate limiting, anti-cheat, browser focus detection | Audit logs, suspicious activity alerts | Hardware-based proctoring | Biometric verification |
| API | REST API | GraphQL compatibility layer | Public API for third parties | Developer API marketplace |
| Analytics | Basic event tracking | Full analytics pipeline, teacher reports | BI tool integration | Embedded BI dashboards |
| Mobile | Responsive web (mobile-first) | Progressive Web App (PWA) | Native iOS/Android | Native mobile apps |
| Integrations | None | Google Classroom hooks | LMS full integration | Canvas, Blackboard, Teams for Education |
| Privacy/Compliance | COPPA, FERPA, GDPR architecture | Legal review complete, privacy policy live | SOC 2 Type II | ISO 27001 |
| Localization | English only | Localization-ready architecture | Multi-language content | Full multi-language platform |

---

## Explicit Out-of-Scope Items (All Phases)

The following items are explicitly excluded from all current planning and must not appear in architecture or data model decisions:

- Native mobile applications (iOS/Android)
- Subjects other than mathematics
- Video content, live tutoring, or synchronous classroom tools
- Payment processing or billing (handled externally by institutional contracts)
- Social features: messaging, friend lists, public profiles
- Parent portal (Phase 1 and 2)
- Hardware-based proctoring or biometric verification
- Public API for third-party developers (Phase 1 and 2)

---

## Scope Change Process

Any addition to Phase 1 scope requires:
1. Product Manager approval
2. Architecture impact assessment
3. Updated RTM entry in `02-requirements/Requirements-Traceability-Matrix.md`
4. Updated backlog entry in `05-project-plan/Backlog.md`

---

*See `01-product/PRD.md` for full product requirements and `01-product/Roadmap.md` for phased delivery timeline.*
