import { app } from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app)

export const SignupUser = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password)
    } catch(error) {
        console.error("Sign Up error", error.message)
        throw(error)
    }
}

