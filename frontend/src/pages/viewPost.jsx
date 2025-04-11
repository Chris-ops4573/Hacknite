import React, { useEffect } from "react"
import {getDatabase, onValue, push, ref, set} from "firebase/database"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { WriteAndUpdateComment } from "../components/WriteAndUpdateComment"

const LoadPost = ({postId}) => {

    const [content, setContent] = useState("")
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState([])
    const db = getDatabase()
    const commentsRef = ref(db, 'comment/' + postId)

    useEffect(() => {
        const stopShowingComments = onValue(commentsRef, (snapshot) => {
            const data = snapshot.val()
            if(data){
                const formattedComments = Object.entries(data).map(([key, value]) => ({
                    key, 
                    ...value 
                }))
                formattedComments.sort((a, b) => b.createdAt - a.createdAt)
                setComments(formattedComments)
            }
        })
        return() => stopShowingComments()
    }, [])

    return(
        <div>
            <div className="make-comment">
                <label>Comment:</label> 
                <input onChange={(e) => setContent(e.target.value)} value={content} required placeholder="Make an anonymous comment" className="comment-input" />
                <button onClick={() => {
                    WriteAndUpdateComment(postId, content, likes)
                    setContent("")
                }}>Post</button>
            </div>
            <div className="view-comments">
                <h1>Comments:</h1>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.content}</p>
                        <p>Likes: {comment.likes}</p>
                        {comment.createdAt ? <p>{formatDistanceToNow(new Date(comment.createdAt))}</p> : <p>Time not available</p>}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default LoadPost