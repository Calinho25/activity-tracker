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
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
