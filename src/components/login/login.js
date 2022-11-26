import Header from "../header";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Login() {

    const password = useRef(null)
    const username = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()
        let thePassword = password.current.value
        let theUsername = username.current.value
        console.log(theUsername, thePassword)

    }

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
                        <input type="text" ref={username} name="username" id="username" className="login-input" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" ref={password} name="password" id="password" className="login-input" />
                    </label>
                    <div>
                        <button type="submit" onClick={(e) => handleSubmit(e)} >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
