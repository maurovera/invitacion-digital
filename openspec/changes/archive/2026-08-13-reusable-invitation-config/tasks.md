## 1. Typed Contract and Baseline

- [x] 1.1 Record `git status`, all preexisting modified/untracked files, and hashes of the Indonesian resource, favicon, photographs, music, and other retained assets before any application mutation.
- [x] 1.2 Capture the current functional and visual baseline for the envelope, opening sequence, query personalization, sections, venues/maps, gallery, music, navigation, simulated RSVP, and representative desktop/mobile viewports without adding an E2E framework.
- [x] 1.3 Record baseline results for `pnpm lint`, `pnpm typecheck`, and `pnpm build`; stop before fixing any preexisting failure outside this change.
- [x] 1.4 Add the minimal wedding-oriented TypeScript contract for metadata inputs, locales, event timing, couple facts and keys, venue facts and keys, agenda structure and keys, gallery structure and keys, music facts and keys, contact facts, and the five feature flags.
- [x] 1.5 Encode translation references as stable key fields and verify the contract does not introduce `LocalizedText`, `{ es, en }` content objects, complete translations, runtime loading, React context, or a generic event/page-builder abstraction.

## 2. Configuration Instance with Current Facts

- [x] 2.1 Inventory and classify each current hardcode as configuration fact, locale copy, or component presentation constant before moving it.
- [x] 2.2 Create the single typed configuration instance with the exact current names, full names, photographs, venue names/addresses/times, agenda order/times, gallery IDs/categories/order/emojis, audio path, email, phone, hashtags, and other existing facts; do not invent or editorially rewrite values.
- [x] 2.3 Materialize map URLs only from the destinations currently produced by `generateMapLink` so centralization preserves existing behavior rather than inventing new locations.
- [x] 2.4 Configure the existing i18n keys for metadata, participant descriptions/roles/story, envelope fallback/copy selection where needed, venue logistics, agenda titles/descriptions, gallery captions, music labels, and other localized content without copying their text into TypeScript.
- [x] 2.5 Document and configure one clearly temporary future demo `startDateTime` with canonical `America/Asuncion`, preserving the inherited demo otherwise and identifying the date as non-commercial test data.
- [x] 2.6 Keep all five feature flags enabled and run `pnpm typecheck` before migrating consumers.

## 3. Main Consumers and Metadata

- [x] 3.1 Make `HomeView` the client composition boundary that imports the configuration once and passes focused typed slices to consumers without changing section order, markup, styles, animation, or timings.
- [x] 3.2 Make `src/app/layout.tsx` build factual metadata through configured translation keys and locale resources while preserving fonts, providers, toaster, favicon, and layout structure.
- [x] 3.3 Preserve `?to=` then `?toName=` precedence and resolve the fallback through the configured i18n key; do not move envelope text or quotes out of locale resources.
- [x] 3.4 Introduce a temporary compatibility export only if the incremental migration requires it, and ensure it delegates to the single configuration instance rather than duplicating facts.
- [x] 3.5 Run `pnpm lint` and `pnpm typecheck` after the composition/metadata migration.

## 4. Canonical Date and Timezone

- [x] 4.1 Replace the offset-free date source with configured `event.startDateTime`, `event.timeZone = 'America/Asuncion'`, `event.durationHours`, and `event.rsvpDeadline`, without silently reinterpreting the inherited date.
- [x] 4.2 Update event-facing date/time formatting to use the configured IANA timezone and active locale rather than browser-local getters.
- [x] 4.3 Make countdown consume the same canonical instant, remove or reconcile the unused duplicate countdown path, and verify no independent countdown date remains.
- [x] 4.4 Derive Google Calendar start/end and location from the same configured event/venue facts while preserving the current calendar interaction.
- [x] 4.5 Derive the displayed RSVP deadline from its configured instant and localized formatting rather than duplicating a date string per locale.
- [x] 4.6 Verify displayed date/time, countdown target, deadline, and calendar instant under both an Asunción browser timezone and at least one different timezone.

## 5. Couple and Venues

- [x] 5.1 Migrate short/full names and current photograph paths to configuration and pass configured participant slices to Hero, CoupleIntroduction, LetterAnimation, and ClosingMessage without changing their presentation.
- [x] 5.2 Resolve participant descriptions, roles, story, quotes, and other visible copy from configured stable i18n keys; keep the text itself in locale files.
- [x] 5.3 Migrate ceremony/reception names, addresses, times, and behavior-equivalent map URLs to configuration.
- [x] 5.4 Resolve ceremony/reception labels and logistics notes through configured i18n keys while keeping the visible text in locale files.
- [x] 5.5 Verify names, photographs, venues, logistics, and both map destinations match the baseline, then run `pnpm lint` and `pnpm typecheck`.

