# Assignment 3 - Replicating a Classic Experiment  
*By: Matthew McAlarney, Priyanka Narasimhan, Joe Dobbelaar, and Randy Huang*

## Working link to our web application



## Link to project screencast



## Link to Process Book



## Division of Labor
- **README**: *Matthew McAlarney*
- **Process Book**" *Matthew McAlarney and Priyanka Narasimhan*
- **Database, authentication, and web server**: *Joe Dobbelaar*
- **UI, React component setup, and refactors**: *Matthew McAlarney, Joe Dobbelaar, and Randy Huang*
- **Icon Array Data Randomization**: *Randy Huang and Priyanka Narasimhan*
- **Experiment Question Setup and Visualizations**: *Priyanka Narasimhan and Matthew McAlarney*
- **Master csv functionality**: *Randy Huang*

## Firebase: Database & Authenticaton
User authentication and database are handled by Firebase: Google's mobile and web application development platform. Firebase configuration information is in `api/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAjUR5P2VPVwppe1ukyatg7AuGr0NaCvic",
  authDomain: "a3-experiment-178d8.firebaseapp.com",
  projectId: "a3-experiment-178d8",
  storageBucket: "a3-experiment-178d8.appspot.com",
  messagingSenderId: "778102749453",
  appId: "1:778102749453:web:10b109d1a8e823fa0d5844"
};
```

Also included in `firebase.js` is a set of three exports: the authentication service, the database, and the firebase app itself (which is currently not referenced anywhere else).
```javascript
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```
`db` is imported to `api/db.js` and `auth` is imported to `api/auth.js`.

### Authentication
When a user first reaches the website, they're given the option to sign in with Google. This button displays a popup (or a new tab, if you're a mobile user) that allows the user to select a Google account. Since we use Google for authentication, we don't have to worry about protecting any sensitive user data or encrypting passwords.

`auth.js` contains sign-in logic, a method to get the current user, and React components for sign-in and sign-out buttons.

The `signIn()` function opens the afformentioned popup and updates the `auth` object from `firebase.js`. This method doesn't directly update any React state variables. That's handled by `getCurrentUser()`, which subscribes to changes on `auth` by calling a React `setState()`.
```javascript
function getCurrentUser(setter) { 
    auth.onAuthStateChanged((user) => { 
        if (user) { 
            setter(user);
        } else { 
            setter(null);
        } 
    }); 
}
```

In `App.js`, we start this listening process with a `useEffect()`: passing in a `setState()` so that the UI re-renders on `auth` changes.
```javascript
useEffect(() => { getCurrentUser(setCurrentUser); }, [])
```

### Database
`api/db.js` imports `db`: the Firestore Database reference for this project. It contains methods for sending and fetching data from the database: `sendAnswer()`, `getCurrentUserRecord()`, and `getAllUserRecords()`.

`sendAnswer()` takes in the current user and a `QuestionStat`: an object for recording a user's answer. It tracks several statistics: the correct answer, the user's answer, the actual error, relative error, and time it took to answer (though the timer is hidden from the user, so this statistic may not mean much). A new `QuestionStat` is created whenever the current question changes, starting the hidden timer. When the an answer is submitted, we use `QuestionStat.answer()` to lock in the answer and stop the timer. Then `sendAnswer()` is called on this completed `QuestionStat`.
```javascript
export async function sendAnswer(answer, user) {
  return new Promise(resolve => {
    const userDoc = doc(db, "users", user.uid);
    getDoc(userDoc).then((docSnap) => {  // First, we get the user's document
      let newAnswers = {};
      if (docSnap.exists()) { // If this user's document exists: i.e. they've submitted an answer before, collect their previous answers
        const data = docSnap.data(); 
        for (const key in data.answers) {
          newAnswers = data.answers;
        }
      }
      const answerJson = answer.toJson(); // Add this new answer to the map
      newAnswers[answerJson.questionNumber] = answerJson;
      // Now push that to the database
      setDoc(userDoc, {displayName: user.displayName, email: user.email, answers: newAnswers}).then(() => {
        console.log("Document written with ID: ", user.uid); resolve(true);
      }).catch((error) => { console.error(error); resolve(false); })
    })
  })
}
```

`getCurrentUserRecord()` simply returns the document associated with the currently signed-in user, and `getAllUserRecords()` returns an array of every user record in the database.

## The Server
The React client is hosted by a simple express server in the root directory. The server listens on port `4804` ;)You can visit the page at www.icons.joed.dev

## Design Achievements



## Technical Achievements

