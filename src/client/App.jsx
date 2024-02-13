import React, { useEffect, useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import VisualizationProblemDisplay from "./visualization_problem_display/visualization_problem_display"
import { SignInButton, getCurrentUser } from "./api/auth";

function App() {

  /** Currently signed in user */
  const [currentUser, setCurrentUser] = useState(null);
  /** Get the current user on load */
  useEffect(() => { getCurrentUser(setCurrentUser); }, [])

  /** Footer component displaying credits and current user */
  const Footer = () => {
    if (!currentUser) { return; }
    return (
      <footer className="footer">
        <div className="content has-text-centered has-text-weight-normal is-family-sans-serif">
            A3-Icon Array Data Visualization Experiment - Joe Dobbelaar, Priyanka Narasimhan, Randy Huang,
            Matthew McAlarney
        </div>
        <div className="has-text-centered">Signed in as: {currentUser.displayName}</div>
      </footer>
    )
  }

  const SignIn = () => { if (currentUser) { return; } return <SignInButton />; }

  const MainDisplay = () => { if (!currentUser) { return; } return <Router><VisualizationProblemDisplay /></Router>; }

  return (
    <>
      <MainDisplay />
      <SignIn />
      <Footer />
    </>
  )
}

export default App
