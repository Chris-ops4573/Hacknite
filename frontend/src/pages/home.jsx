import React, { useEffect, useState } from "react";
import { onValue, ref, getDatabase } from "firebase/database";

const Home = () => {
     
    const [posts, setPosts] = useState([])
    const db = getDatabase()
    const postRef = ref(db, 'posts')
    
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
        </div>
    )
}

export default Home