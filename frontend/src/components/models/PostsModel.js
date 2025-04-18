import {getDatabase, set, ref, push, serverTimestamp} from "firebase/database"

export const WriteAndUpdatePost = (content ,tags, uid) => {
    const db = getDatabase();
    const postRef = push(ref(db, 'post'));
    const postId = postRef.key

    set(postRef, {
        content: content,
        postId: postId,
        likes: 0,
        tags: tags.length > 0 ? tags : ["General "],
        createdAt: serverTimestamp(),
        userUid: uid
    })
}