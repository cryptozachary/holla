import React from 'react'
import Header from "./components/header"
import Display from "./components/display"
//import Buttons from "./components/buttons"
//import Media from "./components/Media"
//import { Effects } from "./components/Effects"
import EffectsData from "./components/EffectsData"



function App() {

  // new array to convert object to booleans 
  const effArr = new Array(EffectsData.length).fill(false)

  // state of effect toggles
  const [effectsToggle, setEffectsToggle] = React.useState(effArr)

  //reverb decay state
  const [verbDecay, setVerbDecay] = React.useState(9000)



  return (
    <div className="main-app-body">
      <Header effectsToggle={effectsToggle} setEffectsToggle={setEffectsToggle} />
      <div className="app">
        <Display
          effectsToggle={effectsToggle}
          setEffectsToggle={setEffectsToggle}
          verbDecay={verbDecay}
        />
      </div>
    </div>
  )
}

export default App;
