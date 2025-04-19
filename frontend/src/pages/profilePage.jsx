import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"
import { useEffect, useState } from "react"
import { getDatabase, onValue, ref } from "firebase/database"
import { fetchUserContent } from "../components/fetchUserData"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { deleteContent } from "../components/DeletePost"

const ProfilePage = () => {

    const navigate = useNavigate()
    const auth = getAuth()
    const user = auth.currentUser
    const [username, setUsername] = useState("")
    const [posts, setPosts] = useState([])
    const db = getDatabase()

    useEffect(() => {
        if(!user){
            navigate('/')
            return
        }
        const userRef = ref(db, "user/" + user.uid)

        const unrenderProfile = onValue(userRef, (snapshot) =>{
            const data = snapshot.val()
            setUsername(data.username)
        })
        return () => unrenderProfile()
    }, [username])
    
    useEffect(() => {
        const postsRef = ref(db, "user/" + user.uid + "/posts")
        const stopRenderingUserPosts = onValue(postsRef, async (snapshot) => {
            const data = snapshot.val()
            if(!data){
                setPosts([])
                return
            }
            const dataNew = data.map((i) => {
                return `post/${i}` 
            })
            const postArray = await fetchUserContent(dataNew)
            postArray.sort((a, b) => b.createdAt - a.createdAt)
            setPosts(postArray)
        })
        return() => stopRenderingUserPosts()
    }, [])

    return(
        <div className="profile-page">
            <h1>View your profile {username}</h1>
            <h2>Your posts: </h2>
            {posts.map((post) => (
                <div key={post.postId} className="user-post">
                    <h4>{post.content}</h4>
                    <h4>tags:</h4>
                    {post.tags.map((tag) => (
                        <div className="tags-list-member">{tag}</div>
                    ))}
                    <h4>Likes: {post.likes}</h4>
                    {post.createdAt ? <p>{formatDistanceToNow(new Date(post.createdAt))}</p> : <p>Time not available</p>}
                    <button onClick={() => deleteContent(post.postId)}>Delete post</button>
                </div> 
            ))}
        </div>
    )
}

export default ProfilePage