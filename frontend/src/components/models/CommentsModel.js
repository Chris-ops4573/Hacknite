import {getDatabase, set, ref, push, serverTimestamp} from "firebase/database"

export const WriteAndUpdateComment = (postId, content, uid) => {
    const db = getDatabase()
    const commentsRef = push(ref(db, 'comment/' + postId))
    const commentId = commentsRef.key

    set(commentsRef, {
        content: content, 
        likes: 0,
        postId: postId,
        commentId: commentId,
        createdAt: serverTimestamp(),
        userUid: uid
    })
}