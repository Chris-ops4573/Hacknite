import { update, getDatabase, ref, get } from "firebase/database"
import { getAuth } from "firebase/auth"

export const IncreaseLikes = async(postId, currentLikes) => {
    const db = getDatabase()
    const auth = getAuth()
    const user = auth.currentUser
    const postLikedByRef = ref(db, `${postId}/likedBy`)
    const likedByRef = ref(db, `${postId}/likedBy`)

    const snapshotUserLiked = await get(likedByRef)
    const likedBy = snapshotUserLiked.val() || []  
    if(likedBy.includes(user.uid)){ 
        const unlikeUpdates = {}
        unlikeUpdates[`${postId}/likes`] = currentLikes - 1
        await update(ref(db), unlikeUpdates)

        const newLikedBy = likedBy.filter((id) => id !== user.uid)
        const newUpdateUserLikedPosts = {}
        newUpdateUserLikedPosts[`${postId}/likedBy`] = newLikedBy
        await update(ref(db), newUpdateUserLikedPosts)

        return
    }

    const updates = {}
    updates[`${postId}/likes`] = currentLikes + 1 

    const snapshot = await get(postLikedByRef)
    const data = snapshot.val() || []
    const updateUserLikedPosts = {}
    updateUserLikedPosts[`${postId}/likedBy`] = [...data, user.uid]

    await update(ref(db), updateUserLikedPosts)
    await update(ref(db), updates)
}