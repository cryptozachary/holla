import React from 'react'
import Buttons from "./buttons"
import MicLogo from "../images/mic.svg"
import WaveSurfer from "wavesurfer.js"
import * as Tone from "tone"
import Kick from "../audio/808.wav"

export default function Display() {

    let micImg = document.querySelector(".mic-logo")
    let waver = document.querySelector(".wave-display")

    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)

    const waveform = React.useRef(null);

    const sampler = new Tone.Sampler({
        urls: {
            "C4": Kick,
        },
        release: 1,

    }).toDestination();

    Tone.loaded().then(() => {
        sampler.triggerAttackRelease(["Eb4"], 4);
    })



    React.useEffect(() => {
        // Check if wavesurfer object is already created.
        if (!waveform.current) {
            // Create a wavesurfer object
            // More info about options here https://wavesurfer-js.org/docs/options.html
            waveform.current = WaveSurfer.create({
                container: "#waveform",
                waveColor: "#567FFF",
                barGap: 2,
                barWidth: 3,
                barRadius: 3,
                cursorWidth: 3,
                cursorColor: "#567FFF",
            });
            // Load audio from a remote url.
            waveform.current.load("../audio/cursed.mp3");
            /* To load a local audio file
                  1. Read the audio file as a array buffer.
                  2. Create a blob from the array buffer
                  3. Load the audio using wavesurfer's loadBlob API
           */
        }
    }, []);

    const playAudio = () => {
        // Check if the audio is already playing
        if (waveform.current.isPlaying()) {
            waveform.current.pause();
        } else {
            waveform.current.play();
        }
    };


    function toggleMic() {
        setMicState(!micState)
        console.log(micState)
        if (micState) {
            micImg.setAttribute("style", "background-color:red")
            recordNow()
        } else {
            micImg.setAttribute("style", "background-color:intial")
            stopNow()
        }
    }

    function padClick(pad) {
        console.log(pad, "was clicked")

        switch (pad) {
            case "1": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["C4"], 4);
            })
                break;
            case "2": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["C#4"], 4);
            })
                break;
            case "3": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["D4"], 4);
            })
                break;
            case "4": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["D#4"], 4);
            })
                break;
            case "5": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["E4"], 4);
            })
                break;
            case "6": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["F4"], 4);
            })
                break;
            case "7": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["F#4"], 4);
            })
                break;
            case "8": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["G4"], 4);
            })
                break;
            case "9": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["G#4"], 4);
            })
                break;
            case "10": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["A4"], 4);
            })
                break;
            case "11": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["A#4"], 4);
            })
                break;
            case "12": Tone.loaded().then(() => {
                sampler.triggerAttackRelease(["B4"], 4);
            })
                break;
        }

        // if (pad == 1) {
        //     Tone.loaded().then(() => {
        //         sampler.triggerAttackRelease(["C4"], 4);
        //     })
        // }

    }

    function recordNow() {

    }

    function stopNow() {

    }

    function getButtons() {

        let sampleElements = []
        for (let i = 0; i < 12; i++) {
            sampleElements.push({
                name: `${i + 1}`
            })
        }
        return sampleElements
    }

    let samples = buttonState.map((item, index) => {
        return <Buttons handleClick={() => padClick(item.name)} key={index} padName={item.name}></Buttons>
    })


    return (
        <div className="ui-container">
            {/* <input type="file" accept="audio/mp3"></input> */}
            <div id="waveform" className="wave-display">Wave Viewer</div>
            <img className="mic-logo" onClick={toggleMic} src={MicLogo} alt="mic"></img>
            <div className="transport">
                {samples}
            </div>
        </div>
    )
}