// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFdj3HQi0xqNcGuco9kNrAfI0-QgGx6xE",
  authDomain: "crudwithredux.firebaseapp.com",
  databaseURL: "https://crudwithredux-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crudwithredux",
  storageBucket: "crudwithredux.appspot.com",
  messagingSenderId: "312209475285",
  appId: "1:312209475285:web:d46e0b823d77cb2ec8845c",
  measurementId: "G-HGX90YC3L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);