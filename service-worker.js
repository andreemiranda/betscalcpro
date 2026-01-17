
const CACHE_NAME = 'bets-calc-pro-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/browserconfig.xml'
];

// Instalação: Cacheia recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching application shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia de Fetch: Cache First com Network Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        // Opcional: Adicionar dinamicamente novos requests ao cache
        if (event.request.url.startsWith('http')) {
             return caches.open(CACHE_NAME).then((cache) => {
               cache.put(event.request, networkResponse.clone());
               return networkResponse;
             });
        }
        return networkResponse;
      });
    }).catch(() => {
        // Fallback offline caso não esteja no cache nem na rede
        if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
        }
    })
  );
});
