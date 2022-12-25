import { Card, Container,Button,Alert } from "react-bootstrap"
import { PersonFill } from "react-bootstrap-icons"
import {LinkContainer} from "react-router-bootstrap"
import {useState,useEffect} from "react";
import axios from "axios";
import Loader from "../../dashboard/admin/components/loader";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");
const id = localStorage.getItem("e_id");

export default function ExaminerProfile(){
    const [examiner,setExaminer] = useState({});
    const {state} = useLocation();

    const fetchExaminer = async ()=>{
        let e_id = state?.e_id || id;
        const {data:response} = await axios.get(`${SERVER_URL}/examiner/${e_id}`,{
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
          setExaminer(response.data);
          return;
    }

    useEffect(()=>{
        fetchExaminer();
    },[])

    return(
        <>
        {
            Object.keys(examiner).length < 1 ? <Loader/> :
            <Container>
            <Alert variant="info" className="w-100">
                    <span>Welcome {examiner.fullname}</span>
                </Alert>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{width:"100%",minHeight:"80vh"}}>
                    <Card className="shadow-lg rounded-0" style={{minWidth:"70%",minHeight:"70%"}}>
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                            <PersonFill style={{width:"5em",height:"5em"}}/>
                            <div className="d-flex p-4 shadow-md flex-column align-items-center gap-2" style={{border:"1px solid gray",width:"100%"}}>
                                <span>Name: {examiner.fullname}</span>
                                <span>Email: {examiner.email}</span>
                                <span>Course Code: {examiner.Course.code}</span>
                                <span>Course Title: {examiner.Course.title}</span>
                                <span>Course Unit: {examiner.Course.unit}</span>
                            </div>
                            <div className="mt-2">
                                <LinkContainer to="exams">
                                    <Button className="btn-lg rounded-0">
                                        Go to Exam
                                    </Button>
                                </LinkContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        }
        </>
    )
}