# FINUITY – Bug-fix & Merge Notes

## FINAL BUILD — All three codebases merged

This is the definitive build, merging:
- **MONEY-main-fixed** – base fixes (data integrity, cloud sync, PIN security)
- **MONEY-final-vip** – VIP system, payment history, legal pages, receipt scan, backend
- **MONEY-finuity-merged** – UI/UX (new dashboard, Fin dock, a11y, partial renders, speed tokens)

---

## Data-integrity / logic bugs fixed

1. **Loan payments were one-way.** Logging a "Loan Payment" expense reduced the loan, but editing or
   deleting that expense never touched the loan again. Expenses now remember `loanId` + `loanApplied`;
   delete, edit and "↻ Repeat"/Undo keep the loan balance correct (including over-payment clamping and
   auto-unsettle).
2. **Cloud sync could erase newer data.** If the first cloud read failed (offline start), the app still
   marked itself "synced" and the next save overwrote the cloud copy with the stale local copy. Pushes
   are now blocked until a real comparison happened; the first sync is retried on focus / back online.
3. **Failed upload lost its "pending" flag**, letting a later pull overwrite unsaved local changes. Flag
   is kept until the upload succeeds.
4. **Cloud/backup data was loaded raw.** Missing fields (goals, loans, nextId…), string amounts
   (`"100"` → string concatenation in totals), duplicate/missing ids (un-removable rows, wrong edits)
   are now normalised by one `normalizeState()` used for local, cloud and backup loads.
5. **Restore backup merged instead of replaced** (`Object.assign`), leaving stale loans/goals/expenses
   and a too-low `nextId` (id collisions). Both restore paths now replace the whole state safely.
6. **Dates parsed as UTC** (`new Date("2026-10-01")`): in time zones west of UTC, budgets, reports,
   dashboards, recurring checks and loan due-dates landed on the previous day/month. All use a local
   `ldate()` now (incl. the Fin pet).
7. **Hard-coded year 2026** for income without a year → current year / entry year.
8. **Startup reminders fired on the login/PIN screen** or before cloud data arrived; now wait until
   signed-in, unlocked and synced. Auto-logging (recurring/goal auto-save) also waits for first sync.
