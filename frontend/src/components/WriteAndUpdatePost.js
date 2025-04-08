import {getDatabase, set, ref, push, serverTimestamp} from "firebase/database"

export const WriteAndUpdatePost = (content, likes) => {
    const db = getDatabase();
    const postRef = push(ref(db, 'post'));
    const postId = postRef.key

    set(postRef, {
        content: content,
        postId: postId,
        likes: likes,
        createdAt: serverTimestamp() 
    })

}