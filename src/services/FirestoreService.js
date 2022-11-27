import { app } from '../../services/firebaseUtils'
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app)

function getAllUsers() {
   return new Promise((resolve, reject) => {
      db.collection("users").get().then((users) => {
           resolve(users);
      }).catch((e) => {
           reject(e);
      })
   })
}
export default { getAllUsers }