import React, { useRef, useState, useEffect } from 'react'
//import { effectParams } from "./effects2"

function Effects(props) {

    const { effectsToggle, onChange, effArr, effectParams, setEffectParams } = props


    const reverbRangeInput = useRef()

    const reverbRangeDiv = useRef()

    const setValue = () => {
        const newValue = Number((reverbRangeInput.current.value - reverbRangeInput.current.min) * 2 / (reverbRangeInput.current.max - reverbRangeInput.current.min))
        const newPosition = 10 - (newValue * 0.2);
        reverbRangeDiv.current.innerHTML = `<span>${reverbRangeInput.current.value}</span>`;
        reverbRangeDiv.current.style.left = `calc(${newValue}% + (${newPosition}px))`;
        setEffectParams(prev => {
            return { ...prev, verbDecay: Math.floor(newValue + 1) }
        })
        console.log(effectParams.verbDecay)
    };

    useEffect(() => {
        setValue()
    }, [])


    // toggle switches for effects
    return (
        <div>

            <div className='slider-flex-container'>
                <label htmlFor="reverb" className="switch">
                    <input className="effect" name="reverb" id="reverb" type="checkbox" checked={effectsToggle[0].state} onChange={() => onChange(0)}></input>
                    <span className="slider round"></span>
                </label>
                <p>Reverb</p>
                <div className="reverb-tag range-wrap">
                    <div ref={reverbRangeDiv} className="range-value" id="rangeV"></div>
                    <input type="range" ref={reverbRangeInput} defaultValue='1' name="reverb-range" id="reverb-range" className="range-slider" min="1" max="2" step='0.1' onInput={setValue}></input>
                </div>
            </div >

            <div>
                <label htmlFor="delay" className="switch">
                    <input className="effect" name="delay" id="delay" type="checkbox" checked={effectsToggle[1].state} onChange={() => onChange(1)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="delay-tag">Delay</p>
            </div>

            <div>
                <label htmlFor="stereo" className="switch">
                    <input className="effect" name="stereo" id="stereo" type="checkbox" checked={effectsToggle[2].state} onChange={() => onChange(2)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="stereo-tag">Stereo Widener</p>
            </div>

            <div>
                <label htmlFor="distortion" className="switch">
                    <input className="effect" name="distortion" id="distortion" type="checkbox" checked={effectsToggle[3].state} onChange={() => onChange(3)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="distortion-tag">Distortion</p>
            </div>

            <div>
                <label htmlFor="phaser" className="switch">
                    <input className="effect" name="phaser" id="phaser" type="checkbox" checked={effectsToggle[4].state} onChange={() => onChange(4)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="phaser-tag">Phaser</p>
            </div>

            <div>
                <label htmlFor="chorus" className="switch">
                    <input className="effect" id="chorus" name="chorus" type="checkbox" checked={effectsToggle[5].state} onChange={() => onChange(5)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="chorus-tag">Chorus</p>
            </div>

            <div>
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
