import {useState,useEffect} from "react";
import { Button, Container,Modal,Card, Table as Tb} from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import axios from "axios";
import Table from "./table";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


export default function StudentCourse(){
    const [availableCourses,setAvailableCourses] = useState([]);
    const [createShow,setCreateShow] = useState(false);
    const [registeredCourses,setRegisteredCourses] = useState([]);
    const [fetched,setFetched] = useState(false)

    const toggleFetched = ()=> setFetched(!fetched);

    const registerCourse = async (id)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/course/register`,{
                courseId:id
            },{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response){
                toast.error("cannot register course at the moment",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error | response.message,{duration:4000,position:"top-center"});
                return;
            }
            toast.success(response.message,{duration:4000,position:"top-center"});
            toggleFetched();
            setCreateShow(false);
            return;
        }catch(err){
            toast.error(err.message | "something went wrong");
        }
    }

    const fetchRegisteredCourses = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/course/registered`,{
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
        setRegisteredCourses(response.data)
        return;
    }


    const fetchAvailableCourse = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/courses/available`,{
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
        setAvailableCourses(response.data);
        return;
    }

    useEffect(()=>{
        fetchAvailableCourse();
        fetchRegisteredCourses();
    },[fetched])

    return(
        <>
         <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Courses</span>
                </div>
                <Container className="bg-light text-light">
                    <div className="mt-3">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="text-warning my-3 fs-5">
                                View All Courses Available To you
                            </div>
                            <div>
                                    <Button className="rounded-0" 
                                    onClick={()=>setCreateShow(true)}
                                    >
                                        <PlusLg/>
                                        Register Course
                                    </Button>
                            </div>
                        </div>
                    </div>
                    <Table props={registeredCourses} toggleFetched={toggleFetched}/>
                </Container>
                <Modal show={createShow} onHide={()=>setCreateShow(false)}>
                    <Modal.Header closeButton className="pb-0">
                    <span className="fs-4 fw-bold">Available Course List</span>
                    </Modal.Header>
                    <Card className="m-4 rounded-0 shadow-lg">
                        <Card.Body>
                            <Tb striped bordered hover responsive size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>CODE</th>
                                    <th>TITLE</th>
                                    <th>UNIT</th>
                                    <th>TYPE</th>
                                    <th>ACTION</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        availableCourses && availableCourses.map((el,idx)=>{
                                            return(
                                                <tr key={idx}>
                                                    <td>{idx + 1}</td>
                                            <td>{el.code}</td>
                                            <td>{el.title}</td>
                                            <td>{el.unit}</td>
                                            <td>{el.type}</td>
                                            <td>
                                            <Button className="btn-sm rounded-0" onClick={(e)=>registerCourse(el.id)}>
                                           <PlusLg/> 
                                            Register
                                        </Button>
                                            </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Tb>
                        </Card.Body>
                    </Card>
                </Modal>
                </div>
        </>
    )
}