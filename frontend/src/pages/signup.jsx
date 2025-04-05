import React, { useState } from "react";
import { SignInUser } from "../components/LogInUser";
import { SignupUser } from "../components/SignupUser";

const SignupPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return(
        <div clasName="signup-page">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email"/>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your password"/>
            <button onClick={() => SignupUser(email, password)}>Sign Up</button>
            <button onClick={() => SignInUser(email, password)}>Sign In instead!</button>
        </div>
    )
}

export default SignupPage

