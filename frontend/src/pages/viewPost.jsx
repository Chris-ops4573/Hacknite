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
import { getAuth } from "firebase/auth"

const LoadPost = () => {

    const auth = getAuth()
    const user = auth.currentUser
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
                        <h1 className="post-content">{postContent.content}</h1>
                        <button className="like-button" onClick={() => IncreaseLikes(`post/${postContent.postId}/likes`, postContent.likes)}>Like: {postContent.likes}</button>
                        <button className="dislike-button" onClick={() => DecreaseLikes(`post/${postContent.postId}/likes`, postContent.likes)}>Dislike: {postContent.dislikes}</button>
                        <button className="report-button" onClick={() => navigate(`/report/post/${postContent.postId}`)}>Report!</button>
                    </>
                ) : <p>Loading posts</p>}   
                {postContent ? <p>{formatDistanceToNow(new Date(postContent.createdAt))} ago</p> : <p>Time not available</p>}
            </div>
            <div className="make-comment">
                <h4 className="comment-label">Comment: &nbsp;</h4> 
                <textarea rows="4" cols="75 " onChange={(e) => setContent(e.target.value)} value={content} required placeholder="Make an anonymous comment" className="content-input" />
                <button className="comment-post-button" onClick={() => {
                    if(content){
                        WriteAndUpdateComment(postId, content, user.uid)
                        setContent("")
                        setError("")
                    } else{
                        setError("Cannot leave an empty comment")
                    }
                }}>Post</button>
            </div>
            <div className="comment-error">{error}</div>
            <div className="view-comments">
                <h2>Comments:</h2>
                <div className="all-comment">
                    {comments.map((comment) => (
                        <div key={comment.key} className="comment">
                            <h3 className="comment-content">{comment.content}</h3>
                            <button className="like-button" onClick={() => IncreaseLikes(`comment/${postId}/${comment.key}`, comment.likes)}>Like: {comment.likes}</button>
                            <button className="dislike-button" onClick={() => DecreaseLikes(`comment/${postId}/${comment.key}`, comment.dislikes)}>Dislike: {comment.dislikes}</button>
                            {comment.createdAt ? <p>{formatDistanceToNow(new Date(comment.createdAt))} ago</p> : <p>Time not available</p>}
                            <button className="report-button" onClick={() => navigate(`/report/comment/${comment.key}`)}>Report!</button>
                            {showReplies === comment.key ? <button className="hide-replies-button" onClick={() => {
                                setShowReplies("")
                                setReply("")
                            }}>Hide replies</button> : <button className="show-replies-button" onClick={() => {
                                setShowReplies(comment.key)
                                setReply("")
                            }}>Show Replies</button>}
                            {showReplies === comment.key ? <>
                                            <textarea cols="40" rows="3" onChange={(e) => setReply(e.target.value)} value={reply} required placeholder="Make an anonymous reply" className="content-input" />
                                            <button className="reply-comment-button" onClick={() => {
                                                if(reply){
                                                    ReplyToComment(comment.key, reply, user.uid)
                                                    setReply("")
                                                    setReplyError("")
                                                } else{
                                                    setReplyError("Cannot leave an empty reply")
                                                }
                                            }}>Post</button>
                                            <div className="reply-error">{replyError}</div>
                                        </> : null}
                            <div className="all-replies">
                                {showReplies === comment.key ? replies.map((reply) => (
                                    <div key={reply.key} className="comment-reply">
                                        <h4>{reply.content}</h4>
                                        <button className="like-button" onClick={() => IncreaseLikes(`reply/${comment.key}/${reply.key}`, reply.likes)}>Like: {reply.likes}</button>
                                        <button className="dislike-button" onClick={() => DecreaseLikes(`reply/${comment.key}/${reply.key}`, reply.dislikes)}>Dislike: {reply.dislikes }</button>
                                        {reply.createdAt ? <p>{formatDistanceToNow(new Date(reply.createdAt))} ago</p> : <p>Time not available</p>}
                                        <button className="report-button" onClick={() => navigate(`/report/comment/${comment.key}`)}>Report!</button>
                                    </div>
                                )) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LoadPost