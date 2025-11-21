const cacheName = "my-site-cache-v2"; // رقم النسخة يتغير عند تحديث الملفات
const filesToCache = [
  "/",
  "/index.html",
  "/add-Client.html",
  "/report.html",
  "/manifest.json",
  "/icon.png"
];

// أناء التثبيت (install)
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// تنظيف الكاش القديم عند التفعيل
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== cacheName) return caches.delete(key);
        })
      )
    )
  );
});

// التعامل مع fetch
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).catch(() =>
        new Response("صفحة غير متاحة بدون إنترنت", { status: 404, statusText: "Offline" })
      );
    })
  );
});
