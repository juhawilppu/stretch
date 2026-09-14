/**
 * Daily Stretch, offline.
 *
 * A stretch you do at home, on a phone, in a hallway with one bar of signal —
 * the app has no business needing the network to tell you to touch your toes.
 * Everything it needs is a few files and five photographs, so all of it is
 * cached on the first visit and served from there afterwards.
 *
 * The cache is named for the commit, which deploy.sh stamps in below, so every
 * deploy installs a fresh worker and the old cache is thrown away whole rather
 * than patched. Assets are safe to serve cache-first because deploy.sh stamps
 * that same commit onto their URLs: a new deploy asks for URLs this cache has
 * never seen, and they come from the network. The page itself carries no stamp
 * — it is what the stamps are written into — so it goes to the network first
 * and falls back to the cache when there isn't one.
 */
const VERSION = '__VERSION__';
const CACHE = 'daily-stretch-' + VERSION;

const SHELL = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'stretches.js',
  'days.js',
  'manifest.webmanifest',
  'favicon.svg',
  'icon-180.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'photos/standing-forward-fold.jpg',
  'photos/wide-leg-fold.jpg',
  'photos/butterfly.jpg',
  'photos/seated-forward-fold.jpg',
  'photos/overhead-reach.jpg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Cached copies are matched ignoring the query string: the shell is cached under
   plain names, while the page asks for them stamped with a commit. */
function cached(req) {
  return caches.match(req, { ignoreSearch: true });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('index.html', copy); });
        return res;
      }).catch(function () {
        return cached('index.html');
      })
    );
    return;
  }

  e.respondWith(
    cached(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res.ok && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