## 6. Agenda and Gallery

- [x] 6.1 Migrate agenda order and exact current times to configuration, with stable title/description keys for every entry.
- [x] 6.2 Make EventSchedule render the configured ordered entries while preserving the timeline markup, alternating layout, animations, and localized text values.
- [x] 6.3 Migrate gallery IDs, categories, order, and current emoji placeholders to configuration, with stable caption/description keys.
- [x] 6.4 Make GalleryPreview render the configured collection while preserving its current placeholder appearance, grid, cards, hover behavior, and localized captions.
- [x] 6.5 Verify agenda and gallery parity and run `pnpm lint` and `pnpm typecheck`.

## 7. Contact and Music

- [x] 7.1 Migrate the exact current email, phone, hashtags, and any existing factual RSVP/closing values to configuration; model optional future WhatsApp only without implementing behavior or inventing a value.
- [x] 7.2 Replace independently hardcoded contact/hashtag occurrences in RSVP and ClosingMessage with configured facts while keeping surrounding copy in locale resources.
- [x] 7.3 Migrate the exact current audio path and factual metadata that already exists; use translation keys for visible music labels and do not replace or modify the audio asset.
- [x] 7.4 Make MusicPlayer consume configured music facts without changing autoplay handling, controls, timers, animations, labels, or playback behavior.
- [x] 7.5 Verify contact, hashtags, simulated RSVP, and music parity and run `pnpm lint` and `pnpm typecheck`.

## 8. Feature Flags and Navigation

- [x] 8.1 Conditionally render countdown, gallery, schedule, music, and RSVP from their configured flags, leaving all five enabled in the demo.
- [x] 8.2 Derive scroll-spy inputs, floating navigation, FAB progression, progress indicator, and feature-dependent CTAs from one enabled-section model without adding arbitrary page ordering.
- [x] 8.3 Verify the all-enabled configuration matches the baseline, then temporarily exercise each flag individually to confirm disabled sections and navigation destinations are omitted safely; restore all flags to enabled afterward.

## 9. Spanish-First Locales

- [x] 9.1 Add Spanish locale resources by faithfully localizing the existing visible demo copy without editorial expansion, invented event content, or migration of complete translations into configuration.
- [x] 9.2 Make Spanish the default/fallback across supported locale configuration, client/server initialization, document language, formatting, and first-visit behavior.
- [x] 9.3 Retain English as the selectable secondary locale and verify functional key parity with Spanish without broad editorial or professional-translation scope.
- [x] 9.4 Remove Indonesian from selectable/supported locale metadata, make stored/detected `id` safely fall back to Spanish, and leave the existing Indonesian resource file physically unchanged and inert.
- [x] 9.5 Verify metadata and all visible content resolve through locale resources or interpolation of configuration facts, with no full Spanish/English text objects in `src/config`.

## 10. Cleanup and Final Validation

- [x] 10.1 Remove any temporary compatibility seam after all consumers use the new source, then reduce obsolete wedding constants/types without changing behavior.
- [x] 10.2 Audit for duplicated names, dates, venue facts, agenda times, gallery structure, audio paths, email, phone, hashtags, deadline, map destinations, or complete translations outside their designated owner; document intentional presentation constants.
- [x] 10.3 Review the final diff and confirm it contains no dependency, asset, visual, envelope, theme, backend, database, deploy, real RSVP, general performance/accessibility, or unrelated cleanup change.
- [x] 10.4 Run `pnpm lint`, `pnpm typecheck`, `pnpm build`, and strict OpenSpec validation; require success with no new warning attributable to this change.
- [x] 10.5 Manually validate envelope geometry/seal/opening/timings, `?to=Mauro`, `?toName=Mauro`, precedence, fallback, countdown, sections, venues/maps, agenda, gallery, music, navigation, simulated RSVP, Spanish default, English secondary, and legacy `id` fallback.
- [x] 10.6 Compare representative desktop/mobile states with the recorded baseline, separating approved locale/date differences from unintended visual or responsive changes.
- [x] 10.7 Record wedding-specific model choices, future generalization seams, retained asset/licensing risks, and known out-of-scope UX issues without implementing them.
- [x] 10.8 Obtain human approval of completed functional/visual validation before archive; do not deploy, commit, push, or archive automatically.
