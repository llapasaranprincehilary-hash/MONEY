# FINUITY v16 — final release review

## Automated checks completed
- All JavaScript files pass `node --check`.
- Personalized learning scenarios pass the included Node test harness (`node tests/personal-learning.test.cjs`).
- Static release audit passes: local links/references across all HTML pages, duplicate IDs in `index.html`, CSS parsing, and 43 service-worker precache entries.
- ZIP integrity check passes after packaging.

## Environment limitation
- A Chromium runtime smoke test was attempted, but browser navigation is blocked by the execution environment's administrator policy (`ERR_BLOCKED_BY_ADMINISTRATOR`). Therefore real UI flows, authentication, mobile layout, and browser console behavior are **not runtime-verified here**.

## Before public launch
- Add/confirm the registered business address in `legal-data.js` (`LEGAL_ADDRESS` is currently blank).
- Have the Terms, Privacy, and Refund policy reviewed for the actual business and Philippine requirements; confirm the email/support/refund promises are operational.
- Follow `DEPLOY-GITHUB.md`: configure GitHub Pages, Firebase authorized domain, API restrictions, Firestore ownership rules, and replace the backend CORS placeholder with your exact deployed origin.
- Payment, Smart receipt scanning, and closed-app reminders require their backend setup described in `backend/SETUP-PAYMENTS.md`; do not advertise them as live until tested.
- After deployment, run the manual smoke test from a real phone and desktop browser: sign-up/sign-in, add/edit/delete transactions, wallets, goals, loans, backup/restore, allowance mode, Learn and personalized challenges, theme, offline reopen, and logout/delete account.

## Release status
**Release candidate — not fully launch-cleared.** Static checks and targeted logic tests passed; the browser runtime and business/legal deployment checklist remain outstanding.
