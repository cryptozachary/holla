import { useState, useEffect } from "react"

export default function MicButton(props) {

    const { micState, toggleMic, MicLogo, StopLogo, recordLoop, playLoop, stopLoopRecording, loopOn, loopPlaying, stopLoop, wavesurfer } = props


    const [hideMic, setHideMic] = useState()

    useEffect(() => {

        //disable mic button when recording loop/ playing loop
        setHideMic(prev => {
            if (loopOn || loopPlaying) {
                return null
            } else {
                return toggleMic
            }
        })
        console.log(hideMic)
    }, [loopOn, loopPlaying])

    return (
        <>
            <div className="mic-container">
                {loopOn === true ? <button className="mic-buttons" type="button" onClick={stopLoopRecording}>STOP</button> : <button className="mic-buttons" type="button" onClick={recordLoop}>RECORD</button>}

                {micState === false ? <img className="mic-logo" onClick={hideMic} src={MicLogo} alt="mic"></img> : <img className="stop-logo" onClick={toggleMic} src={StopLogo} alt="stop"></img>}

                {loopPlaying ? <button className="mic-buttons" type="button" onClick={stopLoop}>STOP</button> : <button className="mic-buttons" type="button" onClick={playLoop}>PLAY</button>}
            </div>
        </>
    )
}