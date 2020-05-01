const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const firebase = require('firebase');
const cors = require('cors');
const config = require('./config');
const serviceAccount = require('./service_account.json');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
 });

const app = express();
app.use(cors());
const db = admin.firestore();
firebase.initializeApp(config);


app.post('/test', (req, res) => {
   res.send("Hello World");
});

const isEmpty = (string) => {
   if(string.trim() === ''){
      return true;
   }else{
      return false;
   }
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)){
     return true;
  }else {
     return false
  }
};

app.post("/registerNewUser", (req, res) => {
   let token, userID, userData;

   const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
   };

   let errors = {};
   if(isEmpty(newUser.email)){
      errors.email = 'Must not be empty';
   }else if(!isEmail(newUser.email)){
      errors.email = 'Must be a valid email address';
   }
   if(isEmpty(newUser.password)){
      errors.password = 'Must not be empty';
   }
   if(newUser.password !== newUser.confirmPassword){
      errors.confirmPassword = 'Passwords must match';
   }
   if(Object.keys(errors).length > 0){
      return res.status(400).json(errors);
   }
   firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(data => {
         userData = data.user;
         userID = data.user.uid;
         const claims = {
            patient: true
         };
         admin.auth().setCustomUserClaims(userID, {patient: true});
         return data.user.getIdToken();
      })
      .then(tokenID => {
         token = tokenID;
         const userCredentials = {
            email: newUser.email,
            name: newUser.name,
            createdAt: new Date().toISOString(),
            userID
         };
         return db.collection('patients').doc(userID).set(userCredentials);

      })
      .then(() => {
         return res.status(200).json({ token });
      })
      .catch((err) => {
            console.error(err);
            return res.status(500).json({error : err.code});
         }
      );
});


exports.api = functions.https.onRequest(app);
