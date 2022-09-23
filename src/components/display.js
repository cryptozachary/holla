import React, { useRef } from 'react'
import Buttons from "./buttons"
import MicLogo from "../images/mic.svg"
import StopLogo from "../images/stop.png"
//import OpenLogo from "../images/opensound2.svg"
import WaveSurfer from "wavesurfer.js"
import * as Tone from "tone"
import Kick from "../audio/808.wav"
//import Song from "../audio/song.wav"
import Octaves from "./octaves"
//import RegionsPlugin from 'wavesurfer.js/src/plugin/regions/index.js'
import MicrophonePlugin from 'wavesurfer.js/src/plugin/microphone/index.js'
import { useReactMediaRecorder } from "react-media-recorder"
//import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline/index.js'
//import CursorPlugin from 'wavesurfer.js/src/plugin/cursor/index.js'
import LoadButton from './loadbutton'
import MicButton from './micbutton'
import { effArr } from './effects2'


export default function Display(props) {


    console.log("app render")

    const { effectsToggle, setEffectsToggle, verbDecay } = props



    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)

    const [octave, setOctave] = React.useState(4)

    const [theRelease, setTheRelease] = React.useState(4)

    const [defaultSound, setDefaultSound] = React.useState(Kick)

    const waveContainer = useRef()

    const wavesurfer = useRef()

    const theSampler = useRef()

    //const currentSound = useRef(defaultSound)



    // const theSampler = useRef()

    // let samp = new Tone.Sampler({
    //     urls: {
    //         "C4": defaultSound
    //     },

    // }).toDestination()



    // Media Recorder Settings
    const {
        startRecording,
        stopRecording,
        clearBlobUrl,
        mediaBlobUrl } =
        useReactMediaRecorder({ audio: true });

    //Updating the defaultsound state when mediablob/sound is changed
    React.useEffect(() => {

        if (mediaBlobUrl) {
            setDefaultSound(prev => {
                return mediaBlobUrl
            })
        }

        console.log("running mediablob useffect")


    }, [mediaBlobUrl])

    //Renders wavesurfer and updates when defaultsound changes and/or mic turns on/off
    React.useEffect(() => {
        // Create a wavesurfer object

        wavesurfer.current = WaveSurfer.create({
            container: waveContainer.current,
            waveColor: "red",
            height: 140,
            barGap: 0.3,
            backend: 'MediaElementWebAudio',
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

        //load sound
        wavesurfer.current.load(defaultSound)

        // start/stop mic recording visual
        if (micState) {
            wavesurfer.current.microphone.start()
        }

        if (!micState) {
            wavesurfer.current.microphone.stop()
        }



        console.log("running wavesurfer useffect")
        console.log(wavesurfer)

        return function () {
            wavesurfer.current.destroy()
            //wavesurfer.current.backend.destroy()
            // wavesurfer.current.backend = null
            console.log('Still alive surfer?', wavesurfer)
        }

    }, [defaultSound, micState]);


    //renders tone sampler and updates when defaultsound changes or octave of sample changes
    React.useEffect(() => {

        theSampler.current = new Tone.Sampler({
            urls: {
                "C4": defaultSound
            },
            release: '1',


        }).toDestination();

        console.log("running tone sample useffect")

        connectEffect()


        return function () {

            theSampler.current.dispose('theSampler')
            console.log('Still alive sampler?', theSampler)
        }

    }, [octave, defaultSound, effectsToggle])

    //connect and disconnect effect when effect turned on/off
    function connectEffect() {

        let selected = []

        effectsToggle.forEach((effect, index, arr) => {
            if (effect.state === true) {
                theSampler.current.connect(effArr[index])
                selected.push(index)
                console.log(selected)
            }
        })

        console.log(selected)

        if (selected) {
            selected.forEach((effectposition) => {
                if (effectsToggle[effectposition].state === false) {
                    theSampler.current.disconnect(effArr[effectposition])

                }
            })

        }


    }


    //calls function to turn on/off effects
    React.useEffect(() => {

        connectEffect()

    }, [effectsToggle])


    //load sound for wavesurfer and tone sampler
    function loadSound(e) {

        const file = e.target.files[0];
        const fileList = e.target.files;
        console.log(file, fileList);

        // if (file) {

        //     let reader = new FileReader();

        //     // Read File as an ArrayBuffer
        //     reader.readAsArrayBuffer(file);

        //     reader.onload = function (evt) {
        //         // Create a Blob providing as first argument a typed array with the file buffer
        //         let result = evt.target.result
        //         console.log(result)
        //         let blob = new Blob([new Uint8Array(evt.target.result)]);
        //         console.log(blob)
        //         // Load the blob into Wavesurfer
        //         wavesurfer.loadBlob(blob);



        //     };

        //     reader.onerror = function (evt) {
        //         console.error("An error ocurred reading the file: ", evt);
        //     };


        // }

        if (file) {

            let reader2 = new FileReader();

            // Read File as an data url
            reader2.readAsDataURL(file);
            reader2.onload = function (evt) {
                // Create a Blob providing as first argument a typed array with the file buffer
                let result = evt.target.result
                console.log(result)



                //set the loaded sound in defaultsound
                setDefaultSound(prev => {
                    let newDef = result
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


    // starts and stop audio recording based on micState
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

        console.log(pad, "was clicked", theSampler)

        switch (pad) {
            case "1": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`C${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "2": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`C#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "3": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`D${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "4": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`D#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "5": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`E${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "6": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`F${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "7": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`F#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "8": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`G${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "9": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`G#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "10": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`A${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "11": theSampler.current.releaseAll(Tone.context.currentTime);
                theSampler.current.triggerAttackRelease([`A#${octave}`], theRelease, Tone.context.currentTime);

                break;
            case "12": theSampler.current.releaseAll(Tone.context.currentTime);
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

    //map buttons to UI
    let samples = buttonState.map((item, index) => {
        return <Buttons handleClick={() => padClick(item.name)} key={index} padName={item.name}></Buttons>
    })

    return (
        <div className="ui-container">
            <div ref={waveContainer} id="waveform" className="wave-display"></div>
            <LoadButton mediaBlobUrl={mediaBlobUrl} loadSound={loadSound} />
            <MicButton micState={micState} toggleMic={toggleMic} MicLogo={MicLogo} StopLogo={StopLogo} toggleStop={toggleStop} />
            <Octaves left={toggleLeft} right={toggleRight} octaveLevel={octave} />
            <div className="transport">
                {samples}
            </div>
        </div>
    )
}