9. Goals could be saved with a negative "saved" amount.
10. **Amount rounding:** amounts typed with more than 2 decimals were stored as typed (0.004 saved as
    "₱0.00"; 12.345 drifted from the wallet's rounded balance). All amount inputs now round to whole
    centavos before validation.

## Security / robustness

11. **PIN brute force**: unlimited tries on a 4-digit PIN. Now 5 wrong tries → growing lock-out
    (30s … ~32 min), applied to unlock and "clear data" PIN prompts.
12. CSV/report/backup downloads: object URL revoked immediately (can cancel the download in
    Safari/Firefox) – delayed and anchor attached.
13. Service worker: icon URLs with `?v=2` never matched the cache list; cache bumped to `v52`.
14. Removed duplicate `getWakeLine` declaration in `pet-dialogue.js`.

## UI/UX build (dashboard, Fin dock, speed)

15. **Light theme flashed dark on every load.** The "apply light theme before first paint" script had
    been pasted inside an HTML comment (dead code). Now a real script at the start of `<body>`.
16. **Fin's speech bubble was cut off** the left edge of the screen when docked. Bubble now opens
    down/right when docked, and flips automatically if it would leave the viewport.
17. 320px phones: card title, action button and expand chevron wrapped onto separate lines; now one row.
18. **Faster paint/interaction:** every `transition:all` replaced by specific transition properties;
    `.card{contain:content}`; shorter section/progress animations; Google Fonts no longer block first paint.
19. **Less work per render:** expenses filtered once and reused; repeated `getElementById` calls cached;
    `rerender()` uses coalescing `scheduleRender()`.
20. **Mobile tab bar labels** corrected: Income / Spend / Loans / Wallets / Goals (was: Expenses /
    Balances) — matching the guided-tour text.

## Partial rendering (speed build)

21. **Partial renders:** after one action only what changed is rebuilt instead of all 9 sections.
22. **Streak never advanced on logging** — `FinStreak.tick()` was only called by the full render.
    Now part of every partial render.
23. **Dashboard Learn card / insights went stale** (`FinLearn.render()` was skipped). Fixed.
24. **Guest "not backed up" sheet** could not trigger after adding entries. Fixed.
25. **Goals badge in the nav stayed wrong** after adding/removing a goal. Fixed.
26. **Visible page could go stale**: pages that read cross-section data (goals/loans/wallets) now always
    refresh the on-screen page too.
27. A queued partial render no longer leaves stale entries after a full render.

## VIP / payments build

28. **Data-loss risk:** the speed build delayed writing to storage by 300 ms; VIP's limit guard treated
    the stored copy as "last good copy" and could silently drop edits. `save()` now writes storage
    immediately (cloud push stays debounced).
29. **Partial renders skipped VIP/Fin's week cards.** `FinLife.tick()` and `FinVip.tick()` are now
    part of every partial render.
30. `app.js` was dropped from the offline cache list by the VIP service worker. Restored.

## VIP UX improvements (from MONEY-final-vip)

31. **Payment history panel**: users can view all VIP purchases with dates and amounts, accessed from
    the VIP card in Settings.
32. **Expiry nudge**: a friendly in-app reminder from Fin when VIP has ≤7 days left (once per day,
    never nagging), and a one-time note when VIP has just expired.
33. **"Ending soon" VIP card**: the Settings VIP card shows a prominent warning and "Renew" CTA when
    ≤7 days remain.
34. **Ended VIP state**: free-plan card shows "VIP ended [date]" and a "Renew" button.
35. **Calendar-month VIP duration**: `addMonths()` on the server so "12 months" is exactly a year
    (30-day months shortchanged buyers by 5 days). Fixed in `backend/functions/index.js`.
36. **Maya (PayMongo) payment method**: added with automatic fallback to GCash/QR Ph if not activated.
37. **Payment history stored server-side**: every payment is appended to `entitlements/{uid}.history`
    so it survives clearing browser storage.
38. **Admin VIP manager**: `admin.html` now has a full VIP manager panel backed by the new `adminVip`
    Cloud Function — look up users by email or UID, grant/set/revoke VIP, view history, all logged.
39. **Account deletion cleanup**: `deleteMyData` Cloud Function removes server-side VIP and scan
    records when a user deletes their account. `app.js` calls it before deleting the Firebase account;
    `FinVip.cleanupLocal()` wipes related localStorage keys.

## Edge-case audit (confirmed passing)

- Local-date handling around midnight in Manila (UTC+8), Los Angeles (UTC-8) and Auckland (UTC+13).
- Income/goal/loan inputs of `''`, `0`, `-5`, `abc`, `NaN`, `Infinity`, huge numbers are rejected.
- HTML/script in descriptions, notes, loan and goal names is escaped.
- Entries pointing at a deleted wallet do not crash.
- An over-limit account (VIP expired) can still edit and delete but not grow.
- Restoring a big backup on the free plan sticks.
- Double-clicking Add Expense logs once.
- Hidden balances show no digits and unhide to the right total.
- XP, streak and entries survive a reload.
- Wallet math is rounded to centavos at every update.
- Streak freezes only fire for exactly two missed days after a 3+ day streak and respect the cap.

## Service worker cache (v52)

All files verified in the offline cache list:
`./`, `./index.html`, `./manifest.json`, icons, `./app.js`, `./learn.js`, `./streak.js`, `./ux.css`,
`./life.js`, `./vip.js`, `./scan.js`, `./legal-data.js`, `./terms.html`, `./privacy.html`,
`./refund-policy.html`, `./a11y.js`, `./virtual-pet/pet.js`, `./virtual-pet/fin-dock.js`,
`./virtual-pet/fin-ambient.js`, `./virtual-pet/pet-coach.js`, `./virtual-pet/pet-dialogue.js`,
`./virtual-pet/tour.js`, `./virtual-pet/tour-steps.js`, Firebase SDK scripts.
