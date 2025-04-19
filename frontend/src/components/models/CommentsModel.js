import {getDatabase, set, ref, push, serverTimestamp, update, get} from "firebase/database"

export const WriteAndUpdateComment = async (postId, content, uid) => {
    const db = getDatabase()
    const commentRef = push(ref(db, 'comment/' + postId))
    const commentId = commentRef.key
    const commentsRef = ref(db, `user/${uid}/comments`)

    set(commentRef, {
        content: content, 
        likes: 0,
        dislikes: 0,
        postId: postId,
        commentId: commentId,
        createdAt: serverTimestamp(),
        userUid: uid
    })

    const snapshot = await get(commentsRef)
    const commentArray = snapshot.val() || []
    const updates = {}
    updates[`user/${uid}/comments`] = [...commentArray, commentId]
    await update(ref(db), updates)
}