import PacLogo from "../images/pac.png"
import FileMenu from "./filemenu"

export default function Header() {
    return (
        <div>
            <div className="header-container">
                <h1 className="header-title">HOLLA' AT ME</h1>
            </div>
            <nav className="navigation-container">
                <img className="pac-logo" src={PacLogo} alt="pac"></img>
                <a className="home-nav" href="#"><FileMenu>Home</FileMenu>
                </a>
                <a href="#" className="about">About</a>
                {/* <a href="#" className="feature-request">Feature-Request</a>
                <a href="#" className="share">Share</a> */}
            </nav>
        </div>
    )
}