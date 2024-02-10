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
        <div class="content has-text-centered is-family-code">
          <strong>
            A3-Icon Array Data Visualization Experiment - Joe Dobbelaar, Priyanka Narasimhan, Randy Huang,
            Matthew McAlarney
          </strong>
        </div>
      </footer>
    </>
  )
}

export default App
