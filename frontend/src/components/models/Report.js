import { getDatabase, ref, push, serverTimestamp } from "firebase/database"
import { set } from "firebase/database"


export const Report = (reportedId, content, type, uid) => {
    const db = getDatabase()
    const reportRef = push(ref(db, 'report'))
    const reportId = reportRef.key

    set(reportRef, {
        content: content,
        reportId: reportId, 
        reportedId: reportedId,
        type: type,
        createdAt: serverTimestamp(),
        userUid: uid
    })
}