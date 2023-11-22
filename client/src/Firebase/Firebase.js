// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPhRM7QeWR-icEiTfvI1GxyAk0lumoDEI",
  authDomain: "reactecom-e773e.firebaseapp.com",
  projectId: "reactecom-e773e",
  storageBucket: "reactecom-e773e.appspot.com",
  messagingSenderId: "375548592560",
  appId: "1:375548592560:web:36c88e70981a92d3219675",
  measurementId: "G-SX15P7FZWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app,auth,firestore,storage}