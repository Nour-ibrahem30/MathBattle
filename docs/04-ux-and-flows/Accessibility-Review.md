# Accessibility Review — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Standard

MathBattle targets **WCAG 2.1 Level AA** compliance at launch. This document defines requirements and review checklist.

---

## Key Requirements

### Perceivable

| Criterion | Requirement | Implementation |
|---|---|---|
| 1.1.1 Non-text Content | All images have alt text | Decorative: `alt=""`; functional: descriptive alt |
| 1.3.1 Info and Relationships | Semantic HTML | Use `<nav>`, `<main>`, `<button>`, heading hierarchy |
| 1.4.3 Contrast | 4.5:1 text, 3:1 large text | Design tokens validated in CI |
| 1.4.4 Resize Text | Usable at 200% zoom | Relative units (rem); no horizontal scroll |
| 1.4.11 Non-text Contrast | 3:1 for UI components | Buttons, inputs, focus rings |

### Operable

| Criterion | Requirement | Implementation |
|---|---|---|
| 2.1.1 Keyboard | All functionality keyboard accessible | Tab order, Enter/Space activation |
| 2.1.2 No Keyboard Trap | Focus not trapped except modals | Modal: focus trap with Escape to close |
| 2.4.3 Focus Order | Logical tab sequence | DOM order matches visual order |
| 2.4.7 Focus Visible | Visible focus indicator | 2px outline, high contrast |
| 2.5.3 Label in Name | Accessible name matches visible label | Button text = aria-label |

### Understandable

| Criterion | Requirement | Implementation |
|---|---|---|
| 3.1.1 Language | Page language set | `<html lang="en">` |
| 3.2.1 On Focus | No context change on focus | — |
| 3.3.1 Error Identification | Errors described in text | Inline field errors from API |
| 3.3.2 Labels or Instructions | Form fields labeled | `<label>` associated with inputs |

### Robust

| Criterion | Requirement | Implementation |
|---|---|---|
| 4.1.2 Name, Role, Value | ARIA used correctly | Prefer native elements; ARIA when needed |
| 4.1.3 Status Messages | Dynamic updates announced | `aria-live="polite"` for toasts, match updates |

---

## Role-Specific Considerations

### Student (K–12)
- Simple language in error messages
- Large touch targets (min 44×44px) for match interactions
- Timer in match: visual + screen reader announcement at 10s, 5s
- Color-coded match cards also show point value text (not color-only)

### Teacher
- Data tables: sortable headers with aria-sort
- Charts: text alternative summary below chart

### Admin
- Bulk actions: confirmation dialogs with clear consequences

---

## Match Arena Accessibility

- Card color announced: "Green card, 1 point"
- Timer: `aria-live="assertive"` at 10s and 5s remaining
- Score updates announced after each card
- Focus loss warning: modal with clear text (not color-only)
- Keyboard: number keys 1–4 for MC options; Enter to submit

---

## Testing Checklist (Pre-Release)

- [ ] axe-core scan: zero critical/serious violations
- [ ] Keyboard-only navigation through all primary flows
- [ ] Screen reader test (NVDA/VoiceOver): login, lesson, match
- [ ] 200% zoom test on mobile and desktop
- [ ] Color contrast check on all design tokens
- [ ] Reduced motion: respect `prefers-reduced-motion` for animations

---

## Tools

| Tool | Use |
|---|---|
| axe DevTools | Automated scan in CI and manual |
| Lighthouse Accessibility | Score ≥ 90 |
| WAVE | Manual page review |
| NVDA / VoiceOver | Screen reader testing |

---

*See `Empty-Loading-Error-States.md` for state patterns and `NFR-Detailed.md` NFR-USE section.*
