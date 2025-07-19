/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js');

// Initialize the Firebase App
firebase.initializeApp({
  apiKey: "AIzaSyBForjQfkd-EpAZoK0mfS6xGtQbBrdI9-w",
  authDomain: "sync-prd.firebaseapp.com",
  projectId: "sync-prd",
  storageBucket: "sync-prd.appspot.com",
  messagingSenderId: "63433017497",
  appId: "1:63433017497:web:a711f2980ec6d3a2191008",
  measurementId: "G-7KN7PSP09G"
});

// Initialize Firebase Messaging
const messaging = firebase.messaging()

// Set up messaging event listeners and handle notifications
// Note: The onBackgroundMessage function is preferred over onMessage in web workers.
messaging.onBackgroundMessage((payload) => {
  console.log("Received message:", payload);

  if (payload.notification) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  } else if (payload.data) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

