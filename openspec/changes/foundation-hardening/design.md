## Context

See `proposal.md` for motivation and scope. The repository currently has both npm and pnpm lockfiles, no explicit runtime/package-manager contract, Next.js and `eslint-config-next` at 15.3.3, and two resolved versions of `eslint-import-resolver-typescript`. An untracked `pnpm-workspace.yaml` generated during local pnpm preparation contains `allowBuilds` approvals for `sharp` and `unrs-resolver`; its origin, necessity, and versioning status have not yet been approved. `LetterAnimation` reads search parameters directly in a client component rendered by `HomeView`, so the production build must establish whether the current boundary satisfies the selected Next.js patch's prerender requirements.

The working UI is the regression baseline. Technical changes must be isolated from visual, content, asset, configuration-architecture, and general refactoring work.

## Goals / Non-Goals

**Goals:**

- Make pnpm installs reproducible with an explicit supported Node.js and pnpm toolchain.
- Reach and document an evidence-based decision about retaining and versioning the existing `pnpm-workspace.yaml` and its build-script approvals.
- Move Next.js to a patched compatible 15.x release and keep its lint package aligned.
- Resolve or explicitly justify the resolver duplication with the smallest compatible change.
- Satisfy production rendering requirements around search-parameter access without changing personalization semantics.
- Establish separate, repeatable lint, typecheck, and production-build gates.
- Confirm compatibility with Vercel's standard Next.js build flow without deploying.
- Limit touched application code to the smallest rendering-boundary adjustment proven necessary by the production build.
- Preserve and distinguish all preexisting working-tree changes from edits introduced by this change.

**Non-Goals:**

- Reorganizing components, modernizing unrelated ESLint configuration, or fixing unrelated lint findings as general cleanup.
- Changing visual styling, animations, content, assets, invitation data architecture, or user workflows.
- Adding infrastructure, environment-backed services, Vercel resources, or deployment automation.

## Decisions

### Standardize repository tooling on pnpm

Use the existing `pnpm-lock.yaml` as the only lockfile, declare pnpm through the package metadata `packageManager` field, and declare a Node.js compatibility range through `engines`. Add a version-manager hint only if it is needed to make the selected Node version unambiguous for contributors; avoid duplicating constraints that can drift.

This uses metadata understood by local tooling and Vercel. Retaining both lockfiles was rejected because it permits divergent dependency graphs. Switching to npm was rejected because npm currently produces ERESOLVE while the approved project convention and working installation use pnpm.

### Decide the workspace configuration from evidence

Before changing package metadata or dependencies, inspect the existing `pnpm-workspace.yaml`, determine which pnpm action generated it, and verify whether its `allowBuilds` entries for `sharp` and `unrs-resolver` are necessary build-script approvals for this dependency graph. Record an explicit decision on whether the file must be retained and versioned as part of reproducible pnpm configuration.

Do not remove, rewrite, or normalize the file merely because this is currently a single-package repository. Keeping it without analysis was rejected because unexplained approvals weaken reproducibility; deleting it speculatively was rejected because it may disable required native-package build steps.

### Capture the working and visual baseline before mutation

Before any dependency or file mutation, record `git status` and identify all modified and untracked files, including the preexisting `pnpm-lock.yaml` and `pnpm-workspace.yaml`. Preserve enough evidence to distinguish their prior content from edits introduced by this change. Then manually document the current envelope screen, seal, opening animation, invitation transition, `?to=Mauro`, `?toName=Mauro`, fallback without query parameters, sections, music, navigation, and basic desktop/mobile behavior.

The final human check compares against this evidence. Adding an E2E testing framework was rejected because it expands the approved hardening scope.

### Select the smallest patched Next.js 15.x upgrade

At implementation time, verify the applicable official Next.js security advisory and release notes, then select the lowest-risk patched 15.x release that addresses the advisory and supports the current React/App Router baseline. Keep `next` and `eslint-config-next` aligned to compatible versions and regenerate only the pnpm lockfile.

Pinning an unverified patch number in planning was rejected because security guidance can be superseded before implementation. A Next.js major migration was rejected because it expands compatibility risk and is not required by this change.

### Treat dependency duplication as an evidence-driven correction

Use pnpm's dependency graph to identify why versions 3.x and 4.x of `eslint-import-resolver-typescript` coexist. First test whether aligning Next.js/`eslint-config-next` naturally removes the older transitive version. If it does not, prefer a compatible direct-version adjustment or pnpm override only when peer constraints and lint validation prove it safe. If the two versions are required by valid incompatible ranges, record that result rather than force an unsafe deduplication.

