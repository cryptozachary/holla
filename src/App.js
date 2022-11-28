import React, { useEffect, useRef, useState } from 'react'
import Header from "./components/header"
import Display from "./components/display"
import Preferences from './components/login/preferences'
import DashBoard from './components/login/dashboard'
import Login from './components/login/login'
import EffectsData from "./components/EffectsData"
import { FeedbackDelay, Reverb, StereoWidener, Distortion, BitCrusher, Phaser, Chorus } from 'tone'
import { BrowserRouter, Routes, Route, Link, Outlet, } from 'react-router-dom';
import useToken from './useToken'
import SignUp from './components/login/signup'



function App() {

  console.log("app render")
  // new array to convert object to booleans 
  //const effArr = new Array(EffectsData.length).fill(false)

  // state of effect toggles
  const [effectsToggle, setEffectsToggle] = React.useState(EffectsData)

  // check if menu is showing
  const [menuShowing, setMenuShowing] = useState(false)

  //check if preferneces is showing
  const [prefShowing, setPrefShowing] = useState(false)

  // effect parameters
  const [effectParams, setEffectParams] = useState({
    verbDecay: 1,
    delayTime: 0.1,
    delayFeedback: 0.2,
    stereoWidth: 0,
    distort: 0,
    phaserFreq: 15,
    phaserOctaves: 5,
    phaserBaseFreq: 1000,
    chorusFreq: 4,
    chorusDelayTime: 2.5,
    chorusDepth: 0.5,
    crusherBits: 1
  })

  // instances of effects created
  let reverb = new Reverb(effectParams.verbDecay)
  let delay = new FeedbackDelay(effectParams.delayTime, effectParams.delayFeedback)
  let stereo = new StereoWidener(effectParams.stereoWidth)
  let distortion = new Distortion(effectParams.distort)
  let phaser = new Phaser({
    frequency: effectParams.phaserFreq,
    octaves: effectParams.phaserOctaves,
    baseFrequency: effectParams.phaserBaseFreq
  })
  let chorus = new Chorus(effectParams.chorusFreq, effectParams.chorusDelayTime, effectParams.chorusDepth)
  let crusher = new BitCrusher(effectParams.crusherBits)

  // array of created effects
  let effArr = [reverb, delay, stereo, distortion, phaser, chorus, crusher]

  useEffect(() => {
    // clean up effects
    return function () {
      reverb = null
      delay = null
      stereo = null
      distortion = null
      phaser = null
      chorus = null
      crusher = null
      effArr = null
    }
  })

  const { token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="main-app-body">
      <Routes>
        <Route path="/" element={
          <>
            <Header
              effArr={effArr}
              effectParams={effectParams}
              setEffectParams={setEffectParams}
              effectsToggle={effectsToggle}
              setEffectsToggle={setEffectsToggle}
              menuShowing={menuShowing}
              setMenuShowing={setMenuShowing}
              prefShowing={prefShowing}
              setPrefShowing={setPrefShowing}
              token={token}
            />

            <div className="app">
              <Display
                effArr={effArr}
                effectParams={effectParams}
                setEffectParams={setEffectParams}
                effectsToggle={effectsToggle}
                setEffectsToggle={setEffectsToggle}
                menuShowing={menuShowing}
              />
            </div>


          </>

        } />
        <Route path="/signup" element={<SignUp />} />
      </Routes>


    </div>
  )
}

export default App;
