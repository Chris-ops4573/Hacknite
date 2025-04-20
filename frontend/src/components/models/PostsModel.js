import {getDatabase, set, ref, push, serverTimestamp, update, get} from "firebase/database"

export const WriteAndUpdatePost = async (content ,tags, uid) => {
    const db = getDatabase();
    const postRef = push(ref(db, 'post'));
    const postId = postRef.key
    const postsRef = ref(db, `user/${uid}/posts`)

    set(postRef, {
        content: content,
        postId: postId,
        likes: 0,
        dislikes: 0,
        tags: tags.length > 0 ? tags : ["General "],
        createdAt: serverTimestamp(),
        userUid: uid,
        dislikedBy: [],
        likedBy: []
    })

    const snapshot = await get(postsRef)
    const postArray = snapshot.val() || []
    const updates = {}
    updates[`user/${uid}/posts`] = [...postArray, postId]   
    await update(ref(db), updates)
}