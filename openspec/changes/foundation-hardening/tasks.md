## 1. Baseline and Version Decisions

- [x] 1.1 Before any mutation, record `git status` and identify every preexisting modified or untracked file, explicitly including `pnpm-lock.yaml` and `pnpm-workspace.yaml`, so those changes are not overwritten, reverted, or attributed automatically to `foundation-hardening`.
- [x] 1.2 Before any mutation, capture or document the manual functional/visual baseline for the initial envelope, seal, opening animation, invitation transition, `?to=Mauro`, `?toName=Mauro`, fallback without a query parameter, sections, music, navigation, and basic desktop and mobile behavior; do not introduce a new E2E test system.
- [x] 1.3 Record the current pnpm dependency graph, existing lint/typecheck/build command behavior, and the two resolved `eslint-import-resolver-typescript` versions before changing files.
- [x] 1.4 Inspect the current `pnpm-workspace.yaml`, determine why pnpm generated it, and verify the purpose and necessity of its `allowBuilds` approvals for `sharp` and `unrs-resolver` without modifying or removing the file speculatively.
- [x] 1.5 Document an explicit decision on whether `pnpm-workspace.yaml` must be retained and versioned as reproducible pnpm configuration, distinguishing its preexisting content from any later approved edit.
- [x] 1.6 Verify the applicable official Next.js security advisory and release notes, then record the selected patched compatible Next.js 15.x version and its supported Node.js range.
- [x] 1.7 Select and record a pnpm version compatible with the chosen Node.js range, the current lockfile, and Vercel's supported build environment.

## 2. Package Manager and Runtime Reproducibility

- [x] 2.1 Add the approved `packageManager` and Node.js `engines` declarations to `package.json`, adding a version-manager hint only if the metadata is insufficiently explicit.
- [x] 2.2 Remove `package-lock.json` and verify that `pnpm-lock.yaml` is the repository's only package-manager lockfile.
- [x] 2.3 Apply the documented `pnpm-workspace.yaml` decision, retaining and versioning its existing build approvals if required; do not make unrelated or speculative changes to the file.
- [x] 2.4 Run a frozen pnpm installation with the declared toolchain and verify that it succeeds without generating npm artifacts.

## 3. Framework and Dependency Hardening

- [x] 3.1 Update only `next` and `eslint-config-next` to the approved compatible versions and regenerate `pnpm-lock.yaml` with pnpm.
- [x] 3.2 Run `pnpm why eslint-import-resolver-typescript` and determine whether the framework update naturally removes the avoidable duplicate resolver version.
- [x] 3.3 If duplication remains, apply the smallest peer-compatible direct dependency or pnpm override adjustment; otherwise document why compatible transitive constraints require both versions.
- [x] 3.4 Verify the final Next.js, `eslint-config-next`, and resolver versions from the resolved pnpm graph and confirm that no unrelated dependency upgrade was introduced.

## 4. Independent Validation Commands

- [x] 4.1 Define or correct the pnpm lint script so it invokes a supported ESLint workflow for the selected Next.js version, without bundling unrelated source cleanup.
- [x] 4.2 Add a standalone no-emit TypeScript validation script and verify that it invokes the project TypeScript configuration.
- [x] 4.3 Confirm the production-build script uses the standard Next.js build flow expected by Vercel.
- [x] 4.4 Run lint and TypeScript validation independently and require both to finish successfully; if preexisting failures require broader cleanup, stop, document them, and request human approval before resolving them.

## 5. Production Rendering Compatibility

- [x] 5.1 Run the production build after dependency and script changes and capture whether `LetterAnimation` search-parameter access triggers a Suspense or prerender compatibility failure.
- [x] 5.2 If and only if the build proves it necessary, add the narrowest rendering/Suspense boundary around the search-parameter consumer without refactoring unrelated component logic or changing the visible loading experience.
- [x] 5.3 Verify in production mode that `?to=` takes precedence, `?toName=` remains supported, and the translated fallback remains unchanged when neither parameter is provided.
- [x] 5.4 Re-run the production build and confirm it completes successfully without search-parameter prerender errors.

## 6. Vercel Readiness and Final Validation

