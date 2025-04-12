import {useAuthState} from "react-firebase-hooks/auth"
import { Navigate } from "react-router-dom"
import { auth } from "../firebase/firebase"

const ProtectedRoutes = ({children}) => {
    
    const [user] = useAuthState(auth)

    if(!user){
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoutes