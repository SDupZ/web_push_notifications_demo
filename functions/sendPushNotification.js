const faunadb = require('faunadb');
const webpush = require('web-push');

const q = faunadb.query;

// inputPayload = details sent from attheminute-api
exports.handler = async event => {
  const refId = JSON.parse(event.body);

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  const subscription = await client.query(
    q.Get(q.Ref(q.Collection("pushSubscriptions"), refId))
  );

  const pushNotificationPayload = {
    title: "Hello",
    body: "World",
  };

  const pushSubscription = {
    endpoint: subscription.data.endpoint,
    keys: {
      p256dh: subscription.data.keys.p256dh,
      auth: subscription.data.keys.auth,
    },
  };

  // Actually send the push
  webpush.setVapidDetails(
    'mailto:simon@attheminute.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  await webpush.sendNotification(
    pushSubscription,
    JSON.stringify(pushNotificationPayload)
  );

  return {
    statusCode: 200,
    body: 'ok',
  };
};
