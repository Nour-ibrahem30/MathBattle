---
name: Precision & Intelligence
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is built on the principles of high-performance clarity and academic elegance. It bridges the gap between a sophisticated developer tool and an approachable learning environment. The aesthetic is **Modern Minimalist with Tactile Precision**, drawing inspiration from high-utility platforms like Linear and Vercel, but softened for an educational context.

The UI should feel "lightweight" but "authoritative." It utilizes hyper-clean layouts, meticulous alignment, and a focus on content-first hierarchy. Every interaction should feel intentional and responsive, evoking a sense of flow and intellectual mastery. The "AI-forward" nature is communicated through subtle motion, ethereal blurs, and crisp, high-fidelity iconography.

## Colors

The color palette is anchored by a deep **Vivid Blue** primary for trust and focus, and a **Royal Purple** secondary to represent the "magic" of AI intervention. 

- **Primary:** Used for main actions, active states, and progress tracking.
- **Secondary:** Reserved for AI features, gamification elements (like streaks), and special milestones.
- **Surface Strategy:** In light mode, use `#F8FAFC` as the base with white (`#FFFFFF`) cards to create subtle elevation. In dark mode, use `#0F172A` with a slightly lighter navy for containers to maintain depth.
- **Semantic Logic:** Success/Warning/Danger are high-saturation but used sparingly to ensure feedback remains impactful without being overwhelming.

## Typography

This design system uses a dual-sans approach. **Inter** provides the backbone for readability and content density, while **Geist** is introduced for labels, data points, and technical UI elements to reinforce the "precision tool" narrative.

- **Weight Usage:** Stick to Semibold (600) for headers to maintain a premium feel; avoid Extra Bold unless for high-impact marketing sections.
- **Math Content:** For mathematical formulas (LaTeX), use a monospaced font or a dedicated serif to distinguish variables from UI text.
- **Tracking:** Use negative letter spacing on large headlines to create a "tight," professional editorial look.

## Layout & Spacing

The layout philosophy follows a **strict 8px soft grid** to ensure mathematical consistency throughout the UI.

- **Desktop:** 12-column grid with 24px gutters. Maximum content width of 1280px.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px margins.
- **Whitespace:** Use "Generous Padding" (`lg` or `xl`) between major sections to reduce cognitive load, especially during complex problem-solving sessions. Secondary navigation and sidebars should use condensed spacing (`sm`) to prioritize the central workspace.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Ambient Shadows**. This design system avoids harsh borders in favor of depth-based separation.

- **Level 0 (Base):** The main background (`#F8FAFC`).
- **Level 1 (Cards):** White background with a soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)) and a 1px subtle border (`#E2E8F0`).
- **Level 2 (Modals/Popovers):** Higher elevation with a larger shadow spread (0px 12px 40px rgba(0,0,0,0.08)).
- **Glassmorphism:** Use backdrop-blur (12px) on top navigation bars and AI floating panels to create a sense of lightness and modernity.

## Shapes

The shape language is "Friendly-Technical." While the layout is rigid and precise, the corners are notably rounded to keep the experience inviting for students.

- **Standard Elements:** Buttons and input fields use `0.5rem` (Rounded).
- **Containers:** Dashboard cards and problem containers use `rounded-lg` (1rem).
- **Hero/Featured:** Special banners or AI chat bubbles use `rounded-xl` (1.5rem) to signify a departure from standard data tables.

## Components

### Buttons
- **Primary:** Solid `#2563EB` with white text. High-radius (8px) and a subtle 2px scale-down on click.
- **Ghost:** No background, primary color text. Used for secondary navigation to reduce visual noise.

### Cards
- **Problem Cards:** Large padding (24px), 16px radius, and a thin border that turns `#2563EB` on hover/focus.
- **Dashboard Cards:** Use a subtle gradient header or a top-border accent color to categorize subjects.

### Inputs & Math Fields
- **Fields:** 12px padding, light grey background (`#F1F5F9`), and a persistent label using `label-sm`.
- **Focus State:** Use a 3px outer glow in the primary color with 20% opacity.

### Leaderboards & Progress
- **Leaderboard:** Use "Stripe-style" list items—clean horizontal rows with minimal dividers and emphasized avatars.
- **Progress Bars:** Use a 8px height with a rounded track. Use the Secondary Purple for AI-suggested targets.

### AI Feedback States
- **Thinking State:** A soft pulsing glow around the input or a shimmering "skeleton" loader.
- **Correct/Incorrect:** Full-card tinting (low opacity green/red) rather than just a small icon to provide immediate, immersive feedback.