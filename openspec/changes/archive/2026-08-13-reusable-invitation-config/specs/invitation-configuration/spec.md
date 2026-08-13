## Purpose

Defines a single typed source for event-specific invitation data so a new invitation can be personalized without editing visual components while preserving the established experience.

## ADDED Requirements

### Requirement: Typed central invitation configuration
The project SHALL expose one statically typed invitation configuration as the primary source of event-specific facts, supported/default locale selection, stable translation-key references, and functional flags used by the application. The contract SHALL cover metadata inputs, general event identity, couple facts, the primary event date and time, an explicit IANA timezone, RSVP deadline when applicable, ceremony and reception facts, agenda order/times, gallery identity/order/media, music source and factual metadata, contact channels, hashtags, content-selection keys, and the supported section feature flags.

#### Scenario: Personalizing another invitation
- **WHEN** a developer supplies valid values for another event through the central configuration
- **THEN** the application exposes those event facts throughout the existing invitation without requiring edits to visual component markup

#### Scenario: Invalid configuration shape
- **WHEN** a required configuration field has an incompatible type or a required event entity is missing
- **THEN** TypeScript validation fails before the application is built

### Requirement: Event data is separated from presentation
Visual components SHALL consume event-specific facts and content-selection keys from the invitation configuration or from values derived from it. Components MAY retain layout, animation constants, and presentation-only behavior, while visible localized copy SHALL remain in locale resources.

#### Scenario: Event-specific hardcode review
- **WHEN** the implementation is inspected after migration
- **THEN** names, event dates, venue facts, agenda data, gallery entries, music source, contact details, hashtags, RSVP deadline, and page metadata are not independently hardcoded in their consuming visual components

#### Scenario: Presentation constants remain local
- **WHEN** a value controls envelope geometry, animation timing, layout, styling, or other presentation-only behavior
- **THEN** it remains outside the event-data configuration unless it is already an event-specific product setting

### Requirement: Localized copy remains in locale resources
The invitation configuration SHALL reference stable i18n keys for visible text that requires localization and SHALL NOT store complete per-locale text objects as its normal content model. Titles, labels, calls to action, instructions, units, status messages, envelope copy, quotes, descriptions, story text, captions, logistics, RSVP copy, and music-player copy SHALL remain in locale resources.

#### Scenario: Event-specific translated description is selected
- **WHEN** a configured participant, agenda entry, gallery entry, venue note, or metadata field requires localized copy
- **THEN** the configuration supplies a stable translation key and the active locale resource supplies the visible text

#### Scenario: Configuration ownership is inspected
- **WHEN** the typed configuration is reviewed after migration
- **THEN** it contains event facts, translation-key references, locale selection, and feature flags without duplicating complete Spanish and English strings

### Requirement: One timezone-explicit event source
The invitation SHALL represent the primary event date and time with the IANA timezone `America/Asuncion` and SHALL derive countdown, displayed event date/time, and calendar-event timing from that same configured source. The migrated demo SHALL use an explicitly encoded future demo date so those behaviors remain verifiable, SHALL identify that value as temporary rather than commercial event content, and SHALL NOT silently reinterpret the expired ambiguous inherited date. Runtime behavior SHALL NOT reinterpret an ambiguous browser-local date as the event instant.

#### Scenario: Visitor uses another browser timezone
- **WHEN** a visitor opens the invitation from a device whose timezone differs from `America/Asuncion`
- **THEN** the countdown and calendar event still target the configured Paraguayan event instant

#### Scenario: Event date changes
- **WHEN** the configured primary event date or time changes
- **THEN** countdown, displayed details, and generated calendar timing reflect that change without updating a second event-date constant

#### Scenario: Expired inherited demo date is migrated
- **WHEN** the inherited offset-free and expired demo date is replaced during configuration migration
- **THEN** the replacement is a documented future demo instant explicitly associated with `America/Asuncion`, without presenting it as final commercial content

### Requirement: Configured venues and agenda
The invitation SHALL render ceremony, reception, and agenda information from configured ordered data, including venue names, addresses, local times, map URLs, and optional logistics notes where supplied.

#### Scenario: Configured ceremony and reception
- **WHEN** the invitation renders venue information
- **THEN** it shows the configured ceremony and reception facts and opens their configured map destinations without deriving a different location from embedded component text

#### Scenario: Configured agenda order
- **WHEN** the event agenda is rendered
- **THEN** entries appear in configured order with their configured times and localized labels or descriptions

