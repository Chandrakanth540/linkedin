// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC2LO1I0zGLpuCr9of_jQbdUuVR1Pi0Jko',
  authDomain: 'linkedinclone-cd66b.firebaseapp.com',
  projectId: 'linkedinclone-cd66b',
  storageBucket: 'linkedinclone-cd66b.appspot.com',
  messagingSenderId: '564008485825',
  appId: '1:564008485825:web:a21062e94ed69beda22540',
  measurementId: 'G-DDH02S2NYN',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
