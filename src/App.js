import React from 'react';
import { savePushSubscription, sendPushNotification } from './api';
import { PERMISSION_STATES, askForPushPermission, subscribeUserToPush } from './utils';
import './App.css';

const pushEnabled = 'serviceWorker' in navigator && 'PushManager' in window;

function App() {
  const [subscriptionRef, setSubscriptionRef] = React.useState("");

  const handleSubscribeToPushNotifications = async () => {
    // Step 1: Ask the user for permission.
    const permissionResult = await askForPushPermission();
  
    if (permissionResult === PERMISSION_STATES.GRANTED) {
      // Step 2: Save the push subscription to a database
      const pushSubscription = await subscribeUserToPush();
      const response = await savePushSubscription(pushSubscription);
      setSubscriptionRef(response.ref['@ref'].id);
    }
  };

  const handleSendPushNotification = async () => {
    await sendPushNotification(subscriptionRef);
  };

  // Catch push not enabled
  if (!pushEnabled) return (
    <div className="App">
      <p>Your browser doesn't support push notifications. 😢</p>
    </div>
  );

  return (
    <div className="App">
      <p>Your browser supports web push! Yay! 🚀</p>
      <p>Click the button to receive article updates through web push notifications.</p>
      <button onClick={handleSubscribeToPushNotifications}>Sign up!</button>

      {subscriptionRef ? (
        <>
          <p>Send a push notification!</p>
          <button onClick={handleSendPushNotification}>Send myself push notification!</button>
        </>
      ) : null}
    </div>
  );
}

export default App;
