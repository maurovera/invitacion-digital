## Why

The current wedding-app fork works locally, but its package-manager ambiguity, unresolved dependency risks, outdated Next.js patch, and incomplete production validation make the baseline difficult to reproduce and unsafe to evolve. This change establishes a stable technical foundation before reusable invitation work begins, while preserving the current appearance and invitation experience.

## What Changes

- Standardize pnpm as the sole supported package manager and remove the competing npm lockfile.
- Inspect the existing `pnpm-workspace.yaml`, determine why pnpm generated it and whether its build-script approvals belong in the reproducible pnpm configuration, then explicitly document whether it must be retained and versioned without modifying or removing it speculatively.
- Declare compatible Node.js and pnpm versions or ranges so local development, CI, and future Vercel builds use a reproducible toolchain.
- Upgrade Next.js from 15.3.3 to a patched compatible release without introducing an unnecessary major-version migration, and keep `eslint-config-next` aligned with the selected Next.js version.
- Analyze the duplicate `eslint-import-resolver-typescript` versions and apply only the minimum dependency adjustment needed to remove or justify the duplication.
- Review `useSearchParams` in `LetterAnimation` and make only the compatibility changes required for Next.js production prerendering and Suspense rules.
- Provide reproducible lint, TypeScript, and production-build validation commands and verify them with pnpm.
- Prepare the repository configuration for a future Vercel deployment without performing a deployment.
- Record the pre-mutation working-tree state and functional/visual baseline so preexisting changes remain distinguishable and final human validation can compare against prior evidence.
- Preserve the current UI and behavior as the acceptance baseline, including the envelope screen, seal, opening animation, invitation transition, query-parameter personalization, current sections, temporary music behavior, navigation, and responsive behavior.

### Scope

This change is limited to package-manager and runtime reproducibility (including an explicit decision about the existing `pnpm-workspace.yaml`), narrowly scoped dependency security and graph corrections, Next.js production compatibility, validation commands, baseline evidence, and non-deploying Vercel readiness.

### Non-goals

- Visual redesign, color-palette changes, themes, or general responsive improvements.
- General component refactoring or a new invitation configuration architecture.
- Real gallery content, WhatsApp RSVP, music or asset replacement, backend services, or a database.
- General mobile or accessibility improvements unless strictly required by the technical compatibility work.
- An actual Vercel deployment.

### Expected User-visible Impact

None is intended. Users must continue to see and interact with the same invitation experience; any visible or functional difference outside a strictly necessary compatibility correction is out of scope.

## Capabilities

### New Capabilities

- `project-foundation`: Defines the reproducible pnpm toolchain, compatible and secure framework dependency baseline, production-safe rendering requirements, validation gates, Vercel build readiness, and preservation of the current invitation behavior.

### Modified Capabilities

None.

## Impact

- Package metadata, lockfiles, and the existing `pnpm-workspace.yaml`, including the declared package manager, build-script approvals, and runtime constraints.
- Working-tree and manual baseline evidence used to distinguish preexisting changes from work introduced by this change.
- Next.js and its aligned lint configuration, plus the minimum dependency-graph adjustment related to `eslint-import-resolver-typescript`.
- `LetterAnimation` and/or its nearest App Router boundary only if production compatibility requires a Suspense or rendering-boundary adjustment.
- Project scripts or configuration needed for deterministic lint, TypeScript checking, and production builds.
- Future Vercel build compatibility, without provisioning or deployment changes.
- No intentional changes to application APIs, content, assets, layout, styling, navigation, animation timing, or end-user workflows.
