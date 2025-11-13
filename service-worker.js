const cacheName = "my-site-cache-v1";
const filesToCache = [
  "/",
  "/index.html",
  "/add-Client.html",
  "/report.html",
  "/manifest.json",
  "/icon.png"
];

// أثناء التثبيت (install) لأول مرة
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// الاستجابة للطلبات (fetch)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // لو موجودة فى الكاش نرجعها، لو لأ نحاول نجيبها من النت
      return response || fetch(event.request);
    }).catch(() => {
      // لو أوفلاين ومفيش الملف، نرجع index.html
      return caches.match("/index.html");
    })
  );
});
