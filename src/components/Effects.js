import React from 'react'
import EffectsData from "./EffectsData"
import * as Tone from "tone"
import { Reverb } from 'tone'

function Effects({ effectsToggle, onChange }) {

    console.log(effectsToggle[0].state)

    // toggle switches for effects
    return (
        <div>

            <div>
                <label htmlFor="reverb" className="switch">
                    <input className="effect" name="reverb" id="reverb" type="checkbox" checked={effectsToggle[0].state} onChange={() => onChange(0)}></input>
                    <span className="slider round"></span>
                </label>
                <p className="reverb-tag">Reverb</p>
            </div>

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

        </div>
    )
}

export default Effects
