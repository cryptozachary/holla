import PacLogo from "../images/pac.png"
import React, { useState, useEffect } from "react"
import Effects from "./Effects"
import EffectsData from "./EffectsData"

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

    // useEffect(() => {

    //     switch (true) {
    //         case effectsToggle[0]: console.log("Connect Reverb")
    //             return;
    //     }
    //     switch (true) {
    //         case effectsToggle[1]: console.log("Connect Delay")
    //             return;
    //     }
    //     switch (true) {
    //         case effectsToggle[2]: console.log("Connect Stereo")
    //             return;
    //     }
    //     switch (true) {
    //         case effectsToggle[3]: console.log("Connect Distortion")
    //             return;
    //     }
    //     switch (true) {
    //         case effectsToggle[4]: console.log("Connect Phaser")
    //             return;
    //     }
    //     switch (true) {
    //         case effectsToggle[5]: console.log("Connect Chorus")
    //             return;
    //     }
    //     switch (true) {
    //         case effectsToggle[6]: console.log("Connect Crusher")
    //             return;
    //     }

    //     switch (false) {
    //         case effectsToggle[0]: console.log("Disconnect Reverb")
    //             return;
    //     }
    //     switch (false) {
    //         case effectsToggle[1]: console.log("Disconnect Delay")
    //             return;
    //     }
    //     switch (false) {
    //         case effectsToggle[2]: console.log("Disconnect Stereo")
    //             return;
    //     }
    //     switch (false) {
    //         case effectsToggle[3]: console.log("Disconnect Distortion")
    //             return;
    //     }
    //     switch (false) {
    //         case effectsToggle[4]: console.log("Disconnect Phaser")
    //             return;
    //     }
    //     switch (false) {
    //         case effectsToggle[5]: console.log("Disconnect Chorus")
    //             return;
    //     }
    //     switch (false) {
    //         case effectsToggle[6]: console.log("Disconnect Crusher")
    //             return;
    //     }




    // }, [effectsToggle])

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