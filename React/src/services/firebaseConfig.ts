import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, onMessage, getToken } from "firebase/messaging"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFW0rPimU3gnFeAgK91SbfCTHp1SYWfFY",
  authDomain: "sync-dev-87d29.firebaseapp.com",
  projectId: "sync-dev-87d29",
  storageBucket: "sync-dev-87d29.appspot.com",
  messagingSenderId: "672743524862",
  appId: "1:672743524862:web:c01b07377c12c3c8af98af",
  measurementId: "G-XSCPYGHX7Q"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app)
const provider = new GoogleAuthProvider();
const storage = getStorage();
const db = getFirestore(app)
const firestore = getFirestore(app);
const providerFacebook = new FacebookAuthProvider();
export { auth, provider, providerFacebook, messaging, app, storage, db, firestore };

export const onMessageListener = () =>

  new Promise((resolve) => {
    onMessage(messaging, (payload: any) => {
      console.log("hellofirebasets", payload)
      resolve(payload);
    });
  });

export const getDeviceToken = async () => {
  const token = await getToken(messaging, { vapidKey: "BBNPj4M-9_7AZaMySMEGDwu4N3Ti_yBlDTbH0rs0MB08bjE6ol7tsapqhL-7adLBEjvthcIW1pvnqV-R6neN2oc" })
    .then((currentToken: any) => {
      console.log(currentToken, "currentToken123")
      return currentToken
    })
    .catch((err: any) => {
      // Handle error
      console.log(err, "dasdasdasd")
    });
  console.log(token, "asdadasdasd")
  return token
}