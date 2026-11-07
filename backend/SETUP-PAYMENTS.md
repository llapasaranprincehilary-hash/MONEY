# Making FINUITY VIP payments real

What is already built: the limits, the upgrade sheet, the price list, and a small server (`backend/functions`) that
creates a PayMongo checkout and switches VIP on when PayMongo confirms the payment.
What you must do: the accounts and switches below. Nothing here needs code changes except two lines marked **EDIT**.

How a payment flows:
1. Student taps **Get VIP** -> the app asks `createCheckout` (your server) for a checkout page.
2. The server checks they are signed in, fixes the price itself, asks PayMongo for a hosted checkout, and returns its address.
3. The student pays with GCash or QR Ph on PayMongo's page (you never see card or wallet details).
4. PayMongo calls `paymongoWebhook`. The server verifies PayMongo's signature, then writes `entitlements/{uid}`.
5. The app is listening to that one document, so VIP switches on by itself within seconds.

## A. Accounts (do these first)

1. **PayMongo account** (paymongo.com). You can build and test with **test keys** straight away.
   Going live needs PayMongo to verify you or your business: have a government ID ready, and check their current
   "Verification requirements" page for what your situation (individual or registered business) needs.
2. **Firebase Blaze plan.** Cloud Functions needs the pay-as-you-go plan (you must add a card). A student app at this
   size should stay inside the free monthly allowance; check Firebase's pricing page for today's numbers and set a budget alert.
3. A website address where the app is hosted (HTTPS). PayMongo will not call plain `http://` in live mode.

## B. Deploy the server

```bash
npm install -g firebase-tools
firebase login
firebase use YOUR-PROJECT-ID
```
In your Firebase project's `firebase.json` make sure functions point at this folder:
```json
{ "functions": { "source": "backend/functions" } }
```
Then:
```bash
cd backend/functions && npm install && cd ../..
firebase functions:secrets:set PAYMONGO_SECRET_KEY      # paste your sk_test_... key (later sk_live_...)
firebase functions:secrets:set PAYMONGO_WEBHOOK_SECRET  # paste a placeholder for now; step C replaces it
```
**EDIT 1:** in `backend/functions/index.js` replace `https://YOUR-SITE.example` in `ALLOWED_ORIGINS` with your real site address.
```bash
firebase deploy --only functions
```
The deploy prints two addresses: `createCheckout` and `paymongoWebhook`. Keep both.

## C. Tell PayMongo where to send "payment done"

1. PayMongo dashboard -> **Developers -> Webhooks -> Add endpoint**.
2. URL = your `paymongoWebhook` address. Event = `checkout_session.payment.paid`.
3. PayMongo shows a **signing secret** (starts with `whsk_`). Save it:
   `firebase functions:secrets:set PAYMONGO_WEBHOOK_SECRET`, then `firebase deploy --only functions` again.
4. Test and live mode have **separate** webhooks and secrets. Make one for each when the time comes.

## D. Lock the VIP record so nobody can fake it

Add the two blocks from `backend/firestore.rules.additions.txt` into your existing Firestore rules (do not replace the
whole file: your admin page needs the rules you already have), then publish the rules.

## E. Connect the app

**EDIT 2:** in `vip.js`, set  `api:{checkout:'https://...your createCheckout address...'}`.
Also set `help` to a support email, and make sure the prices in `CFG.plans` match `PLANS` in `backend/functions/index.js`
(pesos in the app, centavos on the server). The server's numbers are the ones that are actually charged.

## F. Test with fake money

1. Use the test secret key. In the app (signed in with a real account, not a guest) tap Get VIP -> pick a plan.
2. Pay on PayMongo's test checkout (their "Testing" docs list test wallets and numbers).
3. In Firebase console -> Firestore you should see `payments/{id}` marked `paid` and `entitlements/{your uid}` with an `until` date.
4. The app should flip to VIP without a refresh. Also test: closing the browser before returning (VIP should still activate),
   paying twice (time stacks), and cancelling (no charge, a polite message).

## G. Go live

1. Finish PayMongo verification. 2. Set `PAYMONGO_SECRET_KEY` to your `sk_live_` key. 3. Create the **live** webhook (step C)
and set its secret. 4. `firebase deploy --only functions`. 5. Pay the P49 plan yourself once, confirm VIP turns on, then refund yourself.

## What it costs per payment (PayMongo's published rates, VAT-inclusive; check their pricing page, it changes)

| Method | Fee | On the P49 plan | You keep |
|---|---|---|---|
| QR Ph | 1.5% | about P0.74 | about P48.26 |
| GCash | 2.5% | about P1.23 | about P47.77 |
| Cards | 3.5% + P15 | about P16.72 | about P32.28 |

That is why cards are switched off in the server (`PAYMENT_METHODS`). Add Maya only after checking its exact method name in
your PayMongo dashboard (test mode). Payments are also subject to a minimum amount (typically P20), which all plans clear.

