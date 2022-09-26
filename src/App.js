import React, { useState } from 'react'
import Header from "./components/header"
import Display from "./components/display"
//import Buttons from "./components/buttons"
//import Media from "./components/Media"
//import { Effects } from "./components/Effects"
import EffectsData from "./components/EffectsData"
import { FeedbackDelay, Reverb, StereoWidener, Distortion, BitCrusher, Phaser, Chorus } from 'tone'



function App() {

  // effect parameters
  const [effectParams, setEffectParams] = useState({
    verbDecay: 1,
    delayTime: 0.5,
    delayFeedback: 0.1,
    stereoWidth: 1,
    distort: 0.5,
    phaserFreq: 15,
    phaserOctaves: 5,
    phaserBaseFreq: 1000,
    chorusFreq: 4,
    chorusDelayTime: 2.5,
    chorusDepth: 0.5,
    crusherBits: 9
  })

  // instances of effects created
  const reverb = new Reverb(effectParams.verbDecay)
  const delay = new FeedbackDelay(effectParams.delayTime, effectParams.delayFeedback)
  const stereo = new StereoWidener(effectParams.stereoWidth)
  const distortion = new Distortion(effectParams.distort)
  const phaser = new Phaser({
    frequency: effectParams.phaserFreq,
    octaves: effectParams.phaserOctaves,
    baseFrequency: effectParams.phaserBaseFreq
  })
  const chorus = new Chorus(effectParams.chorusFreq, effectParams.chorusDelayTime, effectParams.chorusDepth)
  const crusher = new BitCrusher(effectParams.crusherBits)

  // array of created effects
  const effArr = [reverb, delay, stereo, distortion, phaser, chorus, crusher]

  // new array to convert object to booleans 
  //const effArr = new Array(EffectsData.length).fill(false)

  // state of effect toggles
  const [effectsToggle, setEffectsToggle] = React.useState(EffectsData)

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
