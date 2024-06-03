const cacheName = "v1";

const cacheAssets = ["index.html", "css/style.css", "js/main.js"];

self.addEventListener("install", (e) => {
  console.log("service worker installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service worker caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//calling activation
self.addEventListener('activate', event => {
    // Remove old caches
      event.waitUntil(
        (async () => {
          const keys = await caches.keys();
          return keys.map(async (cache) => {
            if(cache !== cacheName) {
              console.log('Service Worker: Removing old cache: '+cache);
              return await caches.delete(cache);
            }
          })
        })()
      )
    });

    //call fetch event
    self.addEventListener('fetch', e=>{
        console.log('Service worker fetching');
        e.respondWith(fetch(e.request).catch(() => catches.match(e.request)));
    });

