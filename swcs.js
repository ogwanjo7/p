const cacheName = "version2";

self.addEventListener("install", (e) => {
  console.log("service worker installed");
});

//calling activation
self.addEventListener("activate", (event) => {
  // Remove old caches
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      return keys.map(async (cache) => {
        if (cache !== cacheName) {
          console.log("Service Worker: Removing old cache: " + cache);
          return await caches.delete(cache);
        }
      });
    })()
  );
});

//call fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service worker fetching");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //making a clone
        const resClone = res.clone();
        //open cache
        caches
        .open(cacheName)
        .then(cache => {
          //add response to cach
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
