const cacheName = "my-site-cache-v1";
const filesToCache = [
  "/",
  "/index.html",
  "/add-Client.html",
  "/report.html",
  "/styles.css", // لو عندك ملف CSS
  "/script.js"   // لو عندك ملف JS
];

// لما الموقع يفتح أول مرة بيتخزن فى الكاش
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// لو المستخدم Offline، نحاول نجيب الملفات من الكاش
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
