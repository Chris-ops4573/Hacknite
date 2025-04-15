import React, { useEffect } from "react"
import {getDatabase, onValue, ref} from "firebase/database"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { WriteAndUpdateComment } from "../components/WriteAndUpdateComment"
import { useParams } from "react-router-dom"
import { IncreaseLikes } from "../components/IncreaseLikes"
import { DecreaseLikes } from "../components/DecreaseLikes"
import { useNavigate } from "react-router-dom"

const LoadPost = () => {

    const navigate = useNavigate()
    const {postId} = useParams();
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [comments, setComments] = useState([])
    const [postContent, setPostContent] = useState(null)
    const db = getDatabase()
    const commentsRef = ref(db, 'comment/' + postId)
    const postRef = ref(db, 'post/' + postId)

    useEffect(() => {
        const stopShowingContent = onValue(postRef, (snapshot) => {
            setPostContent(snapshot.val())
        })
        return() => stopShowingContent()
    })

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
            <div className="showing-post">
                {postContent ? (
                    <>
                        <p>{postContent.content}</p>
                        <p>Likes: {postContent.likes}</p>
                        <button onClick={() => IncreaseLikes(`post/${postContent.postId}/likes`, postContent.likes)}>Like</button>
                        <button onClick={() => DecreaseLikes(`post/${postContent.postId}/likes`, postContent.likes)}>Dislike</button>
                        <button onClick={() => navigate(`/report/${postContent.postId}`)}>Report!</button>
                    </>
                ) : <p>Loading posts</p>}   
                {postContent ? <p>{formatDistanceToNow(new Date(postContent.createdAt))}</p> : <p>Time not available</p>}
            </div>
            <div className="make-comment">
                <label>Comment:</label> 
                <input onChange={(e) => setContent(e.target.value)} value={content} required placeholder="Make an anonymous comment" className="comment-input" />
                <button onClick={() => {
                    if(content){
                        WriteAndUpdateComment(postId, content)
                        setContent("")
                        setError("")
                    } else{
                        setError("Cannot leave an empty comment")
                    }
                }}>Post</button>
            </div>
            <div className="comment-error">{error}</div>
            <div className="view-comments">
                <h1>Comments:</h1>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.content}</p>
                        <p>Likes: {comment.likes}</p>
                        <button onClick={() => IncreaseLikes(`comment/${postId}/${comment.key}/likes`, comment.likes)}>Like</button>
                        <button onClick={() => DecreaseLikes(`comment/${postId}/${comment.key}/likes`, comment.likes)}>Dislike</button>
                        {comment.createdAt ? <p>{formatDistanceToNow(new Date(comment.createdAt))}</p> : <p>Time not available</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LoadPost