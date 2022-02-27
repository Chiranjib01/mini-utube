import { initializeApp, getApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig =
  process.env.NODE_ENV === 'production'
    ? {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
      }
    : {
        apiKey: 'AIzaSyAaiMWYWYWuoAU1nxkQa9rjWfxeFk675T4',
        authDomain: 'socialmedia-3d7ed.firebaseapp.com',
        databaseURL:
          'https://socialmedia-3d7ed-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'socialmedia-3d7ed',
        storageBucket: 'socialmedia-3d7ed.appspot.com',
        messagingSenderId: '27143496078',
        appId: '1:27143496078:web:795c523785891e7f06c4df',
      };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
