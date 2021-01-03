self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('mars-photos').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/scripts.js',
                '/styles.css',
                '/libs/'
            ]);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });