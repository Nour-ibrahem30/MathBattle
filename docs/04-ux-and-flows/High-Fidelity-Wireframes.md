# High-Fidelity Wireframes — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Visual design specifications for implementation. Full design assets are in `Full-Desgin-Ui,Ux.zip` at the repository root.

---

## Design System Reference

| Token | Value | Usage |
|---|---|---|
| Primary | `#4F46E5` (Indigo 600) | CTAs, links, active nav |
| Secondary | `#10B981` (Emerald 500) | Success, correct answers |
| Accent | `#F59E0B` (Amber 500) | Streaks, warnings, XP |
| Danger | `#EF4444` (Red 500) | Errors, incorrect, forfeit |
| Background | `#F9FAFB` (Gray 50) | Page background |
| Surface | `#FFFFFF` | Cards, modals |
| Text Primary | `#111827` (Gray 900) | Headings, body |
| Text Secondary | `#6B7280` (Gray 500) | Captions, metadata |

---

## Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| H1 | Inter | 28px / 1.75rem | 700 |
| H2 | Inter | 22px / 1.375rem | 600 |
| H3 | Inter | 18px / 1.125rem | 600 |
| Body | Inter | 16px / 1rem | 400 |
| Caption | Inter | 14px / 0.875rem | 400 |
| Button | Inter | 16px / 1rem | 600 |

---

## Match Card Colors

| Color | Hex | Points | Usage |
|---|---|---|---|
| Green | `#22C55E` | 1 | Lowest value card |
| Blue | `#3B82F6` | 2 | |
| Purple | `#8B5CF6` | 3 | |
| Orange | `#F97316` | 4 | |
| Red | `#EF4444` | 5 | Highest value card |

Each card displays color bar + numeric point value (accessibility: not color-only).

---

## Component Specs

### Primary Button
- Background: Primary color
- Text: White
- Padding: 12px 24px
- Border-radius: 8px
- Hover: Primary dark (`#4338CA`)
- Disabled: Gray 300 background

### Card
- Background: Surface white
- Border: 1px `#E5E7EB`
- Border-radius: 12px
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Padding: 16px–24px

### XP Progress Bar
- Track: Gray 200, height 8px, radius 4px
- Fill: Gradient Primary → Accent
- Label: Current XP / Next rank threshold

### Rank Badges
- Novice: Gray | Apprentice: Bronze | Scholar: Silver
- Expert: Gold | Master: Platinum | Champion: Diamond | Legend: Rainbow gradient

---

## Screen Assets (in Design Package)

| Asset | File (in zip) | Screen |
|---|---|---|
| Student dashboard | `student-dashboard.png` | MF-01 |
| Match arena | `match-arena.png` | MF-05 |
| Teacher question bank | `teacher-questions.png` | MF-07 |
| Login | `login.png` | Public |
| Admin dashboard | `admin-dashboard.png` | MF-10 |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | Single column, bottom nav (student) |
| Tablet | 640–1024px | Two column where applicable |
| Desktop | > 1024px | Sidebar nav (teacher/admin), max-width 1280px |

---

## Animation Guidelines

- Match card flip: 400ms ease-in-out
- XP gain: +N floating text, 1s fade out
- Achievement unlock: modal with confetti (respect `prefers-reduced-motion`)
- Page transitions: 200ms fade

---

*See `Medium-Fidelity-Wireframes.md` for layout structure and `Accessibility-Review.md` for contrast requirements.*
