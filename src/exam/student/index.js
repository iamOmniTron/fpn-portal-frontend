import { Alert, Container } from "react-bootstrap";
import ExamsTable from "./components/examsTable";
import axios from "axios";
import toast from "react-hot-toast";
import { useState,useEffect } from "react";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


export default function StudentExamIndex(){
        const [exams,setExams] = useState([]);


        const fetchExamQuestions = async ()=>{
            try{
                const {data:response} = await axios.get(`${SERVER_URL}/student/exams`,{
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
                setExams(response.data)
                return;
            }catch(err){
                toast.error(err.message || "something went wrong");
            }
        }

        useEffect(()=>{
            fetchExamQuestions();
        },[])

    return(
        <>
            <Container>
                <Alert variant="info" className="rounded-0">
                    Welcome to your exam portal
                </Alert>

                <div className="bg-light p-2 mb-3">
                    <span className="fw-bold h3">Exams</span>
                </div>
                <div className="bg-light p-2">
                        <ExamsTable props={exams}/>
                </div>
            </Container>
        </>
    )
}