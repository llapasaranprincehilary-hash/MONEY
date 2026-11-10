# Merge v5 (v4 + bamboo alkansya): redesign + learn hero + Learning polish + design-chat changes

Base = MONEY-finuity-FINAL-v2-redesign (Bills first, triad colours, hide-numbers crossfade, new Fin card, Learn banner).
On top of it:

- Wallet cards (Balances): metal EMV chip + contactless waves on debit/savings/credit (credit: chip only), wallet
  illustration for e-wallets, banknote / coin / arrow symbols for cash / crypto / investments. Long names (>7 chars)
  drop under the logo and wrap instead of ending in "...". Brand colours kept.
- Dashboard wallet chips are mini wallet cards (logo, name, balance only; no chip). Still inside the "Wallets" toggle.
- "You owe" / "Owed to you" are two cards with people avatars and a due pill. Colours come from the triad
  (owe = careful, owed to you = calm), amounts use fmtBal so Hide works without a re-render.
- Expenses: "Where your money goes" pie by category (This month / Last month / All time), colours from the triad.
- Loans: every loan is a collapsed row (description, due, price); tap to open Settle, Adjust, menu. Open state is remembered.
- Fin's week: the redesign's calm checklist + level ring, plus a fold button (remembered in localStorage 'finLifeFold').
  Button label also says "You logged spending today" when that is why it is disabled.
- sw.js: cache name bumped to finuity-shell-v63.

Files touched on top of the redesign: app.js, index.html, ux.css, life.js, life.css, sw.js.

## Added in v4
- Learn hero (Z1, "learn-hero") with the supplied hand-and-money icon in the frame.
- Learning polish (Z2, "FINAL (3)"): coach-tip copy, lesson check/result review, challenge + button wording.
- Cash on Hand card shows the same hand-and-money art (white badge), e-wallets keep the wallet art, banks keep the chip.
- Fixes: lesson review data was never carried to the result screen; `.lrn-ri` class collision; lesson button contrast on light theme;
  push-notification text updated to the new "no-spend day" wording; sw.js cache v64.

## Added in v5
- Bamboo alkansya hero art from MONEY-finuity-FINAL-v4-alkansya (only learn.js/learn.css hero art changed there; it was built on the learn-hero build, not on v4, so it was merged in rather than replacing v4).
- Hand-and-money icon kept for Cash on Hand. sw.js cache v65.
