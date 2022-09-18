export default function MicButton(props) {

    const { micState, toggleMic, MicLogo, toggleStop, StopLogo } = props

    return (
        <>
            {micState === false ? <img className="mic-logo" onClick={toggleMic} src={MicLogo} alt="mic"></img> : <img className="stop-logo" onClick={toggleStop} src={StopLogo} alt="stop"></img>}
        </>
    )
}