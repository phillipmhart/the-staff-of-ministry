const CACHE = 'staff-of-ministry-offline-v1';
const ASSETS = [
  './', './index.html', './app.js', './style.css', './manifest.webmanifest',
  './assets/3.jpg', './assets/4.jpg', './assets/5.jpg', './assets/7.jpg', './assets/8.jpg',
  './assets/c1-1.jpg', './assets/c1-2.jpg', './assets/c2-clue-sculpture.jpg', './assets/c2-clue.jpg', './assets/c2-life-sculpture.jpg', './assets/c2-storrs-map-illustrated.png', './assets/c2-storrs-map.jpg', './assets/c2-view.jpg', './assets/c3-solved-puzzle.jpg',
  './assets/c4-church.jpg', './assets/c4-groom.jpg', './assets/c4-map-illustrated.png', './assets/c4-map.jpg', './assets/c4-paper-1.jpg', './assets/c4-paper-2.jpg', './assets/c4-solved-puzzle.jpg', './assets/c4-visual-clues.jpg', './assets/c4-williams-map-illustrated.png', './assets/c4-williams-map.jpg',
  './assets/c5-ann-map-illustrated.png', './assets/c5-ann-map.jpg', './assets/c5-ann-memorial.jpg', './assets/c5-ann-stone.jpg', './assets/c5-clue.jpg', './assets/c5-pediment.jpg', './assets/c5-racecar-clue.jpg', './assets/c5-solved-puzzle.jpg', './assets/c5-town-hall.jpg',
  './assets/c6-clue-back.jpg', './assets/c6-clue-front.jpg', './assets/c6-map.jpg', './assets/c6-memorial-plaque.jpg', './assets/c6-memorial.jpg', './assets/c6-orac-text.jpg',
  './assets/c7-clue.jpg', './assets/c7-employee.jpg', './assets/c7-location-illustrated.png', './assets/c7-location.jpg', './assets/c7-map.jpg', './assets/c7-orac-text.jpg', './assets/c7-storefront-hint.jpg', './assets/c7-storefront-original.jpg', './assets/c7-storefront.jpg', './assets/c7-trolley.jpg',
  './assets/c8-badge.jpg', './assets/c8-certificate.jpg', './assets/c8-icecream.jpg', './assets/c8-map-illustrated.png', './assets/c8-map.jpg', './assets/c8-photographer.jpg', './assets/c8-polaroids.jpg',
  './assets/chapter3/clue-back.jpg', './assets/chapter3/clue-front.jpg', './assets/chapter3/librarian.jpg', './assets/chapter3/library.jpg', './assets/chapter3/portrait-1.jpg', './assets/chapter3/portrait-2.jpg', './assets/chapter3/portrait-3.jpg', './assets/chapter3/portrait-4.jpg',
  './assets/crumpled-note.jpg', './assets/fairfield-map-illustrated.png', './assets/fairfield-map.jpg', './assets/five-of-hearts-card-cropped.png', './assets/five-of-hearts-card-no-frame.png', './assets/five-of-hearts-card.jpg', './assets/form-header.jpg', './assets/form-image-1.jpg', './assets/game-creators-family.jpg', './assets/grinspoon-map-illustrated.png', './assets/grinspoon-map.jpg', './assets/johnny-appleseed.jpg', './assets/orac-message.jpg', './assets/star.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
