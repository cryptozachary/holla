import PacLogo from "../images/pac.png"
import React, { useState } from "react"

export default function Header() {

    const [modalShow, setModalShow] = useState(false)

    const modalStyle = {
        display: !modalShow ? "none" : "block"
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
                        <label class="switch">
                            <input type="checkbox"></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="reverb-tag">Reverb</p>
                    </div>

                    <div>
                        <label class="switch">
                            <input type="checkbox"></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="delay-tag">Delay</p>
                    </div>

                    <div>
                        <label class="switch">
                            <input type="checkbox"></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="stero-tag">Stero Widener</p>
                    </div>

                    <div>
                        <label class="switch">
                            <input type="checkbox"></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="distortion-tag">Distortion</p>
                    </div>

                </div>

            </div>

        </div>
    )
}