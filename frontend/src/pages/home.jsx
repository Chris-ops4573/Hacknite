import React, { useEffect, useState } from "react";
import { onValue, ref, getDatabase, set } from "firebase/database";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useNavigate } from "react-router-dom";
import { IncreaseLikes } from "../components/IncreaseLikes";
import { DecreaseLikes } from "../components/DecreaseLikes";

const Home = () => {

    const navigate = useNavigate()
    const [showComments, setShowComments] = useState("") 
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [selectedTag, setSelectedTag] = useState(null) 
    const db = getDatabase()
    const postRef = ref(db, 'post')
    
    useEffect(() => {
        const stopUpdating = onValue(postRef , (snapshot) => {
            const data = snapshot.val();
            if(data){
                const formattedPosts = Object.entries(data).map(([key, value]) => ({
                    key,
                    ...value,
                    tags: value.tags || ["General "]
                }))
                formattedPosts.sort((a, b) => b.createdAt - a.createdAt)
                setPosts(formattedPosts)
                setFilteredPosts(formattedPosts)
            }
        })
        return () => stopUpdating();
    }, [])

    useEffect(() => {
        if(selectedTag){
            setFilteredPosts(posts.filter((post) => {
                return post.tags.includes(selectedTag)
            }))
        } else{
            setFilteredPosts(posts)
        }
        filteredPosts.sort((a, b) => b.createdAt - a.createdAt)
    }, [selectedTag, posts])

    return(
        <div>
            <h1>Home page</h1>
            <p>Choose a tag to filter by:</p>
            <button onClick={() => setSelectedTag("General ")}>General</button>
            <button onClick={() => setSelectedTag("Rant ")}>Rant</button>
            <button onClick={() => setSelectedTag("WiFi ")}>WiFi</button>
            <button onClick={() => setSelectedTag("Services ")}>Services</button>
            <button onClick={() => setSelectedTag("Clubs ")}>Clubs</button>
            <button onClick={() => setSelectedTag("Social ")}>Social</button>
            <button onClick={() => setSelectedTag("Confession ")}>Confession</button>
            <button onClick={() => setSelectedTag("Food ")}>Food</button>
            <button onClick={() => setSelectedTag("Academics ")}>Academics</button>
            <button onClick={() => setSelectedTag("Networking ")}>Networking</button>
            <button onClick={() => setSelectedTag("Cleaning ")}>Cleaning</button>
            <button onClick={() => setSelectedTag("Hostel ")}>Hostel</button>
            <button onClick={() => setSelectedTag("Going-out ")}>Going out</button>
            <button onClick={() => setSelectedTag("Rules ")}>Rules</button>
            <button onClick={() => setSelectedTag("Regarding-this-forum ")}>Regarding this forum</button>
            {filteredPosts.map((post) => (
                <div key={post.key} className="post">
                    <p>{post.content}</p>
                    <p className="tags-list">Tags:</p>
                    {post.tags.map((tag) => (
                        <div className="tags-list-member">{tag}</div>
                    ))}
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