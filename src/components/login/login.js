import Header from "../header";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="header-container">
                <h1 className="header-title"><Link to='/'>HOLLA' AT ME</Link></h1>
            </div>
            <div className="login-wrapper">
                <h1>Please Log In</h1>
                <form>
                    <label>
                        <p>Username</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
