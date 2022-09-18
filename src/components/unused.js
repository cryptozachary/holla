function FileMenu(props) {
    return (
        <div className="menu">
            <div className="label">Menu</div>
            <div className="spacer"></div>
            <label name="sound-file">
                <div className="item"><span>Load Sound</span></div>
                <input type="file" id="sound-file" hidden accept="audio/mp3" onChange={(e) => loadSound(e)}></input>
            </label>
            <div className="item"><span>Set Sample Relase</span></div>
        </div>
    )
}