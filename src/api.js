const apiHostname = `${window.location.protocol}//${window.location.host}`;
const SAVE_PUSH_SUBSCRIPTION_PATH = '/.netlify/functions/savePushSubscription';
const SEND_PUSH_NOTIFICATION_PATH = '/.netlify/functions/sendPushNotification';

export async function savePushSubscription(subscription) {
  const url = `${apiHostname}${SAVE_PUSH_SUBSCRIPTION_PATH}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(subscription),
  });
  return response.json();
}

export async function sendPushNotification(id) {
  const url = `${apiHostname}${SEND_PUSH_NOTIFICATION_PATH}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(id),
  });
}