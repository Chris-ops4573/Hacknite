import { update, getDatabase, ref, get } from "firebase/database"
import { getAuth } from "firebase/auth"

export const DecreaseLikes = async(postId, currentDisikes) => {
    const db = getDatabase()
    const auth = getAuth()
    const user = auth.currentUser
    const dislikedByRef = ref(db, `${postId}/dislikedBy`)
    const likedByRef = ref(db, `${postId}/likedBy`)

    const snapshotUserDisliked = await get(dislikedByRef)
    const snapshotUserLiked = await get(likedByRef)
    const dislikedBy = snapshotUserDisliked.val() || []
    const likedBy = snapshotUserLiked.val() || []
    if(dislikedBy.includes(user.uid)){
        const newDislikedBy = dislikedBy.filter((id) => id !== user.uid)
        const newUpdateUserDisikedPosts = {}
        newUpdateUserDisikedPosts[`${postId}/dislikedBy`] = newDislikedBy
        await update(ref(db), newUpdateUserDisikedPosts)

        const unDislikeUpdates = {}
        unDislikeUpdates[`${postId}/dislikes`] = newDislikedBy.length
        await update(ref(db), unDislikeUpdates)

        return 
    }

    if(likedBy.includes(user.uid)){
        const newLikedBy = likedBy.filter((id) => id !== user.uid) 
        const unlikePostUpdate = {}
        unlikePostUpdate[`${postId}/likedBy`] = newLikedBy
        await update(ref(db), unlikePostUpdate)

        const unlikeCount = {}
        unlikeCount[`${postId}/likes`] = newLikedBy.length
        await update(ref(db), unlikeCount)
    }

    const data = snapshotUserDisliked.val() || []
    const updateUserDislikedPosts = {}
    updateUserDislikedPosts[`${postId}/dislikedBy`] = [...data, user.uid]

    const updates = {}
    updates[`${postId}/dislikes`] = data.length + 1
    await update(ref(db), updateUserDislikedPosts)
    await update(ref(db), updates)
}