import { Container,Card,Form,Button,Row,Col } from "react-bootstrap"
import { useState } from "react"
import {Check} from "react-bootstrap-icons"
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function CreateSession(){
    const [startYear,setStartYear] = useState(2018);
    const [endYear,setEndYear] = useState(0);
    const [activeState,setActiveState] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {data:response} = await axios.post(`${SERVER_URL}/academic/session`,{
            startYear,endYear,active: activeState === "true"
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        console.log(response);
        if(!response){
            toast.error("cannot create session",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        toast.success(response.message,{duration:4000,position:"top-center"})
        navigate("/admin/session");
    }


    return(
        <>
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Create Session</span>
                </div>
                <div className="bg-light pb-4 text-light">
                    <Container>
                        <div className="mt-3">
                            <div className="text-warning my-3 fs-5">
                                Create New Session
                            </div>
                        </div>
                        <div>
                        <Container>
                    <Card className="shadow-lg mt-3 mx-auto" style={{maxWidth:"700px"}}>
                        <Card.Body>
                            <div className="mx-auto">
                            <Form >
                                <Row className="align-items-center">
                                    <Col>
                                        <Form.Control type="number" min="2018"
                                        placeholder="Enter Session Year" onChange={(e)=>setStartYear(+(e.target.value))}/>
                                    </Col>
                                    <Col>
                                    <Form.Control 
                                    placeholder="Session Ending Year" type="number" min={+(startYear+1)} 
                                    onChange={(e)=>setEndYear(+(e.target.value))}
                                    skip="1"/></Col>
                                    <Col className="text-muted">
                                        <Form.Select onChange={(e)=>setActiveState(e.target.value)}>
                                            <option>-- Select Activity State --</option>
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <div className="text-center mt-3">
                                    <Button className="btn-primary rounded-0 btn-lg"
                                        onClick={handleSubmit}
                                    >Submit
                                        <Check className="ms-2"/>
                                    </Button>
                                </div>
                            </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}