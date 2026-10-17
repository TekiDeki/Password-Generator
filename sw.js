/* SPDX-License-Identifier: Apache-2.0
 * Copyright 2026 Kristian Mario Mišković (TekiDeki)
 * Modified 2026-10-14: private app-scoped offline shell. */
'use strict';
const PREFIX = 'tekideki-password-';
const CACHE = PREFIX + 'v4';
const ASSETS = ['./', './index.html', './manifest.json', './favicon.ico', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './LICENSE'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  const license = new URL('./LICENSE', self.registration.scope).href;
  if (request.url === license) {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(request)).then(cached => cached || fetch(request)));
    return;
  }
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put('./index.html', copy)));
      }
      return response;
    }).catch(() => caches.open(CACHE).then(cache => cache.match('./index.html'))));
    return;
  }
  event.respondWith(caches.open(CACHE).then(cache => cache.match(request)).then(cached => cached || fetch(request)));
});
