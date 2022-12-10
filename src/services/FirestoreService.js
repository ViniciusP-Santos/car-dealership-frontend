import { useEffect, useState } from "react"
import { db } from "./firebaseUtils";
import { onSnapshot } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";


export const GetAllCollaborators = () => {
   let [userData, setUserData] = useState()

   useEffect(() => {
      const q = query(collection(db, "users"), where("type", "==", "colaborador"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
         users.push({ ...doc.data(), id: doc.id });
      });
      setUserData(users)
      });
      return () => unsubscribe()
    }, [])

   return userData
}

export const GetAllVehicles = () => {
   let [vehiclesData, setVehiclesData] = useState()

   useEffect(() => {
      const q = query(collection(db, "veiculos"), where("type", "==", "veiculos"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const vehicles = [];
      querySnapshot.forEach((doc) => {
         vehicles.push({ ...doc.data(), id: doc.id });
      });
      setVehiclesData(vehicles)
      });
      return () => unsubscribe()
    }, [])

   return vehiclesData
}