import { useEffect, useState } from 'react';
import {  db } from './firebaseUtils'
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth ,onAuthStateChanged} from 'firebase/auth';

export const IsAuthenticatedAdmin = () => {
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, setUser)
        if(user){
          onSnapshot(doc(db, "users", sessionStorage.getItem('Uid')), (doc) => {
            setUserData({
              uid: sessionStorage.getItem('Uid'),
              name: doc.data().name,
              email: doc.data().email,
              role: doc.data().role,
              avatar_url: doc.data().avatar_url
            })
          })
        }
        return () => unsubscribe()
      }, [user])

      if(userData){
        sessionStorage.setItem('Avatar',userData.avatar_url)
        return userData
      }else{
        return false
      }
}