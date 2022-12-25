import {useState,useEffect} from "react";
import { Button, Container,Modal,Card, FloatingLabel,Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import axios from "axios";
import Table from "./table";


const token = localStorage.getItem("authenticationToken");

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Course(){
    const [courses,setCourses] = useState([]);
    const [createShow,setCreateShow] = useState(false);
    const [fetched,setFetched] = useState(false)
    const [department,setDepartment] = useState("");
    const [departments,setDepartments] = useState([]);
    const [courseName,setCourseName] = useState("");
    const [level,setLevel] = useState("");
    const [semester,setSemester] = useState(1);
    const [courseUnit,setCourseUnit] = useState(0);
    const [courseCode,setCourseCode] = useState("");
    const [type,setType] = useState("");

    const toggleFetched = ()=> setFetched(!fetched);

    const createCourse = async(e)=>{
        e.preventDefault();
        setFetched(false);
        const {data:response} = await axios.post(`${SERVER_URL}/course/${department}`,{
            title:courseName,unit:courseUnit,code:courseCode,type,semester:+(semester),level
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

    const fetchCourses = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/courses`);
        console.log(response);
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
    }

    useEffect(()=>{
        fetchCourses();
        fetchDepartments()
    },[fetched]);
    return (
        <>
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Courses</span>
                </div>
                <Container className="bg-light text-light">
                    <div className="mt-3">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="text-warning my-3 fs-5">
                                View All Courses
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
                    <Table props={courses} departments={departments} toggleFetched={toggleFetched}/>
                </Container>
                <Modal show={createShow} onHide={()=>setCreateShow(false)}>
                    <Modal.Header closeButton className="pb-0">
                        <span className="fs-4 fw-bold">Add new Course</span>
                    </Modal.Header>
                    <Card className="m-4 rounded-0 shadow-lg">
                        <Card.Body>
                            <Form>
                                <FloatingLabel 
                                label="Enter Course Title" className="mb-3" controlId="courseTitle">
                                    <Form.Control type="text"
                                    onChange={(e)=>setCourseName(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter Course title"/>
                                </FloatingLabel>
                                <FloatingLabel 
                                label="Enter Course Code" className="mb-3" controlId="courseCode">
                                    <Form.Control type="text"
                                    onChange={(e)=>setCourseCode(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter Course Semester"/>
                                </FloatingLabel>
                                <Form.Select  className="mb-3" onChange={(e)=>setSemester(e.target.value)}>
                                    <option>-- Select Course Semester --</option>
                                    <option value={1}>First</option>
                                    <option value={2}>Second</option>
                                </Form.Select>
                                <Form.Select  className="mb-3" onChange={(e)=>setLevel(e.target.value)}>
                                    <option>-- Select Course Type</option>
                                    <option value="nd1">ND 1</option>
                                    <option value="nd2">ND 2</option>
                                    <option value="hnd1">HND 1</option>
                                    <option value="hnd2">HND 2</option>
                                </Form.Select>
                                <FloatingLabel 
                                label="Enter Course unit" className="mb-3" controlId="courseUnit">
                                    <Form.Control type="number"
                                    onChange={(e)=>setCourseUnit(+(e.target.value))}
                                    className="rounded-0"
                                    placeholder="Enter Course unit"/>
                                </FloatingLabel>
                                <Form.Select className="mb-3" onChange={(e)=>setDepartment(e.target.value)}>
                                    <option>--Select Department --</option>
                                    {
                                        departments && departments.map((el,idx)=>{
                                            return(
                                                <option key={idx} value={el.id}>
                                                {el.name}
                                                </option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                <Form.Select  className="mb-3" onChange={(e)=>setType(e.target.value)}>
                                    <option>-- Select Course Type</option>
                                    <option value="General">General</option>
                                    <option value="Departmental">Departmental</option>
                                </Form.Select>
                                <div className="text-center mt-3">
                                    <Button className="rounded-0 bt-success"
                                    onClick={createCourse}
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