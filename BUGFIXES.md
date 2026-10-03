# FINUITY – bug-fix notes

## Data-integrity / logic bugs fixed
1. **Loan payments were one-way.** Logging a "Loan Payment" expense reduced the loan, but editing or deleting that expense never touched the loan again (debt stayed paid off). Expenses now remember `loanId` + `loanApplied`; delete, edit and "↻ Repeat"/Undo keep the loan balance correct (including over-payment clamping and auto-unsettle).
2. **Cloud sync could erase newer data.** If the first cloud read failed (offline start), the app still marked itself "synced" and the next save overwrote the cloud copy with the stale local copy. Pushes are now blocked until a real comparison happened; the first sync is retried on focus / back online.
3. **Failed upload lost its "pending" flag**, letting a later pull overwrite unsaved local changes. Flag is kept until the upload succeeds.
4. **Cloud/backup data was loaded raw.** Missing fields (goals, loans, nextId…), string amounts (`"100"` → string concatenation in totals), duplicate/missing ids (un-removable rows, wrong edits) are now normalised by one `normalizeState()` used for local, cloud and backup loads.
5. **Restore backup merged instead of replaced** (`Object.assign`), leaving stale loans/goals/expenses and a too-low `nextId` (id collisions). Both restore paths now replace the whole state safely.
6. **Dates parsed as UTC** (`new Date("2026-10-01")`): in time zones west of UTC budgets, reports, dashboards, recurring checks and loan due-dates landed on the previous day/month. All use a local `ldate()` now (incl. the Fin pet).
7. **Hard-coded year 2026** for income without a year (charts, CSV, report, backup migration) → current year / entry year.
8. **Startup reminders fired on the login/PIN screen or before cloud data arrived**; now wait until signed-in, unlocked and synced. Auto-logging (recurring/goal auto-save) also waits for the first sync.
9. Goals could be saved with a negative "saved" amount.

## Security / robustness
10. **PIN brute force**: unlimited tries on a 4-digit PIN. Now 5 wrong tries → growing lock-out (30s … ~32 min), applied to unlock and "clear data" PIN prompts.
11. CSV/report/backup downloads: object URL was revoked immediately (can cancel the download in Safari/Firefox) – delayed and anchor attached.
12. Service worker: icon URLs with `?v=2` never matched the cache list, offline deep-links with query strings missed the cache; cache bumped to `v23`.
13. Removed duplicate `getWakeLine` declaration in `pet-dialogue.js`.

Verified with ESLint (no new errors) and jsdom behaviour tests (original fails the loan-payment and offline-sync scenarios; patched passes).
