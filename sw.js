/* SVR Foods Service Worker - v3.5 */
const CACHE_NAME = 'svr-foods-v3-5';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Apps Script API — always network first, fallback to cache
  if (url.hostname === 'script.google.com' || url.hostname === 'script.googleusercontent.com') {
    e.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // Everything else — network first, fallback to cache
  e.respondWith(
    fetch(req).then(res => {
      if (!res || res.status !== 200 || res.type === 'opaque') return res;
      const clone = res.clone();
      caches.open(CACHE_NAME).then(c => c.put(req, clone));
      return res;
    }).catch(() =>
      caches.match(req).then(c => c || caches.match('./index.html'))
    )
  );
});
