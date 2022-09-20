import PacLogo from "../images/pac.png"
import React, { useState } from "react"
import Effects from "./Effects"

export default function Header(props) {

    const { effectsToggle, setEffectsToggle } = props

    const [modalShow, setModalShow] = useState(false)

    const modalStyle = {
        display: !modalShow ? "none" : "block"
    }

    function toggleSettings(effectPosition) {
        let updatedCheckedState = effectsToggle.map((effect, index) => {
            return index === effectPosition ? !effect : effect
        });


        setEffectsToggle(updatedCheckedState)

    }

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
                    <Effects effectsToggle={effectsToggle} onChange={toggleSettings} />
                </div>

            </div>

        </div>


    )
}