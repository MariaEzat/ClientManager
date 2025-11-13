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
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      // لو موجود في الكاش ارجعه
      if (response) return response;

      // حاول تجيب من النت، لو فشل ارجع 404 وليس index.html
      return fetch(event.request).catch(() => new Response("Page not available offline", { status: 404, statusText: "Offline" }));
    })
  );
});


