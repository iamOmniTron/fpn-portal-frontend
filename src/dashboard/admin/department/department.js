import {useState,useEffect} from "react";
import { Button, Container,Modal,Card, FloatingLabel,Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import axios from "axios";
import Table from "./table";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function Department(){
    const [schools,setSchools] = useState([]);
    const [createShow,setCreateShow] = useState(false);
    const [fetched,setFetched] = useState(false)
    const [school,setSchool] = useState("");
    const [totalUnits,setTotalUnits] = useState(0);
    const [departments,setDepartments] = useState([]);
    const [departmentName,setDepartmentName] = useState("");

    const toggleFetched = ()=>setFetched(!fetched);

    const createDepartment = async(e)=>{
        e.preventDefault();
        setFetched(false);
        const {data:response} = await axios.post(`${SERVER_URL}/department/${school}`,{
            name:departmentName,totalCreditUnit:+(totalUnits)
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
        toggleFetched();
        return;

    }

    const fetchDepartments = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/departments`);
        console.log(response);
        if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setDepartments(response.data);
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

    useEffect(()=>{
        fetchSchools();
        fetchDepartments()
    },[fetched]);
    return (
        <>
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Departments</span>
                </div>
                <Container className="bg-light text-light">
                    <div className="mt-3">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="text-warning my-3 fs-5">
                                View All Departments
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
                    <Table props={departments} schools={schools} toggleFetched={toggleFetched}/>
                </Container>
                <Modal show={createShow} onHide={()=>setCreateShow(false)}>
                    <Modal.Header closeButton className="pb-0">
                        <span className="fs-4 fw-bold">Add new Department</span>
                    </Modal.Header>
                    <Card className="m-4 rounded-0 shadow-lg">
                        <Card.Body>
                            <Form>
                                <FloatingLabel 
                                label="Enter Department Name" className="mb-3" controlId="departmentName">
                                    <Form.Control type="text"
                                    onChange={(e)=>setDepartmentName(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter Department name"/>
                                </FloatingLabel>
                                <FloatingLabel 
                                label="Enter Total Credit Unit Per Semester" className="mb-3" controlId="tcups">
                                    <Form.Control type="number"
                                    onChange={(e)=>setTotalUnits(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter total credit unit per semester"/>
                                </FloatingLabel>
                                <Form.Select onChange={(e)=>setSchool(e.target.value)}>
                                    <option>--Select School --</option>
                                    {
                                        schools && schools.map((el,idx)=>{
                                            return(
                                                <option key={idx} value={el.id}>
                                                {el.name} {el.Program.name}
                                                </option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                <div className="text-center mt-3">
                                    <Button className="rounded-0 bt-success"
                                    onClick={createDepartment}
                                    >
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