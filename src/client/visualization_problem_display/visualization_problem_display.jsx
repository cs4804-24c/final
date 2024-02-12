import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import firstVisualization from "../visualization_img/visualization-1-resized.png"
//import secondVisualization from "../visualization_img/"
//import thirdVisualization from "../visualization_img/"

function VisualizationProblemDisplay() {
  const imagePaths = [firstVisualization, 
                    "",
                    ""]
  const visualizationTitles = ["Medical Bill Inception", "Second", "Third"] //placeholder titles for now.
  const questions = ["On average, there are 250 people or more involved in the billing process for one patient's four day stay at a hospital. In the visualization to the left, the icons highlighted in red are the people said to be involved in the inception step of the billing process. How many of the total number of people involved in the billing process on the left contribute to the inception of the bill?", 
  "", 
  ""]
  const [questionNumber, setQuestionNumber] = useState(1)
  const [visualizationTitle, setVisualizationTitle] = useState(visualizationTitles[0]) //First is a placeholder here.
  const [imagePath, setImagePath] = useState(imagePaths[0]) //Will come into use once we have icon array images.
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
  const [questionText, setQuestionText] = useState(questions[0])
  const [submittedAnswer, setSubmittedAnswer] = useState("")
  const [answerFeedback, setAnswerFeedback] = useState("")
  const [navigationError, setNavigationError] = useState("")
  const navigate = useNavigate()

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
    console.log(questionNumber)
  }, [questionNumber])

  useEffect(() => {
    const nextQuestionButton = document.getElementById("next")
    nextQuestionButton.addEventListener("click", async function() {
      if (currentQuestionAnswered) {
        if (questionNumber == questions.length) {
          navigate("/thank_you")
        } else {
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
      } else {
        setNavigationError("Must answer current question before moving forward")
      }
    })
  })

  return (
    <section class = "section">
        <h1 class = "is-size-2 is-family-primary has-text-weight-bold">{visualizationTitle} Icon Array</h1>
        <div class = "box mt-3">
          <div class = "media">
            <div class = "media-left">
              <img src={imagePath}/>
            </div> 
            <div class = "media-content">
              <div class = "content">
                <label class="label is-size-6 is-family-monospace">{questionText}</label>
                <div class = "field">
                    <div class="control">
                      <input class="input is-size-6 is-family-sans-serif" type="number" placeholder="Type number answer here" id="userAnswer"/>
                    </div>
                </div>
                <div class = "field">
                  <div class = "control">
                    <button class="button is-small is-link is-family-code" id="submissionButton">Submit</button>
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
            <button class = "button is-medium is-warning has-text-black is-family-code" id="next">Next</button>
          </div>
        </div>
        <div class = "block">
          <p class = "is-family-monospace has-text-centered has-text-danger-dark">{navigationError}</p>
        </div>
    </section>
  )
}

export default VisualizationProblemDisplay
