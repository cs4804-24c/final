import React, { useState, useEffect } from "react"

function VisualizationProblemDisplay() {
  const testImageURLS = ["https://media.geeksforgeeks.org/wp-content/uploads/20220221132017/download-200x200.png", 
                    "https://media.geeksforgeeks.org/wp-content/uploads/20210915115837/gfg3-300x300.png",
                    "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png"]
  const visualizationTitles = ["First", "Second", "Third"] //placeholder titles for now.
  const questions = ["What fraction of people caught COVID-19 in the sample to the left?", "What fraction of men went nine days without showering in the 1999 fraternity sample to the left?", "What fraction of Americans divorced in front of 7-Eleven in the sample to the left?"]
  
  const [questionNumber, setQuestionNumber] = useState(1)
  const [visualizationTitle, setVisualizationTitle] = useState(visualizationTitles[0]) //First is a placeholder here.
  const [imagePath, setImagePath] = useState(testImageURLS[0]) //Will come into use once we have icon array images.
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
  const [questionText, setQuestionText] = useState(questions[0])
  const [submittedAnswer, setSubmittedAnswer] = useState(null)
  const [answerFeedback, setAnswerFeedback] = useState("")
  const [questionNavigationError, setQuestionNavigationError] = useState("")

  useEffect(() => {
    const answerSubmissionButton = document.getElementById("submissionButton")
    answerSubmissionButton.addEventListener("click", async function() {
      const submission = document.getElementById("userAnswer").value
      if (currentQuestionAnswered) {
        setAnswerFeedback("Can only submit one answer")
      } else if (submission.length == 0) {
        setAnswerFeedback("Cannot submit an empty answer")
      } else {
        const answer = parseInt(submission)
        setSubmittedAnswer(answer)
        setCurrentQuestionAnswered(true)
        setAnswerFeedback("Submitted successfully!")
        //Make post request to server with username, question number and answer possibly.
      }
    })
  })

  useEffect(() => {
    console.log(submittedAnswer)
  }, [submittedAnswer])

  useEffect(() => {
    console.log(currentQuestionAnswered)
  }, [currentQuestionAnswered])

  useEffect(() => {
    const nextQuestionButton = document.getElementById("nextQuestion")
    nextQuestionButton.addEventListener("click", async function() {
      if (currentQuestionAnswered) {
        setQuestionNumber(questionNumber + 1)
        setVisualizationTitle(visualizationTitles[visualizationTitles.indexOf(visualizationTitle) + 1])
        setImagePath(testImageURLS[testImageURLS.indexOf(imagePath) + 1])
        setQuestionText(questions[questions.indexOf(questionText) + 1])
        setCurrentQuestionAnswered(false)
        setSubmittedAnswer(null)
        setAnswerFeedback("")
        setQuestionNavigationError("")
      } else {
        setQuestionNavigationError("Must answer current question before moving to the next question")
      }
    })
  })

  return (
    <section class = "section">
        <h1 class = "is-size-1 is-family-primary has-text-weight-bold">{visualizationTitle} Icon Array</h1>
        <div class = "box mt-1">
          <div class = "media">
            <div class = "media-left">
              <img width="400" height="400" src={imagePath}/>
            </div> 
            <div class = "media-content">
              <div class = "content">
                <label class="label is-size-3 is-family-monospace">{questionText}</label>
                <div class = "field">
                    <div class="control">
                      <input class="input is-size-5 is-family-sans-serif" type="number" placeholder="Type number answer here" id="userAnswer"/>
                    </div>
                </div>
                <div class = "field">
                  <div class = "control">
                    <button class="button is-medium is-link is-family-code" id="submissionButton">Submit</button>
                  </div>
                </div>
                <div class = "block">
                  <p class = "is-family-monospace has-text-grey">{answerFeedback}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class = "block">
          <div class = "buttons is-centered">
            <button class = "button is-medium is-warning has-text-black is-family-code" id="nextQuestion">Next Question</button>
          </div>
        </div>
        <div class = "block">
          <p class = "is-family-monospace has-text-centered has-text-danger-dark">{questionNavigationError}</p>
        </div>
    </section>
  )
}

//"../../../img/cleveland-equation.png"
//style={{position: 'relative', marginLeft: 0 + 'em', marginBottom: 0 + 'em'}}

export default VisualizationProblemDisplay
