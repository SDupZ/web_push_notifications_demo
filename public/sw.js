self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Installing…');
});

self.addEventListener('activate', event => {
  console.log('Service worker activated!');
});

self.addEventListener('push', event => {
  const payload = event.data.json();

  const promiseChain = self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: payload.icon,
    silent: true,
    data: { clickTarget: payload.clickTarget },
  });
  event.waitUntil(promiseChain);
});
