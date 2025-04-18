import { app } from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getOrMakeUser } from "./models/UsersModel";

const auth = getAuth(app)

export const SignupUser = async (email, password, username) => {

    if(!email.endsWith("@iiitb.ac.in")){
        throw new Error("Only Students of iiitb can access this forum, if you are a student please use your college given email.")
    }    

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await getOrMakeUser(userCredential.user, username)
        return userCredential
    } catch(error) {
        console.error("Sign Up error", error.message)
        throw(error)
    }
}

