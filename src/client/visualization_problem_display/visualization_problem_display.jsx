import React, { useState, useEffect } from "react"

function VisualizationProblemDisplay() {
  const [visualizationTitle, setVisualizationTitle] = useState("First") //First is a placeholder here.
  const [imagePath, setImagePath] = useState("") //Will come into use once we have icon array images.
  return (
    <section class = "section">
        <h1 class = "is-size-1 is-family-primary has-text-weight-bold">{visualizationTitle} Icon Array</h1>
        <div class = "box mt-1">
          <div class = "media">
            <div class = "media-left">
              <img width="400" height="400" src="https://media.geeksforgeeks.org/wp-content/uploads/20220221132017/download-200x200.png"/>
            </div> 
            <div class = "media-content">
              <div class = "content">
                <div class = "field">
                  <label class="label is-size-3 is-family-monospace">Example: What fraction of people caught COVID-19 in the sample to the left?</label>
                    <div class="control">
                      <input class="input is-size-5 is-family-sans-serif" type="text" placeholder="Type answer here" />
                    </div>
                </div>
                <div class = "field">
                  <div class = "control">
                    <button class="button is-medium is-link is-family-code">Submit</button>
                  </div>
                </div>
                <div class = "block">
                  <button class = "button is-medium is-warning has-text-black is-family-code">Next Question</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

//"../../../img/cleveland-equation.png"

export default VisualizationProblemDisplay
