const CACHE_NAME = 'factors-multiples-app-cache-v2';
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png',
  // أضف أي ملفات أخرى تود تخزينها مؤقتًا
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened new cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
