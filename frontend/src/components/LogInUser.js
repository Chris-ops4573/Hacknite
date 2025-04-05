import { app } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

const auth = getAuth(app)

export const SignInUser = async (email, password) => {
    try{
        return await signInWithEmailAndPassword(auth, email, password)
    } catch(error) {
        console.error("Log in error", error.message)
        throw(error)
    }
}