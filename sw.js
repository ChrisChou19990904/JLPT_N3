const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/time_pronunciation.html',
    '/passport_vocabularies.html',
    '/manifest.json',
    '/package.json',
    '/passport.json',
    '/time_pronunciation.json',
    '/my_appearance2.jpg',
    '/新日檢單字書封面.webp',
    '/新日檢單字書背面.webp',
    '/日本語能立試驗對應模擬考試問題集.webp',
    '/日本語能立試驗對應模擬考試問題集背面.webp',
    '/日檢成績單.webp',
    '/這就是你要的日語文法書封面.webp',
    '/這就是你要的日語文法書背面.webp',
    // 其他要快取的資源放這裡
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('快取資源中...');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log('刪除舊快取:', key);
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
