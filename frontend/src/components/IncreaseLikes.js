import { update, getDatabase, ref, get } from "firebase/database"
import { getAuth } from "firebase/auth"

export const IncreaseLikes = async(postId, currentLikes) => {
    const db = getDatabase()
    const auth = getAuth()
    const user = auth.currentUser
    const dislikedByRef = ref(db, `${postId}/dislikedBy`)
    const likedByRef = ref(db, `${postId}/likedBy`)

    const snapshotUserDisliked = await get(dislikedByRef)
    const snapshotUserLiked = await get(likedByRef)
    const likedBy = snapshotUserLiked.val() || []  
    const dislikedBy = snapshotUserDisliked.val() || []
    if(likedBy.includes(user.uid)){ 

        const newLikedBy = likedBy.filter((id) => id !== user.uid)
        const newUpdateUserLikedPosts = {}
        newUpdateUserLikedPosts[`${postId}/likedBy`] = newLikedBy
        await update(ref(db), newUpdateUserLikedPosts)

        const unlikeUpdates = {}
        unlikeUpdates[`${postId}/likes`] = likedBy.length - 1
        await update(ref(db), unlikeUpdates)

        return
    }

    if(dislikedBy.includes(user.uid)){
        const newDislikedBy = dislikedBy.filter((id) => id !== user.uid) 
        const undislikePostUpdate = {}
        undislikePostUpdate[`${postId}/dislikedBy`] = newDislikedBy
        await update(ref(db), undislikePostUpdate)

        const undislikeCount = {}
        undislikeCount[`${postId}/dislikes`] = newDislikedBy.length
        await update(ref(db), undislikeCount)
    }

    const snapshot = await get(likedByRef)
    const data = snapshot.val() || []
    const updateUserLikedPosts = {}
    updateUserLikedPosts[`${postId}/likedBy`] = [...data, user.uid]
    
    const updates = {}
    updates[`${postId}/likes`] =  data.length + 1

    await update(ref(db), updateUserLikedPosts)
    await update(ref(db), updates)
}