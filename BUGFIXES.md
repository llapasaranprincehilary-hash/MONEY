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

---

## VIP update merged (MONEY-final-vip)

Added from the VIP build: VIP plan + free-plan limits (`vip.js`/`vip.css`), Fin's week - levels, XP, weekly challenges, recap, reminders
(`life.js`/`life.css`), receipt scanner as a VIP perk with 3 free tries (`scan.js`/`scan.css`), badge tiers + streak freezes + secret badges
(`streak.js`), public Terms / Privacy / Refund pages with one shared text source (`legal-data.js`, `terms.html`, `privacy.html`,
`refund-policy.html`, legal version 3.0 - every user is asked to accept again), payments backend (`backend/`), deploy and legal checklists.
Service worker: `v51`, new files cached, plus the VIP build's background reminder.

How it was merged: the VIP build was made before the speed and UI work, so only its real changes were ported, never its older copies of shared
files (its `index.html`/`learn.css`/`streak.css` would have undone the faster transitions and the new dashboard).

Problems found and fixed while merging:
1. **Data-loss risk between the speed build and VIP.** The speed build delayed writing to storage by 300 ms; VIP's limit guard treats the stored copy as
   "last good copy" and rolls back to it when a change crosses a free-plan limit - so a rollback could silently drop edits made in the last
   300 ms. `save()` now writes storage immediately (cloud push stays debounced).
2. **Partial renders skipped the VIP/Fin's week cards.** `render()` calls `FinLife.tick()` and `FinVip.tick()`; the speed build's partial renders
   would have left the Fin's week card, the VIP card and the wallet meter stale. They are now part of every partial render.
3. `app.js` was dropped from the offline cache list by the VIP service worker (its script was inline there). Restored.
4. New scripts are `defer`red so they still load after the deferred Fin pet scripts, in the VIP build's order.
5. "Fin's week" sits in the new dashboard flow just above the Learn card; the VIP wallet meter is on Balances and the VIP card in Settings.

Verification: the 32 regression checks above (now 33, incl. count-up animation settling on the true balance) plus 17 VIP checks: Fin's week / VIP / streak
cards render, logging awards XP, storage is written immediately, a 7th wallet and a over-limit amount are blocked and rolled back **without losing the entry saved
just before**, upgrade sheet opens, receipt scan opens its sheet, terms/privacy/refund pages render, no console errors. Payments run in demo
mode until `backend/SETUP-PAYMENTS.md` is followed.

---

## Edge-case audit (after the VIP merge)

Checked and fine: local-date handling around midnight in Manila (UTC+8), Los Angeles (UTC-8) and Auckland (UTC+13) - today(), streak, Fin's week
and expense dates agree; income/goal/loan inputs of `''`, `0`, `-5`, `abc`, `NaN`, `Infinity`, huge numbers are rejected; HTML/script in
descriptions, notes, loan and goal names is escaped, and names with quotes keep working buttons; entries pointing at a deleted wallet do not crash;
an over-limit account (VIP expired) can still edit and delete but not grow; restoring a big backup on the free plan sticks; double-clicking
Add Expense logs once; hidden balances show no digits and unhide to the right total; XP, streak and entries survive a reload; wallet math is
rounded to centavos at every update; streak freezes only fire for exactly two missed days after a 3+ day streak and respect the cap.

Fixed: amounts typed with more than 2 decimals were stored as typed (0.004 saved as a "₱0.00" entry; 12.345 drifted from the wallet's rounded balance).
All amount inputs (income, expense, loan, goal, budget, loan payment, add-to-goal, wallet balance, and their edit forms) now round to whole
centavos before validation, so 0.004 is rejected and 12.345 becomes 12.35.

Known small quirk (left as designed): "days logged" totals count the two days a streak freeze covered.

---

## Design pass, triad colour, Bills first (this release)

**Look and feel**
- One triad of colours, driven by Settings > Appearance. The accent you pick is the "main" colour; the app adds two more 120 degrees
  around the colour wheel at the same perceived lightness (OKLCH, `applyTriad()` in app.js). Roles are fixed: main = yours / progress / buttons,
  calm = bills and money owed to you, careful = spending, overdue, over budget. Amber, purple and teal are gone; every old colour name now points
  at the triad. Appearance shows a live preview of the three.
- Warm neutrals (charcoal / paper) instead of cold black and grey. Inter for the interface; a soft serif (Fraunces) only for personal moments
  (greeting, the big number, card names). Sora is no longer loaded (one less font request).
- Flat surfaces with hairlines instead of glows and coloured outlines. The Fin's week card is a calm checklist with a level ring (the ring is the XP meter).
- "Test your money know-how" is a full banner with an original illustration (piggy bank, graduation cap, coin, quiz sheet). It uses the triad, so it
  follows Appearance. After the quiz it becomes a smaller card in the same style.
- Toasts sit above the bottom bar instead of on top of it. No more Android tap-highlight square on the eye button.

**Bills first (new)**
- Add bills (name, amount, due day, wallet). "Left to spend" becomes "Yours to spend, after bills": income - everything logged - bills still to pay.
- Pizza chart: bills are slices, paid ones ghosted, overdue in the careful colour, the rest is yours. Plus a plain equation under it.
- Mark paid logs a real expense, takes the money from the bill's wallet, and does not change "yours". Deleting that expense un-pays the bill.
  Logging the same name by hand (e.g. "Wi-Fi") also counts as paid, so nothing is counted twice.
- Import from your recurring expenses in one tap. Month rollover resets automatically.

**Hide numbers (rebuilt)**
- Hiding is now a CSS crossfade to bullets: no re-render, no flash, no layout jump. Everything on Home is covered (left to spend, income, spent,
  balance, wallets, owed, recent, Bills first, Fin's speech) and screen readers skip hidden amounts.
- Fin's dialogue, the coach and the VIP meter no longer say amounts out loud while numbers are hidden.

**Bugs fixed along the way**
1. First screen could paint before the deferred scripts (Fin's week, VIP, Bills) loaded and stay incomplete. The app now renders once more when all have loaded.
2. A full re-render fired 3.5 s after every launch (it rebuilt the dashboard mid-use). Removed; the add-ons are attached once instead.
3. One-tap repeat chips and the Automation card were only refreshed by full renders; partial renders now refresh them on their pages.
4. Hidden bullets were painted transparent (inherited text-fill); fixed and covered by a test that checks the paint colour.

**Verification** (headless Chromium, Firebase stubbed): 33 regression + 17 VIP + 26 edge-case + 13 hide-numbers + 39 Bills-first checks, all passing.
The hide-numbers test scans every amount, aria-label, title and Fin bubble on Home and Balances for leaks. Not covered: real Google sign-in and sync,
real payments, camera scan, background reminders, real phones.

### Learn banner v2 (Home)
The "Test your money know-how" card is now a hero banner in the style of an app-onboarding screen, at about the same size as the old pig banner
(about 420px tall on a phone): a bamboo alkansya (the traditional Filipino coin bank) with a face and a coin dropping into the slot, in a soft frame, four floating tilted lesson cards (Budgeting 101, Save First, Smart Spending,
Money Safety, the real lessons), the headline "Money for every you.", step dots and a full-width pill with an arrow. Colours are the triad,
so it follows Settings > Appearance. The whole banner is one keyboard-reachable button that starts the Starter Quiz; the cards are decorative.
After the quiz it turns into the smaller "For you today" lesson card. Side-by-side layout on desktop. Cache is now `v53`.

### Merge v4 (learn hero + Learning polish + design-chat features)
- Cash on Hand card uses the supplied hand-and-money icon (FinArt.handMoney in icons.js).
- Learning polish merged from "FINAL (3)": friendlier coach-tip copy, lesson check shows the lesson title, wrong answers dim,
  feedback has an icon + label, and lesson results list every question with the right answer. Two fixes on top of that file:
  the lesson result now actually carries the questions/answers (it was dropped, so the review never showed), and the review
  styles are scoped so they no longer collide with the starter-quiz review rows.
- Quiz right/wrong colours now come from the triad (accent / "careful") instead of fixed green/red.
- Lesson buttons use --on-accent so the text is readable on the light theme.
- Weekly challenge wording, the no-spend button ("Mark as no-spend day") and the reminder notification text were aligned.
- Everything from the earlier merge stays (wallet chip + type emblems, mini wallets, owed cards, expense pie, collapsible loans, Fin fold).
- Cache is now `v64`.

### Merge v5 (bamboo alkansya)
- Learn hero art is now the bamboo alkansya (from the alkansya build). Its colours come from the accent, so it follows Settings > Appearance.
- The hand-and-money icon stays on the Cash on Hand card. To use it in the hero instead, swap `ART_ALKANSYA` for `FinArt.handMoney()` in learn.js (dl-frame).
- Frame is a light card behind the art so the bamboo reads on both themes. Cache is now `v65`.

### Merge v6 (smaller card icons)
- On the full wallet cards the metal chip, contactless waves, wallet illustration, cash badge and the other type symbols are about 30% smaller. Cache is now `v66`.

### Merge v7 (interest on wallets and loans)
- Wallets can have an annual interest / yield rate (daily, monthly, quarterly or annual). Interest is credited to the balance and logged as income.
  The rate shows next to "Updated" on the card. Credit cards are skipped.
- Loans can have an interest rate and how often it is applied (daily to annual). It compounds, shows as a badge on the loan, and the loan
  keeps its own interest history. "Make a payment" (or "Record payment received" for money owed to you) and "Adjust" replace Add/Deduct.
- The engine runs on app start after sync. It uses the last-accrual date, so it never double-charges, and changing a rate does not back-charge.
- Fixes made while merging the interest update:
  - `mtConfirm` now accepts `{rawHtml, wide, confirmLabel, cancelLabel}`. Without it the payment and adjust forms showed raw HTML and failed
    with "Enter a valid amount". Plain confirms are unchanged.
  - A payment on a loan someone owes YOU now adds money to the wallet and is logged as income (it used to deduct from the wallet and log an expense).
  - Loan interest is no longer logged as an expense. It only grows the balance; logging it too made the payoff count twice. It is kept in the loan's history.
  - A payment larger than the balance is capped at the balance.
- Cache is now `v67`.

### Merge v8 (top bar / status bar colour)
- From MONEY-FINAL (6): the top bar is now almost solid (97%) and a same-colour strip covers the notch area, so the phone's status bar and the
  top bar read as one piece and page content no longer shows through. The patch hard-coded the old cool-black/white colours, so it was
  adapted to this build's warm palette: everything now follows the real page background (`--bg`).
- `syncThemeColor()` sets the status-bar colour (meta theme-color) from `--bg` for every theme and accent. Before, switching light/dark while a
  custom accent was set left the old colour in place.
- `manifest.json` theme_color / background_color were still the old light grey (#f0f0ed); now #f6f2ea, matching the real default background.
- A tiny script in the head sets the dark status bar before first paint, so dark-theme users no longer get a light flash at launch.
- Cache is now `v68`.

### Merge v9 (Learn page redesign)
- From MONEY-FINAL (7): the Learn page home is a calmer layout: a level strip with progress, one pinned "from your numbers" insight, the quiz banner,
  topic filter chips and a lesson shelf (icon, title, one-line intro, minutes or done score). Lessons now carry a `topic`.
- Kept the notice that quiz scores are saved to the account and may be used, without your name, in school research. The update had dropped that
  sentence, and it is not stated anywhere else in the app or the legal pages.
- Selected filter chip text uses `--on-accent` (it was dark on the dark-green accent in the light theme).
- Heads-up (design, not changed): each topic has exactly one lesson, so a filter chip shows a single lesson. Chips only become useful with more lessons per topic.
- The insight list was cut from three to one pinned insight; the "Try it in FINUITY" shortcut still appears when a lesson ends.
- Cache is now `v69`.

### Merge v10 (Learn pictures)
- From MONEY-FINAL (8): `learn-images.js` holds 10 embedded JPEGs (one per lesson, 400x220, and 3 hero backgrounds, 1200x360). Lessons show their picture
  instead of an icon, and the Learn page has a picture banner with 3 dots to switch it (remembered in `finLearnBg`). Images are decorative (empty alt).
- Fixes made while merging:
  - `learn-images.js` was missing from the service worker's precache list, so Learn pictures would not have worked offline. Added.
  - Reading `localStorage` at the top of learn.js was unguarded: where storage is blocked (some private modes) the whole Learn module failed to load.
    Now wrapped; the picture falls back to the first one.
  - The 7px switcher dots were too small to tap; they now have a ~26px tap target, are real buttons with `aria-pressed`, and switching swaps the image in
    place instead of re-rendering the page.
- Heads-up on the pictures themselves: they look like stock/web images, so make sure you have the right to use them. `bg3` has a caption baked into the
  image that is already cut off at the bottom of the file, and text inside a picture cannot be translated or recoloured. To drop it, remove `'bg3'` from
  `LEARN_BG_KEYS` at the bottom of learn-images.js.
- Cache is now `v70`.
