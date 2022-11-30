// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZyzzRouYNcrkroQY0ocqrPmwLhm4poZg",
  authDomain: "crwn-clothing2-ba375.firebaseapp.com",
  projectId: "crwn-clothing2-ba375",
  storageBucket: "crwn-clothing2-ba375.appspot.com",
  messagingSenderId: "644722714019",
  appId: "1:644722714019:web:475842dd5d61b5e4a9e616",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/// mycode
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  promp: "select_account",
});

//// export auth
export const auth = getAuth();
export const signInWithPopupByGoogle = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithRedirectByGoogle = () =>
  signInWithRedirect(auth, googleProvider);
export const getRedirectResultByGoogle = () => getRedirectResult(auth);

export const createUserWithEmailAndPasswordByGoogle = async (
  email,
  password
) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPasswordByGoogle = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

//// export firestore
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfos = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    //todo
    const { email, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        displayName,
        createdAt,
        ...additionalInfos,
      });
    } catch (error) {
      console.log("error creating:: ", error);
    }
  }

  return userDocRef;
};
