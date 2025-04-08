import React, { useState } from "react"
import { WriteAndUpdatePost } from "../components/WriteAndUpdatePost"

const PostForm = () => {

    const [content, setContent] = useState("")

    return(
        <div className="post-form">
            <label>Content</label>
            <input onChange={(e) => setContent(e.target.value)} value={content} required placeholder="Make an anonymous post" className="content-input" />
            <button onClick={() => WriteAndUpdatePost(content)}>Post</button>
        </div>
    )
}

export default PostForm
