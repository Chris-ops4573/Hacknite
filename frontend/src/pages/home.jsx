import React, { useEffect, useState } from "react";
import { onValue, ref, getDatabase } from "firebase/database";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useNavigate } from "react-router-dom";
import { IncreaseLikes } from "../components/IncreaseLikes";
import { DecreaseLikes } from "../components/DecreaseLikes";

const Home = () => {

    const navigate = useNavigate()
    const [showComments, setShowComments] = useState("") 
    const [posts, setPosts] = useState([])
    const db = getDatabase()
    const postRef = ref(db, 'post')
    
    useEffect(() => {
        const stopUpdating = onValue(postRef , (snapshot) => {
            const data = snapshot.val();
            if(data){
                const formattedPosts = Object.entries(data).map(([key, value]) => ({
                    key,
                    ...value
                }))
                formattedPosts.sort((a, b) => b.createdAt - a.createdAt)
                setPosts(formattedPosts)
            }
        })
        return () => stopUpdating();
    }, [])

    return(
        <div>
            <h1>Home page</h1>
            {posts.map((post) => (
                <div key={post.key} className="post">
                    <p>{post.content}</p>
                    <p>Likes: {post.likes}</p>
                    <button onClick={() => IncreaseLikes(`post/${post.key}/likes`, post.likes)}>Like</button>
                    <button onClick={() => DecreaseLikes(`post/${post.key}/likes`, post.likes)}>Dislike</button>
                    {post.createdAt ? <p>{formatDistanceToNow(new Date(post.createdAt))}</p> : <p>Time not available</p>}
                    <button onClick={() => setShowComments(post.key)}>See comments</button>
                    {showComments === post.key ? navigate(`/home/${post.key}`) : null}
                </div>
            ))}
        </div>
    )
}

export default Home