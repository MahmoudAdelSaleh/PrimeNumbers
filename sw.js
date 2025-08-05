const CACHE_NAME = 'factors-v1';
const OFFLINE_FILES = [
  'index.html',
  'style.css',
  'script.js',
  'icon-192.png',
  'icon-512.png',
  'manifest.json'
];

// عند التثبيت – نخزن الملفات المهمة في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(OFFLINE_FILES))
      .then(() => self.skipWaiting())
  );
});

// عند التفعيل – تنظيف أي كاش قديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// عند أي طلب – جرب الشبكة، ولو فشلت رجع من الكاش
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});