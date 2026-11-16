// ================================================================
// MUSINOTAS — service worker
// Hace que la app sea instalable y que funcione sin conexión.
//
// Estrategia:
//  · Archivos propios (HTML/CSS/JS/imágenes): RED PRIMERO, caché de respaldo.
//    Con conexión siempre se sirve lo último publicado, así que la
//    auto-actualización por version.txt sigue funcionando igual.
//  · version.txt: nunca se guarda en caché.
//  · Librerías y fuentes externas (Tone.js, Google Fonts, Firebase SDK):
//    caché primero, porque sus URLs llevan versión y no cambian.
// No hace falta tocar este archivo al publicar.
// ================================================================

const CACHE = 'musinotas-v1';

const CORE = [
  './',
  'index.html',
  'styles.css',
  'script.js',
  'logo.png',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

const CDN_HOSTS = [
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'www.gstatic.com',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function putInCache(request, response) {
  if (!response || (response.status !== 200 && response.type !== 'opaque')) return;
  const copy = response.clone();
  caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {});
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Archivos propios del juego
  if (url.origin === self.location.origin) {
    if (url.pathname.endsWith('/version.txt')) return; // siempre directo a la red

    event.respondWith(
      fetch(request)
        .then(response => { putInCache(request, response); return response; })
        .catch(() =>
          caches.match(request, { ignoreSearch: true })
            .then(hit => hit || (request.mode === 'navigate' ? caches.match('index.html') : undefined))
            .then(hit => hit || Response.error())
        )
    );
    return;
  }

  // Librerías y fuentes externas
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.match(request).then(hit =>
        hit || fetch(request).then(response => { putInCache(request, response); return response; })
      )
    );
  }
  // Todo lo demás (p. ej. Firestore) pasa directo a la red.
});
