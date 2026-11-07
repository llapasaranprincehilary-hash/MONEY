/* FINUITY service worker
   Caches only the app shell (this page + the Firebase SDK scripts it loads +
   the manifest/icons) so the app can open with no connection at all.
   It never touches Firestore/Auth network calls — those are left alone so
   cloud sync keeps working normally whenever you do have a connection.

   IMPORTANT: bump the number in CACHE_NAME any time you change index.html,
   manifest.json, or any icon file. This service worker's own byte content
   has to change for the browser to even notice there's an update, and the
   activate handler below only deletes old caches whose name doesn't match
   CACHE_NAME — so an unchanged cache name means old, stale assets (icons
   included) can keep being served indefinitely even after you replace the
   underlying files. */
const CACHE_NAME = 'finuity-shell-v52';

// Small JSON the page writes (reminder time, last logged day) so a background reminder can run with the app closed.
const LIFE_CACHE = 'finuity-life-data';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './icons.css',
  './icons.js',
  './app.js',
  './learn.css',
  './learn.js',
  './streak.css',
  './ux.css',
  './streak.js',
  './life.css',
  './life.js',
  './vip.css',
  './scan.css',
  './scan.js',
  './legal-data.js',
  './terms.html',
  './privacy.html',
  './refund-policy.html',
  './vip.js',
  './virtual-pet/pet.css',
  './virtual-pet/pet.js',
  './virtual-pet/fin-dock.js',
  './virtual-pet/fin-ambient.js',
  './a11y.js',
  './virtual-pet/pet-coach.js',
  './virtual-pet/pet-dialogue.js',
  './virtual-pet/tour.css',
  './virtual-pet/tour-steps.js',
  './virtual-pet/tour.js',
  'https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore-compat.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    // Cache each file on its own. cache.addAll() is all-or-nothing: one missing icon or a
    // blocked CDN request would silently leave the WHOLE app uncached (no offline mode).
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(APP_SHELL.map(url =>
        cache.add(url).catch(err => console.warn('SW install: could not cache', url, err))
      )))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME && k !== LIFE_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return; // never touch writes (Firestore etc.)

  // Compare without the query string for our own files: the page links icons as "icon-192.png?v=2",
  // which never matched the plain entries in APP_SHELL, so those requests were never cached offline.
  const keyOf = u => {
    const x = new URL(u, self.location.href);
    return x.origin === self.location.origin ? x.origin + x.pathname : x.href;
  };
  const reqKey = keyOf(event.request.url);
  const isShellAsset = APP_SHELL.some(shellUrl => {
    try { return keyOf(shellUrl) === reqKey; }
    catch (e) { return false; }
  });
  if (!isShellAsset) return; // let every other request (Firestore, Auth, images...) pass through untouched

  // The page itself (index.html / the app's start URL) goes network-first so a
  // pushed update shows up on the very next open instead of needing two opens.
  // Everything else in the shell (icons, manifest, Firebase SDK — rarely change)
  // stays cache-first for an instant, offline-friendly load.
  const isPageRequest = event.request.mode === 'navigate' ||
    reqKey === keyOf('./') ||
    reqKey === keyOf('./index.html');

  if (isPageRequest) {
    event.respondWith(
      // cache:'no-cache' makes the browser revalidate with the server instead of
      // reusing its own HTTP cache. Without it, hosts like GitHub Pages (which send
      // a ~10 minute max-age) can hand back the OLD index.html even though this
      // fetch looks "network-first".
      fetch(event.request, { cache: 'no-cache' }).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request, { ignoreSearch: true })
        .then(hit => hit || caches.match('./index.html'))) // offline: last cached page (also for ?query / deep links)
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached); // offline: fall back to whatever's cached
      return cached || networkFetch; // instant load if cached, background-refreshed for next time
    })
  );
});


/* ── Daily reminder (Chrome/Android installed app: periodic background sync; otherwise the page sends it while open) ── */
async function remindIfNeeded() {
  try {
    const cache = await caches.open(LIFE_CACHE);
    const url = new URL('life-data.json', self.registration.scope).href;
    const hit = await cache.match(url);
    if (!hit) return;
    const d = await hit.json();
    if (!d.on || self.Notification.permission !== 'granted') return;
    const p = n => (n < 10 ? '0' + n : '' + n), now = new Date();
    const today = now.getFullYear() + '-' + p(now.getMonth() + 1) + '-' + p(now.getDate());
    const hm = p(now.getHours()) + ':' + p(now.getMinutes());
    if (hm < (d.time || '20:00') || d.loggedDay === today || d.notified === today) return;
    const n = d.streak || 0;
    await self.registration.showNotification(n >= 2 ? 'Your ' + n + '-day streak is waiting' : 'Quick check-in from Fin', {
      body: n >= 2 ? 'Log anything, or tap "Nothing spent today". It takes five seconds.' : 'Anything to log today? A no-spend day counts too.',
      icon: 'icon-192.png', badge: 'icon-192.png', tag: 'finuity-streak', data: { url: './index.html' }
    });
    d.notified = today;
    await cache.put(url, new Response(JSON.stringify(d), { headers: { 'Content-Type': 'application/json' } }));
  } catch (e) { /* a missed reminder is fine */ }
}
self.addEventListener('periodicsync', event => {
  if (event.tag === 'finuity-reminder') event.waitUntil(remindIfNeeded());
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow('./index.html');
    })
  );
});
