import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZTbDu1Ilwn7fVhS2HKlIm0O5y84f4NPQ",
  authDomain: "food-app-c11c4.firebaseapp.com",
  projectId: "food-app-c11c4",
  storageBucket: "food-app-c11c4.appspot.com",
  messagingSenderId: "118033810077",
  appId: "1:118033810077:web:aa79987607329f51930a74"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

const db = getFirestore()


export { storage, db }


