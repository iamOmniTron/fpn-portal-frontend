import {Card,Container,Button,Alert} from "react-bootstrap";
import {BoxArrowLeft,BoxArrowRight} from "react-bootstrap-icons";
import {useNavigate,useLocation} from "react-router-dom";


export default function ExamInstructions(){
    const navigate = useNavigate();
    const {state} = useLocation();
    return (
        <>
            <Container>
                <div className="d-flex justify-content-center align-items-center flex-column" style={{width:"100%",height:"100%"}}>
                    <div>
                    <Card className="rounded-0 shadow-lg mb-2" style={{minWidth:"50vw",minHeight:"25vw"}}>
                        <Card.Body className="d-flex flex-column justify-content-around gap-2">
                            <span className="fw-bold fs-3">Instructions:</span>
                            <Alert className="rounded-0" variant="info">
                                <ul>
                                    <li className="fw-bold">DO NOT refresh the brower</li>
                                    <li className="fw-bold">Read The Questions Carefully before answer</li>
                                    <li className="fw-bold">Your Examination is automaticanlly submitted when the timer stops</li>
                                </ul>
                            </Alert>
                        </Card.Body>
                    </Card>
                    <div className="d-flex gap-2 justify-content-end w-100">
                        <Button className="btn-danger rounded-0"
                            onClick={()=>navigate("-1")}
                        >
                            <BoxArrowLeft className="me-2"/>
                            Exit
                        </Button>
                        <Button className="btn-sucess rounded-0" onClick={()=>navigate(`/exam/student/start/${state.e_id}`,{state:state.e_id})}>
                            Proceed To Exam
                            <BoxArrowRight className="ms-2"/>
                        </Button>
                    </div>
                    </div>
                </div>
            </Container>
        </>
    )
}