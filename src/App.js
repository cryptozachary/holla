import React from 'react'
import Header from "./components/header"
import Display from "./components/display"
import Buttons from "./components/buttons"
import Media from "./components/Media"
import Effects from "./components/effects"
import EffectsData from "./components/effectsData"



function App() {

  // new array to convert object to booleans 
  const effArr = new Array(EffectsData.length).fill(false)
  // state of effects 
  const [effectsToggle, setEffectsToggle] = React.useState(effArr)

  console.log(EffectsData, effectsToggle)


  return (
    <div className="main-app-body">
      <Header effectsToggle={effectsToggle} setEffectsToggle={setEffectsToggle} />
      <div className="app">
        <Display effectsToggle={effectsToggle} setEffectsToggle={setEffectsToggle} />
      </div>
    </div>
  )
}

export default App;
