const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Tree.html',
  '/tree_factors.html',
  './icon-192.png',
  './icon-512.png'
  // يمكنك أيضًا إضافة CSS أو JS أو صور أخرى هنا إذا أردت
];

// تثبيت: تخزين الملفات في الكاش
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// تفعيل: حذف أي كاش قديم
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

// جلب الملفات
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // وجدت في الكاش
        }
        return fetch(event.request); // محاولة جلبها من الإنترنت
      })
      .catch(function() {
        // إذا فشل الجلب تمامًا (أوفلاين)
        return caches.match('/index.html'); // ترجع الصفحة الرئيسية بدل صفحة خطأ
      })
  );
});