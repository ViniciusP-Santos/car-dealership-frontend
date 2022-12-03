import { useEffect, useState } from 'react';
import {  db } from './firebaseUtils'
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth ,onAuthStateChanged} from 'firebase/auth';

export const IsAuthenticatedAdmin = () => {
    const [user, setUser] = useState()
    const [error, setError] = useState()
    const [userData, setUserData] = useState()

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, setUser, setError)
        if(user){
          onSnapshot(doc(db, "users", sessionStorage.getItem('Uid')), (doc) => {
            setUserData({
              uid: sessionStorage.getItem('Uid'),
              name: doc.data().name,
              email: doc.data().email,
              role: doc.data().role
            })
          })
        }
        return () => unsubscribe()
      }, [user])

      if(userData?.role === 'admin'){
        return true
      }else{
        return false
      }
}