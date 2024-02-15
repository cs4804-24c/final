import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import firstVisualization from "../visualization_img/visualization-1-resized.png"
import secondVisualization from "../visualization_img/visualization-2-resized.png"
import thirdVisualization from "../visualization_img/visualization-3-resized.png"
import { sendAnswer } from "../api/db"
import { auth } from "../api/firebase"

function VisualizationProblemDisplay() {
  const imagePaths = [firstVisualization, 
                    secondVisualization,
                    thirdVisualization]
  const visualizationTitles = ["Medical Bill Inception", "Surgery", "Inpatient Stay"] 
  const questions = ["There are typically 250 people or more involved in the billing process for one patient's four day stay at a hospital. In the visualization to the left, the icons colored in red are the people said to be involved in the inception stage of the billing process. How many of the total number of people involved in the billing process on the left contribute to the inception of the bill?", 
  "The second stage of the billing process for one patient's four day stay at a hospital involves the fees incurred during surgery. In the visualization to the left, the icons colored in black represent the people involved in the previous inception stage of the billing process. The icons colored in red now represent the people involved in the surgery fees of the billing process. How many of the total number of people involved in the billing process on the left contribute to the surgery fees of the bill?", 
  "The third stage of the billing process for one patient's four day stay at a hospital involves the fees incurred during the inpatient stay. In the visualization to the left, the icons colored in black represent the people involved in the previous inception and surgery stages of the billing process. The icons colored in red now represent the people involved in the inpatient stay fees of the billing process. How many of the total number of people involved in the billing process on the left have contributed to the fees so far?"]
  const [questionNumber, setQuestionNumber] = useState(1)
  const [visualizationTitle, setVisualizationTitle] = useState(visualizationTitles[0]) 
  const [imagePath, setImagePath] = useState(imagePaths[0]) 
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
  const [questionText, setQuestionText] = useState(questions[0])
  const [submittedAnswer, setSubmittedAnswer] = useState("")
  const [answerFeedback, setAnswerFeedback] = useState("")
  const [navigationError, setNavigationError] = useState("")
  const navigate = useNavigate()

  // useEffect(() => { console.log(submittedAnswer) }, [submittedAnswer])
  // useEffect(() => { console.log(currentQuestionAnswered) }, [currentQuestionAnswered])
  // useEffect(() => { console.log(questionNumber) }, [questionNumber])

  function handleSubmitPress() {
    // Guard clauses
    if (currentQuestionAnswered) { setAnswerFeedback("Can only submit one answer"); return; } // Escape if this question has been answered before
    const submission = document.getElementById("userAnswer").value
    if (submission.length == 0) { setAnswerFeedback("Cannot submit an empty answer"); return; } // Escape if the answer is empty
    // Handle submission
    const answer = parseInt(submission)
    setSubmittedAnswer(answer)
    setCurrentQuestionAnswered(true)
    setAnswerFeedback("Submitted successfully!")
    sendAnswer(questionNumber, answer, auth.currentUser).then((dbResult) => { console.log(dbResult) })
  }

  function handleNextPress() {
    // Guard clauses
    if (!currentQuestionAnswered) { setNavigationError("Must answer current question before moving forward"); return; } // Escape if the current question has not been answered
    if (questionNumber == questions.length) { navigate("/thank_you"); return; } // Navigate to /thank_you if there are no more questions
    // Go to the next question
    setQuestionNumber(questionNumber + 1)
    setVisualizationTitle(visualizationTitles[visualizationTitles.indexOf(visualizationTitle) + 1])
    setImagePath(imagePaths[imagePaths.indexOf(imagePath) + 1])
    setQuestionText(questions[questions.indexOf(questionText) + 1])
    setCurrentQuestionAnswered(false)
    setSubmittedAnswer("")
    setAnswerFeedback("")
    setNavigationError("")
    document.getElementById("userAnswer").value = ""
  }


  return (
    <section className = "section">
        <h1 className = "is-size-2 is-family-primary has-text-weight-bold">{visualizationTitle} Icon Array</h1>
        <div className = "box mt-3">
          <div className = "media">
            <div className = "media-left">
              <img width = "550px" height = "300px" src={imagePath}/>
            </div> 
            <div className = "media-content">
              <div className = "content">
                <label className="label is-size-6 is-family-monospace has-text-weight-light">{questionText}</label>
                <div className = "field">
                    <div className="control">
                      <input className="input is-size-6 is-family-sans-serif" type="number" placeholder="Type number answer here" id="userAnswer"/>
                    </div>
                </div>
                <div className = "field">
                  <div className = "control">
                    <button className="button is-small is-link is-family-code" onClick={handleSubmitPress}>Submit</button>
                  </div>
                </div>
                <div className = "block">
                  <p className = "is-family-monospace has-text-grey has-text-weight-bold is-size-7">{answerFeedback}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className = "block">
          <div className = "buttons is-centered">
            <button className = "button is-medium is-warning has-text-black is-family-code" onClick={handleNextPress}>Next</button>
          </div>
        </div>
        <div className = "block">
          <p className = "is-family-monospace has-text-centered has-text-danger-dark">{navigationError}</p>
        </div>
    </section>
  )
}

export default VisualizationProblemDisplay
