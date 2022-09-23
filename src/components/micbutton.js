export default function MicButton(props) {

    const { micState, toggleMic, MicLogo, StopLogo } = props

    return (
        <>
            {micState === false ? <img className="mic-logo" onClick={toggleMic} src={MicLogo} alt="mic"></img> : <img className="stop-logo" onClick={toggleMic} src={StopLogo} alt="stop"></img>}
        </>
    )
}