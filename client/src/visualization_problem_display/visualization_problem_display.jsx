import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { QuestionStat, sendAnswer } from "../api/db"
import { auth } from "../api/firebase"
import "./mobile.css"

import activeFigure from "../randomizations/img/active_figure.png";
import neutralFigure from "../randomizations/img/neutral_figure.png";

/** Correct answers to questions in order */

/** Number of questions to show the user */
const numQuestions = 6;

function VisualizationProblemDisplay() {
    const visualizationTitles = ["test_title", "Risk of Ovarian Cancer for Women with BRCA1 Gene Changes", "Risk of Ovarian Cancer for Women with BRCA2 Gene Changes"]
    const [questionNumber, setQuestionNumber] = useState(1)
    const [visualizationTitle, setVisualizationTitle] = useState(visualizationTitles[0])
    const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
    const [answerFeedback, setAnswerFeedback] = useState("")
    const [navigationError, setNavigationError] = useState("")

    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [currentTotal, setCurrentTotal] = useState(null);

    const questions = [
        `On average, about how many out of the ${currentTotal} women in the sample above will get ovarian cancer sometime during their lives?`,
        `Based on the proportion described above, by age 80, about how many who have BRCA1 gene changes out of a sample of 1000 women will get ovarian cancer?`,
        `For women who have BRCA2 gene changes, by age 80, the risk of ovarian cancer is higher than average. Given that a proportion of women who have BRCA2 gene changes out of the sample of ${currentTotal} above will get ovarian cancer by age 80, about how many who have BRCA2 gene changes out of a sample of 1000 women will get ovarian cancer?`
    ]

    useEffect(() => {
        const handleResize = () => { setScreenWidth(window.innerWidth); };
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); };
    }, []); //Runs only on the first render.

    useEffect(() => createImage, []);

    function clearSVG() { d3.select("#icon-array").selectAll("*").remove(); }

    function createImage() {
    
        const numPeople = 10 * Math.floor(Math.random() * 10 + 1); // Total number of people icons
        
        // Generate random number of highlighted people
        const numHighlighted = Math.floor(Math.random() * numPeople);
        const numInRow = 10;

        if (questionNumber % 3 === 0) { setCurrentAnswer(numHighlighted); } else { setCurrentAnswer(1000 * numHighlighted / numPeople); }

        setCurrentTotal(numPeople);
        
        const svgWidth = numInRow * 20 + 45; // Width of the SVG container
        const svgHeight = (numPeople / numInRow) * 50 + 45; // Height of the SVG container

        // Create SVG container
        const svg = d3.select("#icon-array")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        // Generate array of person data
        const peopleData = Array.from({ length: numPeople }, (_, i) => ({ id: i }));

        // Append person icons
        const people = svg.selectAll(".person")
            .data(peopleData)
            .enter()
            .append("g")
            .attr("class", "person")
            .attr("transform", (d, i) => {
                const x = (i % numInRow) * 20 + 15; // Calculate x position
                const y = Math.floor(i / numInRow) * 50 + 15; // Calculate y position
                return `translate(${x}, ${y})`; // Return transformation string
            });

        // Append person images
        people.append("image")
            .attr("xlink:href", (d, i) => i < numHighlighted ? activeFigure : neutralFigure)
            .attr("x", 10) // Adjust x position as needed
            .attr("y", 10) // Adjust y position as needed
            .attr("width", 18)
            .attr("height", 42);
    }

    /** Current question statistics— necessary to count how long it takes to answer */
    const [currentQuestionStat, setCurrentQuestionStat] = useState(null);

    const navigate = useNavigate()

    /** Title component */
    const Title = () => (
        <h1 className="is-size-2 is-family-primary has-text-weight-bold">{visualizationTitle}</h1>
    );
    /** Error message for navigation handler */
    const NavigationErrorDisplay = () => <div className="block"><p className="is-family-monospace has-text-centered has-text-danger-dark">{navigationError}</p></div>;
    /** Text for the current question */
    const QuestionText = () => (
        <label className="label is-size-6 is-family-monospace has-text-weight-light">
            {questions[((questionNumber - 1) % 3)]}
        </label>
    );
    /** Feedback for the current question */
    const Feedback = () => <div className="block"><p className="is-family-monospace has-text-grey has-text-weight-bold is-size-7">{answerFeedback}</p></div>;

    /** Screen displaying a start button that only appears when there's no question being answered */
    const StartScreen = () => {
        if (currentQuestionStat) { return; }

        function startExam() { setCurrentQuestionStat(new QuestionStat(questionNumber, currentAnswer)); }

        return (
            <section className={`is-centered has-text-centered section`}>
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
            if (questionNumber === numQuestions) { navigate("/thank_you"); return; } // Navigate to /thank_you if there are no more questions
            // Go to the next question
            const nextQuestionNumber = questionNumber + 1;
            setQuestionNumber(nextQuestionNumber)
            setVisualizationTitle(visualizationTitles[visualizationTitles.indexOf(visualizationTitle) + 1])
            setCurrentQuestionAnswered(false)
            setAnswerFeedback("")
            setNavigationError("")
            setCurrentQuestionStat(new QuestionStat(nextQuestionNumber, currentAnswer));
            document.getElementById("userAnswer").value = ""
            clearSVG()
            createImage()
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
            sendAnswer(currentQuestionStat, auth.currentUser).then((dbResult) => { console.log(dbResult) })
        }

        return <button className="button is-small is-link is-family-code" onClick={handleSubmitPress}>Submit</button>;
    }


    return [
        <StartScreen />,
        <section key="exam" className={`section ${!currentQuestionStat && "is-hidden"}`} style={{ backgroundColor: '#f5f5f5' }}>
            <Title />
            <div className="box mt-3">
                <div className="media" style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                    {/* <CurrentImage /> */}
                    <progress class="progress is-primary" value={questionNumber - 1} max={numQuestions - 1}>{questionNumber}/{numQuestions}</progress>
                    <svg id="icon-array" />
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
