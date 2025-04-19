import React, { useState } from "react"
import { WriteAndUpdatePost } from "../components/models/PostsModel"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const PostForm = () => {

    const navigate = useNavigate()
    const auth = getAuth()
    const user = auth.currentUser   
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [tags, setTags] = useState([])

    const addTag = (tag) => {
        if(!tags.includes(tag)){
            setTags([...tags, tag])
        } 
        if(tags.includes(tag)){
            const newTags = tags.filter((validTag) => tag != validTag)
            setTags(newTags)
        }
    }

    return(
        <div className="post-form-container">
            <h1 className="post-forum-heading">Make a post</h1>
            <div className="post-form">
                <h3 className="content-label">Content: &nbsp;</h3>
                <textarea rows="4" cols="100" onChange={(e) => setContent(e.target.value)} value={content} required placeholder="Make an anonymous post" className="content-input" />
                <button className="post-button" onClick={() => {
                    if(content){
                        WriteAndUpdatePost(content, tags, user.uid, )
                        setContent("")
                        setError("")
                        setTags([])
                        navigate('/home')
                    } else{
                        setError("Cannot leave an empty post")
                    }
                }}>Post</button>
                {error ? (<p className="post-error">Error: {error}</p>) : null}
                <h5>Add tags</h5>
                <button className={`adding-tags${tags.includes("General ") ? "-active" : ""}`} onClick={() => addTag("General ")}>General</button>
                <button className={`adding-tags${tags.includes("Rant ") ? "-active" : ""}`} onClick={() => addTag("Rant ")}>Rant</button>
                <button className={`adding-tags${tags.includes("WiFi ") ? "-active" : ""}`} onClick={() => addTag("WiFi ")}>WiFi</button>
                <button className={`adding-tags${tags.includes("Services ") ? "-active" : ""}`} onClick={() => addTag("Services ")}>Services</button>
                <button className={`adding-tags${tags.includes("Clubs ") ? "-active" : ""}`} onClick={() => addTag("Clubs ")}>Clubs</button>
                <button className={`adding-tags${tags.includes("Social ") ? "-active" : ""}`} onClick={() => addTag("Social ")}>Social</button>
                <button className={`adding-tags${tags.includes("Confession ") ? "-active" : ""}`} onClick={() => addTag("Confession ")}>Confession</button>
                <button className={`adding-tags${tags.includes("Food ") ? "-active" : ""}`} onClick={() => addTag("Food ")}>Food</button>
                <button className={`adding-tags${tags.includes("Academics ") ? "-active" : ""}`} onClick={() => addTag("Academics ")}>Academics</button>
                <button className={`adding-tags${tags.includes("Networking ") ? "-active" : ""}`} onClick={() => addTag("Networking ")}>Networking</button>
                <button className={`adding-tags${tags.includes("Cleaning ") ? "-active" : ""}`} onClick={() => addTag("Cleaning ")}>Cleaning</button>
                <button className={`adding-tags${tags.includes("Hostel ") ? "-active" : ""}`} onClick={() => addTag("Hostel ")}>Hostel</button>
                <button className={`adding-tags${tags.includes("Going-out ") ? "-active" : ""}`} onClick={() => addTag("Going-out ")}>Going out</button>
                <button className={`adding-tags${tags.includes("Rules ") ? "-active" : ""}`} onClick={() => addTag("Rules ")}>Rules</button>
                <button className={`adding-tags${tags.includes("Regarding-this-forum ") ? "-active" : ""}`} onClick={() => addTag("Regarding-this-forum ")}>Regarding this forum</button>
                <p className="warning-note">Note: All posts are completely anonymous and cannot be traced back to any individual. However, please use this platform responsibly. Any content that violates community guidelines or our Terms of Service will be removed and user can be identified in the backend.</p>
            </div>
        </div>
    )
}

export default PostForm
