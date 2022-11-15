import React, { useRef } from 'react'
import Buttons from "./buttons"
import MicLogo from "../images/mic.svg"
import StopLogo from "../images/stop.png"
import WaveSurfer from "wavesurfer.js"
import * as Tone from "tone"
import Kick from "../audio/808.wav"
import Song from "../audio/song.wav"
import Octaves from "./octaves"
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions'
import { useReactMediaRecorder } from "react-media-recorder";
import MicrophonePlugin from 'wavesurfer.js/src/plugin/microphone/index.js'
import LoadButton from './loadbutton'
import MicButton from './micbutton'
//import { effArr } from './effects2'
//import { effectParams } from './effects2'

export default function Display(props) {

    console.log("display render")

    const { effectsToggle, setEffectsToggle, effArr, effectParams, setEffectsParams } = props

    let sampler;

    const wavesurfer = useRef()

    const [octave, setOctave] = React.useState(4)

    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)



    const [defaultSound, setDefaultSound] = React.useState(Kick)



    const { status,
        startRecording,
        stopRecording,
        mediaBlobUrl } =
        useReactMediaRecorder({ audio: true });

    //Updating the defaultsound state when mediablob/sound is changed
    React.useEffect(() => {

        if (mediaBlobUrl) {
            setDefaultSound(prev => {
                return mediaBlobUrl
            })
        }

    }, [mediaBlobUrl])

    //Renders wavesurfer and updates when defaultsound changes and/or mic turns on/off
    React.useEffect(() => {
        // Create a wavesurfer object
        // More info about options here https://wavesurfer-js.org/docs/options.html
        wavesurfer.current = WaveSurfer.create({
            container: "#waveform",
            waveColor: "#567FFF",
            height: 146,
            barGap: 1,
            barWidth: 1,
            barRadius: 1,
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

        sampler = new Tone.Sampler({
            urls: {
                "C4": defaultSound
            },
            release: 1,

        }).toDestination();


        console.log("running tone sample useffect")

        return function () {
            sampler.dispose('sampler')
        }

    }, [octave, defaultSound, effectsToggle, effectParams])



    //connect and disconnect effect when effect turned on/off
    function connectEffect() {

        let selected = []

        //loop through effectsToggle and connect effect if toggle switched on (true)
        effectsToggle.forEach((effect, index, arr) => {
            if (effect.state === true) {
                sampler.connect(effArr[index].toDestination())
                selected.push(index)
                console.log(selected)
            }
        })

        //loop through effectsToggle and connect effect if toggle switched off (false)
        if (selected) {
            selected.forEach((effectposition) => {
                if (effectsToggle[effectposition].state === false) {
                    sampler.disconnect(effArr[effectposition])

                    // add something to removeeffect nodes - nodes increase when parameter changes
                }
            })

        }

    }


    //calls function to turn on/off effects
    React.useEffect(() => {

        connectEffect()
        console.log('Running connect effect')

    }, [effectsToggle, octave, effectParams])


    //load sound for wavesurfer and tone sampler
    function loadSound(e) {

        const file = e.target.files[0];
        const fileList = e.target.files
        console.log(file, fileList);

        // if (file) {

        //     let reader = new FileReader();

        //     // Read File as an ArrayBuffer
        //     reader.readAsArrayBuffer(file);
        //     reader.onload = function (evt) {
        //         // Create a Blob providing as first argument a typed array with the file buffer
        //         const result = evt.target.result
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

            // Read File as an ArrayBuffer
            reader2.readAsDataURL(file);
            reader2.onload = function (evt) {
                // Create a Blob providing as first argument a typed array with the file buffer
                const result = evt.target.result
                console.log(result)
                let blob2 = new Blob([new Uint8Array(evt.target.result)]);
                console.log(result)

                setDefaultSound(prev => {
                    return result
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

    //right octave button functionality
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
        toggleRecording()

    }, [micState])

    // toggles micState ( used for mic img logo on UI )
    function toggleMic() {
        setMicState(prev => {
            return !prev
        })
    }

    console.log(`mic state is ${micState}`)


    // starts and stop audio recording based on micState
    function toggleRecording() {
        if (micState === true) {
            // micImg.setAttribute("style", "background-color:red")
            startRecording()

        } else {
            stopRecording()
            // micImg.setAttribute("style", "background-color:initial")
        }
    }

    // sample pads connected to the tone sampler
    function padClick(pad) {

        console.log(pad, "was clicked")

        switch (pad) {
            case "1": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttack([`C${octave}`], Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "2": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`C#${octave}`], 1, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "3": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`D${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "4": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`D#${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "5": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`E${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "6": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`F${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "7": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`F#${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "8": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`G${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "9": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`G#${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "10": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`A${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "11": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`A#${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
            case "12": Tone.loaded().then(() => {
                sampler.releaseAll(Tone.context.currentTime);
                sampler.triggerAttackRelease([`B${octave}`], 4, Tone.context.currentTime);
            }).catch(() => console.log('Tone not loaded'))
                break;
        }
    }


    // buttons created for mapping 
    function getButtons() {

        let sampleElements = []
        let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        for (let i = 0; i < 12; i++) {
            sampleElements.push({
                name: `${i + 1}`,
                note: notes[i]
            })
        }
        return sampleElements
    }

    //map buttons to UI
    let samples = buttonState.map((item, index) => {
        return <Buttons handleClick={() => padClick(item.name)} key={index} padName={item.name} padNote={item.note}></Buttons>
    })


    return (
        <div className="ui-container">
            <div id="waveform" className="wave-display"></div>
            <LoadButton mediaBlobUrl={mediaBlobUrl} loadSound={loadSound} />
            <MicButton micState={micState} toggleMic={toggleMic} MicLogo={MicLogo} StopLogo={StopLogo} />
            <Octaves left={toggleLeft} right={toggleRight} octaveLevel={octave} />
            <div className="transport">
                {samples}
            </div>
        </div>
    )
}