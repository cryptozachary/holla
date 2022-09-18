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
import { Delay, FeedbackDelay, Reverb, StereoWidener, Distortion, BitCrusher, Phaser, Chorus } from 'tone'
import LoadButton from './loadbutton'
import MicButton from './micbutton'
import { effArr } from './effects2'

export default function Display(props) {

    const { effectsToggle, setEffectsToggle, verbDecay } = props

    console.log("app render")

    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)

    const [octave, setOctave] = React.useState(4)

    const [theRelease, setTheRelease] = React.useState(4)

    const [defaultSound, setDefaultSound] = React.useState(Kick)

    const [stopIt, setStopIt] = React.useState(null)

    const wavesurfer = useRef()

    const theSampler = useRef()

    // let samp = new Tone.Sampler({
    //     urls: {
    //         "C4": defaultSound
    //     },

    // }).toDestination()




    // Media Recorder Settings
    const { status,
        startRecording,
        stopRecording,
        clearBlobUrl,
        mediaBlobUrl } =
        useReactMediaRecorder({ audio: true });

    //Updating the defaultsound state when mediablob/sound is changed
    React.useEffect(() => {

        let isMounted = true

        if (isMounted) {
            if (mediaBlobUrl) {
                setDefaultSound(prev => {
                    let newDef = mediaBlobUrl
                    return newDef
                })
            }

            console.log("running mediablob useffect")
        }
        return function () {

            isMounted = false
        }

    }, [mediaBlobUrl])

    //Renders wavesurfer and updates when defaultsound changes and/or mic turns on/off
    React.useEffect(() => {
        // Create a wavesurfer object
        // More info about options here https://wavesurfer-js.org/docs/options.html

        let isMounted = true
        if (isMounted) {
            wavesurfer.current = WaveSurfer.create({
                container: '#waveform',
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
            wavesurfer.current.load(defaultSound)

            if (micState) {
                wavesurfer.current.microphone.start()
            }

            if (!micState) {
                wavesurfer.current.microphone.stop()
            }

            console.log("running wavesurfer useffect")
            console.log(wavesurfer.current)
        }
        return function () {
            // wavesurfer.regions.destroy()
            // wavesurfer.microphone.destroy()

            wavesurfer.current.destroy()
            console.log('Still alive surfer?', wavesurfer)
            isMounted = false
        }

    }, [defaultSound, micState]);


    //renders tone sampler and updates when defaultsound changes or octave of sample changes
    React.useEffect(() => {

        let isMounted = true

        if (isMounted) {
            theSampler.current = new Tone.Sampler({
                urls: {
                    "C4": defaultSound
                },

            }).toDestination()

            console.log("running tone sample useffect")
        }

        return function () {

            theSampler.current.dispose()
            console.log('Still alive sampler?', theSampler)
            isMounted = false

        }

    }, [octave, defaultSound, effectsToggle])


    function connectEffect() {
        for (let i = 0; i <= effArr.length; i++) {
            switch (true) {
                case effectsToggle[i]: theSampler.current.connect(effArr[i])
            }
        }
    }

    function disconnectEffect() {
        for (let i = 0; i <= effArr.length; i++) {
            switch (false) {
                case effectsToggle[i]: theSampler.current.disconnect(effArr[i])

            }
        }
    }

    // beggning of settings functionality 
    React.useEffect(() => {

        connectEffect()

    }, [effectsToggle])

    console.log(theSampler.current)
    //load sound for wavesurfer and tone sampler
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

    //left octave button functionality
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

    //left octave button functionality
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

    //activates toggleRecording based on micState
    React.useEffect(() => {

        console.log("running micstate useffect")

        toggleRecording()

    }, [micState])

    // toggles micState ( used for mic img logo on UI )
    function toggleMic() {
        setMicState(prev => {
            return !prev
        })


    }

    //toggles micState (used for stop logo on UI)
    function toggleStop() {
        setMicState(prev => {
            return !prev
        })
    }

    console.log(`mic state is ${micState}`)


    // startts and stop audio recording based on micState
    function toggleRecording() {
        if (micState === true) {
            //micImg.setAttribute("style", "background-color:red")
            startRecording()

        } else {
            stopRecording()
            // stopImg.style.backgroundColor = "red";
            // micImg.setAttribute("style", "background-color:initial")
        }
    }

    // sample pads connected to the tone sampler
    function padClick(pad) {

        console.log(pad, "was clicked", theSampler.current)

        switch (pad) {
            case "1": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`C${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "2": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`C#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "3": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`D${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "4": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`D#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "5": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`E${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "6": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`F${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "7": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`F#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "8": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`G${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "9": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`G#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "10": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`A${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "11": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`A#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "12": theSampler.current.releaseAll(Tone.context.now());
                theSampler.current.triggerAttackRelease([`B${octave}`], theRelease, Tone.context.currentTime);

                break;
        }
    }

    // buttons created for mapping 
    function getButtons() {

        let sampleElements = []
        for (let i = 0; i < 12; i++) {
            sampleElements.push({
                name: `${i + 1}`
            })
        }
        return sampleElements
    }

    //map buttonss to UI
    let samples = buttonState.map((item, index) => {
        return <Buttons handleClick={() => padClick(item.name)} key={index} padName={item.name}></Buttons>
    })

    return (
        <div className="ui-container">
            <div useRef={wavesurfer} id="waveform" className="wave-display"></div>
            <LoadButton mediaBlobUrl={mediaBlobUrl} loadSound={loadSound} />
            <MicButton micState={micState} toggleMic={toggleMic} MicLogo={MicLogo} StopLogo={StopLogo} toggleStop={toggleStop} />
            <Octaves left={toggleLeft} right={toggleRight} octaveLevel={octave} />
            <div className="transport">
                {samples}
            </div>
        </div>
    )
}

