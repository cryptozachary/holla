import React from 'react'
import Buttons from "./buttons"
import MicLogo from "../images/mic.svg"

export default function Display() {

    let micImg = document.querySelector(".mic-logo")

    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)

    function toggleMic() {
        setMicState(!micState)
        console.log(micState)
        if (micState) {
            micImg.setAttribute("style", "background-color:gray")
            recordNow()
        } else {
            micImg.setAttribute("style", "background-color:intial")
            stopNow()
        }
    }

    function recordNow() {

    }

    function stopNow() {

    }

    function getButtons() {

        let sampleElements = []
        for (let i = 0; i < 12; i++) {
            sampleElements.push({
                name: `Pad ${i + 1}`
            })
        }
        return sampleElements
    }

    let samples = buttonState.map(item => {
        return <Buttons padName={item.name}></Buttons>
    })


    return (
        <div className="ui-container">

            <div className="wave-display">Wave Viewer</div>
            <img className="mic-logo" onClick={toggleMic} src={MicLogo} alt="mic"></img>
            <div className="transport">
                {samples}
            </div>
        </div>
    )
}