import PacLogo from "../images/pac.png"
import React, { useState, useEffect } from "react"
import Effects from "./Effects"
import EffectsData from "./EffectsData"

export default function Header() {

    const [modalShow, setModalShow] = useState(false)

    const [effectsToggle, setEffectsToggle] = useState(EffectsData)


    const modalStyle = {
        display: !modalShow ? "none" : "block"
    }

    function toggleSettings(effectPosition) {
        const updatedCheckedState = effectsToggle.map((effect, index) =>
            index === effectPosition ? !effect : effect
        );

        setEffectsToggle(updatedCheckedState);
    }

    function showModal() {
        setModalShow(!modalShow)
        console.log(modalShow)
    }

    function aboutModal() {
        console.log("about menu clicked")
    }


    return (
        <div>
            <div className="header-container">
                <h1 className="header-title">HOLLA' AT ME</h1>
            </div>
            <nav className="navigation-container">
                <img className="pac-logo" src={PacLogo} alt="pac"></img>
                <div className="home-nav nav-div" onClick={showModal}>Settings
                </div>
                <div className="about nav-div" onClick={aboutModal}>About</div>

                {/* <a href="#" className="feature-request">Feature-Request</a>
                <a href="#" className="share">Share</a> */}
            </nav>
            <div style={modalStyle} className="settings-container">
                <div className="settings-modal">

                    <div>
                        <label htmlFor="reverb" className="switch">
                            <input className="effect" name="reverb" id="reverb" type="checkbox" checked={setEffectsToggle[0]} onChange={() => toggleSettings(0)}></input>
                            <span className="slider round"></span>
                        </label>
                        <p className="reverb-tag">Reverb</p>
                    </div>

                    <div>
                        <label htmlFor="delay" className="switch">
                            <input className="effect" name="delay" id="delay" type="checkbox" checked={setEffectsToggle[1]} onChange={() => toggleSettings(1)}></input>
                            <span className="slider round"></span>
                        </label>
                        <p className="delay-tag">Delay</p>
                    </div>

                    <div>
                        <label htmlFor="stereo" className="switch">
                            <input className="effect" name="stereo" id="stereo" type="checkbox" checked={setEffectsToggle[2]} onChange={() => toggleSettings(2)}></input>
                            <span className="slider round"></span>
                        </label>
                        <p className="stereo-tag">Stereo Widener</p>
                    </div>

                    <div>
                        <label htmlFor="distortion" className="switch">
                            <input className="effect" name="distortion" id="distortion" type="checkbox" checked={setEffectsToggle[3]} onChange={() => toggleSettings(3)}></input>
                            <span className="slider round"></span>
                        </label>
                        <p className="distortion-tag">Distortion</p>
                    </div>

                    <div>
                        <label htmlFor="phaser" className="switch">
                            <input className="effect" name="phaser" id="phaser" type="checkbox" checked={setEffectsToggle[4]} onChange={() => toggleSettings(4)}></input>
                            <span className="slider round"></span>
                        </label>
                        <p className="phaser-tag">Phaser</p>
                    </div>

                    <div>
                        <label htmlFor="chorus" className="switch">
                            <input className="effect" id="chorus" name="chorus" type="checkbox" checked={setEffectsToggle[5]} onChange={() => toggleSettings(5)}></input>
                            <span className="slider round"></span>
                        </label>
                        <p className="chorus-tag">Chorus</p>
                    </div>

                    <div>
                        <label htmlFor="bitcrusher" className="switch">
                            <input className="effect" name="bitcrusher" id="bitcrusher" type="checkbox" checked={setEffectsToggle[6]} onChange={() => toggleSettings(6)}></input>
                            <span className="slider round"></span>
                        </label>
                        <p className="bitcrusher-tag">Bit Crusher</p>
                    </div>

                </div>
                {console.log(document.querySelectorAll('.switch'))}
            </div>

        </div>


    )
}