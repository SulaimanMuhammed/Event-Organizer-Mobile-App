import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { doc, collection, getDoc, getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  // your Firebase config object goes here
  apiKey: "AIzaSyCQiWpt3mHATKZ1dC7vWt_j_3QNU2zNLrA",
  authDomain: "hafalat-79cd2.firebaseapp.com",
  databaseURL: "https://hafalat-79cd2-default-rtdb.firebaseio.com",
  projectId: "hafalat-79cd2",
  storageBucket: "hafalat-79cd2.appspot.com",
  messagingSenderId: "1062877108551",
  appId: "1:1062877108551:web:a75861437c81c64147d462",
  measurementId: "G-K2YPRLQTF3",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const getUserData = async (userId) => {
  try {
    const userRef = doc(collection(firestore, "users"), userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error("Get user data error:", error);
    throw error;
  }
};
const auth = firebase.auth();
const authLog = auth;
const storage = firebase.storage();
const firestore = getFirestore(app);
// const app = firebase.initializeApp(firebaseConfig);
// //const auth = firebase.auth();
// const authLog = firebase.auth();
// Change this line

//export { app, authLog, storage };

export { app, authLog, storage, getUserData };
