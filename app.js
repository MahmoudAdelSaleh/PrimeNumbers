// تسجيل الـ Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('✅ Service Worker مسجل بنجاح:', registration);
    })
    .catch(function(error) {
      console.log('❌ فشل تسجيل Service Worker:', error);
    });
}

// منع الرجوع بزر العودة
history.pushState(null, document.title, location.href);
window.addEventListener('popstate', function () {
  history.pushState(null, document.title, location.href);
});