- [x] 6.1 Review the declared package manager, Node.js range, lockfile, and build command against Vercel's standard Next.js build conventions; add Vercel-specific configuration only if a demonstrated incompatibility requires it.
- [x] 6.2 From a clean supported pnpm installation, run the final lint, no-emit TypeScript, and production-build commands and verify that all three finish successfully; otherwise stop and obtain human approval for any scope expansion.
- [x] 6.3 Compare the final working tree with the recorded initial status and evidence, distinguishing all preexisting changes from edits introduced by `foundation-hardening` and confirming none were overwritten or reverted.
- [x] 6.4 Verify the final diff contains no visual refactor, content/asset change, backend, database, deployment action, or unrelated cleanup.
- [x] 6.5 Perform human validation against the pre-mutation evidence for the initial envelope, seal, opening animation and timing, invitation transition, `?to=Mauro`, `?toName=Mauro`, fallback without a query parameter, current sections, temporary music behavior, navigation, and basic desktop and mobile behavior.
- [x] 6.6 Record the `pnpm-workspace.yaml` disposition, remaining risks, or follow-up changes and obtain human approval before archive/closure; do not deploy to Vercel as part of this change.

## Implementation Notes

- Pre-mutation working tree: `pnpm-lock.yaml` was already modified; `.agents/`, `openspec/`, and `pnpm-workspace.yaml` were already untracked. No preexisting change was overwritten or reverted.
- Preexisting file hashes: `pnpm-lock.yaml` SHA-256 `8464B4B3314C73288CCD052B4D32942C5AD1D12742D0D949683F7BB58EF60478`; `pnpm-workspace.yaml` SHA-256 `FA19925FE1901A6A6343EB625EDFAE51BEBE4744C4C999F594587B5A723F05EA`.
- Baseline toolchain: Node.js `v24.14.0`, pnpm `10.32.1`, Next.js `15.3.3`, and `eslint-config-next` `15.3.3`.
- Baseline resolver graph: `eslint-import-resolver-typescript` resolves to both `3.10.1` through `eslint-config-next` and direct `4.4.5`.
- Baseline lint completed with one warning in `src/locales/server.ts`.
- Baseline typecheck and production build failed on preexisting Motion transition typing errors at `src/components/navigation-button.tsx:47`, `:96`, and `:101`. Per the approved scope guardrail, implementation paused before dependency or source mutations pending human approval.
- Human approval authorized only explicit Motion `Transition` annotations in `src/components/navigation-button.tsx`; the resulting typecheck, lint, and production build passed without changing transition values or behavior.
- Baseline screenshots were captured outside the repository in the system temp directory for desktop fallback, desktop `?to=Mauro`, desktop `?toName=Mauro`, and mobile `?to=Mauro`. They confirm fallback/query personalization and the initial responsive surface; headless animation capture cannot replace the final human interaction check for the full envelope transition, sections, music, and navigation.
- `pnpm-workspace.yaml` decision: retain its preexisting content unchanged and version it. pnpm 10 records approved dependency install scripts in `allowBuilds`; `sharp` and `unrs-resolver` are present in the resolved graph and their explicit approvals make clean installs reproducible.
- Approved toolchain decision: Node.js `24.x` (local baseline and current Vercel default LTS) with pnpm `10.32.1` (local baseline, lockfile v9, and `allowBuilds` support).
- Approved framework decision: Next.js `15.5.21`, the current security-patched Maintenance LTS release in the 15.x line, with `eslint-config-next` aligned at `15.5.21`.
- Resolver decision: aligning the direct dependency to `eslint-import-resolver-typescript@3.10.1` matches `eslint-config-next@15.5.21` and reduces the graph from two versions to one without an override.
- Final independent gates passed: `pnpm lint` (zero errors, one preexisting warning), `pnpm typecheck`, and `pnpm build` on Next.js `15.5.21`.
- The production build completed without a search-parameter Suspense/prerender error, so no change to `LetterAnimation` or an App Router boundary was necessary.
- Production-mode query checks preserved the unchanged precedence `to` → `toName` → translated fallback. Final screenshots remain in the system temp directory for human comparison; no test framework or repository asset was added.
- Vercel readiness uses standard Next.js conventions with Node.js `24.x`, pnpm `10.32.1`, a single pnpm lockfile, and `next build`; no `vercel.json` or deployment action was necessary.
- Human validation approved: the production build preserved the envelope, seal, opening animation, invitation transition, `?to=Mauro`, `?toName=Mauro`, fallback, current sections, music, navigation, and basic desktop/mobile behavior with no detected visual or functional regression attributable to this change.
