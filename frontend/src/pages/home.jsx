import React, { useEffect, useState } from "react";
import { onValue, ref, getDatabase, set } from "firebase/database";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useNavigate } from "react-router-dom";
import { IncreaseLikes } from "../components/IncreaseLikes";
import { DecreaseLikes } from "../components/DecreaseLikes";

const Home = () => {

    const [additionalFilters, setAdditionalFilters] = useState("")
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
        let updatedPosts = [...posts];
    
        if (selectedTag) {
            updatedPosts = updatedPosts.filter((post) =>
                post.tags.includes(selectedTag)
            );
        }

        if (additionalFilters === "most-liked") {
            updatedPosts.sort((a, b) => b.likes - a.likes);
        } else if (additionalFilters === "least-liked") {
            updatedPosts.sort((a, b) => a.likes - b.likes);
        } else if (additionalFilters === "latest") {
            updatedPosts.sort((a, b) => b.createdAt - a.createdAt);
        } else if (additionalFilters === "oldest") {
            updatedPosts.sort((a, b) => a.createdAt - b.createdAt);
        } else if (additionalFilters === "show all") {
            updatedPosts = [...posts]; 
        }
    
        setFilteredPosts(updatedPosts);
    }, [selectedTag, posts, additionalFilters]);
    
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
            <button onClick={() => setSelectedTag("")}>Remove selected tags</button>
            <p>additional filters: </p>
            <button onClick={() => setAdditionalFilters("most-liked")}>Sort by most liked</button>
            <button onClick={() => setAdditionalFilters("least-liked")}>Sort by least liked</button>
            <button onClick={() => setAdditionalFilters("latest")}>Sort by latest</button>
            <button onClick={() => setAdditionalFilters("oldest")}>Sort by oldest</button>
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