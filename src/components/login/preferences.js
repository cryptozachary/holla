

export default function Preferences() {
    return (
        <div style={{ "opacity": 1 }} className="pref-container">
            <div className="single-pref-container">
                <label for="profile-name">Profile Name:</label>
                <input id="profile-name" type="text" className="nav-div" ></input>
            </div>
            <div className="single-pref-container">
                <label for="date-of-birth">Date of Birth:</label>
                <input id="date-of-birth" type="text" className="nav-div" ></input>
            </div>
        </div>

    )
}