### Requirement: Guest personalization precedence
The envelope SHALL resolve its displayed guest name in the order `to` query parameter, then `toName` query parameter, then the localized value selected by the configured fallback translation key. Empty or absent query values SHALL NOT override the fallback.

#### Scenario: Primary query parameter is present
- **WHEN** the invitation URL contains a non-empty `to=Mauro` value
- **THEN** the envelope displays `Mauro` even if `toName` or a configured fallback is also available

#### Scenario: Alternate query parameter is present
- **WHEN** `to` is absent or empty and the URL contains a non-empty `toName=Mauro` value
- **THEN** the envelope displays `Mauro`

#### Scenario: No guest query parameter is present
- **WHEN** neither query parameter supplies a non-empty guest name
- **THEN** the envelope displays the active-locale value resolved from the configured fallback translation key

### Requirement: Spanish-first safe localization
Spanish SHALL be the default application locale and SHALL contain the complete primary demo experience. The existing i18n infrastructure SHALL remain in place; English SHALL remain available as a secondary locale with equivalent required keys, while Indonesian SHALL no longer be exposed as a supported product locale and its existing resource files SHALL remain physically present but inert during this change.

#### Scenario: First visit without stored language
- **WHEN** a visitor opens the invitation without a valid stored locale preference
- **THEN** page language, metadata, invitation content, and structural labels default to Spanish

#### Scenario: English is selected
- **WHEN** a visitor selects English
- **THEN** the invitation renders the corresponding English structural and event content without missing translation keys

#### Scenario: Legacy Indonesian preference exists
- **WHEN** a stored or detected Indonesian locale is encountered after migration
- **THEN** the application safely falls back to Spanish rather than exposing Indonesian as a supported choice or failing to render

#### Scenario: Indonesian resources remain in the repository
- **WHEN** the locale migration is complete
- **THEN** the existing Indonesian resource files remain unchanged and unreferenced by the supported locale selection until a separate cleanup change evaluates their removal

### Requirement: Configurable content collections and media
The existing agenda and gallery SHALL consume configurable collections, and the existing music player SHALL consume configured audio source and available track metadata. Migrating these inputs SHALL retain the current photographs, gallery placeholders, audio, favicon, and other demo assets and SHALL NOT require a new gallery experience or a replacement media asset.

#### Scenario: Gallery configuration is rendered
- **WHEN** configured gallery entries are supplied
- **THEN** the current gallery layout renders those entries with the same visual behavior as the baseline

#### Scenario: Music configuration is rendered
- **WHEN** the current configured audio asset is available
- **THEN** MusicPlayer uses that source while preserving its current playback, autoplay handling, controls, and interaction behavior

### Requirement: Configured contact and RSVP facts
Contact details, hashtags, and any displayed RSVP deadline SHALL come from the invitation configuration, while the RSVP submission flow SHALL remain the current simulated behavior.

#### Scenario: Contact facts change
- **WHEN** configured email, phone, future WhatsApp value, or hashtags are changed
- **THEN** every section that displays those supplied facts reflects the configuration without editing the section component

#### Scenario: RSVP deadline is configured
- **WHEN** an RSVP deadline is supplied
- **THEN** the existing RSVP section displays the localized deadline derived from that configured value

### Requirement: Minimal section feature controls
The invitation configuration SHALL support enabling or disabling the countdown, gallery, schedule, music, and RSVP sections without introducing a general-purpose page builder. Navigation SHALL include only destinations whose controlled sections are enabled.

#### Scenario: Optional section is disabled
- **WHEN** one supported section flag is false
- **THEN** that section and its navigation destination are omitted while the order, styling, and behavior of remaining sections are preserved

#### Scenario: Default demo configuration
- **WHEN** the migrated demo configuration is used
- **THEN** all currently visible controlled sections remain enabled

### Requirement: Baseline visual and behavioral preservation
The configuration migration SHALL NOT intentionally change envelope geometry, the seal, opening animation or timings, general layout, palette, navigation interactions, MusicPlayer behavior, responsive behavior, gallery appearance, RSVP flow, or the known envelope and ultrawide limitations reserved for later work.

#### Scenario: Baseline comparison after migration
- **WHEN** the configured invitation is compared with the approved pre-migration baseline using equivalent content and viewport conditions
- **THEN** no visual or interaction regression attributable to the configuration migration is observed

#### Scenario: Existing invitation flows are exercised
- **WHEN** a reviewer opens the envelope, navigates sections and locations, observes the countdown, uses music controls, and exercises the simulated RSVP flow
- **THEN** those flows remain functionally equivalent except for the approved Spanish-first demo content
