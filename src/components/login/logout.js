import React from 'react'

function LogOut() {

    function removeToken() {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <div className='nav-div' onClick={() => removeToken()}>LogOut</div>
    )
}

export default LogOut