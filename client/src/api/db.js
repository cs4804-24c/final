import { auth, db } from "./firebase.js";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";

/** Send an answer to the DB. Return true if successful, false otherwise. */
export async function sendAnswer(answer, user) {
    return new Promise(resolve => {
        const userDoc = doc(db, "final-users", user.uid);
        getDoc(userDoc).then((docSnap) => {
            let newAnswers = {};
            if (docSnap.exists()) {
                const data = docSnap.data();
                for (const key in data.answers) {
                    newAnswers = data.answers;
                }
            }
            const answerJson = answer.toJson();
            newAnswers[answerJson.questionNumber] = answerJson;
            setDoc(userDoc, { displayName: user.displayName, email: user.email, answers: newAnswers }).then(() => {
                console.log("Document written with ID: ", user.uid); resolve(true);
            }).catch((error) => { console.error(error); resolve(false); })
        })
    })
}

/** Get the data for the current user */
export async function getCurrentUserRecord() {
    return new Promise(resolve => {
        const currentUserId = auth.currentUser.uid;
        const userDoc = doc(db, "final-users", currentUserId);
        getDoc(userDoc).then((docSnap) => {
            if (docSnap.exists()) {
                resolve(docSnap.data());
            } else {
                console.log("No such document!");
                resolve(null);
            }
        }).catch((error) => {
            console.error("Error getting document:", error);
            resolve(null);
        });
    })
}

/** Get the data of every user who's signed in */
export async function getAllUserRecords() {
    try {
        const usersCollectionRef = collection(db, "final-users");
        const querySnapshot = await getDocs(usersCollectionRef);
        const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return users;
    } catch (error) {
        console.error("Error getting all user records:", error);
        return [];
    }
}

/** @class for recording question answers */
export class QuestionState {

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

    /** Record the user's answer to the question */
    answer(userAnswer) {
        this.userAnswer = userAnswer;
        this.endTime = Date.now();
        this.answerTime = (this.endTime - this.startTime) / 1000;
        this.actualError = Math.abs(this.correctAnswer - userAnswer);
        this.relativeError =
            Math.log2(Math.abs(userAnswer - this.correctAnswer) + (1 / 8)) === -3
                ? 0
                : Math.log2(Math.abs(userAnswer - this.correctAnswer) + (1 / 8))
    }

    /** Make this {@link QuestionState} JSON serializable for Firestore Database */
    toJson() {
        return {
            questionNumber: this.questionNumber,
            correctAnswer: this.correctAnswer,
            userAnswer: this.userAnswer,
            actualError: this.actualError,
            relativeError: this.relativeError,
            answerTime: this.answerTime
        }
    }
}