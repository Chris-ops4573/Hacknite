import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAiCyW7iAQqeekhKo0Yb963RfOjYb8V1r0",
    authDomain: "hacknite-anonymous-forum.firebaseapp.com",
    projectId: "hacknite-anonymous-forum",
    storageBucket: "hacknite-anonymous-forum.firebasestorage.app",
    messagingSenderId: "254476899787",
    appId: "1:254476899787:web:a0e7666b5fc42111b2d24e",
    measurementId: "G-36T3WLE0M9",
    databaseURL: "https://hacknite-anonymous-forum-default-rtdb.firebaseio.com"
  };
  
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  const analytics = getAnalytics(app);