import React from "react"
import { useNavigate } from "react-router-dom"

function ThankYou() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/") //Need to use navigate function with handleClick helper function.
    }
    return (
        <section className = "section">
            <h1 className = "is-size-1 is-family-primary has-text-weight-bold has-text-centered">
                Thank you!
            </h1>
            <div className = "buttons is-centered mt-3" style = {{minHeight: "75vh"}}>
                <button className = "button is-medium is-warning has-text-black is-family-code" onClick={handleClick}>Take survey again</button>
            </div>
        </section>
    )
}

export default ThankYou