import { useEffect, useState } from "react"
import { db } from "./firebaseUtils";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
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

export const GetVehicleProduct = async (productId) => {
   const docRef = doc(db, "veiculos", productId)
   try {
      const docSnap = await getDoc(docRef);
      let vehicle = [];
      if(docSnap.exists()) {
         vehicle.push({...docSnap.data(), id: docSnap.id})
         return vehicle[0]
      } else {
         return "Veiculo não existe!"
      }
  } catch(error) {
      console.log(error)
  }
}

export const updateVehicle = async (vehicleId, data) => {

   const docRef = doc(db, "veiculos", vehicleId)
   try {
      updateDoc(docRef, data)
      .then(docRef => {
          return "Dados atualizados com Sucesso!"
      })
      .catch(error => {
          console.log(error);
      })
  } catch(error) {
      console.log(error)
  }
}