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
        <div className="signup-page">
            <p>Note: Refrain from using your real name in username to maintain anonymity</p>
            <label>Username</label>
            <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" required placeholder="Choose any username" className="username-input" />
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email" className="email-input"/>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your password" className="password-input"/>
            <button onClick={() => handleSignup()} className="signup-button">Sign Up</button>
            <button onClick={() => navigate('/')} className="signin-button">Sign In instead</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default SignupPage