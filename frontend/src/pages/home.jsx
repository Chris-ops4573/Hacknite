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
        <div className="home-container">
            <h1 className="home-heading">Home page</h1>
            <h2>Choose a tag to filter by:</h2>
            <button className={`adding-tags${selectedTag === "General "? "-active" : ""}`} onClick={() => setSelectedTag("General ")}>General</button>
            <button className={`adding-tags${selectedTag === "Rant "? "-active" : ""}`} onClick={() => setSelectedTag("Rant ")}>Rant</button>
            <button className={`adding-tags${selectedTag === "WiFi "? "-active" : ""}`} onClick={() => setSelectedTag("WiFi ")}>WiFi</button>
            <button className={`adding-tags${selectedTag === "Services "? "-active" : ""}`} onClick={() => setSelectedTag("Services ")}>Services</button>
            <button className={`adding-tags${selectedTag === "Clubs "? "-active" : ""}`} onClick={() => setSelectedTag("Clubs ")}>Clubs</button>
            <button className={`adding-tags${selectedTag === "Social "? "-active" : ""}`} onClick={() => setSelectedTag("Social ")}>Social</button>
            <button className={`adding-tags${selectedTag === "Confession "? "-active" : ""}`} onClick={() => setSelectedTag("Confession ")}>Confession</button>
            <button className={`adding-tags${selectedTag === "Food "? "-active" : ""}`} onClick={() => setSelectedTag("Food ")}>Food</button>
            <button className={`adding-tags${selectedTag === "Academics "? "-active" : ""}`} onClick={() => setSelectedTag("Academics ")}>Academics</button>
            <button className={`adding-tags${selectedTag === "Networking "? "-active" : ""}`} onClick={() => setSelectedTag("Networking ")}>Networking</button>
            <button className={`adding-tags${selectedTag === "Cleaning "? "-active" : ""}`} onClick={() => setSelectedTag("Cleaning ")}>Cleaning</button>
            <button className={`adding-tags${selectedTag === "Hostel "? "-active" : ""}`} onClick={() => setSelectedTag("Hostel ")}>Hostel</button>
            <button className={`adding-tags${selectedTag === "Going-out "? "-active" : ""}`} onClick={() => setSelectedTag("Going-out ")}>Going out</button>
            <button className={`adding-tags${selectedTag === "Rules "? "-active" : ""}`} onClick={() => setSelectedTag("Rules ")}>Rules</button>
            <button className={`adding-tags${selectedTag === "Regarding-this-forum "? "-active" : ""}`} onClick={() => setSelectedTag("Regarding-this-forum ")}>Regarding this forum</button>
            <button className="remove-tags" onClick={() => setSelectedTag("")}>Remove selected tags</button>
            <h2>Additional filters: </h2>
            <button className={`additional-tags${additionalFilters === "most-liked" ? "-active" : ""}`} onClick={() => setAdditionalFilters("most-liked")}>Sort by most liked</button>
            <button className={`additional-tags${additionalFilters === "least-liked" ? "-active" : ""}`} onClick={() => setAdditionalFilters("least-liked")}>Sort by least liked</button>
            <button className={`additional-tags${additionalFilters === "latest" ? "-active" : ""}`} onClick={() => setAdditionalFilters("latest")}>Sort by latest</button>
            <button className={`additional-tags${additionalFilters === "oldest" ? "-active" : ""}`} onClick={() => setAdditionalFilters("oldest")}>Sort by oldest</button>
            <div className="all-posts">
                {filteredPosts.map((post) => (
                    <div key={post.key} className="post">
                        <h3>{post.content}</h3>
                        <div className="show-tags">
                            <h4 className="tags-list">Tags:</h4>
                            <div>{post.tags.join(", ")}</div>
                        </div>
                        <button className="like-button" onClick={() => IncreaseLikes(`post/${post.key}`, post.likes)}>Like: {post.likes}</button>
                        <button className="dislike-button" onClick={() => DecreaseLikes(`post/${post.key}`, post.dislikes)}>Dislike: {post.dislikes}</button>
                        {post.createdAt ? <p>{formatDistanceToNow(new Date(post.createdAt))} ago</p> : <p>Time not available</p>}
                        <button className="show-comments-button" onClick={() => setShowComments(post.key)}>See comments</button>
                        {showComments === post.key ? navigate(`/home/${post.key}`) : null}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home