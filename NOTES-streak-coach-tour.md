# Streak & Badges, Fin the Coach, and the Guided Tour

How the three pieces fit together, and how to extend them.

## 1. Streak & Badges  (`streak.js`, `streak.css`)

- **One source of truth.** Stored in `state.streak` (so it syncs with the account). Fin, Settings and the dashboard all read from `FinStreak`.
- **What counts as a "logged day":** an expense, income, loan add/payment/settle, goal saving, or a wallet balance update.
  Entries the app fills in automatically (recurring bills and automated income) do **not** count, but tapping "log this bill now" does. A day only counts once.
- **Rest day:** one missed day is forgiven per week if the days on both sides were logged. Two missed days in a row break the streak.
- **Existing accounts** start with the history they already have (auto-generated entries are left out); badges they already qualify for are granted silently (no pop-ups).
- **Where it shows:** Settings (card at the top, tap for the full "Streak & Badges" screen), and a small chip on the dashboard.
- **Add a badge:** add an entry to `DEFS` in `streak.js`, then a condition in `evalBadges()`.

State shape: `state.streak = { days:['YYYY-MM-DD',...], best, total, badges:{id:date}, lastCur, seeded }`

## 2. Fin the coach  (`virtual-pet/pet-coach.js`)

- Listens to what the person does and, when it has something useful, adds **one** short piece of real teaching
  (pay yourself first, 50/30/20, 80/20 spending rule, 24-hour rule, habit stacking, avalanche vs snowball,
  zero-based budgeting, reconciling, spaced repetition, growth mindset).
- **Single voice:** reactions from one action are collected for ~0.65 s and only the highest-ranked one is spoken.
- **Polite:** goes through `FinPet.coach()`, which respects Fin's Quiet mode, the tour, the splash/sign-in screens,
  and never replaces an open menu, a text box, a question with 2+ buttons (like the tour offer), or a bubble the person is hovering over.
- **Cool-downs** are stored in `state.coach.seen` so the same tip never repeats too soon.
- **Add a reaction:** write a handler in `pet-coach.js`, call `say(text, [actions], {rank, priority})`, register it with `on('fin:...', fn)`.

## 3. Guided tour  (`virtual-pet/tour.js`, `tour-steps.js`)

One list serves both phone and desktop; targets that are not on screen are skipped automatically.
New step options: `requires` (only show when an element is visible), `before` / `after` (hooks, e.g. open and close the More sheet),
`late` (target is drawn after the page opens), `mobileCap` (spotlight only the top part of very tall forms on phones).
The tour also accounts for the sticky Money tab strip so targets are never hidden under it.

## Events (all `window` CustomEvents)

`fin:expense-logged`, `fin:income-added`, `fin:loan-added|adjusted|settled`, `fin:goal-added|progress`, `fin:budget-saved`,
`fin:wallet-added`, `fin:balance-updated`, `fin:learn-complete`, `fin:learn-quiz`,
`fin:streak-up`, `fin:streak-rest`, `fin:streak-broken`, `fin:badge`.


## 4. Icons and layout  (`icons.js`, `icons.css`, `ux.css`)

- **Custom icon set** (`icons.js`, 91 stroke icons drawn to match the navigation icons) replaces emoji everywhere in the interface.
  Use `FinIcons.ic('flame')` in JavaScript, or `<svg class="ic"><use href="#i-flame"/></svg>` in HTML. Icons take the colour of the text around them.
