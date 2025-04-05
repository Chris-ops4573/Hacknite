import { app } from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app)

export const SignupUser = async (email, password) => {

    if(!email.endsWith("@iiitb.ac.in")){
        throw new Error("Only Students of iiitb can access this forum, if you are a student please use your college given email.")
    }    

    try {
        return await createUserWithEmailAndPassword(auth, email, password)
    } catch(error) {
        console.error("Sign Up error", error.message)
        throw(error)
    }
}

