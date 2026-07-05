# Low-Fidelity Wireframes — MathBattle

**Version:** 1.0.0
**Note:** Wireframes are described textually as layout block specifications. No visual styling is implied.

---

## Global Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]          [Primary Nav Items]          [User Menu]   │  ← Top Navigation Bar
│                                               [Notifications]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    [Page Content]                           │  ← Main Content Area
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Footer: Links | Privacy | Terms | Support]                │  ← Footer (minimal)
└─────────────────────────────────────────────────────────────┘
```

**Mobile:** Top nav collapses to hamburger menu. Bottom tab bar for primary navigation on mobile.

---

## Login Page

```
┌─────────────────────────────────────────────────────────────┐
│                    [MathBattle Logo]                         │
│                                                             │
│              ┌─────────────────────────────┐               │
│              │  Email Address              │               │
│              │  [Input Field]              │               │
│              │                             │               │
│              │  Password                   │               │
│              │  [Input Field]  [Show/Hide] │               │
│              │                             │               │
│              │  [Login Button — Primary]   │               │
│              │                             │               │
│              │  [Forgot Password? Link]    │               │
│              └─────────────────────────────┘               │
│                                                             │
│              [Don't have an account? Register]              │
└─────────────────────────────────────────────────────────────┘
```

---

## Student Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Dashboard | Learn | Matches | Achievements | Missions  [Avatar][Notif]
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  [Avatar]  Alex  |  [Rank Badge: Scholar]            │  │  ← Profile Strip
│  │  [XP Bar: 450/700 to Expert]  |  🔥 Streak: 7 days  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Continue Learning                                   │  │  ← AI Recommendation
│  │  [Lesson Card: "Fractions — Adding Unlike Fractions"]│  │
│  │  [Start Lesson Button]                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────┐   │
│  │  Active Missions (2)   │  │  Recent Matches        │   │  ← Two-column
│  │  [Mission 1 progress]  │  │  [Match 1: Win vs. J.] │   │
│  │  [Mission 2 progress]  │  │  [Match 2: Loss vs. K.]│   │
│  │  [View All Missions]   │  │  [View All Matches]    │   │
│  └────────────────────────┘  └────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Recent Achievements                                 │  │
│  │  [Badge 1]  [Badge 2]  [Badge 3]  [View All]        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Lesson View

```
┌─────────────────────────────────────────────────────────────┐
│  [Back to Unit]  Fractions — Adding Unlike Fractions        │
├─────────────────────────────────────────────────────────────┤
│  [Progress Bar: ████████░░░░░░░░  Question 5 of 10]        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  What is 1/3 + 1/4?                                        │  ← Question Text
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  A)  7/12    │  │  B)  2/7     │                        │  ← Answer Options
│  └──────────────┘  └──────────────┘                        │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  C)  1/6     │  │  D)  5/12    │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
│  [💡 Show Hint]                                             │
│                                                             │
│  [Submit Answer — disabled until option selected]           │
└─────────────────────────────────────────────────────────────┘
```

---

## Match Arena

```
┌─────────────────────────────────────────────────────────────┐
│  Alex  [Score: 8]          Card 6/10          [Score: 5]  Jordan
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────────┐                          │
│                    │   🟦 BLUE   │  ← Card (color revealed) │
│                    │   +2 pts    │                          │
│                    └─────────────┘                          │
│                                                             │
│  What is 15% of 80?                                        │  ← Question
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  A)  10      │  │  B)  12      │                        │
│  └──────────────┘  └──────────────┘                        │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  C)  14      │  │  D)  16      │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
│  [Timer Bar: ████████████░░░░░░░░  18s remaining]          │
└─────────────────────────────────────────────────────────────┘
```

---

## Teacher Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Dashboard | Classes | Assignments | Questions | AI | Reports
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Good morning, Ms. Rivera                                   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Quick Actions:                                      │  │
│  │  [Create Assignment]  [Generate Questions]  [Reports]│  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  My Classes                                          │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ Class 8A | 28 students | Last active: Today    │  │  │
│  │  │ ⚠️ 3 at-risk students  [View Class]            │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ Class 8B | 26 students | Last active: Yesterday│  │  │
│  │  │ ✓ All on track  [View Class]                   │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pending Review: 5 AI-generated questions            │  │
│  │  [Review Now]                                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Admin Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Dashboard | Users | School | Reports | Audit Log   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  School Overview — Lincoln Middle School                    │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 612      │  │ 22       │  │ 78%      │  │ 4.2/5    │  │
│  │ Students │  │ Teachers │  │ Active   │  │ Avg Score│  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Performance by Grade                                │  │
│  │  Grade 6: ████████░░  82%                           │  │
│  │  Grade 7: ██████░░░░  68%  ⚠️ Below threshold       │  │
│  │  Grade 8: █████████░  91%                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  [Export Report]  [Manage Users]                           │
└─────────────────────────────────────────────────────────────┘
```

---

*See `UX-Flows.md` for interaction flows and `Medium-Fidelity-Wireframes.md` for component-level detail.*
