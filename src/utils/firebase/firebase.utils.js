import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
 } from 'firebase/auth';
 import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
 } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyApAj1X5PCC1nM_uKup_YZRd6ObHbO9smo",
    authDomain: "sh-clothing-db.firebaseapp.com",
    projectId: "sh-clothing-db",
    storageBucket: "sh-clothing-db.firebasestorage.app",
    messagingSenderId: "957535711933",
    appId: "1:957535711933:web:5108eef7a1ce730775bdd4"
  
};
  
// Initialize Firebase  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}