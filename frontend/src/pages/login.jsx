import React, { useState } from "react";
import { SignInUser } from "../components/LogInUser";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSignIn = async () => {
        try{
            await SignInUser(email, password)
            navigate('/home')
        } catch(error) {
            setError(error.message)
        }
    }


    return(
        <div className="wrapper">
            <div className="login-page">
                <div className="email-field">
                    <label className="email-label">Email: &nbsp;</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email" className="email-input"/>
                </div>
                <div className="password-field">
                    <label className="password-label">Password: &nbsp;</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your password" className="password-input"/>
                </div>
                <div className="login-button-row">
                    <button onClick={() => handleSignIn()} className="action-button">Sign In</button>
                    <button onClick={() => navigate('/signup')} className="different-action-button">Sign Up instead</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}

export default SigninPage

