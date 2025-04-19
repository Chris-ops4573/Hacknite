import { useState } from "react"
import { Report } from "../components/models/Report"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"

const ReportUser = () => {

    const auth = getAuth()
    const user = auth.currentUser
    const navigate = useNavigate()
    const {reportedId, contentType} = useParams()
    const [report, setReport] = useState("")
    const [error, setError] = useState("")


    return(
        <div className="report-container">
            <h2 className="report-heading">Thank you for bringing this to our attention please make and submit your report here</h2>
            <textarea className="content-input" rows="5" cols="100" onChange={(e) => setReport(e.target.value)} value={report} required placeholder="Make an anonymous report" />
            <button className="report-submit-button" onClick={() => {
                if(report){
                    Report(reportedId, report, contentType, user.uid)
                    setReport("")
                    navigate("/home")
                } else{
                    setError("Please point out what exactly you didnt like about the post")
                }
            }}>Submit</button>
            {error ? <p>{error}</p> : null}
        </div>
    )
}

export default ReportUser