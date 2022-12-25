import {Alert,Card,FloatingLabel,Form,Button} from "react-bootstrap"
import {useState} from "react";

export default function Hnd({setDetails}){
    const [detail,setDetail] = useState("");
    return(
        <>
            <Card style={{minWidth:"50vw"}}>
                <Card.Header>
                    <span className="fw-bold text-warning">Application For HND Programme</span>
                </Card.Header>
                <Card.Body>
                    <Alert className="rounded-0" variant="info"> 
                            <span className="fw-bold">Requirements for HND Program</span>
                        <ul>
                            <li>
                                You must posses atleast a lower credit pass in National Diploma in a Relevant ND programme
                            </li>
                        </ul>
                    </Alert>
                    <Form>
                        <FloatingLabel label="Grade value" controlId="ndGradeValue">
                            <Form.Control className="rounded-0" required type="number" onChange={(e)=>setDetail(e.target.value)} min="1" max="4" step=".01" placeholder="Grade value"/>
                        </FloatingLabel>
                        <div className="mt-3 text-center">
                            <Button className="rounded-0 btn-success" onClick={(e)=>setDetails(JSON.stringify({gradeValue:detail}))}>Confirm</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}