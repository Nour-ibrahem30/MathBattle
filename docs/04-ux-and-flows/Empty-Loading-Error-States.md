# Empty, Loading, and Error States — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Standard patterns for non-happy-path UI states across all roles.

---

## Design Principles

- Every async view has explicit loading, empty, and error states
- Messages are friendly, actionable, and age-appropriate for students
- Retry actions available where transient failures occur
- Skeleton loaders for content areas; spinners only for button actions

---

## Loading States

| Context | Pattern | Duration Hint |
|---|---|---|
| Page navigation | Skeleton layout matching page structure | — |
| Dashboard data | Skeleton cards (3–4 placeholders) | — |
| Lesson question load | Skeleton question card + option placeholders | — |
| Match waiting for opponent | Animated pulse + "Finding opponent..." | Show cancel after 30s |
| Match card transition | Brief card flip animation (≤ 500ms) | — |
| AI question generation | Progress bar + "Generating questions..." | Up to 15s |
| Form submit | Button spinner + disabled state | — |
| Infinite scroll | Bottom spinner row | — |

---

## Empty States

| Screen | Message | Action |
|---|---|---|
| Student dashboard (new user) | "Your learning adventure starts here!" | "Start First Lesson" CTA |
| No learning path assigned | "Your teacher is setting up your content" | Contact teacher info |
| Match history (none) | "No matches yet. Ready to battle?" | "Find Opponent" CTA |
| Achievements (none) | "Complete lessons to earn your first badge!" | "Go to Learning" CTA |
| Missions (none active) | "New missions arrive every week" | — |
| Teacher class list (none) | "Create your first class" | "Create Class" CTA |
| Teacher question bank (empty) | "Build your question bank" | "Create Question" / "Import" / "Generate with AI" |
| Notifications (none) | "You're all caught up!" | — |
| Search results (none) | "No results for '{query}'" | "Clear filters" link |
| Admin users (filtered empty) | "No users match these filters" | "Clear filters" |

---

## Error States

| Error Type | UI Pattern | Message Example |
|---|---|---|
| Network offline | Banner at top + retry button | "You're offline. Check your connection." |
| API 500 | Inline error card | "Something went wrong. Please try again." |
| API 403 | Full-page message | "You don't have permission to view this page." |
| API 404 | Full-page message | "This page doesn't exist." |
| Form validation | Inline field errors | Field-specific messages from API |
| Login failure | Inline below form | "Invalid email or password." |
| Rate limited | Inline banner | "Too many attempts. Try again in X minutes." |
| Match disconnect | Overlay modal | "Connection lost. Reconnecting..." with countdown |
| Match forfeit | Result redirect | "Match ended due to connection loss." |
| AI generation failed | Toast + retry | "Question generation failed. Try again." |
| Session expired | Redirect to login | "Your session expired. Please log in again." |
| WebSocket auth fail | Redirect to login | "Please log in to join a match." |

---

## Component Reference

```
<EmptyState icon={...} title="..." description="..." action={<Button />} />
<LoadingSkeleton variant="card" | "table" | "question" count={3} />
<ErrorState title="..." message="..." onRetry={fn} />
<OfflineBanner onRetry={fn} />
```

---

## Accessibility

- Loading states: `aria-busy="true"`, `aria-live="polite"` for status updates
- Error messages: linked to form fields via `aria-describedby`
- Empty states: heading level appropriate (h2 or h3)
- Retry buttons: keyboard accessible, visible focus ring

---

*See `UX-Flows.md` for flow context and `Accessibility-Review.md` for full a11y checklist.*
