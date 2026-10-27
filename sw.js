/* Room Clock offline copy.
 * Keeps the page, its fonts and icon on the iPad so a reload still opens
 * the clock when the Wi-Fi is down.
 * - The page: try the network first (so updates show up straight away),
 *   but fall back to the saved copy if the network fails or takes more
 *   than 4 seconds.
 * - Fonts and icon: saved copy first; they don't change.
 * Bump CACHE when the list of files changes. Written in ES5 for iOS 11.3+. */
var CACHE = "roomclock-v2";
var PAGE = "kids-room-clock.html";
var ASSETS = [PAGE, "fonts/nunito-700.woff2", "fonts/nunito-800.woff2", "fonts/nunito-900.woff2", "icon-180.png"];
var NETWORK_WAIT_MS = 4000;

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function fromNetwork(req) {
  return fetch(req).then(function (res) {
    if (res && res.ok && res.type === "basic") {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { return c.put(req, copy); });
    }
    return res;
  });
}

function saved(req) { return caches.match(req, { ignoreSearch: true }); }

function networkFirst(req) {
  return new Promise(function (resolve, reject) {
    var done = false;
    function finish(res) { if (!done && res) { done = true; resolve(res); } }
    var timer = setTimeout(function () { saved(req).then(finish); }, NETWORK_WAIT_MS);
    fromNetwork(req).then(function (res) { clearTimeout(timer); finish(res); }, function () {
      clearTimeout(timer);
      saved(req).then(function (hit) { if (hit) finish(hit); else if (!done) { done = true; reject(new Error("offline")); } });
    });
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  var isPage = req.mode === "navigate" || /\.html$/.test(url.pathname);
  if (isPage) e.respondWith(networkFirst(req));
  else e.respondWith(saved(req).then(function (hit) { return hit || fromNetwork(req); }));
});
