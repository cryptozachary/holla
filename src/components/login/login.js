import Header from "../header";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PropTypes } from 'prop-types';
import SignUp from "./signup";
import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";


async function loginUser(credentials) {
    return fetch('http://localhost:8080/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login(props) {
    console.log(props)

    const { setToken } = props

    const password = useRef(null)
    const username = useRef(null)

    const [theUsername, setTheUsername] = useState("");
    const [thePassword, setThePassword] = useState("");

    const [showSignUp, setShowSignUp] = useState(true)

    const [enterInfo, setEnterInfo] = useState("")

    const [loadedUsernames, setLoadedUsernames] = useState(getKeys())


    function getKeys() {

        let keyArray = []

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            keyArray.push(key)
            console.log(key)
        }
        console.log('running getKeys')
        console.log(keyArray)

        return keyArray
    }

    useEffect(() => {
        getKeys()
        console.log(loadedUsernames)
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        if (!password.current.value && !username.current.value) {
            return setEnterInfo("Please enter username and password")
        }

        if (!password.current.value) {
            return setEnterInfo("Please enter password")
        }

        if (!username.current.value) {
            return setEnterInfo("Please enter username")
        }

        let usernameFound = false;
        let match = true

        loadedUsernames.some(username => {
            if (username == theUsername) {
                usernameFound = true;
            }
        });

        if (!usernameFound) {
            setEnterInfo("Please enter correct username");
            match = false;
        }
        console.log(`match: ${match}`, `usernamefound ${usernameFound}`)

        if (usernameFound) {
            let storedUserPassword = localStorage.getItem(theUsername);
            console.log(storedUserPassword)
            if (storedUserPassword !== thePassword) {
                setEnterInfo("Please enter correct username and/or password");
                match = false;
            }
        }

        if (!match) return

        console.log('USERNAME AND PASSWORD CORRECT')
        console.log(theUsername, thePassword)

        handleLoginSubmit()
    }

    async function handleLoginSubmit() {
        const token = await loginUser({
            theUsername,
            thePassword
        });
        setToken(token);
        console.log(token)
    }

    function handleSignUp() {

        setShowSignUp(prev => {
            return !prev
        })
        console.log(showSignUp)

    }
    return (
        <>
            <div className="header-container">
                <h1 className="header-title" onClick={() => setShowSignUp(true)}><Link to='/'>HOLLA' AT ME</Link></h1>
            </div>

            {showSignUp ?
                <div className="the-wrapper">
                    <h1 className="form-header">Log In</h1>
                    <form className="form">
                        <label>
                            <p>Username</p>
                            <input type="text" ref={username} onChange={(e) => setTheUsername(e.target.value)} name="username" id="username" className="login-input" />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" ref={password} onChange={(e) => setThePassword(e.target.value)} name="password" id="password" className="login-input" />
                        </label>
                        <div>
                            <button className="form-init-button" type="submit" onClick={(e) => handleSubmit(e)} >Submit</button>
                            <button className="form-init-button" type="button" onClick={handleSignUp} >Sign-Up</button>
                        </div>
                    </form>
                    <div id='enter-info'>{enterInfo}</div>

                </div> : <SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} />}
        </>
    )
    Login.propTypes = {
        setToken: PropTypes.func.isRequired
    }
}
