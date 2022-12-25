import { useNavigate,useParams } from "react-router-dom"
import { Container,Card,Form,Button,Row,Col } from "react-bootstrap"
import {Check} from "react-bootstrap-icons"
import toast from "react-hot-toast";
import { useState,useEffect } from "react"
import axios from "axios";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function EditSession(){
    const navigate = useNavigate();
    const [session,setSession] = useState({});
    const [startYear,setStartYear] = useState(0);
    const [endYear,setEndYear] = useState(0)
    const [activeState,setActiveState] = useState(true);
    const {id} = useParams()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {data:response} = await axios.post(`${SERVER_URL}/academic/session/edit/${id}`,{
            startYear,endYear,active: activeState === "true"
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        console.log(response);
        if(!response){
            toast.error("cannot update session",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        toast.success(response.message,{duration:4000,position:"top-center"})
        navigate("/admin/session");
    }

    const fetchSession = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/academic/session/${id}`);
        console.log(response);
        if(!response){
            toast.error("cannot get session",{duration:4000,position:"top-center"});
            return navigate("/admin/session");
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return navigate("/admin/session");
        }
        setSession(response.data);
        setStartYear(response.data.startYear);
        setEndYear(response.data.endYear);
    }

    useEffect(()=>{
        fetchSession();
    },[]);
    return(
        <>
                      <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Edit Session</span>
                </div>
                <div className="bg-light pb-4 text-light">
                    <Container>
                        <div className="mt-3">
                            <div className="text-warning my-3 fs-5">
                                Edit Existing Session
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
                                        placeholder="Enter Session Year"
                                        value={session.startYear} onChange={(e)=>setStartYear(+(e.target.value))}/>
                                    </Col>
                                    <Col>
                                    <Form.Control 
                                    placeholder="Session Ending Year" type="number" value={session.endYear} min={+(startYear+1)} 
                                    onChange={(e)=>setEndYear(+(e.target.value))}
                                    skip="1"/></Col>
                                    <Col className="text-muted">
                                        <Form.Select onChange={(e)=>setActiveState(e.target.value)}>
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