/* Room Clock offline copy.
 * Keeps the page on the iPad so a reload still opens the clock when the
 * Wi-Fi is down. Serves the saved copy first (fast, never hangs on a bad
 * network) and refreshes it in the background, so an updated page shows
 * up on the load after next. Bump CACHE to force everyone onto a new copy.
 * Written in ES5 for iOS 11.3+ Safari. */
var CACHE = "roomclock-v1";
var PAGE = "kids-room-clock.html";

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll([PAGE]); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  var network = fetch(req).then(function (res) {
    if (!res || !res.ok || res.type !== "basic") return res;
    var copy = res.clone();
    return caches.open(CACHE).then(function (c) { return c.put(req, copy); }).then(function () { return res; });
  });
  var cached = caches.open(CACHE).then(function (c) { return c.match(req, { ignoreSearch: true }); });
  e.respondWith(cached.then(function (hit) { return hit || network; }));
  e.waitUntil(network.then(function () {}, function () {}));
});
