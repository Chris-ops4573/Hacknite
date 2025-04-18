import { getDatabase, ref, get } from "firebase/database"

export const fetchUserContent = async (contentIds) => {
    const db = getDatabase()
    const contentDataList = []
    for(const contentId of contentIds){
        const contentRef = ref(db, contentId)
        const snapshot = await get(contentRef)
        contentDataList.push(snapshot.val())
    }
    return contentDataList
}