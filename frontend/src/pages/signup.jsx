import { useState } from "react"
import React from "react"
import { SignupUser } from "../components/SignupUser"
import { useNavigate } from "react-router-dom"

const SignupPage = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSignup = async () => {
        try{
            await SignupUser(email, password, username)
            navigate('/home')
        } catch(error) {
            setError(error.message)
        }
    }

    return(
        <div className="wrapper">
            <div className="login-page">
                <p className="anonymity-warning">Note: Refrain from using your real name in username to maintain anonymity</p>
                <div className="username-field">
                    <label className="username-label">Username: &nbsp;</label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" required placeholder="Choose any username" className="username-input" />
                </div>
                <div className="email-field">
                    <label className="email-label">Email: &nbsp;</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email" className="email-input"/>
                </div>
                <div className="password-field">
                    <label className="password-label">Password: &nbsp;</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your password" className="password-input"/>
                </div>
                <div className="login-button-row">
                    <button onClick={() => handleSignup()} className="action-button">Sign Up</button>
                    <button onClick={() => navigate('/')} className="different-action-button">Sign In instead</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}

export default SignupPage