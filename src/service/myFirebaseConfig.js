import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDcxjUQ-lohjKvps-RDWlzxzE4JyM6jIfs",
    authDomain: "projeto-inovacao-2aa68.firebaseapp.com",
    projectId: "projeto-inovacao-2aa68",
    storageBucket: "projeto-inovacao-2aa68.appspot.com",
    messagingSenderId: "374381298486",
    appId: "1:374381298486:web:ba7aa6da1af4e599b9a997"  
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app)