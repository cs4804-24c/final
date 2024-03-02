import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import VisualizationProblemDisplay from "./visualization_problem_display/visualization_problem_display"
import ThankYou from "./thank_you/thank_you"
import { SignInButton, SignOutButton, getCurrentUser } from "./api/auth";

/** Signature w/ title and authors */
export const Signature = () => (
    <div className="content has-text-centered has-text-weight-normal is-family-sans-serif">
        Icon Array 6-Question Quiz - Joe Dobbelaar, Priyanka Narasimhan, Randy Huang,
        Matthew McAlarney
    </div>
)

function App() {

    /** Currently signed in user */
    const [currentUser, setCurrentUser] = useState(null);
    /** Get the current user on load */
    useEffect(() => { getCurrentUser(setCurrentUser); }, [])


    /** Footer component displaying credits and current user */
    const Footer = () => {
        if (!currentUser) return
        return (
            <footer className="footer" style={{ backgroundColor: '#f5f5f5' }}>
                <Signature />
                <div className="has-text-centered" style={{ marginBottom: 20 }}>
                    Signed in as: {currentUser.displayName}
                </div>
                <SignOut />
            </footer>
        )
    }

    const SignIn = () => {
        if (currentUser) { return; }
        return (
            <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Signature />
                <SignInButton />
            </div>
        );
    }

    const MainDisplay = () => {
        if (!currentUser) { return; }
        return (
            <Router>
                <Routes>
                    <Route key="home" path="/" element={<VisualizationProblemDisplay />} />
                    <Route key="thank-you" path="/thank_you" element={<ThankYou />} />
                </Routes>
            </Router>
        )
    }

    const SignOut = () => {
        if (!currentUser) return
        return <SignOutButton />
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <MainDisplay />
            <SignIn />
            <Footer style={{
                position: 'absolute',
                bottom: 0,
            }} />
        </div>
    )
}

export default App
