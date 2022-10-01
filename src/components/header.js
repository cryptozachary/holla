import PacLogo from "../images/pac.png"
import React, { useState } from "react"
import Effects from "./effects"

export default function Header(props) {

    const { effectsToggle, setEffectsToggle, effArr, effectParams, setEffectParams } = props

    const [modalShow, setModalShow] = useState(false)

    // toggles settings based on display
    const modalStyle = {
        display: !modalShow ? "none" : "block"
    }

    // updates the settings toggle to on or off
    function toggleSettings(effectPosition) {
        let updatedCheckedState = effectsToggle.map((effect, index) => {
            if (effect.key == effectPosition) {
                return { ...effect, state: !effect.state }
            }
            return { ...effect }
        });

        setEffectsToggle(prev => {
            return updatedCheckedState
        })

    }

    //displays settings menu
    function showModal() {
        setModalShow(!modalShow)
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
                    <Effects
                        effArr={effArr}
                        effectParams={effectParams}
                        setEffectParams={setEffectParams}
                        effectsToggle={effectsToggle}
                        onChange={toggleSettings}
                    />
                </div>

            </div>

        </div>


    )
}