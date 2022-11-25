// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNLGdur-8TzkQjYn29EQ-d3vPcjU65cCg",
  authDomain: "cardealership-d8b17.firebaseapp.com",
  projectId: "cardealership-d8b17",
  storageBucket: "cardealership-d8b17.appspot.com",
  messagingSenderId: "7959169567",
  appId: "1:7959169567:web:db8cdfa3c95b1eda06632a"
};

// Initialize Firebase
export const firebaseImpl = initializeApp(firebaseConfig);