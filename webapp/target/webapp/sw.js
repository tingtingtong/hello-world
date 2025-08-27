/**
 * Service Worker for Performance Optimization
 * Implements caching strategies and offline support
 */

const CACHE_NAME = 'regapp-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.jsp',
  '/css/styles.css',
  '/js/app.js',
  '/sw.js'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .catch(error => {
        console.log('Cache installation failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname === '/' || url.pathname.endsWith('.jsp')) {
    // HTML pages - network first, fallback to cache
    event.respondWith(networkFirst(request));
  } else if (url.pathname.includes('/css/') || url.pathname.includes('/js/')) {
    // Static assets - cache first, fallback to network
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.includes('/api/')) {
    // API calls - network first, fallback to cache
    event.respondWith(networkFirst(request));
  } else {
    // Default - network first
    event.respondWith(networkFirst(request));
  }
});

// Cache First Strategy - for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache first strategy failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

// Network First Strategy - for dynamic content
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network first strategy failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline content not available', { status: 503 });
  }
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Get stored form data
    const formData = await getStoredFormData();
    if (formData) {
      // Process stored form data
      await processStoredFormData(formData);
      // Clear stored data after successful processing
      await clearStoredFormData();
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Store form data when offline
async function storeFormData(formData) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put('/form-data', new Response(JSON.stringify(formData)));
  } catch (error) {
    console.log('Failed to store form data:', error);
  }
}

// Get stored form data
async function getStoredFormData() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = await cache.match('/form-data');
    if (response) {
      return await response.json();
    }
  } catch (error) {
    console.log('Failed to get stored form data:', error);
  }
  return null;
}

// Process stored form data
async function processStoredFormData(formData) {
  try {
    // Simulate API call
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      console.log('Stored form data processed successfully');
    }
  } catch (error) {
    console.log('Failed to process stored form data:', error);
  }
}

// Clear stored form data
async function clearStoredFormData() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.delete('/form-data');
  } catch (error) {
    console.log('Failed to clear stored form data:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View Details',
          icon: '/icon-192x192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-192x192.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'STORE_FORM_DATA') {
    event.waitUntil(storeFormData(event.data.formData));
  }
});