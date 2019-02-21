importScripts("https://www.gstatic.com/firebasejs/4.10.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/4.10.1/firebase-messaging.js")

// Initialize Firebase
var config = {
  apiKey: "yourapikey",
  authDomain: "{yourauthodomain}.firebaseapp.com",
  databaseURL: "https://{yourdatabasedomain}.firebaseio.com",
  projectId: "yourprojectid",
  storageBucket: "{projid}.appspot.com",
  messagingSenderId: "msid"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   var notificationTitle = 'Background Message Title';
//   var notificationOptions = {
//     body: 'Background Message body.',
//     icon: 'images/extras/success.png'
//   };
//
//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
// [END background_handler]
