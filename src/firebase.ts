import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCP0BGDaRlHLH39n8ib7HUqfweEGt9yzZ8",
  authDomain: "les-ranalan.firebaseapp.com",
  databaseURL:
    "https://les-ranalan-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "les-ranalan",
  storageBucket: "les-ranalan.appspot.com",
  messagingSenderId: "729081233246",
  appId: "1:729081233246:web:615c884aee752f8fb5d9cf",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
