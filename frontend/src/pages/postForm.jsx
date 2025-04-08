import React, { useState } from "react"
import { WriteAndUpdatePost } from "../components/WriteAndUpdatePost"

const PostForm = () => {

    const [content, setContent] = useState("")
    const [likes, setLikes] = useState(0);

    return(
        <div className="post-form">
            <h1>Make a post</h1>
            <label>Content: </label>
            <input onChange={(e) => setContent(e.target.value)} value={content} required placeholder="Make an anonymous post" className="content-input" />
            <button onClick={() => {
                WriteAndUpdatePost(content, likes)
                setContent("")
            }}>Post</button>
            <p>Note: All posts are completely anonymous and cannot be traced back to any individual. However, please use this platform responsibly. Any content that violates community guidelines or our Terms of Service will be removed.</p>
        </div>
    )
}

export default PostForm
