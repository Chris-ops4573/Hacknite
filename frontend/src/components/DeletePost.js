import { getDatabase, remove, ref, update, get } from "firebase/database"
import { getAuth } from "firebase/auth"

export const deleteContent = async (postId) => {
    
    const db = getDatabase()
    const removedPostRef = ref(db, `post/${postId}`)
    const auth = getAuth()
    const user = auth.currentUser
    const postsRef = ref(db, `user/${user.uid}/posts`)
    const snapshot = await get(postsRef)
    const postArray = snapshot.val()

    if(postArray){
        const newArray = postArray.filter((id) => postId !== id)
        const updates = {}
        updates[`user/${user.uid}/posts`] = newArray
        update(ref(db), updates)
    }

    await remove(removedPostRef)
}