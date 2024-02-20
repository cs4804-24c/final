# Assignment 3 - Replicating a Classic Experiment  
*By: Matthew McAlarney, Priyanka Narasimhan, Joe Dobbelaar, and Randy Huang*

## Working link to our web/mobile application
https://www.icons.joed.dev/

## Screenshot of first visualization and question in experiment

![First Question and Visualization in Experiment Screenshot](img/a3_first_experiment_interface.png)

## Division of Labor
- **README**: *Priyanka Narasimhan, Matthew McAlarney and Joe Dobbelaar*
- **Database, authentication, and web server**: *Joe Dobbelaar*
- **UI, React component setup, and refactors**: *Matthew McAlarney, Joe Dobbelaar, and Randy Huang*
- **Experiment Question Setup and Visualizations**: *Priyanka Narasimhan and Matthew McAlarney*
- **Master csv functionality and mobile styling**: *Randy Huang*
- **Excel Data Processing**: *Priyanka Narasimhan, Randy Huang, and Matthew McAlarney*

## Background

We coded and conducted an experiment using iconographic arrays and textual descriptions of proportional data. For each of the three visualizations, we asked one question pertaining to the present proportion and sample size(s) and stored the numerical user answers. Based on the numerical answers, we analyzed to what extent iconographic arrays communicated proportional data effectively compared to textual data description. Iconographic arrays are a type of data visualization chart used extensively in the medical community to convey information such as the risk of developing different types of cancer among certain groups of people.

## Our Hypothesis 

Iconographic arrays are not as effective at communicating proportional data to the average user as textual descriptions of proportional data. In other words, the average user cannot deduce proportions of a sample size and predict proportions for future sample sizes through iconographic arrays as effectively as they can through textual descriptions of data.

## Outline of the Visualizations and Questions in our Survey

Resources and research used to influence the experiment setup encompassing our visualizations and questions:

>1. How to evaluate data visualizations across different levels of understanding: https://arxiv.org/pdf/2009.01747.pdf
    
        Levels and corresponding tasks of the visualization taxonomy we are testing:
        
            a. Application: Use a percentage and total population to calculate a number.
            b. Synthesis: Predict a future value.
>2. Improving Baysian Reasoning: https://www.cs.tufts.edu/~remco/publications/2015/InfoVis2015-Bayes.pdf
>3. Visualizations created and presented by the Healthwise Staff at https://www.nyp.org/healthlibrary/diagnosis/document/abl0344
            
            a. All Healthwise content published to NewYork-Presbyterian is reviewed by a comprehensive Clinical Review Board.
>4. The data used to construct visualization 1 originally comes from Seer Cancer Statistics Review (CSR) 1975 - 2017: https://seer.cancer.gov/archive/csr/1975_2017/index.html 
>5. More information about the data collection at Seer Cancer Statistics Review: https://seer.cancer.gov/about/overview.html
>6. The data used to construct visualizations 2 and 3 originally come from National Library of Medicine - National Center for Biotechnology Information: https://pubmed.ncbi.nlm.nih.gov/28632866/

Visualizations:

1: Women with Average Risk of Ovarian Cancer

Data used to construct visualization originally comes from Seer Cancer Statistics Review (CSR) 1975 - 2017: https://seer.cancer.gov/archive/csr/1975_2017/index.html

![Women with Average Risk of Ovarian Cancer](img/ovarian_cancer_visualization_1.png)

2: Risk of Ovarian Cancer for Women with BRCA1 Gene Changes

Data used to construct visualization originally comes from National Library of Medicine - National Center for Biotechnology Information: https://pubmed.ncbi.nlm.nih.gov/28632866/

![Risk of Ovarian Cancer for Women with BRCA1 Gene Changes](img/ovarian_cancer_visualization_2.png)

3: Risk of Ovarian Cancer for Women with BRCA2 Gene Changes

Data used to construct visualization originally comes from National Library of Medicine - National Center for Biotechnology Information: https://pubmed.ncbi.nlm.nih.gov/28632866/

![Risk of Ovarian Cancer for Women with BRCA2 Gene Changes](img/ovarian_cancer_visualization_3.png)

Questions (1 per visualization):

1 (Icon Array for visualization 1, Taxonomy Mapping: Application: Use a percentage and total population to calculate a number.):
    
    Question: On average, about how many out of the 100 women in the sample will get ovarian cancer sometime during their lives?
    
    What we want to know from this question: Can the user accurately interpret a proportion shown in an icon array?
    
    Answer: 1

2 (Control Text representing visualization 2, Taxonomy Mapping: Synthesis: Predict a future value.): 
    
    Control Text: For women who have BRCA1 gene changes, the risk of ovarian cancer is higher than average. By age 80, about 44 out of 100 women with BRCA1 gene changes will get ovarian cancer. 
    
    Question: Based on the proportion described, by age 80, about how many who have BRCA1 gene changes out of a sample of 1000 women will get ovarian cancer?
    
    What we want to know from this question: Can the user accurately apply a proportion from a textual description to a different sample size?
    
    Answer: 440

