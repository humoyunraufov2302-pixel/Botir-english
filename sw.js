const C = "iq-v15";
const SHELL = ["./", "index.html", "style.css", "app.js", "levels.js", "b1a.js", "b1b.js", "b1c.js", "b1d.js", "b1e.js", "b1g.js", "b1z.js", "b2a.js", "b2b.js", "b2c.js", "b2g.js", "b2z.js", "c1a.js", "c1b.js", "c1c.js", "c1g.js", "c1z.js", "cefr.js", "v1.js", "v2.js", "v3.js", "v4.js", "v5.js", "v6.js", "v7.js", "v8.js", "v9.js", "v10.js", "v11.js", "v12.js", "v13.js", "v14.js", "v15.js", "irr.js", "botir.jpg", "hand.woff2", "hand-b.woff2", "manifest.json", "icon-192.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  // tarmoq birinchi, bo'lmasa keshdan (yangilanishlar darhol chiqadi)
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
