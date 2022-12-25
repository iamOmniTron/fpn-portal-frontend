import {Container,Button} from "react-bootstrap";
import { CaretLeftFill,CaretRightFill, Question } from "react-bootstrap-icons";
import axios from "axios";
import toast from "react-hot-toast";
import {useState,useEffect} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import Loader from "../../dashboard/admin/components/loader";
import Timer from "./components/timer";
import ExamGrid from "./components/exam";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


export default function StudentExam(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const [exam,setExam] = useState({});
    const [index,setIndex] = useState(0);


    const quitExam = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/exam/stop/${state}`,{},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            if(!response){
                toast.error("error",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error || response.message,{duration:4000,position:"top-center"});
                return;
            }
            toast.success(response.message);
            return navigate("/exam/student/results");
        }catch(err){
            toast.error(err.message||"something went wrong");
        }
    }

    const endExam = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/exam/end/${state}`,{},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            if(!response){
                toast.error("error",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error || response.message,{duration:4000,position:"top-center"});
                return;
            }
            toast.success(response.message);
            return navigate("/exam/student/results");
        }catch(err){
            toast.error(err.message||"something went wrong");
        }
    }

    const fetchQuestion = async ()=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/exam/start/${state}`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            if(!response){
                toast.error("error",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error || response.message,{duration:4000,position:"top-center"});
                return;
            }
            console.log(response.data);
            setExam(response.data);
        }catch(err){
            toast.error(err.message || "something went wrong");
        }
    }

    useEffect(()=>{
        fetchQuestion();
    },[])
    return(
        <>
        {Object.keys(exam).length < 1? <Loader/> : 
        <div style={{backgroundColor:"lightgray",width:"100vw"}}>
            <Container style={{minHeight:"100vh"}}>
                <div className="text-end">
                    <Timer time={+(exam.duration) *60} cb={quitExam}/>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"auto"}}>
                    <div className="d-flex justify-content-start" style={{minWidth:"70vw"}}>
                        <div className="p-2 pe-2" style={{backgroundColor:"white",width:"auto"}}>
                        <span className="fw-bold">{exam.Course.title}</span>
                        </div>
                    </div>
                    <ExamGrid examId={exam.id} exams={exam.Questions} index={index}/>
                    <div>
                    <div className="d-flex gap-2 mt-2">
                        <Button className="rounded-0 btn-success" onClick={()=>setIndex((index === 0?0: index -1))}>
                            <CaretLeftFill/>
                            Prev
                        </Button>
                        <Button className="rounded-0 btn-success" onClick={()=>setIndex((index === (exam.Questions.length -1)? (exam.Questions.length -1): index +1))}>
                            Next
                            <CaretRightFill/>
                        </Button>
                    </div>
                    <div className="d-flex mt-3 gap-2 justify-content-end" style={{minWidth:"70vw"}}>
                        <Button className="btn-danger rounded-0" onClick={()=>quitExam()}>Quit Exam</Button>
                        <Button className="btn-success rounded-0" onClick={()=>endExam()}>Submit Exam</Button>
                    </div>
                    </div>
                </div>
            </Container>
        </div>
        }
        </>
    )
}