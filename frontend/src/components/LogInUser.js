import { app } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

const auth = getAuth(app)

export const SignInUser = async (email, password) => {

    if(!email.endsWith("@iiitb.ac.in")){
        throw new Error("Only Students of iiitb can access this forum, if you are a student please use your college given email.")
    }

    try{
        return await signInWithEmailAndPassword(auth, email, password)
    } catch(error) {
        console.error("Log in error", error.message)
        throw(error)
    }
}