import {useState,useEffect} from "react";
import { Button, Container,Modal,Card, FloatingLabel,Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import axios from "axios";
import Table from "./table";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function School(){
    const [schools,setSchools] = useState([]);
    const [createShow,setCreateShow] = useState(false);
    const [fetched,setFetched] = useState(false)
    const [schoolName,setSchoolName] = useState("");
    const [programs,setPrograms] = useState([]);
    const [program,setProgram] = useState(0);

    const toggleFetched = ()=> setFetched(!fetched);

    const createSchool = async(e)=>{
        e.preventDefault();
        const {data:response} = await axios.post(`${SERVER_URL}/school`,{
            name:schoolName,programId:+(program)
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        console.log(response);
        if(!response){
            setCreateShow(false);
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            setCreateShow(false);
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setCreateShow(false);
        toggleFetched()
        return;

    }

    const fetchSchools = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/schools`);
        console.log(response);
        if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setSchools(response.data);
        return;
    }

    const fetchPrograms = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/programs`);
        console.log(response);
        if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setPrograms(response.data);
        return;
    }

    useEffect(()=>{
        fetchSchools();
        fetchPrograms();
    },[fetched]);
    return (
        <>
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Schools</span>
                </div>
                <Container className="bg-light text-light">
                    <div className="mt-3">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="text-warning my-3 fs-5">
                                View All Schools
                            </div>
                            <div>
                                    <Button className="rounded-0" 
                                    onClick={()=>setCreateShow(true)}
                                    >
                                        <PlusLg/>
                                        Create
                                    </Button>
                            </div>
                        </div>
                    </div>
                    <Table props={schools} toggleFetched={toggleFetched} programs={programs}/>
                </Container>
                <Modal show={createShow} onHide={()=>setCreateShow(false)}>
                    <Modal.Header closeButton className="pb-0">
                        <span className="fs-4 fw-bold">Add new School</span>
                    </Modal.Header>
                    <Card className="m-4 rounded-0 shadow-lg">
                        <Card.Body>
                            <Form>
                                <FloatingLabel 
                                label="Enter School" controlId="schoolName">
                                    <Form.Control type="text"
                                    onChange={(e)=>setSchoolName(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter school name"/>
                                </FloatingLabel>
                                <Form.Select className="rounded-0 mt-3" onChange={(e)=>setProgram(e.target.value)}>
                                    <option>-- select program --</option>
                                    {
                                        programs && programs.map((p,idx)=>{
                                            return(
                                                <option value={p.id} key={idx}>{p.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                <div className="text-center mt-3">
                                    <Button className="rounded-0 bt-success"
                                    onClick={createSchool}>
                                        Create
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal>    
            </div>
        </>
    )
}