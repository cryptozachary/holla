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
import { Sampler } from 'tone'
//import { effArr } from './effects2'
//import { effectParams } from './effects2'

export default function Display(props) {

    console.log("display render")

    const { effectsToggle, setEffectsToggle, effArr, effectParams, setEffectsParams, menuShowing } = props

    let sampler;
    const recorder = useRef(new Tone.Recorder({ mimeType: "audio/webm" }))
    let recording;

    const wavesurfer = useRef()

    const [octave, setOctave] = React.useState(4)

    const [buttonState, setButtonState] = React.useState(getButtons())

    const [micState, setMicState] = React.useState(false)

    const [loopOn, setLoopOn] = React.useState(false)

    const [loopPlaying, setLoopPlaying] = React.useState(false)

    const [defaultSound, setDefaultSound] = React.useState(Kick)

    const [defaultBlob, setDefaultBlob] = React.useState(null)

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
        let blobNull;
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
            console.log('start mic state')
            wavesurfer.current.microphone.start()
            blobNull = true
        }

        if (blobNull) {
            setDefaultBlob(prev => {
                return null
            })
        }

        if (!micState) {
            wavesurfer.current.microphone.stop()
            wavesurfer.current.microphone.stop()
            console.log('stopped mic state')
            console.log(defaultBlob)
        }

        if (defaultBlob !== null) {
            wavesurfer.current.loadBlob(defaultBlob)
            console.log('newblob')
        }

        console.log("running wavesurfer useffect")
        console.log(wavesurfer)

        return function () {
            wavesurfer.current.destroy()
            // wavesurfer.current.backend.destroy()
            wavesurfer.current.backend = null
            console.log('Still alive surfer?', wavesurfer)
        }

    }, [defaultSound, defaultBlob, micState, mediaBlobUrl]);

    //renders tone sampler and updates when defaultsound changes or other changes
    React.useEffect(() => {

        //trying to add new blob to samplers??
        sampler = new Tone.Sampler({
            urls: {
                "C4": defaultSound,
            },
            release: 1,

        }).connect(recorder.current).toDestination();


        console.log("running tone sample useffect")

        return function () {
            sampler.dispose('sampler')
        }

    }, [octave, defaultSound, defaultBlob, effectsToggle, effectParams, menuShowing, recordLoop])

    //record human playback of loop
    async function recordLoop() {

        console.log(loopOn)

        if (recorder.current.state === "started") return console.log('already started')

        recorder.current.start().then(() => {
            console.log('currently playing')
        })

        setLoopOn(is => {
            return true
        })

        console.log(loopOn)
    }

    //stop human playback of loop
    async function stopLoopRecording() {

        console.log(recorder)


        recorder.current.stop().then((recording) => {
            setDefaultBlob(prev => {
                console.log(recording)
                return recording
            })
            // console.log(recording)
            // new Response(recording).arrayBuffer().then((data) => {
            //     setDefaultBlob(prev => {
            //         return data
            //     })
            //     console.log(data)
            // })

        }).catch(err => {
            console.log(err, 'ERROR')
        })
        setLoopOn(is => {
            return false
        })
    }

    // play human loop back
    async function playLoop() {

        setLoopPlaying(prev => {
            return true
        })
        wavesurfer.current.play()
    }

    async function stopLoop() {

        setLoopPlaying(prev => {
            return false
        })
        wavesurfer.current.stop()
    }



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
            }).catch((err) => console.log(`Tone not loaded${err}`))
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

    //preview pad on settings menu
    function previewPad() {
        Tone.loaded().then(() => {
            sampler.releaseAll(Tone.context.currentTime);
            sampler.triggerAttackRelease([`D#${octave}`], 4, Tone.context.currentTime);
        }).catch((err) => console.log(`Tone not loaded${err}`))
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

            <LoadButton
                mediaBlobUrl={mediaBlobUrl} loadSound={loadSound}
            />

            <MicButton
                loopOn={loopOn}
                loopPlaying={loopPlaying}
                playLoop={playLoop}
                stopLoop={stopLoop}
                recordLoop={recordLoop}
                stopLoopRecording={stopLoopRecording}
                micState={micState}
                toggleMic={toggleMic}
                MicLogo={MicLogo}
                StopLogo={StopLogo}

            />

            <Octaves left={toggleLeft}
                right={toggleRight}
                octaveLevel={octave} />

            <div className="transport">
                {samples}
            </div>
            <>
                {menuShowing ? <button style={{ opacity: '1' }} type='button' name='preview-select' className='preview-btn button showBtn' onClick={previewPad}>Preview</button> : <button style={{ opacity: '0' }} type='button' name='preview-select' className='preview-btn button showBtn' onClick={previewPad}>Preview</button>}
            </>
        </div>
    )
}