import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNLGdur-8TzkQjYn29EQ-d3vPcjU65cCg",
  authDomain: "cardealership-d8b17.firebaseapp.com",
  projectId: "cardealership-d8b17",
  storageBucket: "cardealership-d8b17.appspot.com",
  messagingSenderId: "7959169567",
  appId: "1:7959169567:web:db8cdfa3c95b1eda06632a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);