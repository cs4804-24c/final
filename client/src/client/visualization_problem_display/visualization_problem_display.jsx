import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import firstVisualization from "../visualization_img/visualization-1-resized.png"
import secondVisualization from "../visualization_img/visualization-2-resized.png"
import thirdVisualization from "../visualization_img/visualization-3-resized.png"
import { QuestionStat, sendAnswer } from "../api/db"
import { auth } from "../api/firebase"
import "./mobile.css"

/** Correct answers to questions in order */
const correctAnswers = [23, 99, 99]

function VisualizationProblemDisplay() {
    const imagePaths = [firstVisualization, secondVisualization, thirdVisualization]
    const visualizationTitles = ["Medical Bill Inception", "Surgery", "Inpatient Stay"]
    const questions = [
        "There are typically 250 people or more involved in the billing process for one patient's four day stay at a hospital. In the visualization to the left, the icons colored in red are the people said to be involved in the inception stage of the billing process. How many of the total number of people involved in the billing process on the left contribute to the inception of the bill?",
        "The second stage of the billing process for one patient's four day stay at a hospital involves the fees incurred during surgery. In the visualization to the left, the icons colored in black represent the people involved in the previous inception stage of the billing process. The icons colored in red now represent the people involved in the surgery fees of the billing process. How many of the total number of people involved in the billing process on the left contribute to the surgery fees of the bill?",
        "The third stage of the billing process for one patient's four day stay at a hospital involves the fees incurred during the inpatient stay. In the visualization to the left, the icons colored in black represent the people involved in the previous inception and surgery stages of the billing process. The icons colored in red now represent the people involved in the inpatient stay fees of the billing process. How many of the total number of people involved in the billing process on the left have contributed to the fees so far?"]
    const [questionNumber, setQuestionNumber] = useState(1)
    const [visualizationTitle, setVisualizationTitle] = useState(visualizationTitles[0])
    const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
    const [answerFeedback, setAnswerFeedback] = useState("")
    const [navigationError, setNavigationError] = useState("")

    /** Current question statistics— necessary to count how long it takes to answer */
    const [currentQuestionStat, setCurrentQuestionStat] = useState(null);

    const navigate = useNavigate()

    /** Title component */
    const Title = () => <h1 className="is-size-2 is-family-primary has-text-weight-bold">{visualizationTitle} Icon Array</h1>;
    /** Graphic for the current question */
    const CurrentImage = () => (
        <div className="media-left">
            <img className="curr-img" src={imagePaths[questionNumber - 1]} />
        </div>
    );
    /** Error message for navigation handler */
    const NavigationErrorDisplay = () => <div className="block"><p className="is-family-monospace has-text-centered has-text-danger-dark">{navigationError}</p></div>;
    /** Text for the current question */
    const QuestionText = () => (
        <label className="label is-size-6 is-family-monospace has-text-weight-light">
            {questions[questionNumber - 1]}
        </label>
    );
    /** Feedback for the current question */
    const Feedback = () => <div className="block"><p className="is-family-monospace has-text-grey has-text-weight-bold is-size-7">{answerFeedback}</p></div>;

    /** Screen displaying a start button that only appears when there's no question being answered */
    const StartScreen = () => {
        if (currentQuestionStat) { return; }

        function startExam() { setCurrentQuestionStat(new QuestionStat(questionNumber, correctAnswers[questionNumber - 1])); }

        return (
            <section key="start" className={`is-centered has-text-centered section`}>
                <Title />
                <div className="buttons is-centered" style={{ marginTop: "2rem" }}>
                    <button className="button is-medium is-success has-text-black is-family-code" onClick={startExam}>Click To Start</button>
                </div>
            </section>
        )
    }

    const NextButton = () => {

        function handleNextPress() {
            // Guard clauses
            if (!currentQuestionAnswered) { setNavigationError("Must answer current question before moving forward"); return; } // Escape if the current question has not been answered
            if (questionNumber == questions.length) { navigate("/thank_you"); return; } // Navigate to /thank_you if there are no more questions
            // Go to the next question
            const nextQuestionNumber = questionNumber + 1;
            setQuestionNumber(nextQuestionNumber)
            setVisualizationTitle(visualizationTitles[visualizationTitles.indexOf(visualizationTitle) + 1])
            setCurrentQuestionAnswered(false)
            setAnswerFeedback("")
            setNavigationError("")
            setCurrentQuestionStat(new QuestionStat(nextQuestionNumber, correctAnswers[nextQuestionNumber - 1]));
            document.getElementById("userAnswer").value = ""
        }

        return (
            <div className="buttons is-centered">
                <button className="button is-medium is-warning has-text-black is-family-code" onClick={handleNextPress}>Next</button>
            </div>
        )
    }

    const SubmitButton = () => {
        function handleSubmitPress() {
            // Guard clauses
            if (currentQuestionAnswered) { setAnswerFeedback("Can only submit one answer"); return; } // Escape if this question has been answered before
            const submission = document.getElementById("userAnswer").value
            if (submission.length == 0) { setAnswerFeedback("Cannot submit an empty answer"); return; } // Escape if the answer is empty
            // Handle submission
            const answer = parseInt(submission)
            currentQuestionStat.answer(answer);
            setCurrentQuestionAnswered(true)
            setAnswerFeedback("Submitted successfully!")
            sendAnswer(questionNumber, currentQuestionStat, auth.currentUser).then((dbResult) => { console.log(dbResult) })
        }

        return <button className="button is-small is-link is-family-code" onClick={handleSubmitPress}>Submit</button>;
    }

    return [
        <StartScreen />,
        <section key="exam" className={`section ${!currentQuestionStat && "is-hidden"}`} style={{backgroundColor: '#f5f5f5'}}>
            <Title />
            <div className="box mt-3">
                <div className="media">
                    <CurrentImage />
                    <div className="media-content">
                        <div className="content">
                            <QuestionText />
                            <div className="field">
                                <div className="control">
                                    <input className="input is-size-6 is-family-sans-serif" type="number" placeholder="Type number answer here" id="userAnswer" />
                                </div>
                            </div>
                            <SubmitButton />
                            <Feedback />
                        </div>
                    </div>
                </div>
            </div>
            <NextButton />
            <NavigationErrorDisplay />
        </section>
    ]
}

export default VisualizationProblemDisplay
