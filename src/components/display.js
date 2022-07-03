import React from 'react'
import Buttons from "./buttons"
import MicLogo from "../images/mic.svg"
import StopLogo from "../images/stop.png"
import WaveSurfer from "wavesurfer.js"
import * as Tone from "tone"
import Kick from "../audio/808.wav"
import Song from "../audio/song.wav"
import Octaves from "./octaves"
import Left from "../images/left.svg"
import Right from "../images/right.svg"
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions'



export default function Display() {

    let micImg = document.querySelector(".mic-logo")
    let waver = document.querySelector(".wave-display")
    const deviceLabel = document.querySelector(".download")
    let soundFile = document.querySelector(".sound-file")
    let constraintObj = { audio: true }
    let audio;
    let sound;
    let sampler;
    let wavesurfer;
    let stopIt = false;
    let blob;
    let blob2;


    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)

    const [octave, setOctave] = React.useState(4)

    const [defaultSound, setDefaultSound] = React.useState(Kick)



    React.useEffect(() => {
        // Create a wavesurfer object
        // More info about options here https://wavesurfer-js.org/docs/options.html
        wavesurfer = WaveSurfer.create({
            container: "#waveform",
            waveColor: "#567FFF",
            height: 146,
            barGap: 1,
            barWidth: 1,
            barRadius: 1,
            cursorWidth: 3,
            cursorColor: "#56w7FFF",
            plugins: [
                RegionsPlugin.create({})]
        });
        //wavesurfer.load(Kick)

        return function () {
            wavesurfer.destroy()
        }

    }, []);

    React.useEffect(() => {

        sampler = new Tone.Sampler({
            urls: {
                "C4": defaultSound
            },
            release: 1,

        }).toDestination();

        console.log("running tone sample useffect")

        return function () {
            sampler.dispose()
        }

    }, [octave, defaultSound])




    function loadSound(e) {

        const file = e.target.files[0];
        const fileList = e.target.files
        console.log(file, fileList);

        if (file) {

            let reader = new FileReader();

            // Read File as an ArrayBuffer
            reader.readAsArrayBuffer(file);
            reader.onload = function (evt) {
                // Create a Blob providing as first argument a typed array with the file buffer
                const result = evt.target.result
                console.log(result)
                blob = new Blob([new Uint8Array(evt.target.result)]);
                console.log(blob)
                // Load the blob into Wavesurfer
                wavesurfer.loadBlob(blob);

            };

            reader.onerror = function (evt) {
                console.error("An error ocurred reading the file: ", evt);
            };


        }

        if (file) {

            let reader2 = new FileReader();

            // Read File as an ArrayBuffer
            reader2.readAsDataURL(file);
            reader2.onload = function (evt) {
                // Create a Blob providing as first argument a typed array with the file buffer
                const result = evt.target.result
                console.log(result)
                blob2 = new Blob([new Uint8Array(evt.target.result)]);
                console.log(result)

                setDefaultSound(prev => {
                    let newDef = result
                    console.log(newDef)
                    return newDef
                })


            };

            reader2.onerror = function (evt) {
                console.error("An error ocurred reading the file: ", evt);
            };


        }


    }


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

    React.useEffect(() => {
        toggleRecording()

    }, [micState])

    function toggleMic() {
        console.log("toggle mic")
        setMicState(prev => {
            return !prev
        })
    }

    function toggleStop() {
        setMicState(prev => {
            return !prev
        })


    }
    console.log(`Mic is ${micState}`)

    function toggleRecording() {
        if (micState === true) {
            // micImg.setAttribute("style", "background-color:red")
            recordNow()

        } else {
            // recordNow.stopNow()
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

                if (stopIt === true) {
                    stopNow()
                    console.log("stopped")
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
            <input type="file" className="sound-file" accept="audio/mp3" onChange={(e) => loadSound(e)}></input>
            <div id="waveform" className="wave-display"></div>
            {micState === false ? <img className="mic-logo" onClick={toggleMic} src={MicLogo} alt="mic"></img> : <img className="stop-logo" onClick={toggleStop} src={StopLogo} alt="stop"></img>}
            <Octaves left={toggleLeft} right={toggleRight} octaveLevel={octave} />
            <div className="transport">
                {samples}
            </div>
            <div className="download"></div>
        </div>
    )
}

