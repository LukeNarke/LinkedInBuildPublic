import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB6n9WLGqYLN01Y7sJ7VeMA9D3ufCmKi4U",
  authDomain: "linkedin-clone-lln-e0b09.firebaseapp.com",
  projectId: "linkedin-clone-lln-e0b09",
  storageBucket: "linkedin-clone-lln-e0b09.appspot.com",
  messagingSenderId: "1034774308883",
  appId: "1:1034774308883:web:cb2298f19b4c654c7237e6",
};

// this first const firebaseApp connects everything
const firebaseApp = firebase.initializeApp(firebaseConfig);
// go to the app we just initialized and get firestore
// now inside of db, we have access to our variable
const db = firebaseApp.firestore();
// auth gives us access to authentication through firebase
const auth = firebase.auth();

// we need these files outside of the firebase.js folder, so we need to export them
export { db, auth };
