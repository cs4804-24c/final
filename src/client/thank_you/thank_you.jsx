import React from "react"
import { useNavigate } from "react-router-dom"

function ThankYou() {
    const navigate = useNavigate()
    return (
        <section className = "section">
            <h1 className = "is-size-1 is-family-primary has-text-weight-bold has-text-centered">
                Thank you!
            </h1>
            <div className = "columns is-centered" style = {{minHeight: "75vh"}}>
                <div className = "column">
                    <div className = "buttons is-centered mt-3">
                        <button className = "button is-medium is-warning has-text-black is-family-code" onClick={navigate("/")}>Take survey again</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ThankYou