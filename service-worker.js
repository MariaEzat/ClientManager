const cacheName = "my-site-cache-v1";
const filesToCache = [
  "/",
  "index.html",
  "add-Client.html",
  "report.html",
  "manifest.json",
  "icon.png"
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
  // استثناء الطلبات اللي مش HTML/JS/CSS
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match("/index.html"));
    })
  );
});

