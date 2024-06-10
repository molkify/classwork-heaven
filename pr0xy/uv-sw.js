// The service worker for Ultraviolet
// This handles the requests for the proxy

importScripts("pr0xy/uv/uv.bundle.js");
importScripts("pr0xy/uv/uv.config.js");
importScripts(__uv$config.sw || "pr0xy/uv/uv.sw.js");

const sw = new UVServiceWorker();

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));
