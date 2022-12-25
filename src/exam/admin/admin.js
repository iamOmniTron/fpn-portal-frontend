import NavBar from "./components/nav";
import { Container,Button,Modal,Card,Form,FloatingLabel } from "react-bootstrap";
import {PlusLg} from "react-bootstrap-icons"
import Examiners from "../components/examiners";
import toast from "react-hot-toast";
import axios from "axios";
import {useEffect, useState} from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


export default function AdminExam(){
    const [examiners,setExaminers] = useState([]);
    const [courses,setCourses] = useState([]);
    const [show,setShow] = useState(false);
    const [email,setEmail] = useState("");
    const [fullname,setFullname] = useState("");
    const [password,setPassword] = useState("");
    const [course,setCourse] = useState("");
    const [fetched,setFetched] = useState(false);

    const toggleFetched = ()=> setFetched(!fetched);

    const handleSubmit = async ()=>{
        const {data:response} = await axios.post(`${SERVER_URL}/examiner/${course}`,{
            email,password,fullname
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        console.log(response);
        if(!response){
            setShow(false);
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            setShow(false);
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setShow(false);
        toast.success(response.message);
        toggleFetched()
        return;
    }


    const fetchCourses = async ()=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/courses`,{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
              if(!response){
                toast.error("error",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error | response.message,{duration:4000,position:"top-center"});
                return;
            }
            setCourses(response.data);
            return;

        }catch(err){
            toast.error(err.message | "something went wrong")
        }
    }

    const fetchExaminers = async ()=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/examiners`,{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
                  if(!response){
                      toast.error("error",{duration:4000,position:"top-center"});
                      return;
                  }
                  if(!response.success){
                      toast.error(response.error | response.message,{duration:4000,position:"top-center"});
                      return;
                  }
                  console.log(response.data)
                  setExaminers(response.data);
                  return;
        }catch(err){
            toast.error(err.message | "something went wrong");
        }
    }

    useEffect(()=>{
        fetchExaminers();
        fetchCourses();
    },[fetched])
    return(
        <>
            <div className="vh-100" style={{backgroundColor:"lightgray"}}>
            <NavBar/>
            <Container>
                <div className="px-2 d-flex align-items-center justify-content-between bg-light" style={{height:"10vh"}}>
                    <span className="fw-bold text-warning fs-3">Examiners</span>
                    <div>
                    <Button className="rounded-0" onClick={()=>setShow(true)}>
                        <PlusLg className="me-2"/>
                        Add Examiners
                    </Button>
                    </div>
                </div>
                <div className="mt-3 bg-light">
                    <Examiners examiners={examiners} toggleFetched={toggleFetched} courses={courses}/>
                </div>
            </Container>
            </div>
            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header>
                    <span className="fw-bold fs-3">Add Examiner</span>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                        <FloatingLabel 
                                label="Enter Examiner fullname" controlId="examinerName">
                                    <Form.Control type="text"
                                    onChange={(e)=>setFullname(e.target.value)}
                                    className="rounded-0 mb-3"
                                    placeholder="Enter fullname"/>
                            </FloatingLabel>
                            <FloatingLabel 
                                label="Enter Examiner mail" controlId="examinerEmail">
                                    <Form.Control type="text"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className="rounded-0 mb-3"
                                    placeholder="Enter email"/>
                            </FloatingLabel>
                            <FloatingLabel 
                                label="Enter Examiner password" controlId="examinerPass">
                                    <Form.Control type="password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className="rounded-0 mb-3"
                                    placeholder="Enter password"/>
                            </FloatingLabel>
                            <Form.Select onChange={(e)=>setCourse(e.target.value)} className="rounded-0 mb-3">
                                <option>-- Select Course --</option>
                                {
                                    courses && courses.map((c,idx)=>{
                                        return(
                                            <option value={c.id} key={idx}>{c.code}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <div className="text-center">
                                <Button className="rounded-0" onClick={(e)=>handleSubmit()}>Create</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    )
}