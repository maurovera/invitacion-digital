# Implementation Notes

## Baseline and retained files

- Initial application worktree: clean; the change directory was the only untracked path.
- Baseline commands before application mutation: `pnpm lint` passed with the existing unused-disable warning in `src/locales/server.ts`; `pnpm typecheck` and `pnpm build` passed.
- Retained SHA-256 hashes:
  - Indonesian resource: `BA8227A17CF972FFE6EB90D97864ADE8562A101C4745AEF8AE5F2AF41F295BAA`
  - favicon: `2D44E6226883C98A10C62A38BEADC9A605D28F257D62BDBB2D2AFF62D81BECD9`
  - audio: `A3195CA13FDCC4A8CF193C98A2C43FA3E376C81A1BD3D02F497B41B78E18FD76`
  - bride photograph: `44E2DC3C286839BCB52DDD3AEF8FD45BFAEE0E27128C90429F69F10549BD6483`
  - groom photograph: `BAC831BC6DF4CE23C523C276AAB48E531EBF04470F20624D66487FDA5245E7DF`

## Ownership decisions

- Wedding facts, collection order, asset paths, i18n keys, supported locales, and feature flags belong to `INVITATION_CONFIG`.
- Complete visible copy remains in locale resources. Component-local values are limited to presentation/animation constants, form state defaults, and existing interaction timings.
- `2027-10-15T16:00:00-03:00` and `2027-09-15T23:59:59-03:00` are temporary demo dates, not commercial content.
- The model remains wedding-oriented. Optional WhatsApp is only a typed future seam; no behavior or value was added.

## Retained risks and out-of-scope items

- Existing photographs, audio, favicon, and demo content still require a separate commercial licensing/editorial review.
- Known envelope clipping, seal visibility, responsive envelope, and ultrawide issues remain intentionally unchanged.
- RSVP remains simulated and music remains subject to browser autoplay policy.
