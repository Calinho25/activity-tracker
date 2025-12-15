const CACHE_NAME = "activity-tracker-v1";
const FILES_TO_CACHE = [
  "index.html",
  "styles.css",
  "audio/church-bells.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Network-first for the main page (so updates show without hard refresh)
  if (url.pathname.endsWith("/index.html") || url.pathname === "/") {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for everything else (fast + offline)
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

