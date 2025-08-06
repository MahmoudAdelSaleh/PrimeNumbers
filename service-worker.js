const CACHE_NAME = 'prime-numbers-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // تأكد من وجود هذا الملف
  '/script.js', // تأكد من وجود هذا الملف
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الذاكرة المؤقتة، يتم إرجاعه
        if (response) {
          return response;
        }
        // وإلا، يتم طلبه من الشبكة
        return fetch(event.request);
      })
  );
});
