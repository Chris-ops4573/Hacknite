import React, { useState } from "react";
import { SignInUser } from "../components/LogInUser";
import { SignupUser } from "../components/SignupUser";
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
        <div clasName="login-page">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email" className="email-input"/>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your password" className="password-input"/>
            <button onClick={() => handleSignIn()} className="signin-button">Sign In</button>
            <button onClick={() => navigate('/signup')} className="signup-button">Sign Up instead</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default SigninPage

