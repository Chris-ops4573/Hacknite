import React, { useState } from "react"
import { WriteAndUpdatePost } from "../components/models/PostsModel"
import { getAuth } from "firebase/auth"

const PostForm = () => {

    const auth = getAuth()
    const user = auth.currentUser   
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [tags, setTags] = useState([])

    const addTag = (tag) => {
        if(!tags.includes(tag)){
            setTags([...tags, tag])
        } 
    }

    return(
        <div className="post-form">
            <h1>Make a post</h1>
            <label>Content: </label>
            <input onChange={(e) => setContent(e.target.value)} value={content} required placeholder="Make an anonymous post" className="content-input" />
            <button className="post-button" onClick={() => {
                if(content){
                    WriteAndUpdatePost(content, tags, user.uid)
                    setContent("")
                    setError("")
                    setTags([])
                } else{
                    setError("Cannot leave an empty post")
                }
            }}>Post</button>
            <h5>Add tags</h5>
            <button onClick={() => addTag("General ")}>General</button>
            <button onClick={() => addTag("Rant ")}>Rant</button>
            <button onClick={() => addTag("WiFi ")}>WiFi</button>
            <button onClick={() => addTag("Services ")}>Services</button>
            <button onClick={() => addTag("Clubs ")}>Clubs</button>
            <button onClick={() => addTag("Social ")}>Social</button>
            <button onClick={() => addTag("Confession ")}>Confession</button>
            <button onClick={() => addTag("Food ")}>Food</button>
            <button onClick={() => addTag("Academics ")}>Academics</button>
            <button onClick={() => addTag("Networking ")}>Networking</button>
            <button onClick={() => addTag("Cleaning ")}>Cleaning</button>
            <button onClick={() => addTag("Hostel ")}>Hostel</button>
            <button onClick={() => addTag("Going-out ")}>Going out</button>
            <button onClick={() => addTag("Rules ")}>Rules</button>
            <button onClick={() => addTag("Regarding-this-forum ")}>Regarding this forum</button>
            <div className="post-error">{error}</div>
            <p>Note: All posts are completely anonymous and cannot be traced back to any individual. However, please use this platform responsibly. Any content that violates community guidelines or our Terms of Service will be removed.</p>
        </div>
    )
}

export default PostForm
