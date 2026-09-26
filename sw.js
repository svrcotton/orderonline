/* SVR Foods Service Worker */
const CACHE_NAME = 'svr-foods-v1';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/images/logo.png',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/images/favicon.png',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/images/background.jpg',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/images/header-banner.jpg',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/images/footer-banner.jpg',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/images/footer-banner-2.jpg',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/icons/icon-192.png',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/icons/icon-512.png',
  'https://cdn.jsdelivr.net/gh/svrcotton/orderonline@main/icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(PRECACHE.map(url => cache.add(url).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.hostname === 'script.google.com' || url.hostname === 'script.googleusercontent.com') {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, clone));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
