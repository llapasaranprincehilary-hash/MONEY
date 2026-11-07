# FINUITY launch checklist (everything left is on this page)

All code is finished and tested. What remains needs **your accounts, your decisions or real devices**.
Tick them off in this order. Detailed steps are in `backend/SETUP-PAYMENTS.md` and `DEPLOY-GITHUB.md`.

## A. Accounts and money (blocking)
- [ ] Firebase: switch the project to the **Blaze** plan; set a **budget alert**.
- [ ] PayMongo: create the account and finish **KYC** first (it can take days), then **activate** GCash, QR Ph (and Maya when ready).
- [ ] Anthropic: create an API key and set a **monthly spend limit**.
- [ ] Your **business registration / BIR / official receipts / VAT**: ask an accountant (not code).

## B. Deploy the server (Firebase)
- [ ] `firebase functions:secrets:set PAYMONGO_SECRET_KEY` (test key first), `PAYMONGO_WEBHOOK_SECRET`, `ANTHROPIC_API_KEY`.
- [ ] `backend/functions/.env`: `ADMIN_UIDS=` your admin UID.
- [ ] `index.js`: put your real site address in `ALLOWED_ORIGINS`.
- [ ] From the `backend` folder: `firebase use --add`, `cd functions && npm install`, then `firebase deploy --only functions` (prints 5 addresses). Runtime is Node 24 (Node 20 was retired 2026-10-30).
- [ ] PayMongo: add the webhook (event `checkout_session.payment.paid`) pointing at paymongoWebhook; save its signing secret and redeploy.
- [ ] Firestore rules: paste the blocks from `backend/firestore.rules.additions.txt` into your existing rules (do not replace them) and publish.

## C. Connect the app
- [ ] `vip.js` -> `api:{checkout:'...', scan:'...', deleteData:'...'}` (paste Cloud Function URLs after deploy). Support email already set: `pcpservicehelp@gmail.com`.
- [ ] `admin.html` -> `VIP_ADMIN_URL = '...adminVip address...'`.
- [ ] `legal-data.js` -> `LEGAL_ADDRESS` (and `LEGAL_REG` if you have one). Confirm the refund promises still match what you will do.

## D. Publish
- [ ] GitHub Pages on (see DEPLOY-GITHUB.md). Add `YOUR-NAME.github.io` to Firebase **Authorized domains**; restrict the browser API key to your site.
- [ ] Your public pages exist: `/terms.html`, `/privacy.html`, `/refund-policy.html` (give these to PayMongo).

## E. Test before real customers
- [ ] **Test-mode payment** end to end: pay, see VIP switch on by itself, see it in Payment history; pay twice (time stacks); cancel (no charge).
- [ ] A **real receipt** with Smart Scan, then ~20 real Philippine receipts (faded, crumpled, long). Check totals, dates, items.
- [ ] Real phones: iPhone + Android camera, install-as-app, notifications (iPhone needs the installed app), slow data.
- [ ] Admin VIP manager: look yourself up, give 1 month, end it.
- [ ] Delete a throwaway account: its VIP and scan records disappear; the payment record stays.
- [ ] Switch to **live** keys, pay the P49 plan yourself once, confirm, then refund yourself and End VIP.

## F. Legal (people, not code)
- [ ] A Philippine lawyer reviews the Terms, Privacy Policy and refund policy (`LEGAL-CHECKLIST.md`).
- [ ] Ask whether you must register with the National Privacy Commission.

## After launch
- Each time you change files, bump the version at the top of `sw.js` so phones update.
- If you change the legal text in a material way, raise `LEGAL_VERSION` so everyone re-accepts.
- Refund routine: refund in PayMongo, then **End VIP now** in the admin VIP manager.

## Known limits (by design)
- Wallet and balance limits are enforced in the browser (a determined person with developer tools can get around them). Smart Scan, VIP status
  and payments are enforced on the server and cannot be bypassed.
- No error monitoring (it would need a Privacy Policy update). Add it only if you want it.
