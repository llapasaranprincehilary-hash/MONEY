/* Kwentado service worker
   Caches only the app shell (this page + the Firebase SDK scripts it loads +
   the manifest/icons) so the app can open with no connection at all.
   It never touches Firestore/Auth network calls — those are left alone so
   cloud sync keeps working normally whenever you do have a connection. */

const CACHE_NAME = 'kwentado-shell-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  'https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore-compat.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(err => console.error('SW install: failed to cache app shell', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return; // never touch writes (Firestore etc.)

  const isShellAsset = APP_SHELL.some(shellUrl => {
    try { return new URL(shellUrl, self.location.href).href === event.request.url; }
    catch (e) { return false; }
  });
  if (!isShellAsset) return; // let every other request (Firestore, Auth, images...) pass through untouched

  // The page itself (index.html / the app's start URL) goes network-first so a
  // pushed update shows up on the very next open instead of needing two opens.
  // Everything else in the shell (icons, manifest, Firebase SDK — rarely change)
  // stays cache-first for an instant, offline-friendly load.
  const isPageRequest = event.request.mode === 'navigate' ||
    event.request.url === new URL('./', self.location.href).href ||
    event.request.url === new URL('./index.html', self.location.href).href;

  if (isPageRequest) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request)) // offline: fall back to last cached page
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
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
