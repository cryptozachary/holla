import PacLogo from "../images/pac.png"
import React, { useState } from "react"
import Effects from "./effects"
import Preferences from "./login/preferences"
import DashBoard from "./login/dashboard"
import LogOut from "./login/logout"
import { Link, useNavigate } from "react-router-dom"


export default function Header(props) {

    const { effectsToggle, setEffectsToggle, effArr, effectParams, setEffectParams, setEffArr, menuShowing, setMenuShowing, setPrefShowing, prefShowing, token } = props

    const [modalShow, setModalShow] = useState(false)
    const [modalShowTwo, setModalShowTwo] = useState(false)

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

        if (modalStyleTwo.display === 'none' && modalStyle.opacity === "0") {
            setModalShowTwo(!modalShowTwo)
            //for opacity transition effect 
            setTimeout(() => {
                setModalShow(!modalShow)
            }, 100)
            checkModal()
        } else if (modalStyleTwo.display === 'block' && modalStyle.opacity === "1") {
            setModalShow(!modalShow)
            //for display delay effect 
            setTimeout(() => {
                setModalShowTwo(!modalShowTwo)
            }, 1000)
            checkModal()
        }

    }

    function handlePref() {
        setPrefShowing(prev => {
            return !prev
        })
    }

    function checkModal() {
        if (modalStyleTwo.display === 'block') {
            setMenuShowing(!menuShowing)
        } else if (modalStyleTwo.display === 'none') {
            setMenuShowing(!menuShowing)
        }
    }


    return (
        <div>
            <div className="header-container">
                <h1 className="header-title"><Link to='/'>HOLLA' AT ME</Link></h1>
            </div>
            <nav className="navigation-container">
                <img className="pac-logo" src={PacLogo} alt="pac"></img>
                <div className="home-nav nav-div" onClick={debounce(showModal, 150)}>Effect Menu
                </div>
                <LogOut />
                {token ? <DashBoard /> : null}
                <div className="login nav-div" onClick={handlePref}>Preferences</div>
                {prefShowing ? <Preferences /> : null}
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