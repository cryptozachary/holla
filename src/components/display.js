import React from 'react'
import Buttons from "./buttons"
import MicLogo from "../images/mic.svg"
import StopLogo from "../images/stop.png"
import WaveSurfer from "wavesurfer.js"
import * as Tone from "tone"
import Kick from "../audio/808.wav"
import Octaves from "./octaves"
import Left from "../images/left.svg"
import Right from "../images/right.svg"



export default function Display() {

    let micImg = document.querySelector(".mic-logo")
    let waver = document.querySelector(".wave-display")
    const deviceLabel = document.querySelector(".download")
    let constraintObj = { audio: true }
    let audio;

    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)

    const [octave, setOctave] = React.useState(4)

    const waveform = React.useRef(null);

    const sampler = new Tone.Sampler({
        urls: {
            "C4": Kick,
        },
        release: 1,

    }).toDestination();

    // React.useEffect(() => {
    //     // Check if wavesurfer object is already created.
    //     if (!waveform.current) {
    //         // Create a wavesurfer object
    //         // More info about options here https://wavesurfer-js.org/docs/options.html
    //         waveform.current = WaveSurfer.create({
    //             container: "#waveform",
    //             waveColor: "#567FFF",
    //             barGap: 2,
    //             barWidth: 3,
    //             barRadius: 3,
    //             cursorWidth: 3,
    //             cursorColor: "#567FFF",
    //         });
    //         // Load audio from a remote url.
    //         waveform.current.load("../audio/cursed.mp3");
    //         /* To load a local audio file
    //               1. Read the audio file as a array buffer.
    //               2. Create a blob from the array buffer
    //               3. Load the audio using wavesurfer's loadBlob API
    //        */
    //     }
    // }, []);

    // const playAudio = () => {
    //     // Check if the audio is already playing
    //     if (waveform.current.isPlaying()) {
    //         waveform.current.pause();
    //     } else {
    //         waveform.current.play();
    //     }
    // };


    function toggleLeft() {
        setOctave(prev => {
            let newOct = prev
            newOct = newOct - 1
            if (newOct <= 0) {
                newOct = 0
            }
            return newOct
        })
    }

    function toggleRight() {
        setOctave(prev => {
            let newOct = prev
            newOct = newOct + 1
            if (newOct >= 8) {
                newOct = 8
            }
            return newOct
        })
    }

    function toggleMic() {
        setMicState(!micState)
        console.log(micState)
        toggleRecording()
    }

    function toggleRecording() {
        if (micState) {
            // micImg.setAttribute("style", "background-color:red")
            recordNow()
        } else {
            // micImg.setAttribute("style", "background-color:initial")
        }
    }

    function padClick(pad) {

        console.log(pad, "was clicked")

        switch (pad) {
            case "1": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`C${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "2": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`C#${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "3": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`D${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "4": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`D#${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "5": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`E${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "6": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`F${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "7": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`F#${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "8": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`G${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "9": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`G#${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "10": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`A${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "11": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`A#${octave}`], 4, Tone.context.currentTime);
            })
                break;
            case "12": Tone.loaded().then(() => {
                sampler.triggerAttackRelease([`B${octave}`], 4, Tone.context.currentTime);
            })
                break;
        }
    }

    function recordNow() {

        navigator.mediaDevices.getUserMedia(constraintObj)
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                console.log("recording")
                let audioChunks = [];
                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                function stopNow() {
                    switch (micState) {
                        case true: if (mediaRecorder.state === "recording") {
                            mediaRecorder.stop()
                            console.log("recording stopped")
                        } else {
                            console.log("not recording!")
                        }
                    }
                }

                //when media stops recording create audio file for download
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    audioChunks = []
                    const audioUrl = URL.createObjectURL(audioBlob);

                    //prepare audio for download by passing into html 5 audio and appending to div 
                    audio = new Audio(audioUrl);
                    const li = document.createElement('li');
                    const audioElement = document.createElement('audio');
                    const anchor = document.createElement('a');
                    anchor.setAttribute('href', audioUrl);
                    const now = new Date();
                    anchor.setAttribute(
                        'download',
                        `recording-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDay().toString().padStart(2, '0')}--${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}.webm`
                    );
                    anchor.innerText = 'Download';
                    audio.setAttribute('src', audioUrl);
                    audio.setAttribute('controls', 'controls');
                    li.appendChild(audioElement);
                    li.appendChild(anchor);
                    deviceLabel.appendChild(li)

                });
            });

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
            {!micState ? <img className="mic-logo" onClick={toggleMic} src={MicLogo} alt="mic"></img> : <img className="stop-logo" onClick={toggleMic} src={StopLogo} alt="stop"></img>}
            <Octaves left={toggleLeft} right={toggleRight} octaveLevel={octave} />
            <div className="transport">
                {samples}
            </div>
            <div className="download"></div>
        </div>
    )
}