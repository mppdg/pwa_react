const CACHE_NAME = 'version-1';
const urlToCache = ['index.html', 'offline.html'];

const self = this;


// Install Serviceworker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");

        return cache.addAll(urlToCache)
      })
  )
})

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // do a fresh call for all request in the caches
    caches.match(event.request)
      .then(() => {
        return fetch(event.request)
          .catch(() => caches.match('offline.html')); // app is probaby offline, so return the offline file
      })
  )
})

// Activate the Serviceworker
self.addEventListener('activate', (event) => {
  // to ensure only new/wanted versions of the cache exist.
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        // delete old cache versions that we don't want
        if (!cacheWhitelist.includes(cacheName)) caches.delete(cacheName)
      })
      
    ))
  )

})