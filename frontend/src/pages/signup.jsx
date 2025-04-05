import React, { useState } from "react";
import { SignInUser } from "../components/LogInUser";
import { SignupUser } from "../components/SignupUser";

const SignupPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSignIn = async () => {
        try{
            await SignInUser(email, password)
        } catch(error) {
            setError(error.message)
        }
    }

    const handleSignup = async () => {
        try{
            await SignupUser(email, password)
        } catch(error) {
            setError(error.message)
        }
    }

    return(
        <div clasName="signup-page">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email" className="email-input"/>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your password" className="password-input"/>
            <button onClick={() => handleSignup()} className="signup-button">Sign Up</button>
            <button onClick={() => handleSignIn()} className="signin-button">Sign In instead!</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default SignupPage

