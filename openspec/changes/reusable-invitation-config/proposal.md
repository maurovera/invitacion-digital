## Why

Event-specific wedding data is currently spread across constants, React components, locale files, metadata, and utility inputs, so producing another invitation requires coordinated edits in many places and risks visual or behavioral regressions. A typed, centralized event configuration is the next safe step toward a reusable Paraguay-oriented invitation template while preserving the validated application baseline.

## What Changes

- Introduce a typed, statically imported invitation configuration as the primary source for event facts, content selection through stable translation-key references, event date/time and `America/Asuncion` timezone, couple and venue facts, agenda/gallery structure, music metadata, contact details, hashtags, RSVP deadline, supported locales, and a minimal set of section feature flags.
- Make page metadata, countdown, calendar data, locations, schedule, gallery, music, RSVP/closing contact details, and visual components consume the central configuration instead of embedding event-specific values.
- Preserve `?to=` then `?toName=` precedence over the configured guest fallback and derive countdown/calendar behavior from one timezone-explicit event instant.
- Make Spanish the default locale and provide the demo's primary content in Spanish without destructively removing i18n; retain English as the supported secondary locale with functional key parity, and remove Indonesian from the selectable/supported product locale set while leaving its resource files physically intact and inert.
- Keep all visible localized copy in i18n resources, including envelope text, quotes, descriptions, story, captions, logistics, RSVP copy, and music-player copy. The typed configuration selects such content only through stable translation keys and SHALL NOT duplicate complete Spanish/English strings.
- Preserve the inherited demo names, descriptions, photographs, venues, map destinations, agenda, contact details, hashtags, event-owned copy, music, favicon, and other assets while centralizing their facts or selecting their existing localized copy by key. Replace only the expired ambiguous event date with an explicitly timezone-bound future demo date suitable for countdown and calendar validation; it is not commercial content.
- Preserve the current envelope geometry, seal, animations and timings, layout, palette, navigation behavior, MusicPlayer behavior, responsive behavior, gallery appearance, simulated RSVP flow, assets, and overall experience.
- Add no backend, database, deployment, dependency update, theme system, builder, multi-tenant loading, visual redesign, envelope fix, advanced gallery, functional WhatsApp RSVP, or broad accessibility/performance work.

## Capabilities

### New Capabilities

- `invitation-configuration`: Defines the typed event-data contract, timezone-safe derived behavior, locale strategy, configurable content boundaries, and baseline-preserving consumption by the invitation UI.

### Modified Capabilities

- None. The existing `project-foundation` behavioral contract remains unchanged and acts as a non-regression constraint for this change.

## Impact

- Expected implementation scope: a new configuration module and types plus focused data-flow edits in `src/app/layout.tsx`, `src/sections/home/view/home-view.tsx`, `src/components/letter-animation.tsx`, affected home-section components, locale configuration/resources, navigation configuration where feature visibility requires it, and date/calendar utilities.
- Existing `src/constants/wedding.ts` and `src/types/wedding.ts` will be migrated or replaced only after consumers use the new contract; compatibility exports may be used temporarily to keep steps small.
- No dependency, asset, external API, persistence, deployment, or server infrastructure change is expected.
- User-visible changes are limited to Spanish becoming the default language and the expired date becoming a clearly temporary future demo date. The inherited demo content, visual structure, and interactions otherwise remain the baseline.
