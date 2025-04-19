import { getDatabase, ref, serverTimestamp, set } from "firebase/database";

export const getOrMakeUser = (user, username) => {
    
    const db = getDatabase()  

    set(ref(db, "user/" + user.uid), {
        username: username,
        userId: user.uid,
        createdAt: serverTimestamp(),
        posts: []
    })
}