console.log('serviceWorker.js in action');
var urlsToCache = [
	'index.html'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('mars-cache')
			.then((cache) => {
				return cache.addAll(urlsToCache);
			})
	)
})

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((response) => {
				console.log('The responce is in the cache');
				if(response) {
					console.log('response:');
					console.log(response);
					return response;
				}
				
				console.log('No cache match, we attempt to fetch it from the network');
				console.log(fetch(event.request));
				
				return(fetch(event.request));
			})
	)
})