- **Add an icon:** add a line to the `I` object in `icons.js` (24x24 grid, stroke only).
- **Old emoji still passed in by older code** (dialog icons, Fin's button labels) are converted through `FinIcons.map`;
  `FinIcons.strip()` removes decoration from plain-text places (toasts, Fin's speech). Fin's wording files were left untouched.
  Toast messages are only cleaned when displayed, because Fin matches the original text to react to them.
- **Categories** keep plain names in `CAT_LABELS` (CSV, reports, charts) and get an icon + colour from `CAT_ICON` / `catHTML()`.
- **Entry actions:** each income, expense, loan and goal row has one "more" button (`rowMenu`) with Edit / Repeat / Remove, instead of 2-4 text buttons.
  Loans keep Settle visible. Add actions in `ROW_ACTIONS`.
- **Phone layout** (`ux.css`): the Money tab bar is five equal icon-over-label tabs, the duplicate page title is hidden (the top bar already shows it),
  and the expense filter chips scroll in one row.
- Flags (language and currency) are intentionally left as flag emoji because they are information, not decoration.
- `admin.html` still uses a few emoji (internal tool, not changed).

## 5. Top bar streak + Profile  (`index.html`, `streak.js`)

- The top-right settings gear is now a **streak button** (`#tb-streak`, flame + day count). Tap it to open Streak & Badges. Orange when a streak is running, amber dot when today is not logged yet. Drawn by `FinStreak.renderTop()`.
- The phone nav's **More** tab (and the More sheet) is now **Profile** (`show('settings')`, still the `#settings` section internally). Shows the profile photo in the tab when one is set. Export stays highlighted under Profile.
- Profile menu is grouped: Account (Personal info, PIN & Security, Data & Backup), Preferences (Appearance, Language & currency, Automation), Tools (Export, Install, Guided tour), About (Privacy & Legal, About).
- The dashboard streak chip was removed (the top bar shows it now).
- Fixed: on 601-900px screens the Profile column was capped at 560px and centred while the top bar spanned the full width. It now fills the same width.
- Tour: new "Your streak" and "Profile" steps replace the Settings / More / Open Settings steps. Service worker cache bumped to v29.


## Life layer (life.js / life.css)

Makes the app feel alive. Additive: it only listens to the existing `fin:*` events and to `render()`.
State is kept in `state.life` (syncs with the account). Entry points: `FinLife.tick()` (called from `render()`), `FinLife.celebrate(kind)`, `FinLife.addXP(n)`.

1. **Celebrations**: confetti canvas, vibration and an optional chime for badges, streak milestones, goals, loans, lessons and level-ups. Three switches (Confetti, Vibration, Soft chime) live in the Streak panel; sound is off by default. Respects `prefers-reduced-motion`.
2. **Fin grows**: XP from real habits (logging is capped at 40 XP a day so it can not be farmed). Five levels: Pocket Change, Penny Saver (scarf), Budget Buddy (twinkles), Wealth Wings (wings), Money Legend (gold aura). Accessories are pixel art injected into Fin's SVG in `applyFin()`; edit `WING`, the scarf rows and `LEVELS` to retouch. Existing users are seeded with some XP so they do not start at zero.
3. **Numbers move**: the hero balance, the stat tiles and the month snapshot count up/down when they change (`countUps()`). Hidden balances are skipped.
4. **Come-back tools**: streak freeze (streak.js: earned at the 7/14/30/60/100-day milestones, hold 2, auto-covers two missed days only when the streak would break) and an optional daily reminder notification (Streak panel). The reminder works while the app is open, and in the background on installed Chrome/Android apps via periodic sync (sw.js reads `finuity-life-data`). There is no server push, so a closed iOS app will not be reminded.
5. **Weekly challenges**: three a week (one habit, one money, one growth), rotating by week number. "Nothing spent today" logs a no-spend day that counts for the streak. Weekly recap sheet (`openRecap()`) compares last week with the week before; Fin offers it at the start of a new week.
6. **Fin's little ways**: occasional wave/think/happy/sleepy, eyes that follow the pointer by one pixel, and a once-a-day check-in. Fin now speaks one message at a time (the most important one wins).
7. **Empty screens**: Fin adds a friendly line and a button to the common empty states (`EMPTY` map in life.js).

Badges (streak.js): 28 now. Tiers (bronze/silver/gold) on streaks, entries and goals; 6 secret badges shown as ??? until earned (night owl, early bird, welcome back, zero hero, saved by the freeze, Fin is a legend) plus "Perfect week".

Service worker cache bumped to `finuity-shell-v30`.


## VIP (vip.js / vip.css / backend/)

Free plan limits (edit `CFG` at the top of `vip.js`): 6 accounts, P150,000 total balance, single entries up to P500,000, savings-goal targets up to P5,000,000 (a target is a plan, not money held).
VIP: 20 accounts, P10,000,000, 3 streak freezes, a star on Fin. Prepaid plans: P49 / 1 month, P129 / 3 months, P399 / 12 months.

- `save()` is wrapped: a change that would push a free user over a limit is undone and the upgrade sheet opens. Existing
  over-limit data is kept ("grandfathered"): people just cannot add more. A backup restore waives the free limits but never the hard VIP ceiling.
- VIP status is read from Firestore `entitlements/{uid}` (written only by the webhook), cached in localStorage, and is NOT in `state` (not editable, not exported).
- Demo mode (localhost or `localStorage.finVipDemo='1'`) lets you test the whole flow without paying.
- `backend/functions` = Cloud Functions for PayMongo checkout + webhook. `backend/SETUP-PAYMENTS.md` = step-by-step to make it real.
- Service worker cache is `finuity-shell-v31`.

Final-check notes: both themes (dark/light) and 320-1280px widths were audited; sheets lock page scroll, trap keyboard focus, close on Escape, and plan options respond to the arrow keys. Tap targets are 44px or larger.

Receipt scanner = VIP perk (vip.js): the existing on-device scanner (Tesseract) is wrapped. Free users get `CFG.scanTrial` (3) finished scans, counted per account on the device (localStorage `finScanTrial:<uid>`), shown as a "3 free" badge on the Scan Receipt button that becomes "VIP"; after that the button opens the upgrade sheet. VIP is unlimited. Photos are still read on the phone and never uploaded. Set `scanTrial:0` for VIP-only. The trial counter is a soft gate (clearing site data resets it).


## Receipt scanner (scan.js / scan.css, backend scanReceipt)

One "Scan Receipt" button, two readers:
- **Smart scan (VIP)**: live camera with guide frame (or photo from gallery) -> your server (`scanReceipt` Cloud Function) -> a vision model reads store, date, time, items, VAT, address, total -> the server validates the answer -> a review panel -> the Add Expense form.
  The VIP check, the API key and a 40-scans-a-day cap all live on the server, so it can not be bypassed from the browser. Needs `CFG.api.scan` in vip.js.
- **Quick scan (on-device, 3 free tries, then VIP)**: the original Tesseract reader. Same camera and review panel. The free-try counter is in the browser (resettable, harmless).
- Demo mode (localhost or `finVipDemo=1`) shows a pretend receipt for Smart scan so the whole flow can be tried without a server.
- If Smart scan fails (offline/server error) a VIP user falls back to the on-device reader automatically.
- Service worker cache is `finuity-shell-v32`.

Demo mode (pretend VIP) is now localhost-only; on a real website it cannot be switched on from the console (CFG.demoFlag is for automated tests). See DEPLOY-GITHUB.md for publishing.

## Legal text (legal-data.js, terms.html, privacy.html, refund-policy.html)
One source for the in-app screens and the public pages; plan numbers are filled in from vip.js. Version 3.0 forces re-acceptance. See LEGAL-CHECKLIST.md. Service worker cache is finuity-shell-v33.
