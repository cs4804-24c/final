import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/** Send an answer to the DB. Return true if successful, false otherwise. */
export async function sendAnswer(questionNumber, answer, user) {
  return new Promise(resolve => {
    const userDoc = doc(db, "users", user.uid);
    let newAnswers = {};
    getDoc(userDoc, (docSnap) => { if (docSnap.exists()) { const data = docSnap.data; newAnswers = data.answers; } })
    newAnswers[questionNumber] = answer;
    setDoc(userDoc, {displayName: user.displayName, email: user.email, answers: newAnswers}).then(() => {
      console.log("Document written with ID: ", user.uid); resolve(true);
    }).catch((error) => { console.error(error); resolve(false); })
  })

}