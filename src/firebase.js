import firebase from "firebase";

const firebaseApp= firebase.initializeApp({
  apiKey: "AIzaSyC4GV2oj-YI1fQEKznORMWTX7HwTITktvY",
  authDomain: "todo-app-de066.firebaseapp.com",
  databaseURL: "https://todo-app-de066.firebaseio.com",
  projectId: "todo-app-de066",
  storageBucket: "todo-app-de066.appspot.com",
  messagingSenderId: "189925763716",
  appId: "1:189925763716:web:e5ca15e901993f2c2af0d1",
  measurementId: "G-W61W7ZW3XE"
});

const db= firebaseApp.firestore();


export default db;