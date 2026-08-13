## Context

See `proposal.md` for motivation and `specs/invitation-configuration/spec.md` for the behavioral contract. The repository already has a small `WEDDING_CONFIG`, but it covers only the date, couple, and two venues. Other event facts remain embedded in `src/app/layout.tsx`, `src/components/letter-animation.tsx`, `src/sections/home/view/home-view.tsx`, `event-schedule.tsx`, `gallery-preview.tsx`, `music-player.tsx`, `rsvp.tsx`, `closing-message.tsx`, and the English/Indonesian locale resources. The current date is constructed without a timezone offset, and map links are derived from address strings even though reusable event data should carry explicit destinations.

The configuration migration crosses server metadata, client components, localization, date derivation, navigation, and media. It must therefore be incremental and must preserve the baseline established by `project-foundation`. Human review decided to retain the inherited demo facts and assets as temporary content rather than create a new commercial wedding. The sole data exception is the expired date: implementation will use a clearly documented future demo instant in `America/Asuncion` so countdown and calendar behavior can be validated, without silently reinterpreting the inherited value.

## Goals / Non-Goals

**Goals:**

- Establish a compact TypeScript contract that makes event facts discoverable and statically validated.
- Make the data flow explicit: event configuration → derived values/adapters → existing visual components.
- Centralize one canonical zoned event date and reuse it for display, countdown, RSVP deadline formatting, and calendar generation.
- Establish a strict ownership boundary: configuration owns event facts, translation-key references, locale selection, and functional flags; locale resources own all visible localized copy; components own presentation behavior.
- Adopt Spanish as the fallback/default locale, retain English with key parity, and safely retire Indonesian from the supported locale list without removing i18n infrastructure.
- Allow only the five requested coarse section flags and keep every flag enabled in the migrated demo.
- Migrate in independently verifiable slices with compatibility seams where useful.

**Non-Goals:**

- Designing a universal event schema, runtime JSON validation, remote configuration, CMS, builder, database, multi-tenancy, or dynamic invitation selection.
- Introducing themes, changing assets, replacing the current audio or gallery placeholders, or changing RSVP delivery.
- Moving complete translations, geometry, Motion transitions, CSS classes, breakpoint choices, component structure, generic form labels, browser autoplay help, or other presentation behavior into event configuration.
- Fixing the seal, inner letter overflow, envelope responsiveness, ultrawide composition, or 320–430 px polish.
- Updating dependencies, deploying, or adding a new E2E framework.

## Decisions

### 1. Use one TypeScript configuration module with an explicit contract

Create `src/config/invitation.types.ts` for the contract and `src/config/invitation.ts` for the single demo instance, exported through `src/config/index.ts` only if a barrel improves imports. This fits the requested architecture and makes the ownership boundary clearer than expanding the generic `constants` directory. Use `satisfies InvitationConfig` (and `as const` where useful) so literal values remain narrow while the complete object is checked.

The initial contract remains wedding-oriented: it may name the two people `couple` and use `ceremony` and `reception`. Collection shapes (`schedule`, `gallery`) and common fields (`site`, `event`, `contact`, `features`) are intentionally reusable for future quinceañeras or baptisms, but no polymorphic event union or plugin model is introduced now. Visible wedding-facing copy remains in locale resources and is selected through typed or convention-checked translation keys.

Alternative considered: JSON plus runtime schema validation. Rejected for this stage because all configuration is compiled with the app, asset paths are ordinary imports/strings, TypeScript already provides the requested editor and build feedback, and a runtime validation dependency would add scope.

### 2. Separate facts, translation keys, and presentation constants

Move facts and content selection into configuration:

- metadata inputs plus translation keys for localized title/description, default locale declaration, supported locales, and event type;
- short/full participant names, photos, and translation keys for descriptions, roles, and story content;
- canonical start, duration/end derivation input, timezone, and RSVP deadline;
- venue names, addresses, displayed local times, explicit Google Maps URLs, and translation keys for notes/logistics;
- translation-key references only when configuration must select envelope or other visible copy;
- ordered agenda times plus title/description keys, and gallery IDs/order/categories/current emoji or asset plus caption keys;
- current audio path, factual track metadata when it exists, and visible-label keys when selection is necessary;
- email, phone, optional WhatsApp placeholder, and hashtags;
- `countdown`, `gallery`, `schedule`, `music`, and `rsvp` flags.

Keep in locale resources: every visible string requiring localization, including structural titles, labels, CTAs, instructions, countdown units, status messages, envelope text, quotes, participant descriptions, story content, gallery captions, venue logistics, RSVP copy, music-player copy, and navigation labels. Event-specific translated prose follows the same rule: configuration points to a stable i18n key and never embeds parallel Spanish/English text objects. Facts interpolated into translated sentences remain configuration-owned and are passed as interpolation values rather than duplicated inside locale prose.

