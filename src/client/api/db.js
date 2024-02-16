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

export class QuestionStat {
  
  /** Question that this stat is associated with */
  questionNumber = null;
  /** Correct answer to the question */
  correctAnswer = null;
  /** User's answer to the question */
  userAnswer = null;

  /** Difference between userAnswer and correctAnswer */
  actualError = null;
  /** Error relative to the value of the correctAnswer */
  relativeError = null;

  /** Time the user started answering the question */
  startTime = Date.now();
  /** Time the user ended answering the question */
  endTime = null;
  /** Time it took the user to answer the question */
  answerTime = null;

  constructor(questionNumber, correctAnswer) {
    this.questionNumber = questionNumber;
    this.correctAnswer = correctAnswer;
  }

  answer() {
    this.userAnswer = userAnswer;
    this.endTime = Date.now();
    this.answerTime = this.endTime - this.startTime;
    this.actualError = Math.abs(correctAnswer - userAnswer);
    this.relativeError = 100 * this.actualError / correctAnswer;
  }
}