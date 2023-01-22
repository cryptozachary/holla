import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { json } from 'react-router-dom';
import { useNavigate, useNavigation, redirect, Link } from 'react-router-dom';

function SignUp(props) {

    const { showSignUp, setShowSignUp } = props

    const password = useRef()
    const username = useRef()

    const [theUsername, setTheUsername] = useState(username.current);
    const [thePassword, setThePassword] = useState(password.current);

    const [enterInfo, setEnterInfo] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        if (!password.current.value && !username.current.value) {
            return setEnterInfo("Please enter username and password")
        }

        if (localStorage.getItem(username.current.value)) { return setEnterInfo(" Username already exist") }

        if (!password.current.value) {
            return setEnterInfo("Please enter password")
        }

        if (!username.current.value) {
            return setEnterInfo("Please enter username")
        }

        let storedUserPassword = localStorage.getItem(JSON.stringify(theUsername))
        localStorage.setItem(theUsername, thePassword)

        console.log(theUsername, thePassword)

        setEnterInfo("Thank you for signing up!")
        setTimeout(() => {
            window.location.reload()
        }, 3000)
    }
    return (
        <>
            <div className="the-wrapper">
                <h1 className="form-init">Please Sign Up</h1>
                <form>
                    <label>
                        <p className="form-init"> Choose Username</p>
                        <input type="text" ref={username} onChange={(e) => setTheUsername(e.target.value)} name="username" id="username" className="login-input" />
                    </label>
                    <label>
                        <p className="form-init">Choose Password</p>
                        <input type="password" ref={password} onChange={(e) => setThePassword(e.target.value)} name="password" id="password" className="login-input" />
                    </label>
                    <div className="form-init">
                        <button className="form-init-button" type="submit" onClick={(e) => handleSubmit(e)} >Submit</button>
                    </div>
                </form>
                <div id='enter-info'>{enterInfo}</div>

            </div>
        </>
    )
}

export default SignUp