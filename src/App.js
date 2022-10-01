import React, { useEffect, useRef, useState } from 'react'
import Header from "./components/header"
import Display from "./components/display"
//import Buttons from "./components/buttons"
//import Media from "./components/Media"
//import { Effects } from "./components/Effects"
import EffectsData from "./components/EffectsData"
import { FeedbackDelay, Reverb, StereoWidener, Distortion, BitCrusher, Phaser, Chorus } from 'tone'



function App() {

  // new array to convert object to booleans 
  //const effArr = new Array(EffectsData.length).fill(false)

  // state of effect toggles
  const [effectsToggle, setEffectsToggle] = React.useState(EffectsData)

  // effect parameters
  const effectParams = useRef({
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

  // instances of effects created/assigned
  function createEffects() {

    const reverb = new Reverb(effectParams.current.verbDecay)
    const delay = new FeedbackDelay(effectParams.current.delayTime, effectParams.current.delayFeedback)
    const stereo = new StereoWidener(effectParams.current.stereoWidth)
    const distortion = new Distortion(effectParams.current.distort)
    const phaser = new Phaser({
      frequency: effectParams.current.phaserFreq,
      octaves: effectParams.current.phaserOctaves,
      baseFrequency: effectParams.current.phaserBaseFreq
    })
    const chorus = new Chorus(effectParams.current.chorusFreq, effectParams.current.chorusDelayTime, effectParams.current.chorusDepth)
    const crusher = new BitCrusher(effectParams.current.crusherBits)

    // array of created effects
    const effArr = [reverb, delay, stereo, distortion, phaser, chorus, crusher]

    return effArr

  }


  return (
    <div className="main-app-body">

      <Header
        effArr={createEffects()}
        effectParams={effectParams}
        // setEffectParams={setEffectParams}
        effectsToggle={effectsToggle}
        setEffectsToggle={setEffectsToggle}
      />

      <div className="app">
        <Display
          effArr={createEffects()}
          effectParams={effectParams}
          // setEffectParams={setEffectParams}
          effectsToggle={effectsToggle}
          setEffectsToggle={setEffectsToggle}
        />

      </div>
    </div>
  )
}

export default App;
