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
