import React from 'react'
import needLogin from "../Assets/needLogin3.png"
import "./NeedLogin.css";
function NeedLogin() {
    return (
        <div className="not-loggedin">
            <img className='need-login-img' src={needLogin} alt="" />
            <button>Login</button>
        </div>
    )
}

export default NeedLogin
