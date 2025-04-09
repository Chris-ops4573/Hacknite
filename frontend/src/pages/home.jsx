import React, { useEffect, useState } from "react";
import { onValue, ref, getDatabase } from "firebase/database";
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const Home = () => {
     
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
                formattedPosts.sort((a, b) => b.timestamp - a.timestamp)
                setPosts(formattedPosts)
            }
        })
        return () => stopUpdating();
    }, [])

    return(
        <div>
            <h1>Home page</h1>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <p>{post.content}</p>
                    {post.createdAt ? <p>{formatDistanceToNow(new Date(post.createdAt))}</p> : <p>Time not available</p>}
                </div>
            ))}
        </div>
    )
}

export default Home