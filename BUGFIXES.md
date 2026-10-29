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

---

## Merge notes (UI build + speed/UX build)

Base = the UI build (light theme, new dashboard, Fin dock, a11y). Ported from the speed/UX build:
- **Faster paint/interaction:** every `transition:all` replaced by the specific properties that actually animate (index.html, learn.css, streak.css, tutorial dots); `.card{contain:content}`; shorter section/progress animations; Google Fonts no longer block first paint.
- **Less work per render:** this month's expenses filtered once and reused for total + category split; repeated `getElementById` calls cached in the dashboard/income/expense renderers; `rerender()` (currency change) uses the coalescing `scheduleRender()`.
- **UX:** mobile tab bar reads Income / Spend / Loans / Wallets / Goals, matching the guided-tour text (the UI build still said Expenses / Balances, so the tour pointed at tabs with different names).

Fixed while merging:
1. **Light theme flashed dark on every load.** The "apply light theme before first paint" script had been pasted inside an HTML comment (dead code). It is now a real script at the start of `<body>`.
2. **Fin's speech bubble was cut off the left edge of the screen** when Fin sits in the dashboard card (and could do the same when dragged near an edge). The bubble now opens down/right when docked, and flips automatically if it would leave the viewport.
3. 320px phones: the card title, action button and expand chevron wrapped onto separate lines; they now stay on one row.
4. Kept the UI build's higher-contrast text colours, the speed build had the older, lower-contrast greys.
5. Service worker cache bumped to `v44` (includes `fin-dock.js` and `a11y.js`); `pet.css`/`pet.js`/`pet-dialogue.js` line endings normalised to LF.

Checked: all JS parses; zero console/page errors on mobile 390px, 320px and desktop 1360px in light and dark; every section renders identically to the UI build on the same data (differential test) and totals reconcile; no horizontal scroll; every file the page loads is in the offline cache.

## Fin on the opening screens
- Fin no longer floats over the "Word for Today" splash or the sign-in / PIN screens (he was covering the "Let's go" button). While one of those screens is up the real Fin is hidden and non-clickable, and a small, non-clickable Fin peeks over the top-left corner of the verse card (ducking and blinking), behind all content; he is anchored to the card so he stays on its corner at any screen size. When the screen closes the real Fin fades back in. (`virtual-pet/fin-ambient.js` + the "fin-ambient" block at the end of `pet.css`; cache bumped to `v45`.)

## Opening screen: the verse is the hero
- Removed the "Good afternoon, Rey - here's your finances for today" line (the dashboard already greets you by name).
- Verse / tip text is now the largest thing on the screen (19-25px, scales with the phone), in a wider, softer card; the logo, title and subtitle are smaller so they support instead of compete. Spacing is symmetrical (equal left/right margins, content vertically centred). Cache bumped to `v47`.

## Opening screen: design pass
One centre axis, one focal point (the verse), 8px rhythm. Brand row -> card (Fin peeks over its top edge, centred) -> full-width button -> date.
- Verse and its reference are grouped and centred together (they used to drift apart on short verses); the card keeps a steady height so the button never jumps when the verse changes.
- "Word for Today / Money tip" tabs never wrap onto two lines; tip sources are sentence case instead of forced caps.
- Auto-advance progress is a short inset line instead of a sliver riding the card's rounded corner.
- Button matches the card's width and uses white-on-green text for readable contrast.
- Block sits slightly above true centre (optical centring). Cache `v49`.

---

## Final merge: UI build (v5) + speed build (fixed-final)

Base = the UI build (new dashboard, Fin dock, a11y, light theme). Ported from the speed build:
- **Partial rendering.** After one action only what changed is rebuilt instead of all 9 sections
  (`renderAfterExpense/Income/Loan/Goal/Wallet/Budget/Settings/Hide`, `_schedulePartial`, page-aware `show()`).
- **Faster, tokenised motion.** `--tr-enter/spring/exit/micro` tokens and the shorter section/modal/progress
  animations (20 CSS lines; timing properties only, verified line-by-line - no colours/layout touched).
- Cached repeated `getElementById` lookups (`exp-search`, `budget-input`).

Bugs found in the speed build's partial-render code and fixed while merging:
1. **Streak never advanced on logging**, `FinStreak.tick()` was only called by the full render. Now part of every partial render.
2. **Dashboard Learn card / insights went stale** (`FinLearn.render()` was skipped). Fixed.
3. **Guest "not backed up" sheet could not trigger** after adding entries (`renderGuestBanner` skipped). Fixed.
4. **Goals badge in the nav stayed wrong** after adding/removing a goal (`updateBadges` skipped). Fixed.
5. **Visible page could go stale**: goals read expenses/budget, settling a loan adds an income row, wallet removal
   touches loans. Rule added: the page on screen is always refreshed too; every other page is rebuilt by `show()` when opened.
6. **Pages with no partial mapping** (Export) and navigating in the same frame as an action fall back to / stay correct via a full render.
7. A queued partial render no longer leaves stale entries behind after a full render.
8. Extra speed: list pages that are not on screen (Expenses/Income/Loans/Goals/Settings) are not rebuilt by partial renders.

Kept from the UI build: new dashboard, Fin dock/ambient, a11y.js, high-contrast colours, light-theme-first-paint fix,
manifest colours. Service worker cache bumped to `v50`.

Verification (headless Chromium, Firebase stubbed, seeded data): 32 checks. After every action (expense, income, goal, budget,
loan add/settle, hide balances, Export page, same-frame navigation) the visible page is identical to a full `render()`, and every
page opened afterwards is identical to a full render; badges update; no console/page errors; no horizontal scroll at 390px/320px;
`addExpense` makes zero full `render()` calls. ESLint: no new findings vs. either source build. All files are in the offline cache list.
