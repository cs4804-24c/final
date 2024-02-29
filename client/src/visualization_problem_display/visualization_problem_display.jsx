import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { QuestionState, sendAnswer } from "../api/db"
import { auth } from "../api/firebase"
import "./mobile.css"

import activeFigure from "../randomizations/img/active_figure.png";
import neutralFigure from "../randomizations/img/neutral_figure.png";

/** Number of questions to show the user */
const numQuestions = 6;

function VisualizationProblemDisplay() {
    /*const [screenWidth, setScreenWidth] = useState(window.innerWidth)*/
    const visualizationTitles = ["Lake Disease Icon Array", "Swamp Disease", "Cavern Disease Icon Array", "Jungle Disease", "Mountain Disease Icon Array", "Ocean Disease"]
    const [visualizationTitle, setVisualizationTitle] = useState(visualizationTitles[0])
    const [questionNumber, setQuestionNumber] = useState(1)
    /** Current question statistics — necessary to count how long it takes to answer */
    const [currentQuestionState, setCurrentQuestionState] = useState(null)
    const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false)
    const [answerFeedback, setAnswerFeedback] = useState("")
    const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState(null)
    const [totalNumberOfIcons, setTotalNumberOfIcons] = useState(null)
    const navigate = useNavigate()

    const questions = [
        `About how many out of the total ${totalNumberOfIcons} people in the sample will get Lake Disease sometime during their lives?`,
        `About how many out of a sample of 20 people will get Swamp Disease at some point during their lives?`,
        `About how many out of the total ${totalNumberOfIcons} people in the sample will get Cavern Disease sometime during their lives?`,
        `About how many out of a sample of 60 people will get Jungle Disease at some point during their lives?`,
        `About how many out of the total ${totalNumberOfIcons} people in the sample will never get Mountain Disease sometime during their lives?`,
        `About how many out of a sample of 60 people will never get Ocean Disease at some point during their lives?`
    ]

    /*
    useEffect(() => {
        const handleResize = () => { setScreenWidth(window.innerWidth); };
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); };
    }, []); //Runs only on the first render.
    */

    function clearSVG() { questionNumber % 2 === 0 ? d3.select("#control-text").selectAll("*").remove() : d3.select("#icon-array").selectAll("*").remove() }

    function generateVisual(nextQuestionNumber) {
        if (nextQuestionNumber === 2) {
            console.log(2)
            const svg = d3.select("#control-text")
            .attr("width", 145)
            .attr("height", 245)
            .append("text")
            .attr("font-family", "Helvetica Neue, Arial")
            .style("font-size", "12px")
            .text("For every 10 people, 1 person will get Swamp Disease at some point during their lives.")
            setCurrentCorrectAnswer(2)
        } else if (nextQuestionNumber === 4) {
            const svg = d3.select("#control-text")
            .attr("width", 145)
            .attr("height", 245)
            .append("text")
            .attr("font-family", "Helvetica Neue, Arial")
            .style("font-size", "12px")
            .text("For every 30 people, 10 individuals will get Jungle Disease at some point during their lives.")
            setCurrentCorrectAnswer(20)
        } else if (nextQuestionNumber === 6) {
            const svg = d3.select("#control-text")
            .attr("width", 145)
            .attr("height", 245)
            .append("text")
            .attr("font-family", "Helvetica Neue, Arial")
            .style("font-size", "12px")
            .text("For every 30 people, 5 individuals will get Ocean Disease at some point during their lives.")
            setCurrentCorrectAnswer(10)
        } else {
            const numberOfIconsPerRow = 10
            const numberOfRows = nextQuestionNumber === 1
                ? Math.floor(Math.random() * 2 + 1)
                : Math.floor(Math.random() * 3 + 3) // Random number of rows
            const numberOfRedIcons = nextQuestionNumber === 1
                ? Math.floor(Math.random() * 2 + 1)
                : [10, 15, 20, 25][Math.floor(Math.random() * 4)] // Random number of highlighted people
            const sumOfIcons = numberOfIconsPerRow * numberOfRows // Total number of people icons

            setTotalNumberOfIcons(sumOfIcons)
            
            if (nextQuestionNumber === 1 || nextQuestionNumber === 3) {
                setCurrentCorrectAnswer(numberOfRedIcons)
            } else if (nextQuestionNumber === 5) {
                setCurrentCorrectAnswer(totalNumberOfIcons - numberOfRedIcons)
            }

            const svgWidth = numberOfIconsPerRow * 20 + 45 // Width of the SVG container
            const svgHeight = (sumOfIcons / numberOfIconsPerRow) * 50 + 45 // Height of the SVG container

            // Create SVG container
            const svg = d3.select("#icon-array")
                .attr("width", svgWidth)
                .attr("height", svgHeight)

            // Generate array of person data
            const peopleData = Array.from({ length: sumOfIcons }, (_, i) => ({ id: i }))

            // Append person icons
            const people = svg.selectAll(".person")
                .data(peopleData)
                .enter()
                .append("g")
                .attr("class", "person")
                .attr("transform", (d, i) => {
                    const x = (i % numberOfIconsPerRow) * 20 + 15 // Calculate x position
                    const y = Math.floor(i / numberOfIconsPerRow) * 50 + 15 // Calculate y position
                    return `translate(${x}, ${y})` // Return transformation string
            })

            // Append person images
            people.append("image")
                .attr("xlink:href", (d, i) => i < numberOfRedIcons ? activeFigure : neutralFigure)
                .attr("x", 10) // Adjust x position as needed
                .attr("y", 10) // Adjust y position as needed
                .attr("width", 18)
                .attr("height", 42)
        }
    }

    useEffect(() => generateVisual(1), []);

    /** Title component */
    const Title = () => (
        <h1 className="is-size-2 is-family-primary has-text-weight-bold">
            {visualizationTitle}
        </h1>
    );

    /** Text for the current question */
    const QuestionText = () => (
        //((questionNumber - 1) % 3)
        <label className="label is-size-6 is-family-monospace has-text-weight-light" >
            {questions[questionNumber - 1]}
        </label>
    );
    /** Feedback for the current question */
    const Feedback = () => (
        <div className="block">
            <p className="is-family-monospace has-text-grey has-text-weight-bold is-size-7">
                {answerFeedback}
            </p>
        </div>
    )
    /** Screen displaying a start button that only appears when there's no question being answered */
    const StartScreen = () => {
        if (currentQuestionState) { return; }

        function startQuiz() { setCurrentQuestionState(new QuestionState(questionNumber, currentCorrectAnswer)); }

        return (
            <section className={`is-centered has-text-centered section`}>
                <h1 className="is-size-2 is-family-primary has-text-weight-bold">Icon Array 6-Question Quiz</h1>
                <div className="buttons is-centered" style={{ marginTop: "2rem" }}>
                    <button className="button is-medium is-success has-text-black is-family-code" onClick={startQuiz}>Click To Start</button>
                </div>
            </section>
        )
    }

    function moveToNextScreen() {
        // Guard clauses
        if (questionNumber === numQuestions) { navigate("/thank_you"); return; } // Navigate to /thank_you if there are no more questions
        const nextQuestionNumber = questionNumber + 1
        clearSVG()
        setQuestionNumber(nextQuestionNumber)
        generateVisual(nextQuestionNumber)
        setVisualizationTitle(visualizationTitles[visualizationTitles.indexOf(visualizationTitle) + 1])
        setCurrentQuestionAnswered(false)
        setAnswerFeedback("")
        document.getElementById("userAnswer").value = ""
        setCurrentQuestionState(new QuestionState(nextQuestionNumber, currentCorrectAnswer))
    }

    const SubmitButton = () => {
        function handleSubmitPress() {
            // Guard clauses
            if (currentQuestionAnswered) { setAnswerFeedback("Can only submit one answer"); return; } // Escape if this question has been answered before
            const submission = document.getElementById("userAnswer").value
            if (submission.length == 0) { setAnswerFeedback("Cannot submit an empty answer"); return; } // Escape if the answer is empty

            // Handle submission
            const answer = parseInt(submission)
            currentQuestionState.answer(answer)
            setCurrentQuestionAnswered(true)
            setAnswerFeedback("Submitted successfully! Redirecting to the next question...")
            sendAnswer(currentQuestionState, auth.currentUser).then((dbResult) => { console.log(dbResult) })

            setTimeout(() => { moveToNextScreen() }, 1500)
        }

        return <button className="button is-small is-link is-family-code" onClick={handleSubmitPress}>Submit</button>
    }


    return [
        <StartScreen />,
        <section key="exam" className={`section ${!currentQuestionState && "is-hidden"}`} style={{ backgroundColor: '#f5f5f5' }}>
            <Title />
            <div className="box mt-3">
                <div className="media" style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                    {/* <CurrentImage /> */}
                    <progress className="progress is-primary" value={questionNumber - 1} max={numQuestions - 1}>{questionNumber}/{numQuestions}</progress>
                    <svg id={questionNumber % 2 === 0 ? "control-text" : "icon-array"}/>
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
        </section>
    ]
}

export default VisualizationProblemDisplay