Broad dependency upgrades and speculative overrides were rejected because they combine unrelated risk with the security patch.

### Prove the search-parameter boundary through the production build

Run the production build after the framework update. If Next.js reports a prerender/Suspense error, place the smallest appropriate Suspense or dynamic rendering boundary around the component that reads search parameters, favoring the nearest stable parent boundary. Preserve the precedence `to` → `toName` → translated fallback and do not move unrelated state or animation logic.

Preemptively refactoring query parsing into a new architecture was rejected because the current behavior works and the only authorized goal is production compatibility.

### Keep quality gates explicit and independent

Provide distinct package scripts for lint, no-emit TypeScript checking, and production build. All three gates must finish successfully for the approved baseline. If a preexisting failure requires work beyond this change, stop, document it, and request human approval before resolving it; a reported lint failure is not final compliance.

Relying only on `next build` was rejected because independent lint and typecheck commands make failures easier to diagnose and reproduce.

### Use standard Vercel conventions unless evidence requires configuration

Prefer Vercel's native Next.js detection using package metadata, the pnpm lockfile, declared Node compatibility, and the standard build script. Add `vercel.json` only if a demonstrated incompatibility cannot be expressed through existing project metadata; do not add deployment credentials, projects, or backend services.

## Affected Files / Components

- `package.json`: package-manager/runtime declarations, aligned framework packages, and validation scripts.
- `pnpm-lock.yaml`: regenerated dependency graph after approved dependency changes.
- `pnpm-workspace.yaml`: potentially retained and versioned only if the documented analysis confirms its `sharp` and `unrs-resolver` build approvals are required for reproducible pnpm installation.
- `package-lock.json`: removed so pnpm is the sole lockfile.
- `eslint.config.mjs`: only if resolver compatibility or the selected Next.js lint integration requires a minimal adjustment.
- `src/components/letter-animation.tsx`: only if the search-parameter consumer itself requires a compatibility adjustment.
- `src/sections/home/view/home-view.tsx` or the nearest App Router parent: only if a Suspense/rendering boundary is required.
- `next.config.ts`, a Node version hint, or `vercel.json`: only when validation demonstrates that standard metadata is insufficient.

## Risks / Trade-offs

- [A patched 15.x release changes runtime or build behavior] → Review official release notes, update only Next.js and its aligned lint package first, then run all gates and baseline validation.
- [A forced resolver deduplication violates peer constraints] → Prefer natural graph convergence; use an override only with dependency-graph evidence and successful lint/build validation.
- [A Suspense boundary changes initial rendering or animation timing] → Use the narrowest boundary, preserve the existing loading experience, and manually compare the envelope flow and query personalization.
- [Strict version declarations reject a valid Vercel runtime] → Choose maintained Node ranges supported by both the selected Next.js version and Vercel, then verify the build under that range.
- [Existing lint/type errors expand the task] → Stop, document the failures, and request human approval before any resolution that exceeds the approved hardening scope.
- [Removing `package-lock.json` affects npm-based contributors] → Document pnpm as the supported workflow; rollback restores the prior lockfile and package metadata if necessary.
- [A preexisting working-tree change is overwritten or misattributed] → Capture status and prior content first, preserve user changes, and report foundation-hardening edits separately.

## Migration Plan

1. Before mutation, record `git status`, preexisting file changes, the current dependency/validation state, and the complete manual visual/functional baseline.
2. Inspect `pnpm-workspace.yaml`, determine its origin and build-approval purpose, and document whether it will be retained and versioned without speculative edits.
3. Declare the supported toolchain and remove package-manager ambiguity while preserving preexisting working-tree content.
4. Apply the verified Next.js 15.x security patch with aligned lint configuration, then regenerate the pnpm lockfile without attributing unrelated prior changes to this change.
5. Inspect and minimally resolve or document the resolver dependency graph.
6. Run the production build to determine whether the search-parameter boundary needs adjustment; make only the proven compatibility change.
7. Run lint, typecheck, and production build from the supported pnpm workflow; all must pass, or implementation stops for human scope approval.
8. Perform human validation against the recorded pre-mutation evidence for the envelope, transition, personalization, invitation sections, music, navigation, and responsive behavior.

Rollback consists of reverting the hardening commit as a unit. No data migration or external infrastructure rollback is required because this change creates neither persistent data nor a deployment.
