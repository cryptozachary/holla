import Header from "../header";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { PropTypes } from 'prop-types';
import SignUp from "./signup";


async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login(props) {
    const { setToken } = props

    const password = useRef(null)
    const username = useRef(null)

    const [theUsername, setTheUsername] = useState("");
    const [thePassword, setThePassword] = useState("");

    const [showSignUp, setShowSignUp] = useState(true)

    const [enterInfo, setEnterInfo] = useState("")

    const [loadedUsernames, setLoadedUsernames] = useState([])

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

        let storedUserPassword = localStorage.getItem(JSON.stringify(theUsername))

        console.log(storedUserPassword)
        let keyArray = []
        let match = true

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            keyArray.push(key)
            setLoadedUsernames(prev => {
                return [...keyArray]
            })
            console.log(loadedUsernames)
        }

        keyArray.some(key => {
            if (key !== JSON.stringify(theUsername) && JSON.stringify(thePassword) !== storedUserPassword) {
                setEnterInfo("Please enter correct username and/or password")
                console.log('no match')
                match = false
            }
        })

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
                    <h1>Please Log In</h1>
                    <form>
                        <label>
                            <p>Username</p>
                            <input type="text" ref={username} onChange={(e) => setTheUsername(e.target.value)} name="username" id="username" className="login-input" />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" ref={password} onChange={(e) => setThePassword(e.target.value)} name="password" id="password" className="login-input" />
                        </label>
                        <div>
                            <button type="submit" onClick={(e) => handleSubmit(e)} >Submit</button>
                            <button type="button" onClick={handleSignUp} >Sign-Up</button>
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
