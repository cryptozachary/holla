import React, { useRef, useState, useEffect } from 'react'
//import { effectParams } from "./effects2"

function Effects(props) {

    const { effectsToggle, onChange, effArr, effectParams, setEffectParams, setEffArr } = props

    const reverbRangeInput = useRef()

    const reverbRangeDiv = useRef()

    const [stereoMono, setStereoMono] = useState(true)

    const [monoBool, setMonoBool] = useState(true)

    const [stereoBool, setStereoBool] = useState(false)

    const [delayChoice, setDelayChoice] = useState(true)

    const [crusherChoice, setCrusherChoice] = useState(true)

    const [effectBooleans, setEffectBooleans] = useState({
        oneSecond: true,
        twoSecond: false,
        threeSecond: false,
    })

    const [crusherBooleans, setCrusherBooleans] = useState({
        one: true,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
    })

    const [delayBooleans, setDelayBooleans] = useState({
        pointOne: true,
        pointTwo: false,
        pointThree: false,
        pointFour: false,
        pointFive: false,
        pointSix: false,
        pointSeven: false,
        pointEight: false,
        pointNine: false,
        onePointZero: false,
    })

    const [distortionBooleans, setDistortionBooleans] = useState({
        zero: true,
        zeroPointFive: false,
        onePointZero: false,
    })

    const [phaserBooleans, setPhaserBooleans] = useState({
        low: true,
        medium: false,
        high: false,
    })

    const [chorusBooleans, SetChorusBooleans] = useState({
        low: true,
        medium: false,
        high: false,
    })

    //check stereowidth selection booleans
    useEffect(() => {

        //check stereo boolean
        if (effectParams.stereoWidth !== 0) {
            setMonoBool(false)
        } else {
            setMonoBool(true)
        }
        if (effectParams.stereoWidth !== 1) {
            setStereoBool(false)
        } else {
            setStereoBool(true)
        }

    }, [handleStereoEffect])

    // range slider for delay parameter
    const setValue = () => {

        const newValue = Number((reverbRangeInput.current.value - reverbRangeInput.current.min) / (reverbRangeInput.current.max - reverbRangeInput.current.min));
        const newPosition = 10 - (newValue * 0.2);
        reverbRangeDiv.current.innerHTML = `<span>${reverbRangeInput.current.value}</span>`;
        reverbRangeDiv.current.style.left = `calc(${newValue}% + (${newPosition}px))`;

        setTimeout(callSet, 500)

        function callSet() {
            setEffectParams(prev => {
                return { ...prev, verbDecay: Math.floor(newValue + 1) }
            })
            console.log(effectParams.verbDecay)
        }

    };



    //function to toggle delay even or odd delay visual
    function handleDelayChoice() {
        setDelayChoice(!delayChoice)
    }

    //handle delay effect selections
    function handleDelay(e, second) {

        if (!effectsToggle[1].state) return

        setEffectParams(prev => {
            return { ...prev, delayTime: second }
        })

        // set delay boolean choice based upon delay setting
        setDelayBooleans(prev => {
            if (second === 0.1) {
                return ({
                    pointOne: true, pointTwo: false, pointThree: false, pointFour: false, pointFive: false, pointSix: false, pointSeven: false, pointEight: false, pointNine: false, onePointZero: false
                })
            }

            if (second === 0.2) {
                return ({
                    pointOne: false, pointTwo: true, pointThree: false, pointFour: false, pointFive: false, pointSix: false, pointSeven: false, pointEight: false, pointNine: false, onePointZero: false
                })
            }

            if (second === 0.3) {
                return ({
                    pointOne: false, pointTwo: false, pointThree: true, pointFour: false, pointFive: false, pointSix: false, pointSeven: false, pointEight: false, pointNine: false, onePointZero: false
                })
            }

            if (second === 0.4) {
                return ({
                    pointOne: false, pointTwo: false, pointThree: false, pointFour: true, pointFive: false, pointSix: false, pointSeven: false, pointEight: false, pointNine: false, onePointZero: false
                })
            }

            if (second === 0.5) {
                return ({
                    pointOne: false, pointTwo: false, pointThree: false, pointFour: false, pointFive: true, pointSix: false, pointSeven: false, pointEight: false, pointNine: false, onePointZero: false
                })
            }

            if (second === 0.6) {
                return ({
                    pointOne: false, pointTwo: false, pointThree: false, pointFour: false, pointFive: false, pointSix: true, pointSeven: false, pointEight: false, pointNine: false, onePointZero: false
                })
            }

            if (second === 0.7) {
                return ({
                    pointOne: false, pointTwo: false, pointThree: false, pointFour: false, pointFive: false, pointSix: false, pointSeven: true, pointEight: false, pointNine: false, onePointZero: false
                })
            }

            if (second === 0.8) {
                return ({
                    pointOne: false, pointTwo: false, pointThree: false, pointFour: false, pointFive: false, pointSix: false, pointSeven: false, pointEight: true, pointNine: false, onePointZero: false
                })
            }

            if (second === 0.9) {
                return ({
                    pointOne: false, pointTwo: false, pointThree: false, pointFour: false, pointFive: false, pointSix: false, pointSeven: false, pointEight: false, pointNine: true, onePointZero: false
                })
            }

            if (second === 1.0) {
                return ({
                    pointOne: false, pointTwo: false, pointThree: false, pointFour: false, pointFive: false, pointSix: false, pointSeven: false, pointEight: false, pointNine: false, onePointZero: true
                })
            }

        })

        console.log(effectParams.delayTime, second, e)
    }

    //handle crusher choice
    function handleCrusherChoice() {
        setCrusherChoice(!crusherChoice)
    }

    //handle crusher effect selections
    function handleCrusher(e, selection) {

        if (!effectsToggle[6].state) return

        setEffectParams(prev => {
            return { ...prev, crusherBits: selection }
        })

        setCrusherBooleans(prev => {

            if (selection === 1) {
                return ({
                    one: true, two: false, three: false, four: false, five: false, six: false, seven: false, eight: false
                })
            }
            if (selection === 2) {
                return ({
                    one: false, two: true, three: false, four: false, five: false, six: false, seven: false, eight: false
                })
            }
            if (selection === 3) {
                return ({
                    one: false, two: false, three: true, four: false, five: false, six: false, seven: false, eight: false
                })
            }
            if (selection === 4) {
                return ({
                    one: false, two: false, three: false, four: true, five: false, six: false, seven: false, eight: false
                })
            }
            if (selection === 5) {
                return ({
                    one: false, two: false, three: false, four: false, five: true, six: false, seven: false, eight: false
                })
            }
            if (selection === 6) {
                return ({
                    one: false, two: false, three: false, four: false, five: false, six: true, seven: false, eight: false
                })
            }
            if (selection === 7) {
                return ({
                    one: false, two: false, three: false, four: false, five: false, six: false, seven: true, eight: false
                })
            }
            if (selection === 8) {
                return ({
                    one: false, two: false, three: false, four: false, five: false, six: false, seven: false, eight: true
                })
            }
        })

    }

    //handle stereo effect selections
    function handleStereoEffect() {

        // return if stereo effect turned off
        if (!effectsToggle[2].state) return

        // switch between mono and stereo selection
        setStereoMono(prev => {
            return !prev
        })
        //turn on/off mono or stereo based upon effect value
        setEffectParams(prev => {
            return { ...prev, stereoWidth: prev.stereoWidth === 1 ? 0 : 1 }
        })
    }

    //handle reverb selections
    function handleReverbDecay(event, second) {

        console.log(event, second)

        // return if stereo effect turned off
        if (!effectsToggle[0].state) return


        setEffectParams(prev => {
            return { ...prev, verbDecay: second }
        })

        // check reverb select boolean
        if (second === 1) {
            setEffectBooleans(prev => {
                return { ...prev, oneSecond: true, twoSecond: false, threeSecond: false }
            })

        } if (second === 2) {
            setEffectBooleans(prev => {
                return { ...prev, oneSecond: false, twoSecond: true, threeSecond: false }
            })

        } if (second === 3) {
            setEffectBooleans(prev => {
                return { ...prev, oneSecond: false, twoSecond: false, threeSecond: true }
            })
        }
    }

    //handle distortion selection
    function handleDistortion(e, distortAmount) {

        if (!effectsToggle[3].state) return

        setEffectParams(prev => {
            return { ...prev, distort: distortAmount }
        })

        if (distortAmount === 0) {
            setDistortionBooleans(prev => {
                return { ...prev, zero: true, zeroPointFive: false, onePointZero: false }
            })
        }
        if (distortAmount === 0.5) {
            setDistortionBooleans(prev => {
                return { ...prev, zero: false, zeroPointFive: true, onePointZero: false }
            })
        }
        if (distortAmount === 1) {
            setDistortionBooleans(prev => {
                return { ...prev, zero: false, zeroPointFive: false, onePointZero: true }
            })
        }
        console.log(effectParams.distort, distortAmount, e)
    }

    //handle phaser selection
    function handlePhaser(e, phaseAmount) {

        if (!effectsToggle[4].state) return


        setEffectParams(prev => {

            if (phaseAmount === "Low") {
                return { ...prev, phaserFreq: 15, phaserOctaves: 5, phaserBaseFreq: 1000, }
            }

            if (phaseAmount === "Medium") {
                return { ...prev, phaserFreq: 30, phaserOctaves: 10, phaserBaseFreq: 2000, }
            }

            if (phaseAmount === "High") {
                return { ...prev, phaserFreq: 45, phaserOctaves: 15, phaserBaseFreq: 3000, }
            }
        })

        setPhaserBooleans(prev => {

            if (phaseAmount === "Low") {
                return { ...prev, low: true, medium: false, high: false, }
            }

            if (phaseAmount === "Medium") {
                return { ...prev, low: false, medium: true, high: false, }
            }

            if (phaseAmount === "High") {
                return { ...prev, low: false, medium: false, high: true, }
            }
        })
    }

    //handle chorus selection
    function handleChorus(e, chorusAmount) {

        if (!effectsToggle[5].state) return


        setEffectParams(prev => {

            if (chorusAmount === "Low") {
                return { ...prev, chorusFreq: 15, chrousDelayTime: 5, chorusDepth: 1000, }
            }

            if (chorusAmount === "Medium") {
                return { ...prev, chorusFreq: 30, chrousDelayTime: 10, chorusDepth: 2000, }
            }

            if (chorusAmount === "High") {
                return { ...prev, chorusFreq: 45, chrousDelayTime: 15, chorusDepth: 3000, }
            }
        })

        SetChorusBooleans(prev => {

            if (chorusAmount === "Low") {
                return { ...prev, low: true, medium: false, high: false }
            }

            if (chorusAmount === "Medium") {
                return { ...prev, low: false, medium: true, high: false }
            }

            if (chorusAmount === "High") {
                return { ...prev, low: false, medium: false, high: true }
            }
        })
    }

    //effect Style
    const monoStyle = {
        backgroundColor: stereoMono ? "#4fa7f3" : ""
    }
    const stereoStyle = {
        backgroundColor: !stereoMono ? "#4fa7f3" : ""
    }
    const reverbStyleOne = {
        backgroundColor: effectBooleans.oneSecond ? "#4fa7f3" : ""
    }
    const reverbStyleTwo = {
        backgroundColor: effectBooleans.twoSecond ? "#4fa7f3" : ""
    }
    const reverbStyleThree = {
        backgroundColor: effectBooleans.threeSecond ? "#4fa7f3" : ""
    }

    const delayStyle = [{
        backgroundColor: delayBooleans.pointOne ? "#4fa7f3" : ""
    },

    {
        backgroundColor: delayBooleans.pointTwo ? "#4fa7f3" : ""
    },
    {
        backgroundColor: delayBooleans.pointThree ? "#4fa7f3" : ""
    },
    {
        backgroundColor: delayBooleans.pointFour ? "#4fa7f3" : ""
    },
    {
        backgroundColor: delayBooleans.pointFive ? "#4fa7f3" : ""
    },
    {
        backgroundColor: delayBooleans.pointSix ? "#4fa7f3" : ""
    },
    {
        backgroundColor: delayBooleans.pointSeven ? "#4fa7f3" : ""
    },
    {
        backgroundColor: delayBooleans.pointEight ? "#4fa7f3" : ""
    },
    {
        backgroundColor: delayBooleans.pointNine ? "#4fa7f3" : ""
    },
    {
        backgroundColor: delayBooleans.onePointZero ? "#4fa7f3" : ""
    },
    ]


    const crusherStyle = [{
        backgroundColor: crusherBooleans.one ? "#4fa7f3" : ""
    },
    {
        backgroundColor: crusherBooleans.two ? "#4fa7f3" : ""
    },
    {
        backgroundColor: crusherBooleans.three ? "#4fa7f3" : ""
    },
    {
        backgroundColor: crusherBooleans.four ? "#4fa7f3" : ""
    },
    {
        backgroundColor: crusherBooleans.five ? "#4fa7f3" : ""
    },
    {
        backgroundColor: crusherBooleans.six ? "#4fa7f3" : ""
    },
    {
        backgroundColor: crusherBooleans.seven ? "#4fa7f3" : ""
    },
    {
        backgroundColor: crusherBooleans.eight ? "#4fa7f3" : ""
    },
    ]

    const distortionStyle = [{

        backgroundColor: distortionBooleans.zero ? "#4fa7f3" : ""
    },
    {
        backgroundColor: distortionBooleans.zeroPointFive ? "#4fa7f3" : ""
    },

    {
        backgroundColor: distortionBooleans.onePointZero ? "#4fa7f3" : ""
    }
    ]

    const phaserStyle = [{

        backgroundColor: phaserBooleans.low ? "#4fa7f3" : ""
    },
    {
        backgroundColor: phaserBooleans.medium ? "#4fa7f3" : ""
    },

    {
        backgroundColor: phaserBooleans.high ? "#4fa7f3" : ""
    }
    ]

    const chorusStyle = [{

        backgroundColor: chorusBooleans.low ? "#4fa7f3" : ""
    },
    {
        backgroundColor: chorusBooleans.medium ? "#4fa7f3" : ""
    },

    {
        backgroundColor: chorusBooleans.high ? "#4fa7f3" : ""
    }
    ]


    // toggle switches for each effect
    return (
        <div className='effect-container'>
            <p>Reverb</p>
            <div className='single-effect-container'>
                <label htmlFor="reverb" className="switch">
                    <input className="effect" name="reverb" id="reverb" type="checkbox" checked={effectsToggle[0].state} onChange={() => onChange(0)}></input>
                    <span className="slider round"></span>
                </label>

                {effectsToggle[0].state ? <div id='reverb-select-one' style={reverbStyleOne} className='select' onClick={(e) => handleReverbDecay(e, 1)}>1s</div> : <div id='reverb-select-one' style={{ ...reverbStyleOne, opacity: 0 }} className='select' onClick={(e) => handleReverbDecay(e, 1)}>1s</div>}

                {effectsToggle[0].state ? <div id='reverb-select-two' style={reverbStyleTwo} className='select' onClick={(e) => handleReverbDecay(e, 2)}>2s</div> : <div id='reverb-select-two' style={{ ...reverbStyleTwo, opacity: 0 }} className='select' onClick={(e) => handleReverbDecay(e, 2)}>2s</div>}

                {effectsToggle[0].state ? <div id='reverb-select-three' style={reverbStyleThree} className='select' onClick={(e) => handleReverbDecay(e, 3)} >3s</div> : <div id='reverb-select-three ' style={{ ...reverbStyleThree, opacity: 0 }} className='select' onClick={(e) => handleReverbDecay(e, 3)} >3s</div>}

            </div >

            <p className="delay-tag" onClick={handleDelayChoice}>Delay</p>
            <div className='single-effect-container'>
                <label htmlFor="delay" className="switch">
                    <input className="effect" name="delay" id="delay" type="checkbox" checked={effectsToggle[1].state} onChange={() => onChange(1)}></input>
                    <span className="slider round"></span>
                </label>

                {effectsToggle[1].state ?
                    <>
                        <div id='pointOne' style={delayStyle[0]} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.1)}>.1ms</div>
                        <div id='pointTwo' style={delayStyle[1]} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.2)}>.2ms</div>
                        <div id='pointThree' style={delayStyle[2]} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.3)}>.3ms</div>
                        <div id='pointFour' style={delayStyle[3]} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.4)}>.4ms</div>
                        <div id='pointFive' style={delayStyle[4]} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.5)}>.5ms</div>
                        <div id='pointSix' style={delayStyle[5]} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.6)}>.6ms</div>
                        <div id='pointSeven' style={delayStyle[6]} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.7)}>.7ms</div>
                        <div id='pointEight' style={delayStyle[7]} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.8)}>.8ms</div>
                        <div id='pointNine' style={delayStyle[8]} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.9)}>.9ms</div>
                        <div id='onePointZero' style={delayStyle[9]} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 1.0)}>1ms</div>
                    </> : <>
                        <div id='pointOne' style={{ ...delayStyle[0], opacity: "0" }} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.1)}>.1ms</div>
                        <div id='pointTwo' style={{ ...delayStyle[1], opacity: "0" }} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.2)}>.2ms</div>
                        <div id='pointThree' style={{ ...delayStyle[2], opacity: "0" }} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.3)}>.3ms</div>
                        <div id='pointFour' style={{ ...delayStyle[3], opacity: "0" }} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.4)}>.4ms</div>
                        <div id='pointFive' style={{ ...delayStyle[4], opacity: "0" }} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.5)}>.5ms</div>
                        <div id='pointSix' style={{ ...delayStyle[5], opacity: "0" }} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.6)}>.6ms</div>
                        <div id='pointSeven' style={{ ...delayStyle[6], opacity: "0" }} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.7)}>.7ms</div>
                        <div id='pointEight' style={{ ...delayStyle[7], opacity: "0" }} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.8)}>.8ms</div>
                        <div id='pointNine' style={{ ...delayStyle[8], opacity: "0" }} className={`select delay-select-odd ${!delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 0.9)}>.9ms</div>
                        <div id='onePointZero' style={{ ...delayStyle[9], opacity: "0" }} className={`select delay-select-even ${delayChoice ? 'show-none' : ''}`} onClick={(e) => handleDelay(e, 1.0)}>1ms</div>
                    </>}
            </div>

            <p className="stereo-tag">Mono/Wide</p>
            <div className='single-effect-container'>
                <label htmlFor="stereo" className="switch">
                    <input className="effect" name="stereo" id="stereo" type="checkbox" checked={effectsToggle[2].state} onChange={() => onChange(2)}></input>
                    <span className="slider round"></span>
                </label>

                {effectsToggle[2].state ?
                    <div onClick={!monoBool ? handleStereoEffect : () => { }} style={monoStyle} id='mono-select' className='select'>MONO</div> : <div onClick={handleStereoEffect} style={{ ...monoStyle, opacity: "0" }} id='mono-select' className='select'>MONO</div>}

                {effectsToggle[2].state ?
                    <div style={stereoStyle} onClick={!stereoBool ? handleStereoEffect : () => { }} id='stereo-select' className='select'>STEREO</div>
                    : <div style={{ ...stereoStyle, opacity: "0" }} onClick={handleStereoEffect} id='stereo-select' className='select'>STEREO</div>}
            </div>

            <p className="distortion-tag">Distortion</p>
            <div className='single-effect-container'>
                <label htmlFor="distortion" className="switch">
                    <input className="effect" name="distortion" id="distortion" type="checkbox" checked={effectsToggle[3].state} onChange={() => onChange(3)}></input>
                    <span className="slider round"></span>
                </label>

                {effectsToggle[3].state ?
                    <>
                        <div id='zero' style={distortionStyle[0]} className='select' onClick={(e) => handleDistortion(e, 0)}>0</div>
                        <div id='zeroPointFive' style={distortionStyle[1]} className='select' onClick={(e) => handleDistortion(e, 0.5)}>0.5</div>
                        <div id='onePointZero' style={distortionStyle[2]} className='select' onClick={(e) => handleDistortion(e, 1)}>1.0</div>
                    </> : <>
                        <div id='zero' style={{ ...distortionStyle[0], opacity: '0' }} className='select' onClick={(e) => handleDistortion(e, 0)}>0</div>
                        <div id='zeroPointFive' style={{ ...distortionStyle[1], opacity: '0' }} className='select' onClick={(e) => handleDistortion(e, 0.5)}>0.5</div>
                        <div id='onePointZero' style={{ ...distortionStyle[2], opacity: '0' }} className='select' onClick={(e) => handleDistortion(e, 1)}>1.0</div>
                    </>}

            </div>

            <p className="phaser-tag">Phaser</p>
            <div className='single-effect-container'>
                <label htmlFor="phaser" className="switch">
                    <input className="effect" name="phaser" id="phaser" type="checkbox" checked={effectsToggle[4].state} onChange={() => onChange(4)}></input>
                    <span className="slider round"></span>
                </label>


                {effectsToggle[4].state ?
                    <>
                        <div name='frequency-select' style={phaserStyle[0]} id='frequency-select' className='select' onClick={(e) => handlePhaser(e, 'Low')}>Low</div>
                        <div name='frequency-select' style={phaserStyle[1]} id='frequency-select' className='select' onClick={(e) => handlePhaser(e, 'Medium')}>Medium</div>
                        <div name='frequency-select' style={phaserStyle[2]} id='frequency-select' className='select' onClick={(e) => handlePhaser(e, 'High')}>High</div>
                    </> : <>
                        <div name='frequency-select' style={{ ...phaserStyle[0], opacity: 0 }} id='frequency-select' className='select' onClick={(e) => handlePhaser(e, 'Low')}>Low</div>
                        <div name='frequency-select' style={{ ...phaserStyle[1], opacity: 0 }} id='frequency-select' className='select' onClick={(e) => handlePhaser(e, 'Medium')}>Medium</div>
                        <div name='frequency-select' style={{ ...phaserStyle[2], opacity: 0 }} id='frequency-select' className='select' onClick={(e) => handlePhaser(e, 'High')}>High</div>
                    </>}

            </div>

            <p className="chorus-tag">Chorus</p>
            <div className='single-effect-container'>
                <label htmlFor="chorus" className="switch">
                    <input className="effect" id="chorus" name="chorus" type="checkbox" checked={effectsToggle[5].state} onChange={() => onChange(5)}></input>
                    <span className="slider round"></span>
                </label>

                {effectsToggle[5].state ?
                    <>
                        <div name='chorus-select' style={chorusStyle[0]} id='chorus-select' className='select' onClick={(e) => handleChorus(e, 'Low')}>Low</div>
                        <div name='chorus-select' style={chorusStyle[1]} id='chorus-select' className='select' onClick={(e) => handleChorus(e, 'Medium')}>Medium</div>
                        <div name='chorus-select' style={chorusStyle[2]} id='chorus-select' className='select' onClick={(e) => handleChorus(e, 'High')}>High</div>
                    </> : <>
                        <div name='chorus-select' style={{ ...chorusStyle[0], opacity: 0 }} id='chorus-select' className='select' onClick={(e) => handleChorus(e, 'Low')}>Low</div>
                        <div name='chorus-select' style={{ ...chorusStyle[1], opacity: 0 }} id='chorus-select' className='select' onClick={(e) => handleChorus(e, 'Medium')}>Medium</div>
                        <div name='chorus-select' style={{ ...chorusStyle[2], opacity: 0 }} id='chorus-select' className='select' onClick={(e) => handleChorus(e, 'High')}>High</div>
                    </>}


            </div>

            <p className="bitcrusher-tag" onClick={handleCrusherChoice}>Bit Crusher</p>
            <div className='single-effect-container'>
                <label htmlFor="bitcrusher" className="switch">
                    <input className="effect" name="bitcrusher" id="bitcrusher" type="checkbox" checked={effectsToggle[6].state} onChange={() => onChange(6)}></input>
                    <span className="slider round"></span>
                </label>

                {effectsToggle[6].state ?
                    <>
                        <div id='one' style={crusherStyle[0]} className={`select delay-select-odd ${!crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 1)}>1</div>
                        <div id='two' style={crusherStyle[1]} className={`select delay-select-even ${crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 2)}>2</div>
                        <div id='three' style={crusherStyle[2]} className={`select delay-select-odd ${!crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 3)}>3</div>
                        <div id='four' style={crusherStyle[3]} className={`select delay-select-even ${crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 4)}>4</div>
                        <div id='five' style={crusherStyle[4]} className={`select delay-select-odd ${!crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 5)}>5</div>
                        <div id='six' style={crusherStyle[5]} className={`select delay-select-even ${crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 6)}>6</div>
                        <div id='seven' style={crusherStyle[6]} className={`select delay-select-odd ${!crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 7)}>7</div>
                        <div id='eight' style={crusherStyle[7]} className={`select delay-select-even ${crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 8)}>8</div>
                    </> : <>
                        <div id='one' style={{ ...crusherStyle[0], opacity: "0" }} className={`select delay-select-odd ${!crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 1)}>1</div>
                        <div id='two' style={{ ...crusherStyle[1], opacity: "0" }} className={`select delay-select-even ${crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 2)}>2</div>
                        <div id='three' style={{ ...crusherStyle[2], opacity: "0" }} className={`select delay-select-odd ${!crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 3)}>3</div>
                        <div id='four' style={{ ...crusherStyle[3], opacity: "0" }} className={`select delay-select-even ${crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 4)}>4</div>
                        <div id='ive' style={{ ...crusherStyle[4], opacity: "0" }} className={`select delay-select-odd ${!crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 5)}>5</div>
                        <div id='six' style={{ ...crusherStyle[5], opacity: "0" }} className={`select delay-select-even ${crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 6)}>6</div>
                        <div id='seven' style={{ ...crusherStyle[6], opacity: "0" }} className={`select delay-select-odd ${!crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 7)}>7</div>
                        <div id='eight' style={{ ...crusherStyle[7], opacity: "0" }} className={`select delay-select-even ${crusherChoice ? 'show-none' : ''}`} onClick={(e) => handleCrusher(e, 8)}>8</div>
                    </>}
            </div>

        </div >
    )
}

export default Effects
