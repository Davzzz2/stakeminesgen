const CACHE_NAME = 'gamble-assist-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/GA1.png',
  '/GA2.png',
  '/blue.png',
  '/orange.png',
  '/diamond.png',
  '/bomb.png',
  '/blackjack.html',
  '/cases.html',
  '/flip.html',
  '/keno.html',
  '/mines.html',
  '/pump.html',
  '/roulette.html',
  '/rps.html',
  '/slots.html',
  '/towers.html',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('chrome://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            if (new URL(event.request.url).origin === location.origin) {
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
            }
            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 