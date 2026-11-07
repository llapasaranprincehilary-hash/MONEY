# Legal pages: what changed, and what YOU must confirm

I am not a lawyer. This is a careful draft written for the Philippines (Data Privacy Act, E-Commerce Act, consumer protection)
and for how FINUITY now actually works. **Please have a Philippine lawyer review it before you take real payments.**

## Where the text lives
- `legal-data.js` is the single source. Edit the text there.
- In the app: the sign-up screen, the login screen and Settings use it.
- On the web (give these links to PayMongo, Google sign-in, app listings): `terms.html`, `privacy.html`, `refund-policy.html`.
- Plan limits and prices in the text are filled in automatically from `vip.js`, so they can not drift from the real numbers.
- The version is now **3.0**. Every existing user must read both documents to the end and accept again the next time they open the app.
  Change `LEGAL_VERSION` again whenever you make a material change.

## What I added or fixed
- Privacy no longer says "we do not collect photos or camera data" (the scanner uses the camera; Smart scan uploads receipt photos).
- New: Free and VIP Plans, Payments, Billing and Refunds, Receipt Scanning, Fin/streaks/badges (no cash value), Reminders.
- Parent/guardian permission for under-18 students, including for purchases.
- PayMongo and the AI provider named as processors; what is and is not sent to each.
- Privacy: payment records, receipt handling, retention, local-storage items, the VIP and scan-counter records.

## Fill in (the pages work without these, but you should add them)
- `LEGAL_ADDRESS`: your registered business address. `LEGAL_REG`: DTI/SEC registration number (optional).
  Online sellers are generally expected to identify themselves; ask your lawyer what is required for you.

## Business decisions I made for you. Change them if you disagree (then keep legal-data.js, the app and your practice in step)
| Decision | What the text promises |
|---|---|
| Refund window | Full refund, any reason, within **7 days of the first VIP purchase** (`LEGAL_REFUND_DAYS`) |
| Problems | Double charge, charged but not activated, or the service seriously failing: refund |
| After 7 days | Not refundable; unused time not refunded (unless the law requires) |
| Support reply time | "We aim to reply within **3 business days**" |
| Refund speed | "Normally within **7 business days** of approval" |
| Activation help | If VIP has not appeared after **30 minutes**, email us |
| No auto-renew | One payment per purchase; never charged again unless they buy again |
| Account deletion | Remaining VIP time ends, no refund (after the refund window) |
| Smart scan fair use | **40 scans a day** (`LEGAL_SCANS_PER_DAY`, must equal `SCANS_PER_DAY` in the server code; a test checks this) |
Do not promise anything you cannot do. If you cannot reply in 3 business days, change the text.

## Things the text says that you must make true
1. **Delete on request.** The Privacy Policy says VIP and scan-counter records are removed when someone deletes their account.
   This is now automatic once you set `deleteData` in `vip.js` (see SETUP-PAYMENTS.md, section J). Payment records are kept on purpose (law).
   If the server was unreachable at that moment, remove leftovers in the Firebase console.
2. **Official receipts.** The Terms say people can email you for an official receipt. Check BIR rules for your business type
   and how you will issue them.
3. **Taxes.** The text does not say prices include or exclude VAT. Ask an accountant what applies to you and add it if needed.
4. **Receipt photos are not stored.** True of the code as written (the function does not save or log images). Keep it that way.
5. **Data breach, data protection officer, NPC registration:** the existing text already covers the first two. Ask your lawyer whether
   you need to register with the National Privacy Commission.
6. **Payment provider onboarding.** Providers like PayMongo normally want a public website with terms, privacy and refund pages.
   Use the three links above after you publish.

## Bible verses
All 131 verses are now the **King James Version**, which is in the public domain, with the translation shown on each verse ("... KJV").
The wording is the real KJV text, pulled from a public dataset and checked reference by reference, not retyped. If you prefer a modern
translation you must get permission from its publisher and show their required notice.
