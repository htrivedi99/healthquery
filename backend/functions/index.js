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
            return res.status(500).json({ error : err.code});
         }
      );
});

app.post("/loginUser", (req, res) => {
   const user = {
      email: req.body.email,
      password: req.body.password
   };
   let errors = {};
   if(isEmpty(user.email)){
      errors.email = 'Must not be empty';
   }
   if(isEmpty(user.password)){
      errors.password = 'Must not be empty';
   }

   if(Object.keys(errors).length > 0){
      return res.status(400).json(errors);
   }

   firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
         return data.user.getIdToken();
      })
      .then(token => {
         let user = firebase.auth().currentUser;
         return res.status(200).json({ "token": token, "userId": user.uid });
      })
      .catch(err => {
         console.error(err);
         if(err.code === "auth/wrong-password"){
            return res.status(403).json({general: 'Wrong Credentials, please try again'});
         }else{
            return res.status(500).json({error: err.code});
         }
      })

});

app.post('/getChat', (req, res) => {
   console.log(req.body.id);
   let listener = admin.firestore().collection('chat').doc('userid1userid2').collection('testcollection');
  
   let observer = listener.onSnapshot(docSnapshot => {
      let chats = [];
      docSnapshot.docChanges().forEach(change => {
        chats.push(change.doc.data());
         
      });

      // docSnapshot.forEach(doc => {
      //    // console.log(doc.id, doc.data());
      //    chats.push(doc.data());
      // })
      return res.json(chats);
      // console.log(docSnapshot);
      // console.log(`Received doc snapshot: ${docSnapshot}`);
   }, err => {
      console.log(`Encountered error: ${err}`);
   })
   // admin.firestore().collection('chat').doc('userid1userid2').collection('testcollection').get()
   // .then((data) => {
   //    let chats = [];
   //    data.forEach((doc) => {
   //       chats.push(doc);
   //    })
   //    return res.json(chats);
   // })
   // .catch(err => {
   //    console.log(err);
   // })
});

app.get("/getDoctors", (req, res) => {
   admin.firestore().collection('doctors').get().then((data) => {
      let doctors = [];
      data.forEach((doc) => {
         doctors.push(doc.data());
      });
      return res.json(doctors);
   })
   .catch((err) => console.error(err));
});

app.post("/checkChatHistory", (req, res) => {
   let documentId = req.body.uid1.concat(req.body.uid2);
   documentId = documentId.replace(/\s/g, "");
   console.log("document id", documentId);
   admin.firestore().collection('chat').doc(documentId).get()
         .then(doc => {
            if(!doc.exists){
               console.log("doc exists", doc.exists);
               return res.json({"newChatHistory": true});
            }else{
               return res.json({"newChatHistory": false});
            }
         })
});

app.post("/createNewChat", (req, res) => {
   let date = new Date();
   let timestamp = date.getTime();
   let text = req.body.text;
   let uid = req.body.uid1;
   let doctorId = req.body.uid2;
   let createdAt = timestamp;
   let documentId = uid.concat(doctorId);
   documentId = documentId.replace(/\s/g, "");
   console.log(documentId);
   
   let chatData = {
      "uid": uid,
      "text": text,
      "createdAt": createdAt 
   }
   console.log("Chat Data", chatData);

   admin.firestore()
         .collection('chat')
         .doc(documentId)
         .set({exists: true});

   admin.firestore()
         .collection('chat')
         .doc(documentId)
         .collection('testcollection')
         .add(chatData)
         .then(ref => {
            return res.status(200).json({ result: "Message Sent Successfully!" });
         })
});
app.post("/addChat", (req, res) => {
   let date = new Date();
   let timestamp = date.getTime();
   let text = req.body.text;
   let uid = req.body.uid1;
   let doctorId = req.body.uid2;
   let createdAt = timestamp;
   let documentId = uid.concat(doctorId);
   documentId = documentId.replace(/\s/g, "");
   console.log(documentId);
   
   let chatData = {
      "uid": uid,
      "text": text,
      "createdAt": createdAt 
   } 
   admin.firestore()
         .collection('chat')
         .doc(documentId)
         .collection('testcollection')
         .add(chatData)
         .then(ref => {
            return res.status(200).json({ result: "Message Sent Successfully!" });
         })
});

app.post("/getLastMessage", (req, res) => {
      let uid = req.body.uid1;
      let doctorId = req.body.uid2;
      let documentId = uid.concat(doctorId);
      documentId = documentId.replace(/\s/g, "");
      db.collection("chat")
      .doc(documentId)
      .collection("testcollection")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then(data => {
      let message = [];
      data.forEach((doc) => {
         message.push(doc.data());
      });
      return res.json(message);
      })
     
})


exports.api = functions.https.onRequest(app);
