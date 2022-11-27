import { useEffect, useState } from 'react';
import { app } from './firebaseUtils'
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth ,onAuthStateChanged} from 'firebase/auth';

export const isAuthenticated = sessionStorage.getItem('Auth Token') !== null;

export const IsAuthenticatedAdmin = async () => {
    const [user, setUser] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, setUser, setError)
        return () => unsubscribe()
      }, [])
    
      if(user){
        const db = getFirestore(app)
        const docRef = doc(db, "users", user.auth.currentUser.email)
        const docSnap = await getDoc(docRef) 
        return docSnap
      }
}