import React, { useEffect, useRef, useState } from 'react'
import Header from "./components/header"
import Display from "./components/display"
//import Buttons from "./components/buttons"
//import Media from "./components/Media"
//import { Effects } from "./components/Effects"
import EffectsData from "./components/EffectsData"
import { FeedbackDelay, Reverb, StereoWidener, Distortion, BitCrusher, Phaser, Chorus } from 'tone'



function App() {

  console.log("app render")
  // new array to convert object to booleans 
  //const effArr = new Array(EffectsData.length).fill(false)

  // state of effect toggles
  const [effectsToggle, setEffectsToggle] = React.useState(EffectsData)


  // effect parameters
  const [effectParams, setEffectParams] = useState({
    verbDecay: 1,
    delayTime: 0.1,
    delayFeedback: 0.1,
    stereoWidth: 0,
    distort: 0,
    phaserFreq: 15,
    phaserOctaves: 5,
    phaserBaseFreq: 1000,
    chorusFreq: 4,
    chorusDelayTime: 2.5,
    chorusDepth: 0.5,
    crusherBits: 9
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


  return (
    <div className="main-app-body">

      <Header
        effArr={effArr}
        effectParams={effectParams}
        setEffectParams={setEffectParams}
        effectsToggle={effectsToggle}
        setEffectsToggle={setEffectsToggle}
      />

      <div className="app">
        <Display
          effArr={effArr}
          effectParams={effectParams}
          setEffectParams={setEffectParams}
          effectsToggle={effectsToggle}
          setEffectsToggle={setEffectsToggle}
        />

      </div>
    </div>
  )
}

export default App;
