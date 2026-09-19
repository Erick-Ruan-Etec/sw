const CACHE_VERSION = "1.0.0";

const FILES = [
    "/",
    "/index.html",
    "/style.css"
];

self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function (cache) {
            return cache.addAll(FILES);
        })
    );

});


self.addEventListener("activate", function (event) {

    event.waitUntil(

        caches.keys().then(function (keys) {

            return Promise.all(

                keys
                    .filter(function (key) {
                        return key !== CACHE_VERSION;
                    })
                    .map(function (key) {
                        return caches.delete(key);
                    })

            );

        })

    );

});


self.addEventListener("fetch", function (event) {

    event.respondWith(

        caches.match(event.request).then(function (response) {

            return response || fetch(event.request);

        })

    );

});
