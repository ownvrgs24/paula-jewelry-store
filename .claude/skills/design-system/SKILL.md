---
name: design-system-prestige
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Prestige

## Mission
Deliver implementation-ready design-system guidance for Prestige that can be applied consistently across e-commerce storefront interfaces.

## Brand
- Product/brand: Prestige
- URL: https://prestige-theme-allure.myshopify.com/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Nunito`, `font.family.stack=Nunito, sans-serif`, `font.size.base=14px`, `font.weight.base=400`, `font.lineHeight.base=23.1px`
- Typography scale: `font.size.xs=11px`, `font.size.sm=12px`, `font.size.md=13px`, `font.size.lg=14px`, `font.size.xl=18px`, `font.size.2xl=20px`, `font.size.3xl=22px`, `font.size.4xl=28px`
- Color palette: `color.text.primary=#1c1c1c`, `color.text.secondary=#ffffff`, `color.text.tertiary=#b3b3b3`, `color.surface.base=#000000`, `color.surface.raised=#efefef`, `color.border.default=#cfcfcf`
- Spacing scale: `space.1=2px`, `space.2=4px`, `space.3=10px`, `space.4=10.4px`, `space.5=12px`, `space.6=12.8px`, `space.7=20px`, `space.8=25px`
- Radius/shadow/motion tokens: `radius.xs=9999px` | `shadow.1=rgba(28, 28, 28, 0.15) 0px 2px 10px 0px` | `motion.duration.instant=100ms`, `motion.duration.fast=150ms`, `motion.duration.normal=200ms`, `motion.duration.slow=250ms`, `motion.duration.slower=300ms`, `motion.duration.step6=450ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
