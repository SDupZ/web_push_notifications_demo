import React from 'react';
import { PERMISSION_STATES, askForPushPermission, subscribeUserToPush } from './utils';
import './App.css';

const pushEnabled = 'serviceWorker' in navigator && 'PushManager' in window;

function App() {
  const handleSubscribeToPushNotifications = async () => {
    // Step 1: Ask the user for permission.
    const permissionResult = await askForPushPermission();
  
    if (permissionResult === PERMISSION_STATES.GRANTED) {
      const pushSubscription = JSON.parse(
        JSON.stringify(await subscribeUserToPush())
      );
      console.log(pushSubscription);
    }
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
    </div>
  );
}

export default App;
