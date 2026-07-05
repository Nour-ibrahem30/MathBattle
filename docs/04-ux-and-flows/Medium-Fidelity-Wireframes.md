# Medium-Fidelity Wireframes — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Medium-fidelity wireframe descriptions for key screens. Low-fidelity layouts are in `Low-Fidelity-Wireframes.md`. High-fidelity visual specs reference the design package (`Full-Desgin-Ui,Ux.zip`).

---

## Screen Index

| ID | Screen | Role | Route |
|---|---|---|---|
| MF-01 | Student Dashboard | Student | `/dashboard` |
| MF-02 | Learning Path | Student | `/learn/paths/:id` |
| MF-03 | Lesson Question | Student | `/learn/lessons/:id` |
| MF-04 | Match Lobby | Student | `/matches` |
| MF-05 | Match Arena | Student | `/matches/:id` |
| MF-06 | Teacher Dashboard | Teacher | `/teacher/dashboard` |
| MF-07 | Question Bank | Teacher | `/teacher/questions` |
| MF-08 | AI Generate | Teacher | `/teacher/questions/generate` |
| MF-09 | Class Detail | Teacher | `/teacher/classes/:id` |
| MF-10 | Admin Dashboard | Admin | `/admin/dashboard` |

---

## MF-01 — Student Dashboard

```
┌─────────────────────────────────────────────────────┐
│ [Logo]  MathBattle          [🔔 3]  [Avatar ▼]     │
├─────────────────────────────────────────────────────┤
│  Rank: Scholar  │  XP: ████████░░ 1,240/1,500     │
│  🔥 Streak: 5 days                                  │
├─────────────────────────────────────────────────────┤
│  CONTINUE LEARNING                                  │
│  ┌─────────────────────────────────────────────┐   │
│  │ Grade 5 → Fractions → Adding Fractions      │   │
│  │ Progress: 60%  │  [Continue →]              │   │
│  └─────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│  ACTIVE MISSIONS                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Complete │ │ Win 2    │ │ 7-day    │           │
│  │ 3 lessons│ │ matches  │ │ streak   │           │
│  │ ██░ 2/3  │ │ █░░ 1/2  │ │ █████ 5/7│           │
│  └──────────┘ └──────────┘ └──────────┘           │
├─────────────────────────────────────────────────────┤
│  RECENT MATCHES          RECENT ACHIEVEMENTS        │
│  W vs Alex  8-5          🏅 First Step              │
│  L vs Sam   4-7          🏅 Perfect Score           │
└─────────────────────────────────────────────────────┘
│ [Learn] [Matches] [Achievements] [Profile]          │
└─────────────────────────────────────────────────────┘
```

---

## MF-05 — Match Arena

```
┌─────────────────────────────────────────────────────┐
│  You: 12 pts  │  Card 4/10  │  Opponent: 9 pts     │
│  ⏱ 0:22                                           │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐   │
│  │  🟢 GREEN CARD — 1 point                    │   │
│  │                                             │   │
│  │  What is 3/4 + 1/4?                         │   │
│  │                                             │   │
│  │  ○ 1    ○ 3/4                               │   │
│  │  ○ 4/4  ○ 2/4                               │   │
│  │                                             │   │
│  │  [💡 Hint]              [Submit Answer]      │   │
│  └─────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│  Your cards: 🟢🔵🟣🟠  │  Hidden opponent cards     │
└─────────────────────────────────────────────────────┘
```

---

## MF-07 — Question Bank (Teacher)

```
┌─────────────────────────────────────────────────────┐
│  Question Bank                    [+ Create] [Import] [AI Generate] │
├─────────────────────────────────────────────────────┤
│  Filters: [Grade ▼] [Subject ▼] [Topic ▼] [Status ▼] [🔍 Search]  │
├─────────────────────────────────────────────────────┤
│  ☐ │ Question                    │ Grade │ Diff │ Status    │ ⋮  │
│  ☐ │ What is 3/4 + 1/4?         │ 5     │ 2    │ Published │ Edit│
│  ☐ │ Solve: 2x + 5 = 15         │ 7     │ 3    │ Draft     │ Edit│
│  ☐ │ True/False: π > 3          │ 6     │ 1    │ Pending   │ Edit│
├─────────────────────────────────────────────────────┤
│  Showing 1-20 of 156              [< 1 2 3 ... >] │
└─────────────────────────────────────────────────────┘
```

---

## MF-10 — Admin Dashboard

```
┌─────────────────────────────────────────────────────┐
│  Demo Elementary School — Admin Dashboard           │
├──────────┬──────────┬──────────┬────────────────────┤
│ 342      │ 18       │ 72%      │ 89%                │
│ Students │ Teachers │ Avg Score│ Weekly Active      │
├──────────┴──────────┴──────────┴────────────────────┤
│  [Weekly Active Users Chart ─────────────────]      │
├─────────────────────────────────────────────────────┤
│  CLASSES                         [View All Reports] │
│  Grade 5A — Ms. Johnson — 28 students — 78%       │
│  Grade 5B — Mr. Smith   — 26 students — 81%       │
├─────────────────────────────────────────────────────┤
│  [Manage Users]  [School Settings]  [Audit Logs]    │
└─────────────────────────────────────────────────────┘
```

---

## Interaction Notes

- Primary CTA per screen: one prominent button (Continue, Submit, Create)
- Back navigation: browser back + explicit breadcrumb on deep pages
- Mobile: bottom tab bar for student; hamburger menu for teacher/admin secondary nav

---

*See `High-Fidelity-Wireframes.md` for visual design tokens and `UX-Flows.md` for flow logic.*
