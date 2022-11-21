import PacLogo from "../images/pac.png"
import React, { useState, useEffect } from "react"
import Effects from "./effects"
import Display from "./display"

export default function Header(props) {

    const { effectsToggle, setEffectsToggle, effArr, effectParams, setEffectParams, setEffArr, menuShowing, setMenuShowing } = props

    const [modalShow, setModalShow] = useState(false)
    const [modalShowTwo, setModalShowTwo] = useState(false)

    // toggles settings based on display
    const modalStyle = {
        opacity: !modalShow ? "0" : "1"
    }

    const modalStyleTwo = {
        display: !modalShowTwo ? "none" : "block"
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

        setModalShowTwo(!modalShowTwo)
        //for opacity transition effect 
        setTimeout(() => {
            setModalShow(!modalShow)
        }, 100)

        checkModal()

    }

    function aboutModal() {
        console.log("about menu clicked")
    }

    const checkModal = () => {

        if (modalStyleTwo.display === 'block') {
            setMenuShowing(!menuShowing)
        } else {
            setMenuShowing(!menuShowing)
        }
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
                {/* <div className="about nav-div" onClick={aboutModal}>About</div> */}

                {/* <a href="#" className="feature-request">Feature-Request</a>
                <a href="#" className="share">Share</a> */}
            </nav>
            <div className="modal-container">
                <div style={{ ...modalStyle, ...modalStyleTwo }} className="settings-container">
                    <div className="settings-modal">
                        <Effects
                            effArr={effArr}
                            setEffArr={setEffArr}
                            effectParams={effectParams}
                            setEffectParams={setEffectParams}
                            effectsToggle={effectsToggle}
                            onChange={toggleSettings}
                        />
                    </div>

                </div>
            </div>

        </div>


    )
}