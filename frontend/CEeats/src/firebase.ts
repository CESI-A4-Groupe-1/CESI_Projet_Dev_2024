// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SERVER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
        .then(reg => {
            console.log(`Service Worker Registration (Scope: ${reg.scope})`);
        })
        .catch(error => {
            const msg = `Service Worker Error (${error})`;
            console.error(msg);
        });
} else {
    // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
    console.warn('Service Worker not available');
}


export {messaging, getToken, onMessage};