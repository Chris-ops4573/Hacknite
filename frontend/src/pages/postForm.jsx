import React, { useState } from "react"
import { WriteAndUpdatePost } from "../components/WriteAndUpdatePost"

const PostForm = () => {

    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [tags, setTags] = useState([])

    return(
        <div className="post-form">
            <h1>Make a post</h1>
            <label>Content: </label>
            <input onChange={(e) => setContent(e.target.value)} value={content} required placeholder="Make an anonymous post" className="content-input" />
            <h5>Add tags</h5>
            <button onClick={() => setTags([...tags, "General  "])}>General</button>
            <button onClick={() => setTags([...tags, "Rant  "])}>Rant</button>
            <button onClick={() => setTags([...tags, "WiFi  "])}>WiFi</button>
            <button onClick={() => setTags([...tags, "Services  "])}>Services</button>
            <button onClick={() => setTags([...tags, "Clubs  "])}>Clubs</button>
            <button onClick={() => setTags([...tags, "Social  "])}>Social</button>
            <button onClick={() => setTags([...tags, "Confession  "])}>Confession</button>
            <button onClick={() => setTags([...tags, "Food  "])}>Food</button>
            <button onClick={() => setTags([...tags, "Academics  "])}>Academics</button>
            <button onClick={() => setTags([...tags, "Networking  "])}>Networking</button>
            <button onClick={() => setTags([...tags, "Cleaning  "])}>Cleaning</button>
            <button onClick={() => setTags([...tags, "Hostel  "])}>Hostel</button>
            <button onClick={() => setTags([...tags, "Going-out  "])}>Going out</button>
            <button onClick={() => setTags([...tags, "Rules  "])}>Rules</button>
            <button onClick={() => {
                if(content){
                    WriteAndUpdatePost(content, tags)
                    setContent("")
                    setError("")
                } else{
                    setError("Cannot leave an empty post")
                }
            }}>Post</button>
            <div className="post-error">{error}</div>
            <p>Note: All posts are completely anonymous and cannot be traced back to any individual. However, please use this platform responsibly. Any content that violates community guidelines or our Terms of Service will be removed.</p>
        </div>
    )
}

export default PostForm
