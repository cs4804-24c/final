import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import VisualizationProblemDisplay from "./visualization_problem_display/visualization_problem_display"

function App() {
  return (
    <>
      <Router>
        <VisualizationProblemDisplay />
      </Router>
      <footer class="footer">
        <div class="content has-text-centered has-text-weight-normal is-family-sans-serif">
            A3-Icon Array Data Visualization Experiment - Joe Dobbelaar, Priyanka Narasimhan, Randy Huang,
            Matthew McAlarney
        </div>
      </footer>
    </>
  )
}

export default App
