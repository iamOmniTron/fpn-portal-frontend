import {Container,Button,Modal,Table,Card} from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import StudentsTable from "./components/studentsTable";
import {useState,useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast"

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken"); 


export default function ExamStudents(){
    const [students,setStudents] = useState([]);
    const [unregisteredStudents,setUnRegistredStudents] = useState([]);
    const [fetched,setFetched] = useState(false);
    const [show,setShow] = useState(false);

    const toggleFetched = ()=>setFetched(!fetched);

    const registerStudent = async (c_id,e_id)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/exam/student/register/${e_id}/${c_id}`,{},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
              
              if(!response){
                  toast.error("error",{duration:4000,position:"top-center"});
                  return;
              }
              if(!response.success){
                  toast.error(response.error || response.message,{duration:4000,position:"top-center"});
                  return;
              }
              console.log(response);
              toast.success(response.message);
              setShow(false);
              toggleFetched()
        }catch(err){
            toast.error(err.message || "something went wrong");
        }
    }

    const fetchUnRegisteredStudents = async ()=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/exam/students/unregistered`,{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
              
              if(!response){
                  toast.error("error",{duration:4000,position:"top-center"});
                  return;
              }
              if(!response.success){
                  toast.error(response.error || response.message,{duration:4000,position:"top-center"});
                  return;
              }
              console.log(response.data)
              setUnRegistredStudents(response.data);
        }catch(err){
            toast.error(err.message || "something went wrong");
        }
    }

    const fetchStudents = async ()=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/exam/students/registred`,{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
              
              if(!response){
                  toast.error("error",{duration:4000,position:"top-center"});
                  return;
              }
              if(!response.success){
                  toast.error(response.error || response.message,{duration:4000,position:"top-center"});
                  return;
              }
              console.log("1",response.data)
              setStudents(response.data);
        }catch(err){
            toast.error(err.message || "something went wrong");
        }
    }
    useEffect(()=>{
        fetchStudents();
        fetchUnRegisteredStudents();
    },[fetched]);
    return(
        <>
        <Container>
            <div className="bg-light shadow-md p-4 mb-3 d-flex justify-content-between">
                <span className="fw-bold h3">Examination Candidates</span>
                <Button className="rounded-0" onClick={()=>setShow(true)}>
                    <PlusLg/>
                    Add Student
                </Button>
            </div>
            <div className="bg-light">
                <StudentsTable props={students} toggleFetched={toggleFetched}/>
            </div>
        </Container>
        <Modal show={show} onHide={()=>setShow(false)}>
            <Card>
                <Card.Header>
                    <span className="fw-bold">Register Students</span>
                </Card.Header>
                <Card.Body>
                <Table striped bordered hover responsive size="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>FULL NAME</th>
                        <th>MATRIC NUMBER</th>
                        <th>GENDER</th>
                        <th>DEPARTMENT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        unregisteredStudents && unregisteredStudents.map((el,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>
                                        {idx +1}
                                    </td>
                                    <td>
                                        {el.firstname} {el.middlename} {el.lastnumber}
                                    </td>
                                    <td>
                                        {el.matricNumber}
                                    </td>
                                    <td>
                                        {el.gender}
                                    </td>
                                    <td>{el.Admission.Department.name}</td>
                                    <td>
                                        <Button className="btn-success rounded-0"
                                        onClick={()=>{
                                            registerStudent(el.id,el.RegisteredCourses[0].Course.Examiner.Exam.id)
                                        }
                                            }>Register</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
                </Card.Body>
            </Card>
        </Modal>
        </>
    )
}