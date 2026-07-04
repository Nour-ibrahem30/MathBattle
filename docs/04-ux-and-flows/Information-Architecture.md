# Information Architecture — MathQuest

**Version:** 1.0.0

---

## Sitemap

```
MathQuest Platform
│
├── Public (unauthenticated)
│   ├── /login
│   ├── /register
│   ├── /password-reset
│   └── /password-reset/confirm
│
├── Student (authenticated, role: student)
│   ├── /dashboard                    ← Student home
│   ├── /learn
│   │   ├── /learn/paths              ← Browse learning paths
│   │   ├── /learn/paths/:id          ← Path detail (units, lessons)
│   │   ├── /learn/lessons/:id        ← Lesson view
│   │   ├── /learn/lessons/:id/practice ← Practice set
│   │   ├── /learn/lessons/:id/challenge ← Challenge
│   │   └── /learn/assessments/:id    ← Final assessment
│   ├── /matches
│   │   ├── /matches                  ← Match lobby (find opponent)
│   │   ├── /matches/:id              ← Match arena (live)
│   │   ├── /matches/:id/result       ← Match result
│   │   └── /matches/history          ← Match history
│   ├── /achievements                 ← Achievements gallery
│   ├── /missions                     ← Active missions
│   ├── /leaderboard                  ← Class/school leaderboard (Phase 2)
│   └── /profile                      ← Student profile, settings
│
├── Teacher (authenticated, role: teacher)
│   ├── /teacher/dashboard            ← Teacher home
│   ├── /teacher/classes
│   │   ├── /teacher/classes          ← Class list
│   │   ├── /teacher/classes/:id      ← Class detail (roster, performance)
│   │   └── /teacher/classes/:id/students/:sid ← Student detail
│   ├── /teacher/assignments
│   │   ├── /teacher/assignments      ← Assignment list
│   │   ├── /teacher/assignments/new  ← Create assignment
│   │   ├── /teacher/assignments/:id  ← Assignment detail
│   │   └── /teacher/assignments/:id/results ← Completion results
│   ├── /teacher/questions
│   │   ├── /teacher/questions        ← Question bank
│   │   ├── /teacher/questions/new    ← Create question
│   │   ├── /teacher/questions/:id    ← Question detail/edit
│   │   ├── /teacher/questions/import ← Import questions
│   │   └── /teacher/questions/review ← Review pending questions
│   ├── /teacher/ai
│   │   └── /teacher/ai/generate      ← AI question generation
│   └── /teacher/reports
│       ├── /teacher/reports/class/:id ← Class performance report
│       └── /teacher/reports/student/:id ← Student performance report
│
└── Admin (authenticated, role: admin)
    ├── /admin/dashboard              ← Admin home
    ├── /admin/users
    │   ├── /admin/users              ← User list
    │   ├── /admin/users/new          ← Create user
    │   └── /admin/users/:id          ← User detail/edit
    ├── /admin/school                 ← School configuration
    ├── /admin/reports
    │   ├── /admin/reports/school     ← School performance
    │   ├── /admin/reports/grade/:g   ← Grade-level report
    │   └── /admin/reports/export     ← Export reports
    └── /admin/audit                  ← Audit log viewer
```

---

## Navigation Model

### Student Navigation
- **Primary nav:** Dashboard, Learn, Matches, Achievements, Missions
- **Secondary nav:** Profile, Notifications, Settings
- **Contextual nav:** Breadcrumbs within learning path (Path → Unit → Lesson)

### Teacher Navigation
- **Primary nav:** Dashboard, Classes, Assignments, Question Bank, AI Generate, Reports
- **Secondary nav:** Profile, Notifications, Settings
- **Contextual nav:** Class → Student; Assignment → Results

### Admin Navigation
- **Primary nav:** Dashboard, Users, School Settings, Reports, Audit Log
- **Secondary nav:** Profile, Settings

---

## Route Groups

| Group | Auth Required | Role Required | Notes |
|---|---|---|---|
| Public | No | None | Login, register, password reset |
| Student | Yes | student | All /dashboard, /learn, /matches, /achievements, /missions |
| Teacher | Yes | teacher | All /teacher/* |
| Admin | Yes | admin | All /admin/* |
| Shared | Yes | Any | /profile, /notifications, /settings |

---

## Content Hierarchy

### Learning Content Hierarchy
```
Grade (1–12)
  └── Subject (e.g., Mathematics)
        └── Unit (e.g., Fractions)
              ├── Lesson 1 (lesson type)
              ├── Practice 1 (practice type)
              ├── Challenge 1 (challenge type)
              └── Final Assessment (final_assessment type)
```

### Question Bank Hierarchy
```
Grade → Subject → Unit → Lesson → Topic → Subtopic
  └── Question (with: bloom_level, difficulty, type, hints, solution, tags)
```

---

## Admin Module Map

| Module | Key Actions |
|---|---|
| User Management | Add, edit, deactivate, reset password, bulk import |
| School Configuration | School name, grade levels, curriculum settings, anti-cheat settings |
| Performance Reports | School overview, grade breakdown, class detail, export |
| Audit Log | Filter by user, action, date range; export |

---

## Empty States

| Page | Empty State Message |
|---|---|
| Student Dashboard (new) | "Welcome! Start your first lesson to begin your journey." |
| Match History (no matches) | "You haven't played any matches yet. Challenge a classmate!" |
| Achievements (none earned) | "Complete lessons and matches to earn achievements." |
| Teacher Question Bank (empty) | "Your question bank is empty. Create questions or use AI to generate them." |
| Teacher Class (no students) | "No students in this class yet. Ask your administrator to add students." |
| Admin Reports (no data) | "No data available for the selected period." |

---

*See `04-ux-and-flows/UX-Flows.md` for detailed user flow diagrams and `04-ux-and-flows/Low-Fidelity-Wireframes.md` for layout descriptions.*
