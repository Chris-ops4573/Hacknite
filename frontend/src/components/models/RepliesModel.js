import { set, ref, getDatabase, push, serverTimestamp } from "firebase/database"

export const ReplyToComment = (commentId, content) => {
    const db = getDatabase()
    const replyRef = push(ref(db, 'reply/' + commentId))
    const replyId = replyRef.key 

    set(replyRef, {
        content: content, 
        likes: 0,
        commentId: commentId, 
        replyId: replyId, 
        createdAt: serverTimestamp()
    })
}