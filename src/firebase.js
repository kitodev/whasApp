import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDlCR9IYPPpRIhR-LHjO-0sX05ALE3wf8s",
    authDomain: "whatsappclone-15376.firebaseapp.com",
    databaseURL: "https://whatsappclone-15376.firebaseio.com",
    projectId: "whatsappclone-15376",
    storageBucket: "whatsappclone-15376.appspot.com",
    messagingSenderId: "783110040536",
    appId: "1:783110040536:web:061f1a5c3cc1de548020ad",
    measurementId: "G-NJNX9F9FX7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;