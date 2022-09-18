export default function LoadButton(props) {

    const { loadSound, mediaBlobUrl } = props

    return (
        <div className="load-container">
            <label name="sound-file">
                {/* <img className="open-logo" src={OpenLogo} alt="open"></img> */}
                <span className="load-sound">LOAD SOUND</span>
                <input type="file" id="sound-file" hidden accept="audio/mp3" onChange={(e) => loadSound(e)}></input>
            </label>
            {mediaBlobUrl ? <a download="Sample" href={mediaBlobUrl} className="load-sound">D/L SAMPLE</a> : ""}
        </div>
    )
}