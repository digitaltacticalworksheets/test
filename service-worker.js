const CACHE_NAME = "dtw-cache-v1";
const URLS_TO_CACHE = [
  "index.html",
  "plain worksheet.png",
  "worksheet.png",
  "blank worksheet.png",
  "DTW_Icon.ico",
  "manifest.json"
];

// Install – cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Activate – clean old caches if you bump version
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
});

// Fetch – serve from cache first, then network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});


