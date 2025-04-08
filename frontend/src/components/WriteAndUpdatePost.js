import {getDatabase, set, ref, push} from "firebase/database"

export const WriteAndUpdatePost = (content) => {
    const db = getDatabase();
    const postRef = push(ref(db, 'post'));
    const postId = postRef.key

    set(postRef, {
        content: content,
        postId: postId
    })

}