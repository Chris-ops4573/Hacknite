import { useState } from "react"
import { Report } from "../components/Report"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const ReportUser = () => {

    const navigate = useNavigate()
    const {reportedId} = useParams()
    const [report, setReport] = useState("")
    const [error, setError] = useState("")


    return(
        <div className="report">
            <h3>Thank you for bringing this to our attention please make and submit your report here</h3>
            <label>Report: </label>
            <input onChange={(e) => setReport(e.target.value)} value={report} required placeholder="Make an anonymous report" className="report-input" />
            <button onClick={() => {
                if(report){
                    Report(reportedId, report, "post")
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