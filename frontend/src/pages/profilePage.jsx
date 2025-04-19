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
    const [showComments, setShowComments] = useState("")

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
            <h1 className="profile-heading">View your profile {username}</h1>
            <div className="all-posts">
                {posts.map((post) => (
                    <div key={post.postId} className="post">
                        <h3>{post.content}</h3>
                        <div>
                            <h4 className="tags-list">tags:</h4>
                            <div>{post.tags.join(", ")}</div>
                        </div>
                        <h4>Likes: {post.likes} Dislikes: {post.dislikes}</h4>
                        {post.createdAt ? <p>{formatDistanceToNow(new Date(post.createdAt))} ago</p> : <p>Time not available</p>}
                        <button className="delete-button" onClick={() => deleteContent(post.postId)}>Delete post</button>
                        <button className="show-comments-button" onClick={() => setShowComments(post.key)}>See comments</button>
                        {showComments === post.key ? navigate(`/home/${post.postId}`) : null}
                    </div> 
                ))}
            </div>
        </div>
    )
}

export default ProfilePage