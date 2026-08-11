# Project Foundation Specification

## Purpose

Establishes a reproducible, production-valid technical foundation for the invitation while preserving the current user-visible experience as the baseline for later changes.

## Requirements

### Requirement: Reproducible pnpm toolchain
The project SHALL designate pnpm as its sole supported package manager, SHALL retain exactly one pnpm lockfile, and SHALL declare supported Node.js and pnpm versions or ranges in repository metadata used by developers and build systems. The project SHALL inspect the existing `pnpm-workspace.yaml`, determine the origin and purpose of its build-script approvals, and explicitly document whether the file is retained and versioned as reproducible pnpm configuration without speculative removal or modification.

#### Scenario: Fresh supported installation
- **WHEN** a contributor checks out the repository and uses a declared Node.js version and pnpm version
- **THEN** dependency installation completes from the committed pnpm lockfile without requiring npm or generating an npm lockfile

#### Scenario: Unsupported package-manager ambiguity is removed
- **WHEN** a contributor inspects the repository setup and package metadata
- **THEN** the repository identifies pnpm as the intended package manager and does not contain a competing npm lockfile

#### Scenario: Workspace configuration decision is explicit
- **WHEN** the existing `pnpm-workspace.yaml` and its approvals for `sharp` and `unrs-resolver` are reviewed
- **THEN** the project records why the file was generated, whether those approvals are required, and whether the file must be retained and versioned for reproducible pnpm installs

### Requirement: Patched compatible framework baseline
The project SHALL use a security-patched Next.js release compatible with the existing application and SHALL keep `eslint-config-next` on a version compatible with that Next.js release, without introducing an unnecessary major-version migration.

#### Scenario: Framework security baseline is inspected
- **WHEN** the resolved production dependency graph is reviewed after installation
- **THEN** Next.js is no longer resolved to 15.3.3 and the selected release addresses the applicable security advisory while remaining within the approved compatibility scope

#### Scenario: Next.js lint configuration remains aligned
- **WHEN** lint validation runs against the selected Next.js release
- **THEN** `eslint-config-next` is compatible with that release and validation does not fail because of a framework/config version mismatch

### Requirement: Minimal dependency-graph resolution
The project SHALL analyze the multiple resolved versions of `eslint-import-resolver-typescript` and SHALL either remove the avoidable duplication through the smallest compatible dependency change or document why multiple versions are required by compatible transitive constraints.

#### Scenario: Resolver graph is verified
- **WHEN** the installed dependency graph is queried with pnpm
- **THEN** the resolved `eslint-import-resolver-typescript` versions are either reduced to one compatible version or the remaining duplication has a recorded compatibility justification

### Requirement: Production-safe query personalization
The production application SHALL satisfy Next.js rendering and prerendering requirements for reading URL search parameters while preserving guest personalization through both `?to=` and `?toName=` and retaining the existing fallback guest label.

#### Scenario: Primary guest query parameter
- **WHEN** the invitation is opened with a non-empty `to` query parameter
- **THEN** the envelope experience displays that guest name with the same precedence and behavior as the baseline

#### Scenario: Alternate guest query parameter
- **WHEN** the invitation is opened without `to` and with a non-empty `toName` query parameter
- **THEN** the envelope experience displays the `toName` value

#### Scenario: Guest name fallback
- **WHEN** the invitation is opened without `to` or `toName`
- **THEN** the envelope experience displays the existing translated fallback guest label

#### Scenario: Production prerender compatibility
- **WHEN** the application is built for production
- **THEN** the route using search parameters completes prerender/build validation without a missing Suspense-boundary or equivalent App Router compatibility error

### Requirement: Reproducible quality gates
The project SHALL expose pnpm commands for lint validation, standalone TypeScript checking without emission, and a production Next.js build, and all three commands SHALL complete successfully from a clean supported installation for the approved baseline. If preexisting failures require work outside the approved scope, implementation SHALL stop, document those failures, and obtain human approval before resolving them.

#### Scenario: Lint validation
- **WHEN** the documented pnpm lint command is run
- **THEN** it exits successfully for the approved baseline

#### Scenario: TypeScript validation
- **WHEN** the documented pnpm TypeScript command is run
- **THEN** it performs a no-emit type check and exits successfully for the approved baseline

#### Scenario: Production build validation
- **WHEN** the documented pnpm production-build command is run with a production environment
- **THEN** it produces a successful Next.js production build suitable for Vercel's standard Next.js build pipeline

### Requirement: Invitation baseline preservation
Technical hardening SHALL NOT intentionally change the current visual design or functional invitation experience.

#### Scenario: Pre-mutation baseline is recorded
- **WHEN** implementation is about to begin before any dependency or file mutation
- **THEN** the current Git status, preexisting working-tree changes, and manual functional evidence for the envelope screen, seal, opening animation, invitation transition, `?to=Mauro`, `?toName=Mauro`, query fallback, sections, music, navigation, and basic desktop and mobile behavior are recorded without adding a new E2E test system

#### Scenario: Envelope experience remains intact
- **WHEN** a visitor loads and opens the invitation after the hardening change
- **THEN** the initial envelope screen, seal, opening animation, timing-dependent transition, and transition into the invitation remain functionally and visually consistent with the approved baseline

#### Scenario: Invitation experience remains intact
- **WHEN** a visitor navigates the opened invitation across supported responsive layouts
- **THEN** the current sections, navigation, temporary music behavior, and responsive behavior remain available without intentional visual redesign

### Requirement: Preexisting working-tree changes are preserved
Implementation SHALL distinguish changes introduced by `foundation-hardening` from changes already present in `pnpm-lock.yaml`, `pnpm-workspace.yaml`, or any other working-tree file, and SHALL NOT overwrite, revert, or automatically attribute preexisting changes to this change.

#### Scenario: Existing modifications overlap an affected file
- **WHEN** an implementation task needs to touch a file that was already modified or untracked in the recorded baseline
- **THEN** the preexisting content is preserved and the resulting change is documented separately from the edits introduced by `foundation-hardening`

### Requirement: Vercel build readiness without deployment
The repository SHALL be compatible with a future Vercel deployment using the declared toolchain and production-build command, and this change SHALL NOT create or execute an actual deployment.

#### Scenario: Repository build configuration is reviewed for Vercel
- **WHEN** the repository is evaluated using Vercel's standard Next.js build assumptions
- **THEN** the package manager, runtime constraints, install inputs, and build command are unambiguous and no application backend or database is required
