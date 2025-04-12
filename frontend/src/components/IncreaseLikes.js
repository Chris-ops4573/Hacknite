import { update, getDatabase, ref } from "firebase/database"

export const IncreaseLikes = async(postId, currentLikes) => {
    const db = getDatabase()

    const updates = {}
    updates[`${postId}`] = currentLikes + 1 

    await update(ref(db), updates)
}