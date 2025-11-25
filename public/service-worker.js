const CACHE_NAME = "loading-time-cache-v1";

const FILES_TO_CACHE = [
  "/loading-time-frontend/",
  "/loading-time-frontend/index.html",
  "/loading-time-frontend/style.css",
  "/loading-time-frontend/main.js",
  "/loading-time-frontend/logo192.png",
  "/loading-time-frontend/logo512.png"
];

// Установка SW
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Активация
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Работа оффлайн
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
