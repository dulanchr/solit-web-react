
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAQ8wjesH-yxd8llWm0-xc22JvwF7L_BG4",
  authDomain: "solit-web-fbase.firebaseapp.com",
  projectId: "solit-web-fbase",
  storageBucket: "solit-web-fbase.appspot.com",
  messagingSenderId: "166229595863",
  appId: "1:166229595863:web:af8869b40e1a917810c292",
  measurementId: "G-X2K8CZHBBP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };