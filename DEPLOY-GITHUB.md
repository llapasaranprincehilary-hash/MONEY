# Putting FINUITY on GitHub Pages

GitHub Pages hosts the **app** (the HTML/CSS/JS files). It cannot run the **server** part (payments, Smart receipt scan).
Those live on Firebase (`backend/`). So you can launch on GitHub today and switch the server features on later.

## 1. Publish the app

1. Create a GitHub repo and upload everything in this folder (keep `.nojekyll`).
2. Repo **Settings -> Pages -> Build and deployment -> Deploy from a branch -> main / (root)**.
3. Your site appears at `https://YOUR-NAME.github.io/YOUR-REPO/`. It is HTTPS, which the camera and install-as-app need.
   All paths in the app are relative, so the repo sub-folder is fine.

## 2. Tell Firebase about the new address (otherwise sign-in fails)

- Firebase console -> **Authentication -> Settings -> Authorized domains -> Add domain** -> `YOUR-NAME.github.io`.
- Google Cloud console -> **APIs & Services -> Credentials** -> your browser API key -> **Website restrictions** -> add `https://YOUR-NAME.github.io/*`
  (the Firebase web key is meant to be public; the restriction plus your Firestore rules are what protect you).
- Check your Firestore rules: users may only read/write their own data. Add the blocks in `backend/firestore.rules.additions.txt`.

## 3. What works the moment you publish

Everything in the app: tracking, wallets, the free-plan limits, streaks and freezes, Fin's levels, weekly challenges and recap,
Learn, the free on-device receipt scan (3 tries), the VIP sheet, reminders while the app is open.

## 4. What does NOT work yet (needs the server, see backend/SETUP-PAYMENTS.md)

| Feature | What a visitor sees until it is set up |
|---|---|
| Buying VIP | "Payments are not switched on yet" (nobody can get VIP for free) |
| Smart receipt scan | VIP users get the basic on-device reader instead |
| Background reminders when the app is closed | Only while the app is open |

## 5. Launch before payments are ready: give VIP by hand

For friends, testers, or people who pay you by GCash directly:
Firebase console -> Firestore -> collection `entitlements` -> document id = the person's **User UID** (Authentication -> Users) ->
fields `until` (type **number**, a future time in milliseconds, e.g. 1798675200000) and `plan` (string, `m12`).
The app switches them to VIP within seconds. This needs the `entitlements` rule from step 2 so the app is allowed to read it.
To remove VIP, delete the document or set `until` to 0.

## 6. Updating the site later

Upload the changed files. The app caches itself for offline use: when you change files, also change the version name at the top of
`sw.js` (`finuity-shell-v32` -> `v33`) so people's phones pick up the update.

## 7. Legal pages

After publishing, your public legal links are `https://YOUR-NAME.github.io/YOUR-REPO/terms.html`, `privacy.html` and `refund-policy.html`.
Read `LEGAL-CHECKLIST.md` first: it lists the decisions you must confirm and the details to fill in.

## 8. Before you share the link widely

- Do one test-mode payment and one real receipt scan after you deploy the server.
- Have your Terms, Privacy and refund text reviewed (I am not a lawyer), and check DTI/BIR requirements for selling.
- Keep secrets out of the repo: the API keys (PayMongo, Anthropic) are stored with `firebase functions:secrets:set`, never in these files.
