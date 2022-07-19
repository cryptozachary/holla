import Left from "../images/left.svg"
import Right from "../images/right.svg"

export default function Octaves(props) {
    return (
        <div className="octave-container">
            <span><img src={Left} onClick={props.left} className="left-arrow" alt="left"></img></span><span className="octave-label">{props.octaveLevel}</span><span><img src={Right} onClick={props.right} className="right-arrow" alt="right"></img></span>
            <label className="octave-label">Octave</label>
        </div>
    )
}