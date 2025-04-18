import { set, ref, getDatabase, push, serverTimestamp, get, update} from "firebase/database"

export const ReplyToComment = async (commentId, content, uid) => {
    const db = getDatabase()
    const replyRef = push(ref(db, 'reply/' + commentId))
    const replyId = replyRef.key 
    const repliesRef = ref(db, `user/${uid}/replies`)

    set(replyRef, {
        content: content, 
        likes: 0,
        commentId: commentId, 
        replyId: replyId, 
        createdAt: serverTimestamp(),
        userUid: uid
    })

    const snapshot = await get(repliesRef)
    const repliesArray = snapshot.val() || []
    const updates = {}
    updates[`user/${uid}/replies`] = [...repliesArray, replyId]
    await update(ref(db), updates)
}