import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import firstVisualization from "../visualization_img/ovarian_cancer_visualization_1.png"
import controlTextForSecondVisualization from "../visualization_img/control_text_for_ovarian_cancer_visualization_2.png"
import thirdVisualization from "../visualization_img/ovarian_cancer_visualization_3.png"
import { QuestionStat, sendAnswer } from "../api/db"
import { auth } from "../api/firebase"
import "./mobile.css"

/** Correct answers to questions in order */
const correctAnswers = [23, 99, 99]
const textImageLocation = ["to the left", "above"]

function VisualizationProblemDisplay() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const imagePaths = [firstVisualization, controlTextForSecondVisualization, thirdVisualization]
    const visualizationTitles = ["Women with an Average Risk of Ovarian Cancer", "Risk of Ovarian Cancer for Women with BRCA1 Gene Changes", "Risk of Ovarian Cancer for Women with BRCA2 Gene Changes"]
    const questions = [
        `On average, about how many out of the 100 women in the sample ${screenWidth > 900 ? textImageLocation[0] : textImageLocation[1]}, will get ovarian cancer sometime during their lives?`,
        `By age 80, about how many out of a sample ${screenWidth > 900 ? textImageLocation[0] : textImageLocation[1]}, of 1000 women who have BRCA1 gene changes will get ovarian cancer?`,
        `For women who have BRCA2 gene changes, by age 80, the risk of ovarian cancer is higher than average. Given that a proportion of women who have BRCA2 gene changes ${screenWidth > 900 ? textImageLocation[0] : textImageLocation[1]}, out of the sample of 100 to the left will get ovarian cancer by age 80, about how many out of a sample of 1000 women who have BRCA2 gene changes will get ovarian cancer?`]
    const [questionNumber, setQuestionNumber] = useState(1)
    const [visualizationTitle, setVisualizationTitle] = useState(visualizationTitles[0])
    const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
    const [answerFeedback, setAnswerFeedback] = useState("")
    const [navigationError, setNavigationError] = useState("")

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
        <section key="exam" className={`section ${!currentQuestionStat && "is-hidden"}`} style={{ backgroundColor: '#f5f5f5' }}>
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