3 (Icon Array for visualization 3, Taxonomy Mapping: Synthesis: Predict a future value.):

    Question: For women who have BRCA2 gene changes, by age 80, the risk of ovarian cancer is higher than average. Given that a proportion of women who have BRCA2 gene changes out of the sample of 100 will get ovarian cancer by age 80, about how many who have BRCA2 gene changes out of a sample of 1000 women will get ovarian cancer?

    What we want to know from this question: Can the user accurately apply a proportion shown in an icon array to a different sample size?
    
    Answer: 170

## Procedure

>1. Participant enters the application and begins the survey. We administered the survey to a total of 11 participants of various educational and work backgrounds.
>2. The survey will display a particular iconographic array or textual data description along with a question about the visualization. The participant then enters an answer to the current question. Very important: In discussion with Professor Harrison about our particular experiment, we have decided that each of the three visualizations in this current a3 experiment should remain the same (we are using static images of the visualizations as a result). Keeping the visualizations the same for a3 ensures that we are able to collect some baseline information about the effectiveness of iconographic arrays compared to textual description. In addition, controlling the data presented in the icongraphic arrays ensures that there is substantial room for our group to iterate on our a3 experiment when transitioning into the final project. For our final project, we plan to implement an extension of our a3 experiment and also extend our hypothesis; this means that for the iconographic arrays we present in the final, we will definitely use D3 and random data generation to change the conditions in which each user answers new questions. For the sake of transitioning from a3 to the final project, we decided to hold off on implementing random data generation and D3 visualizations for now so that there is substantial room remaining to improve and expand the parameters of our experiment.
>3. All questions require numeric answers.
>4. There are 3 different visualizations total (2 icnonographic arrays and one textual data description).
>5. The participant is asked to repeat the survey only once. This means that each participant will move through one trial for each question in the survey. Very important: In discussion with Professor Harrison about our particular experiment, we decided to have each participant move through only one trial of the survey as the current setup, parameters, and hypothesis are most suitably carried out using the same visualization for each question. This way, we ensure that we have collected a sufficient amount of data to test the specifics of our hypothesis without having users unecessarily answer the same question corresponding to the same visualization more than once.

## Experiment Results



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

1. Added CSS styling for mobile adaptation:
    a. In our mobile.css file, we included media queries that allow our experiment to be completed on all mobile devices.
2. Implemented consistent text fonts, text sizes, and element colors across all problem interfaces in our experiment:
    a. To keep the user experience of our application as consistent as possible, we used the Bulma CSS framework to apply the same text fonts and font sizes across all three problem interfaces.
3. Implemented consistent text and button colors across all problem interfaces in our experiment:
    a. We also strived to keep the user experience of our application consistent through applying the same text and button colors for each element across all three problem interfaces.
4. Implemented an author footer across all user interfaces of the application:
    a. In each user interface of our application there is a footer that lists the title of the assignment experiment and all of the application authors in our group.

## Technical Achievements

1. Implemented answer entry feedback across all problem interfaces:
    a. For all three problem interfaces in our application, we implemented basic answer entry feedback to inform the user of the following answer statuses:
        I. The answer was successfully submitted.
        II. Since an answer has already been submitted, a subsequent answer cannot also be submitted (can only submit one answer).
2. Implemented answer submission check on click of the "Next" button across all problem interfaces:
    a. When a user clicks on the "Next" button to navigate to the next problem interface or the final thank you page, there is a check that is executed that determines if the question displayed on the current problem interface has been answered. If the current question has not been answered, a red message will appear below the "Next" button notifying the user that they are not able to move forward in the experiment.
3. Implemented ability for the user to repeat the experiment if desired:
    a. On the thank you page, we implemented a "Take survey again" button; when this button is clicked, the user is redirected back to the beginning of the experiment from which they can move through all three problem interfaces again.
4. Implemented Firebase database and user authentication:
    a. Our implementation of a Firebase database connection and user authentication enabled a number of robust capabilities:
        I. When a user lands on our application, they must sign in using a Google account before starting the experiment. This user authentication we implemented through Firebase services is quick and convenient for the user as they avoid the unnecessary steps of creating a custom user account from scratch. In addition, the Firebase user authentication allows us to easily capture and persist user answers to each question.
        II. Our implementation of a database connection ensures that we can persist all user answers to questions to our group's Firebase database. As a result, our group is able to easily view all relevant data associated with each application user; this data includes all question numbers from the experiment, the user's submitted answer to each question, the actual and relative errors for each question, the answer time for each question, and the correct answer for each question. In addition, the storage of and access to this data in our group's Firebase database allows us to quickly generate a corresponding csv containing all relevant question information.