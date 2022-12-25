import {Card,Form,Alert,FormControl,Button} from "react-bootstrap";
import {useState,useEffect} from "react";
import SUBJECTS from "../subjects"

export default function Prend({setDetails,onSelect}){
    const [examType,setExamType] = useState("");
    const [subject1,setSubject1] = useState("mathematics");
    const [grade1,setGrade1] = useState("english language");
    const [subject2,setSubject2] = useState("english language");
    const [grade2,setGrade2] = useState("")
    const [subject3,setSubject3] = useState("");
    const [grade3,setGrade3] = useState("")
    const [subject4,setSubject4] = useState("");
    const [grade4,setGrade4] = useState("")
    const [subject5,setSubject5] = useState("");
    const [grade5,setGrade5] = useState("")
    const [subject6,setSubject6] = useState("");
    const [grade6,setGrade6] = useState("")
    const [subject7,setSubject7] = useState("");
    const [grade7,setGrade7] = useState("")
    const [subject8,setSubject8] = useState("");
    const [grade8,setGrade8] = useState("")
    const [subject9,setSubject9] = useState("");
    const [grade9,setGrade9] = useState("")

    const obj = {examType,
        grades:[{subject1,grade1},{subject2,grade2},{subject3,grade3},{subject4,grade4},{subject5,grade5},{subject6,grade6},{subject7,grade7},{subject8,grade8},{subject9,grade9}]    
    }
    useEffect(()=>{
        onSelect();
    },[])

    return(
        <>
        <Card style={{minWidth:"50vw"}}>
            <Card.Header>
            <span className="fw-bold text-warning">Application For Pre-ND Programme</span>
            </Card.Header>
            <Card.Body>
            <Alert variant="info" className="rounded-0">
                        <span className="fw-bold">Requirements For Pre-ND Programme</span>
                        <ul>
                            <li>O'Level Results with Minimum of Seven (5) Passes</li>
                        </ul>
                    </Alert>
                    <Form onSubmit={(e)=>{e.preventDefault();console.log(e.target.value)}}>
                    <div className="mb-2">
                        <span className="fw-bold">O'Level Result</span>
                            </div>
                    <div className="d-flex mb-2">
                            <div className="col-3">Exam Type</div>
                            <Form.Select required onChange={(e)=>setExamType(e.target.value)}>
                                <option>-- Select Exam Type --</option>
                                <option value="waec">WAEC SSCE</option>
                                <option value="neco">NECO SSCE</option>
                                <option value="napteb">NAPTEB</option>
                            </Form.Select>
                        </div>
                        <span>Scores</span>
                    <div className="d-flex gap-3 mb-3">
                            <span className="fw-bold">Mathematics</span>
                            <Form.Select onChange={(e)=>setGrade1(e.target.value)}>
                                <option>--Select Grade</option>
                                <option value="a1">A1</option>
                                <option value="b2">B2</option>
                                <option value="b3">B3</option>
                                <option value="c4">C4</option>
                                <option value="c5">C5</option>
                                <option value="c6">C6</option>
                                <option value="d7">D7</option>
                                <option value="e8">E8</option>
                                <option value="f9">F9</option>
                            </Form.Select>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <span className="fw-bold">English Language</span>
                            <Form.Select onChange={(e)=>setGrade2(e.target.value)}>
                                <option>--Select Grade</option>
                                <option value="a1">A1</option>
                                <option value="b2">B2</option>
                                <option value="b3">B3</option>
                                <option value="c4">C4</option>
                                <option value="c5">C5</option>
                                <option value="c6">C6</option>
                                <option value="d7">D7</option>
                                <option value="e8">E8</option>
                                <option value="f9">F9</option>
                            </Form.Select>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                        <Form.Select onChange={(e)=>setSubject3(e.target.value)}>
                                <option>--select subjects--</option>
                                {
                                    SUBJECTS && SUBJECTS.map((subject,idx)=>{
                                        return(
                                            <option key={idx} value={subject}>{subject}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <Form.Select onChange={(e)=>setGrade3(e.target.value)}>
                                <option>--Select Grade</option>
                                <option value="a1">A1</option>
                                <option value="b2">B2</option>
                                <option value="b3">B3</option>
                                <option value="c4">C4</option>
                                <option value="c5">C5</option>
                                <option value="c6">C6</option>
                                <option value="d7">D7</option>
                                <option value="e8">E8</option>
                                <option value="f9">F9</option>
                            </Form.Select>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                        <Form.Select onChange={(e)=>setSubject4(e.target.value)}>
                                <option>--select subjects--</option>
                                {
                                    SUBJECTS && SUBJECTS.map((subject,idx)=>{
                                        return(
                                            <option key={idx} value={subject}>{subject}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <Form.Select onChange={(e)=>setGrade4(e.target.value)}>
                                <option>--Select Grade</option>
                                <option value="a1">A1</option>
                                <option value="b2">B2</option>
                                <option value="b3">B3</option>
                                <option value="c4">C4</option>
                                <option value="c5">C5</option>
                                <option value="c6">C6</option>
                                <option value="d7">D7</option>
                                <option value="e8">E8</option>
                                <option value="f9">F9</option>
                            </Form.Select>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                        <Form.Select onChange={(e)=>setSubject5(e.target.value)}>
                                <option>--select subjects--</option>
                                {
                                    SUBJECTS && SUBJECTS.map((subject,idx)=>{
                                        return(
                                            <option key={idx} value={subject}>{subject}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <Form.Select onChange={(e)=>setGrade5(e.target.value)}>
                                <option>--Select Grade</option>
                                <option value="a1">A1</option>
                                <option value="b2">B2</option>
                                <option value="b3">B3</option>
                                <option value="c4">C4</option>
                                <option value="c5">C5</option>
                                <option value="c6">C6</option>
                                <option value="d7">D7</option>
                                <option value="e8">E8</option>
                                <option value="f9">F9</option>
                            </Form.Select>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                        <Form.Select onChange={(e)=>setSubject6(e.target.value)}>
                                <option>--select subjects--</option>
                                {
                                    SUBJECTS && SUBJECTS.map((subject,idx)=>{
                                        return(
                                            <option key={idx} value={subject}>{subject}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <Form.Select onChange={(e)=>setGrade6(e.target.value)}>
                                <option>--Select Grade</option>
                                <option value="a1">A1</option>
                                <option value="b2">B2</option>
                                <option value="b3">B3</option>
                                <option value="c4">C4</option>
                                <option value="c5">C5</option>
                                <option value="c6">C6</option>
                                <option value="d7">D7</option>
                                <option value="e8">E8</option>
                                <option value="f9">F9</option>
                            </Form.Select>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                        <Form.Select onChange={(e)=>setSubject7(e.target.value)}>
                                <option>--select subjects--</option>
                                {
                                    SUBJECTS && SUBJECTS.map((subject,idx)=>{
                                        return(
                                            <option key={idx} value={subject}>{subject}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <Form.Select onChange={(e)=>setGrade7(e.target.value)}>
                                <option>--Select Grade</option>
                                <option value="a1">A1</option>
                                <option value="b2">B2</option>
                                <option value="b3">B3</option>
                                <option value="c4">C4</option>
                                <option value="c5">C5</option>
                                <option value="c6">C6</option>
                                <option value="d7">D7</option>
                                <option value="e8">E8</option>
                                <option value="f9">F9</option>
                            </Form.Select>
                        </div>
                        <div className="mt-3 text-center">
                            <Button onClick={(e)=>setDetails(JSON.stringify(obj))} className="rounded-0 btn-success">Confirm</Button>
                        </div>
                    </Form>
            </Card.Body>
        </Card>
        </>
    )
}