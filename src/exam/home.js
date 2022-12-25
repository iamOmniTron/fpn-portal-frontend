import NavBar from "./components/nav";
import {Accordion,Container,Card,Button,Modal,Form,FloatingLabel} from "react-bootstrap";
import {useState} from "react";
import { Mortarboard,Laptop,PersonFill} from "react-bootstrap-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;



export default function ExamHome(){
    const [listShow,setListShow] = useState(false);
    const [studentShow,setStudentShow] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [examinerShow,setExaminerShow] = useState(false);
    const [adminShow,setAdminShow] = useState(false);
    const navigate = useNavigate();
    const show = ()=>setListShow(true);

    const toggleStudentShow = ()=>{
        setListShow(false);
        setStudentShow(true);
    }

    const toggleExaminerShow = ()=>{
        setListShow(false);
        setExaminerShow(true);
    }

    const toggleAdminShow = ()=>{
        setListShow(false);
        setAdminShow(true);
    }

    const loginStudent = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/student/login`,{
                matricNumber:email,password
            });
            if(!response){
                toast.error("error",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error | response.message,{duration:4000,position:"top-center"});
                return;
            }
            localStorage.setItem("authenticationToken",response.data);
            return navigate("/exam/student")
        }catch(err){
            toast.error("Unable to login to portal",{duration:4000,position:"top-center"});
        }
    }

    const loginExaminer = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/examiner/login`,{
                email,password
            });
            if(!response){
                toast.error("error",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.message,{duration:4000,position:"top-center"});
                return;
            }
            localStorage.setItem("authenticationToken",response.data.token);
            localStorage.setItem("e_id",response.data.e_id);
            return navigate("/exam/examiner",{state:{e_id:response.data.e_id}});
        }catch(err){
            toast.error("Unable to login to portal",{duration:4000,position:"top-center"});
        }
    }

    const loginAdmin = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/admin/login`,{
                email,password
            });
            if(!response){
                toast.error("error",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error | response.message,{duration:4000,position:"top-center"});
                return;
            }
            localStorage.setItem("authenticationToken",response.data);
            return navigate("/exam/admin")
        }catch(err){
            toast.error("Unable to login to portal",{duration:4000,position:"top-center"});
        }
    }


    return(
        <>
        <div className="vh-100">
            <NavBar show={show}/>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Card className="rounded-0" style={{minWidth:"70vw"}}>
                        <Card.Header>Frequently Asked Questions(FAQ)</Card.Header>
                        <Card.Body>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    How To Take Exams
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p className="lead">
                                    Ensure you already enrolled for the exams, login with your details and take exams.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        </Card.Body>
                    </Card>
                    <div className="mt-3">
                    <Button className="btn-primary rounded-0 btn-lg fw-bold" onClick={(e)=>setListShow(true)}>
                        Login to start Exam
                    </Button>
                </div>
                </div>
            </Container>
        </div>
        {/* LOGIN LIST MODAL */}
        <Modal show={listShow} onHide={(e)=>setListShow(false)}>
            <Modal.Header className="d-flex justify-content-center fw-bold fs-3">Login</Modal.Header>
            <Modal.Body className="p-3 d-flex flex-column gap-2">
                <Button className="btn-lg fw-bold btn-success rounded-0" onClick={()=>toggleStudentShow()}>
                    Login as Student
                    <Mortarboard className="ms-2"/>
                </Button>
                <Button className="btn-lg fw-bold btn-primary rounded-0" onClick={()=>toggleExaminerShow()}>
                    Login as Examiner
                    <Laptop className="ms-2"/>
                </Button>
                <Button className="btn-lg fw-bold btn-secondary rounded-0" onClick={()=>toggleAdminShow()}>
                    Login as Admin
                    <PersonFill className="ms-2"/>
                </Button>
            </Modal.Body>
        </Modal>
        {/* STUDENT LOGIN MODAL */}
        <Modal show={studentShow} onHide={()=>setStudentShow(false)}>
            <Modal.Header className="fw-bold d-flex justify-content-center">Login Student</Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Form>
                        <FloatingLabel
                                    controlId="floatingInput"
                                    label="matric number"
                                    className="mb-3 rounded-0"
                                >
                                    <Form.Control type="text" onChange={(e)=>setEmail(e.target.value)} className="rounded-0" placeholder="your matric number"/>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="password"
                                    className="mb-3 rounded-0"
                                >
                                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} className="rounded-0" placeholder="your password"/>
                                </FloatingLabel>
                                <div className="text-center">
                                <Button className="rounded-0 btn-success" onClick={(e)=>loginStudent()}>
                                    Login
                                </Button>
                                </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>

        {/* EXAMINER LOGIN MODAL */}

        <Modal show={examinerShow} onHide={()=>setExaminerShow(false)}>
            <Modal.Header className="fw-bold d-flex justify-content-center">Login Examiner</Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Form>
                        <FloatingLabel
                                    controlId="floatingInput"
                                    label="email"
                                    className="mb-3 rounded-0"
                                >
                                    <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} className="rounded-0" placeholder="your email"/>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="password"
                                    className="mb-3 rounded-0"
                                >
                                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)}  className="rounded-0" placeholder="your password"/>
                                </FloatingLabel>
                                <div className="text-center">
                                <Button className="rounded-0 btn-primary" onClick={(e)=>loginExaminer()}>
                                    Login
                                </Button>
                                </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>

        {/* ADMINISTRATOR LOGIN MOADL */}

        <Modal show={adminShow} onHide={()=>setAdminShow(false)}>
            <Modal.Header className="fw-bold d-flex justify-content-center">Login Administrator</Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Form>
                        <FloatingLabel
                                    controlId="floatingInput"
                                    label="email"
                                    className="mb-3 rounded-0"
                                >
                                    <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)}  className="rounded-0" placeholder="admin email"/>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="password"
                                    className="mb-3 rounded-0"
                                >
                                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} className="rounded-0" placeholder="your password"/>
                                </FloatingLabel>
                                <div className="text-center">
                                <Button className="rounded-0 btn-secondary" onClick={(e)=>loginAdmin()}>
                                    Login
                                </Button>
                                </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>

        </>
    )
}