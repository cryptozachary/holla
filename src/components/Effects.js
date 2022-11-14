import React, { useRef, useState, useEffect } from 'react'
//import { effectParams } from "./effects2"

function Effects(props) {

    const { effectsToggle, onChange, effArr, effectParams, setEffectParams, setEffArr } = props

    const reverbRangeInput = useRef()

    const reverbRangeDiv = useRef()

    let effectSet = true;

    const [stereoMono, setStereoMono] = useState(true)

    const [monoBool, setMonoBool] = useState(true)

    const [stereoBool, setStereoBool] = useState(false)

    const [effectBooleans, setEffectBooleans] = useState({
        oneSecond: true,
        twoSecond: false,
        threeSecond: false,

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

    //debounce effect to limit the number of re-renders on selections
    const debounce = (func, wait) => {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    //delay function to handle delay via text input 
    function handleDelay(e) {
        setEffectParams(prev => {
            return { ...prev, delayTime: e.target.value === "" ? 0 : e.target.value }
        })

        console.log(effectParams.delayTime)
    }

    //toggle stereoEffect State
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

    //toggle reverb state
    function handleReverbDecay(event, second) {

        console.log(event, second)

        // return if stereo effect turned off
        if (!effectsToggle[0].state) return

        // check reverb select boolean
        if (second === 1) {
            setEffectBooleans(prev => {
                return { oneSecond: true, twoSecond: false, threeSecond: false }
            },
                setEffectParams(prev => {
                    return { ...prev, verbDecay: 1 }
                })
            )

        } if (second === 2) {
            setEffectBooleans(prev => {
                return { oneSecond: false, twoSecond: true, threeSecond: false }
            },
                setEffectParams(prev => {
                    return { ...prev, verbDecay: 2 }
                })
            )

        } if (second === 3) {
            setEffectBooleans(prev => {
                return { oneSecond: false, twoSecond: false, threeSecond: true }
            },
                setEffectParams(prev => {
                    return { ...prev, verbDecay: 3 }
                })
            )

        }

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


    // toggle switches for each effect
    return (
        <div className='effect-container'>
            <div className='single-effect-container'>
                <label htmlFor="reverb" className="switch">
                    <input className="effect" name="reverb" id="reverb" type="checkbox" checked={effectsToggle[0].state} onChange={() => onChange(0)}></input>
                    <span className="slider round"></span>
                </label>
                <p>Reverb</p>

                {effectsToggle[0].state ? <div id='reverb-select-one select' style={reverbStyleOne} className='select' onClick={(e) => handleReverbDecay(e, 1)}>1s</div> : <div id='reverb-select-one select' style={{ ...reverbStyleOne, opacity: 0 }} className='select' onClick={(e) => handleReverbDecay(e, 1)}>1s</div>}

                {effectsToggle[0].state ? <div id='reverb-select-two select' style={reverbStyleTwo} className='select' onClick={(e) => handleReverbDecay(e, 2)}>2s</div> : <div id='reverb-select-two select' style={{ ...reverbStyleTwo, opacity: 0 }} className='select' onClick={(e) => handleReverbDecay(e, 2)}>2s</div>}

                {effectsToggle[0].state ? <div id='reverb-select-three select' style={reverbStyleThree} className='select' onClick={(e) => handleReverbDecay(e, 3)} >3s</div> : <div id='reverb-select-three select' style={{ ...reverbStyleThree, opacity: 0 }} className='select' onClick={(e) => handleReverbDecay(e, 3)} >3s</div>}

            </div >

            <div className='single-effect-container'>
                <label htmlFor="delay" className="switch">
                    <input className="effect" name="delay" id="delay" type="checkbox" checked={effectsToggle[1].state} onChange={() => onChange(1)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="delay-tag">Delay</p>
                <input min='0' step='0.1' type='number' name='delay-text-time' id='delay-text-time' value={effectParams.delayTime} onChange={(e) => debounce(handleDelay(e), 500)}></input>
            </div>

            <div className='single-effect-container'>
                <label htmlFor="stereo" className="switch">
                    <input className="effect" name="stereo" id="stereo" type="checkbox" checked={effectsToggle[2].state} onChange={() => onChange(2)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="stereo-tag">Stereo Widener</p>

                {effectsToggle[2].state ?
                    <div onClick={!monoBool ? handleStereoEffect : () => { }} style={monoStyle} id='mono-select' className='select'>MONO</div> : <div onClick={handleStereoEffect} style={{ ...monoStyle, opacity: "0" }} id='mono-select' className='select'>MONO</div>}

                {effectsToggle[2].state ?
                    <div style={stereoStyle} onClick={!stereoBool ? handleStereoEffect : () => { }} id='stereo-select' className='select'>STEREO</div>
                    : <div style={{ ...stereoStyle, opacity: "0" }} onClick={handleStereoEffect} id='stereo-select' className='select'>STEREO</div>}
            </div>
            <div className='single-effect-container'>
                <label htmlFor="distortion" className="switch">
                    <input className="effect" name="distortion" id="distortion" type="checkbox" checked={effectsToggle[3].state} onChange={() => onChange(3)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="distortion-tag">Distortion</p>
            </div>

            <div className='single-effect-container'>
                <label htmlFor="phaser" className="switch">
                    <input className="effect" name="phaser" id="phaser" type="checkbox" checked={effectsToggle[4].state} onChange={() => onChange(4)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="phaser-tag">Phaser</p>
            </div>

            <div className='single-effect-container'>
                <label htmlFor="chorus" className="switch">
                    <input className="effect" id="chorus" name="chorus" type="checkbox" checked={effectsToggle[5].state} onChange={() => onChange(5)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="chorus-tag">Chorus</p>
            </div>

            <div className='single-effect-container'>
                <label htmlFor="bitcrusher" className="switch">
                    <input className="effect" name="bitcrusher" id="bitcrusher" type="checkbox" checked={effectsToggle[6].state} onChange={() => onChange(6)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="bitcrusher-tag">Bit Crusher</p>
            </div>

        </div >
    )
}

export default Effects
