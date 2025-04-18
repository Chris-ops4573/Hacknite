import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"
import { useEffect } from "react"
import { getDatabase, onValue } from "firebase/database"

const profilePage = () => {

    const navigate = useNavigate()
    const auth = getAuth()
    const user = auth.currentUser
    const [username, setUsername] = useState("")
    const [posts, setPosts] = useState("")

    useEffect(() => {
        if(!user){
            navigate('/')
            return
        }
        const db = getDatabase()
        userRef = ref(db, "user/" + user.uid)

        const unrenderProfile = onValue(userRef, (snapshot) =>{
            const data = snapshot.val()
            setUsername(data.username)
        })
    })

    return(
        <div className="profile-page">
            <h1></h1>
        </div>
    )
}