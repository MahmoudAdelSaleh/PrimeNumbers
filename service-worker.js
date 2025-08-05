// تثبيت السيرفس وركر وتخطي الانتظار
self.addEventListener('install', event => {
  self.skipWaiting();
});

// تفعيل السيرفس وركر والسيطرة على الصفحات فورًا
self.addEventListener('activate', event => {
  clients.claim();
});

// التعامل مع أي طلب (بدون كاش)، فقط تمريره مباشرة
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});