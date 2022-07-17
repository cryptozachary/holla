import React, { useRef } from 'react'
import Buttons from "./buttons"
import MicLogo from "../images/mic.svg"
import StopLogo from "../images/stop.png"
import OpenLogo from "../images/opensound2.svg"
import WaveSurfer from "wavesurfer.js"
import * as Tone from "tone"
import Kick from "../audio/808.wav"
import Song from "../audio/song.wav"
import Octaves from "./octaves"
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions/index.js'
import MicrophonePlugin from 'wavesurfer.js/src/plugin/microphone/index.js'
import { useReactMediaRecorder } from "react-media-recorder"
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline/index.js'
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor/index.js'






export default function Display() {

    console.log("app render")

    let micImg = document.querySelector(".mic-logo")
    let waver = document.querySelector(".wave-display")
    const deviceLabel = document.querySelector(".download")
    let soundFile = document.querySelector(".sound-file")
    let sound;
    let sampler;
    let wavesurfer;

    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)

    const [octave, setOctave] = React.useState(4)

    const [defaultSound, setDefaultSound] = React.useState(Kick)

    const [stopIt, setStopIt] = React.useState(null)

    const firstRender = useRef(true)

    const { status,
        startRecording,
        stopRecording,
        mediaBlobUrl } =
        useReactMediaRecorder({ audio: true });


    React.useEffect(() => {

        if (mediaBlobUrl) {
            setDefaultSound(prev => {
                let newDef = mediaBlobUrl
                return newDef
            })
        }

        console.log("running mediablob useffect")

    }, [mediaBlobUrl])

    React.useEffect(() => {
        // Create a wavesurfer object
        // More info about options here https://wavesurfer-js.org/docs/options.html
        wavesurfer = WaveSurfer.create({
            container: "#waveform",
            waveColor: "red",
            height: 140,
            barGap: 0.3,
            barWidth: 1,
            barRadius: 3,
            cursorWidth: 3,
            cursorColor: "#56w7FFF",
            plugins: [

                MicrophonePlugin.create()
                // RegionsPlugin.create({
                //     regionsMinLength: 1,
                //     maxRegions: 1,
                //     regions: [
                //         {
                //             start: 1,
                //             end: 3,
                //             loop: false,
                //             color: 'hsla(400, 100%, 30%, 0.5)'
                //         },
                //     ],
                //     dragSelection: {
                //         slop: 5
                //     }
                // })

            ]
        });
        wavesurfer.load(defaultSound)

        if (micState) {
            wavesurfer.microphone.start()
        }

        if (!micState) {
            wavesurfer.microphone.stop()
        }

        console.log("running wavesurfer useffect")
        console.log(wavesurfer)

        return function () {
            // wavesurfer.regions.destroy()
            // wavesurfer.microphone.destroy()
            wavesurfer.destroy()
        }

    }, [defaultSound, micState]);

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
                let blob = new Blob([new Uint8Array(evt.target.result)]);
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
                let blob2 = new Blob([new Uint8Array(evt.target.result)]);
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

        console.log("running micstate useffect")

        toggleRecording()

    }, [micState])

    function toggleMic() {
        setMicState(prev => {
            return !prev
        })
    }


    function toggleStop() {
        setMicState(prev => {
            return !prev
        })
    }

    console.log(`mic state is ${micState}`)

    function toggleRecording() {
        if (micState === true) {
            //micImg.setAttribute("style", "background-color:red")
            startRecording()

        } else {
            stopRecording()
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


    function FileMenu(props) {
        return (
            <div className="menu">
                <div className="label">Menu</div>
                <div className="spacer"></div>
                <label name="sound-file">
                    <div className="item"><span>Load Sound</span></div>
                    <input type="file" id="sound-file" hidden accept="audio/mp3" onChange={(e) => loadSound(e)}></input>
                </label>
                <div className="item"><span>Set Sample Relase</span></div>
            </div>
        )
    }

    function OpenMenu() {
        return (
            <div className="load-container">
                <label name="sound-file">
                    {/* <img className="open-logo" src={OpenLogo} alt="open"></img> */}
                    <span className="load-sound">LOAD SOUND</span>
                    <input type="file" id="sound-file" hidden accept="audio/mp3" onChange={(e) => loadSound(e)}></input>
                </label>
                {mediaBlobUrl ? <a download="Sample" href={mediaBlobUrl} className="load-sound">D/L SAMPLE</a> : ""}
            </div>
        )
    }

    return (
        <div className="ui-container">
            <div id="waveform" className="wave-display"></div>
            <OpenMenu />
            {micState === false ? <img className="mic-logo" onClick={toggleMic} src={MicLogo} alt="mic"></img> : <img className="stop-logo" onClick={toggleStop} src={StopLogo} alt="stop"></img>}
            <Octaves left={toggleLeft} right={toggleRight} octaveLevel={octave} />
            <div className="transport">
                {samples}
            </div>
        </div>
    )
}