## Things people forget

- **Business basics.** Selling to customers in the Philippines normally means registering (DTI or SEC) and handling BIR
  registration and receipts. Ask an accountant or check the BIR site for your situation. I am not a lawyer or tax advisor.
- **Terms, Privacy, Refunds.** Update your in-app legal text: prepaid plans, no auto-renew, what happens when VIP ends
  (nothing is deleted; people over the free limit just cannot add more), and your refund policy.
- **Refunds / manual grants.** Refund in the PayMongo dashboard, then edit or delete that person's `entitlements/{uid}` document
  in the Firebase console. Same place to give someone free VIP: set `until` to a time in milliseconds.
- **Guests can not buy.** Anonymous accounts are told to create an account first, otherwise a purchase would vanish with the browser.
- **Demo mode.** VIP can be simulated with no payment only on localhost or if `localStorage.finVipDemo='1'`. It never counts on a normal visitor's device.
- **Honest limit.** The caps are enforced in the browser. They stop casual "type 100 million" fun and the server decides who is VIP,
  but someone determined with developer tools could get around the caps themselves. If that ever matters, add server-side checks.


## H. Smart receipt scan (VIP): what to set up

Smart scan is the receipt reader that runs on YOUR server, so the VIP check cannot be bypassed from the browser.
The free on-device reader (3 free tries) is unchanged and still works without any server.

1. **Get an Anthropic API key** at console.anthropic.com and set a **monthly spend limit** there.
2. `firebase functions:secrets:set ANTHROPIC_API_KEY` (paste the key), then `firebase deploy --only functions`.
   The deploy prints a third address: `scanReceipt`.
3. **EDIT:** in `vip.js`, set `api:{checkout:'...', scan:'https://...your scanReceipt address...'}`.
4. Add the `usage` block from `backend/firestore.rules.additions.txt` to your rules (server-only).
5. The model is the `RECEIPT_MODEL` line near the top of the scan section in `backend/functions/index.js`
   (a small, fast vision model). Check docs.claude.com for current model names and prices before launch.
6. **Cost control, built in:** only VIP accounts can call it, each account is capped at 40 scans a day, a failed read is refunded
   from that cap, photos are shrunk on the phone first, and your spend limit is the last backstop.
   A normal receipt costs a small fraction of a peso with a small model, but check the live price list.
7. **Privacy.** Smart scan uploads the photo to your server and to the AI provider only to read that receipt. The function does not
   store or log the image. I added a sentence about this to the Terms text in `index.html`; please have it reviewed, and consider
   raising `LEGAL_VERSION` so existing users see and accept the updated terms (that prompts everyone, so it is your call).
   The app also asks each person for a one-time OK before their first Smart scan.

### What can and cannot be bypassed

| Feature | Where the check runs | Can a determined user bypass it? |
|---|---|---|
| Smart scan (AI, items, VAT, address) | Your server, using the VIP record only the payment webhook can write | **No.** Without a paid VIP record the server refuses and spends nothing. |
| VIP status itself | Firestore `entitlements/{uid}`, server-written | **No** (they cannot write it). |
| Basic on-device scan, 3 free tries | In the browser | **Yes**, by resetting browser storage. It costs you nothing, so this is harmless. |
| Wallet / balance / entry limits | In the browser | **Yes**, with developer tools. Fine for stopping casual "type 100 million" fun; not for anything that must be airtight. |

Rule of thumb: anything that costs you money or must be exclusive has to run on the server. Anything that runs in the browser
can be copied by someone who knows how, so treat it as a nudge, not a lock.


## I. Admin VIP manager

The backend now includes an `adminVip` endpoint for looking up, granting, adjusting, or revoking VIP
from `admin.html` without touching the Firebase console directly.

1. Add your admin Firebase UID(s) to `ADMIN_UIDS` in `backend/functions/index.js`, or put them in a `.env` file:
   `ADMIN_UIDS=uid1,uid2` (and/or `ADMIN_EMAILS=you@example.com` for verified email matching).
2. After `firebase deploy --only functions`, the deploy prints the `adminVip` address.
3. Paste it into `admin.html` at the `VIP_ADMIN_URL = ''` line near the bottom.
4. Open `admin.html` in your browser, sign in with your admin account, click **VIP manager**.
   You can look up any user by email or UID, see their status and history, grant months, set an exact end date, or revoke VIP.
   Every change is written to `adminLog` in Firestore.

## J. Account deletion cleanup

The backend also exports `deleteMyData`. When a user deletes their account from inside the app,
the app calls this endpoint first (before deleting the Firebase Auth account) to remove their
`entitlements` and `usage` documents. Payment history is kept for accounting purposes.

After deploying, paste the `deleteMyData` URL into `vip.js` at `api: { ..., deleteData: '...' }`.
