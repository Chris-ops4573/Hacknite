import React, { useEffect } from "react"
import {getDatabase, onValue, ref} from "firebase/database"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { WriteAndUpdateComment } from "../components/models/CommentsModel"
import { useParams } from "react-router-dom"
import { IncreaseLikes } from "../components/IncreaseLikes"
import { DecreaseLikes } from "../components/DecreaseLikes"
import { useNavigate } from "react-router-dom"
import { ReplyToComment } from "../components/models/RepliesModel"

const LoadPost = () => {

    const navigate = useNavigate()
    const {postId} = useParams();
    const [replyError, setReplyError] = useState("")
    const [showReplies, setShowReplies] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [replies, setReplies] = useState([])
    const [reply, setReply] = useState("")
    const [comments, setComments] = useState([])
    const [postContent, setPostContent] = useState(null)
    const db = getDatabase()
    const replyRef = ref(db, 'reply/' + showReplies)
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

    useEffect(() => {
        const stopShowingReplies = onValue(replyRef, (snapshot) => {
            const data = snapshot.val() 
            if(data){
                const formattedReplies = Object.entries(data).map(([key, value]) => ({
                    key, 
                    ...value
                }))
                formattedReplies.sort((a, b) => b.createdAt - a.createdAt)
                setReplies(formattedReplies)
            }
        })
        return() => stopShowingReplies()
    }, [showReplies])

    return(
        <div>
            <div className="showing-post">
                {postContent ? (
                    <>
                        <h2>{postContent.content}</h2>
                        <h2>Likes: {postContent.likes}</h2>
                        <button onClick={() => IncreaseLikes(`post/${postContent.postId}/likes`, postContent.likes)}>Like</button>
                        <button onClick={() => DecreaseLikes(`post/${postContent.postId}/likes`, postContent.likes)}>Dislike</button>
                        <button onClick={() => navigate(`/report/post/${postContent.postId}`)}>Report!</button>
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
                    <div key={comment.key} className="comment">
                        <h3>{comment.content}</h3>
                        <h3>Likes: {comment.likes}</h3>
                        <button onClick={() => IncreaseLikes(`comment/${postId}/${comment.key}/likes`, comment.likes)}>Like</button>
                        <button onClick={() => DecreaseLikes(`comment/${postId}/${comment.key}/likes`, comment.likes)}>Dislike</button>
                        {comment.createdAt ? <p>{formatDistanceToNow(new Date(comment.createdAt))}</p> : <p>Time not available</p>}
                        {showReplies === comment.key ? <button onClick={() => {
                            setShowReplies("")
                            setReply("")
                        }}>Hide replies</button> : <button onClick={() => {
                            setShowReplies(comment.key)
                            setReply("")
                        }}>Show Replies</button>}
                        {showReplies === comment.key ? <>
                                        <input onChange={(e) => setReply(e.target.value)} value={reply} required placeholder="Make an anonymous reply" className="reply-input" />
                                        <button onClick={() => {
                                            if(reply){
                                                ReplyToComment(comment.key, reply)
                                                setReply("")
                                                setReplyError("")
                                            } else{
                                                setReplyError("Cannot leave an empty reply")
                                            }
                                        }}>Post</button>
                                        <div className="reply-error">{replyError}</div>
                                       </> : null}
                        {showReplies === comment.key ? replies.map((reply) => (
                            <div key={reply.key} className="comment-reply">
                                <p>{reply.content}</p>
                                <p>Likes: {reply.likes}</p>
                                <button onClick={() => IncreaseLikes(`reply/${comment.key}/${reply.key}/likes`, reply.likes)}>Like</button>
                                <button onClick={() => DecreaseLikes(`reply/${comment.key}/${reply.key}/likes`, reply.likes)}>Dislike</button>
                            </div>
                        )) : null}
                        <button onClick={() => navigate(`/report/comment/${comment.key}`)}>Report!</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LoadPost