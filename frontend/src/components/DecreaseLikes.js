import { update, getDatabase, ref, get } from "firebase/database"
import { getAuth } from "firebase/auth"

export const DecreaseLikes = async(postId, currentDisikes) => {
    const db = getDatabase()
    const auth = getAuth()
    const user = auth.currentUser
    const postDislikedByRef = ref(db, `${postId}/dislikedBy`)
    const dislikedByRef = ref(db, `${postId}/dislikedBy`)

    const snapshotUserDisliked = await get(dislikedByRef)
    const dislikedBy = snapshotUserDisliked.val() || []
    if(dislikedBy.includes(user.uid)){
        const unDislikeUpdates = {}
        unDislikeUpdates[`${postId}/dislikes`] = currentDisikes - 1
        await update(ref(db), unDislikeUpdates)

        const newDislikedBy = dislikedBy.filter((id) => id !== user.uid)
        const newUpdateUserDisikedPosts = {}
        newUpdateUserDisikedPosts[`${postId}/dislikedBy`] = newDislikedBy
        await update(ref(db), newUpdateUserDisikedPosts)

        return 
    }

    const updates = {}
    updates[`${postId}/dislikes`] = currentDisikes + 1 

    const snapshot = await get(postDislikedByRef)
    const data = snapshot.val() || []
    const updateUserDislikedPosts = {}
    updateUserDislikedPosts[`${postId}/dislikedBy`] = [...data, user.uid]

    await update(ref(db), updateUserDislikedPosts)
    await update(ref(db), updates)
}