import firebase from "firebase";

const config = {
    apiKey: "AIzaSyD11knGaGfQUb_AMIm0fx70PM5GI4khadA",
    authDomain: "healthquery-e1a26.firebaseapp.com",
    databaseURL: "https://healthquery-e1a26.firebaseio.com",
    projectId: "healthquery-e1a26",
    storageBucket: "healthquery-e1a26.appspot.com",
    messagingSenderId: "824961046804",
    appId: "1:824961046804:web:119b1370a47a8314f58a01",
    measurementId: "G-2MM7EBD4QG"
  };
  firebase.initializeApp(config);
  export const myFirebase = firebase;
  export const auth = firebase.auth;
  export const db = firebase.firestore();