import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";
import {
  DataSnapshot,
  getDatabase,
  onValue,
  push,
  ref,
} from "firebase/database";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

let app;

const init = () => {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
};

const create = (path: string, body: object, callback: Function) => {
  const db = getDatabase();
  const reference = ref(db, path);
  push(reference, body);
};

const read = (path: string, callback: (snapshot: DataSnapshot) => unknown) => {
  const db = getDatabase();
  const reference = ref(db, path);
  onValue(reference, callback);
};

const firebaseApp = { init, create, read };

export default firebaseApp;