Keep in components/styles: envelope dimensions and seal content, Motion timings, gradients, layout/CSS, animation arrays, scroll behavior, gallery presentation, RSVP state/submission simulation, and MusicPlayer control logic.

Avoid `LocalizedText` or equivalent `{ es, en }` objects in the configuration. An exception would require a separately documented reason demonstrating that the value cannot be represented safely as a fact plus translation key; no such exception is currently approved.

Alternative considered: move every visible string or per-locale text objects into configuration. Rejected because it would duplicate the localization system, mix UI vocabulary with event data, weaken i18n, and turn configuration into a content repository.

### 3. Represent the event instant explicitly for Paraguay

Store a canonical ISO 8601 datetime with an explicit offset plus `timeZone: 'America/Asuncion'`. Choose and document a future placeholder date during implementation, using a value shaped like `YYYY-MM-DDTHH:mm:ss-03:00` or the offset applicable to that chosen date; it is test/demo data, not an invented commercial event date. Parse that value into an instant for countdown and calendar output, and format it with `Intl.DateTimeFormat` using the configured IANA timezone and active locale. Do not construct the canonical date from an offset-free string, reinterpret the inherited `2025-10-15T16:00:00`, or use browser-local getters for event calendar parts.

The IANA zone remains explicit even though the ISO value contains an offset: the offset fixes the instant, while `America/Asuncion` controls culturally correct display and documents domain intent. RSVP deadline uses the same representation rules. Schedule items are event-local wall-clock labels/values associated with the event timezone; they do not create independent countdown sources.

Alternative considered: add a timezone library. Rejected unless implementation proves the platform APIs cannot satisfy parsing, formatting, and calendar generation; the current requirements can be met with built-in `Date` for instants and `Intl` for zoned formatting.

### 4. Pass configuration or focused slices through existing boundaries

`HomeView` remains the composition root for client sections and passes focused slices (`couple`, `venues`, `schedule`, `gallery`, `contact`, `music`) rather than letting every leaf import the global object. Server-owned metadata and `<html lang>` import the same serializable configuration directly. Small pure selectors/adapters may derive the event instant, localized date labels, calendar payload, enabled navigation IDs, and guest fallback.

This preserves component testability and makes data dependencies visible. A temporary compatibility export from `src/constants/wedding.ts` may bridge migration steps, but the final state must have one authoritative instance and no second independently editable wedding object.

Alternative considered: React context/provider. Rejected because there is only one build-time configuration and the current component tree already has a clear composition root; context would hide dependencies and add runtime machinery.

### 5. Keep section flags coarse and navigation consistent

The configuration contains exactly the requested section flags. `HomeView` conditionally renders the five controlled features, and navigation/scroll tracking derives its destination list from the same flags. Always-visible structural sections such as hero, couple, details, venues, and closing remain outside the feature model. All flags are `true` in the migrated demo, so implementation can verify parity before testing one disabled-section case.

Alternative considered: arbitrary ordered page blocks. Rejected as premature builder architecture and likely to disturb layout/navigation behavior.

### 6. Make Spanish default and retain English

Add a complete `es/home.json`, make `es` the fallback and first/default supported language, add the corresponding Day.js locale only where the existing adapter still needs it, and update `<html lang>`/metadata to Spanish defaults. Keep English selectable with functional key parity, without expanding into professional editorial review. Remove Indonesian from `allLangs` and supported preload/detection paths, but leave its existing resource files physically unchanged and inert. Invalid or legacy `id` preferences fall back to Spanish. Physical deletion is reserved for a separate cleanup change.

Event facts must not be duplicated inside locale prose when interpolation can supply them. All text that genuinely varies by language—including participant descriptions, envelope copy, quotes, story, gallery captions, logistics, RSVP copy, and music-player labels—remains in locale files. Configuration holds stable translation-key references only where it selects among those texts. Metadata that is localized follows the same key-reference model rather than storing complete translated title/description objects in TypeScript.

Alternative considered: Spanish only. Rejected because the existing switcher and English resources make a second locale low-risk, and retaining English demonstrates that configuration and localization boundaries work. Indonesian is not retained as a supported choice because it is outside the commercial target.

### 7. Preserve current assets and visible mechanics

The current photo, gallery, audio, favicon, and other asset paths seed the first configuration unchanged until separate approved asset work occurs. The inherited names, descriptions, venues, map destinations, agenda, contact details, hashtags, and event-owned copy also seed the configuration; this change centralizes them rather than editorially rewriting them. Components receive new props or adapters but their markup, class names, animation values, callbacks, and internal behavior remain unchanged unless a minimal data-binding edit is required. Before implementation, capture the current baseline and after each slice compare the same content where possible; Spanish-default and future-demo-date differences are reviewed separately from geometry and behavior.

## Affected Files and Migration Map

| Current area | Planned treatment |
| --- | --- |
| `src/constants/wedding.ts`, `src/types/wedding.ts`, related barrels | Migrate to the new typed config; retain only a temporary compatibility export if needed, then remove duplicate authority. |
| `src/app/layout.tsx` | Read configured metadata and Spanish default document language without changing font/layout providers. |
| `src/sections/home/view/home-view.tsx` | Act as composition root, pass config slices, conditionally render supported sections, and derive navigation inputs. |
| `src/components/letter-animation.tsx` | Receive configured fallback/event copy while preserving `to` → `toName` → fallback and all animation markup/timing. |
| `hero-section.tsx`, `couple-introduction.tsx`, `wedding-details-card.tsx`, `countdown-timer.tsx` | Consume typed participant and canonical date-derived inputs; keep visual structure. |
| `venue-information.tsx`, `event-schedule.tsx` | Replace embedded venue/logistics/agenda facts with configured collections and explicit map URLs. |
| `gallery-preview.tsx` | Receive configured entries; preserve placeholder assets and current grid/card appearance. |
| `music-player.tsx` | Receive audio source/metadata; preserve the asset and playback/autoplay/control logic. |
| `rsvp.tsx`, `closing-message.tsx` | Consume configured deadline/contact/hashtags; preserve simulated submission and markup. |
| `src/constants/navigation.ts`, navigation consumers | Filter the current fixed navigation model using the five flags; do not introduce arbitrary ordering. |
| `src/lib/wedding-utils.ts`, `src/hooks/use-count-down.ts` | Parse/format the one explicit instant and generate calendar data without browser-timezone ambiguity. |
| `src/locales/**`, `src/types/resources.ts` | Add Spanish, set fallback, retain English parity, stop exposing Indonesian, and keep i18n infrastructure. |

## Risks / Trade-offs

- [The inherited demo combines non-Paraguayan facts with the `America/Asuncion` domain timezone and its date is past] → Preserve those facts as explicitly temporary demo content, replace only the date with a documented future demo instant, and do not claim this payload is a coherent or final commercial invitation.
- [Mixing localized event prose with generic translation strings can recreate multiple sources of truth] → Classify every migrated value and document its owner; use either localized config content or a translation key, never both for the same fact.
- [Date formatting can drift by visitor timezone] → Parse one offset-bearing instant and always format event-facing parts with `America/Asuncion`; add focused manual checks under a non-Asunción browser timezone.
- [Feature flags can desynchronize navigation and section DOM IDs] → Derive both rendered controlled sections and navigation destinations from the same feature object and validate a disabled-section case.
- [Prop changes across many components can invite refactoring] → Migrate one data domain at a time, allow a short-lived compatibility adapter, and prohibit markup/style/animation cleanup.
- [English parity increases translation work] → Limit supported locales to Spanish and English, compare key sets, and fall back to Spanish for missing/legacy locale input.
- [Current assets may be unsuitable commercially] → Keep them unchanged and record replacement/licensing as a later change; centralizing their paths does not approve their use.

## Migration Plan

1. Add the typed, wedding-oriented contract with separate field types for facts, translation-key references, and the five feature flags; do not add consumers yet.
2. Add the single configuration instance using the exact inherited demo facts/assets and stable keys for existing localized copy, with only the approved documented future demo date replacing the expired date.
3. Migrate the main composition boundary and metadata consumers to focused configuration slices while retaining a temporary compatibility seam only if necessary.
4. Migrate canonical date/timezone, display formatting, countdown, RSVP deadline, and Google Calendar derivation from `startDateTime`, `timeZone`, and `durationHours`.
5. Migrate couple and venue facts plus their description/role/story/logistics key references, preserving all current visible copy and map destinations.
6. Migrate agenda order/times/keys and gallery IDs/order/categories/current emoji or asset/caption keys without changing presentation.
7. Migrate contact facts and music source/factual metadata/label keys without changing RSVP or MusicPlayer behavior.
8. Add the five coarse feature flags and derive affected rendering/navigation/CTAs from one enabled-section model, keeping every demo flag enabled after verification.
9. Add Spanish as default, retain English, make Indonesian unsupported but keep its file intact, and verify key parity without moving translations into configuration.
10. Remove any temporary compatibility seam, audit ownership/duplicates, run lint/typecheck/build/strict OpenSpec validation, and complete the manual visual/functional non-regression matrix. Stop for approval if any fix would expand scope.

Rollback is file-level: revert the configuration-consumer slices in reverse order while retaining the prior `WEDDING_CONFIG` compatibility export until final migration. No data migration, backend rollback, or deployment rollback is involved.
