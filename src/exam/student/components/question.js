import {Card,Form} from "react-bootstrap";
import QuestionOption from "./option";
import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken")


export default function Question({examId,exam,idx,index}){

    const [option,setOption] = useState("");
    const [responseId,setResponseId] = useState("");

    const answerQuestion = async (qid,opt)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/answer/question/${qid}/${examId}/${opt}`,{},{
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
            setResponseId(response.data);
            return;
        }catch(err){
            return;
        }
    }

    const updateAnswer = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/answer/update/${responseId}/${option}`,{},{
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
            setResponseId(response.data);
            return;
        }catch(err){
            return;
        }
    }

    return(
        <Card key={idx} style={{minWidth:"70vw",minHeight:"50vh",display:`${index === idx ? "block":"none"}`}}>
        <Card.Body>
        {/* Questions Container */}
        <div className="d-flex p-3 mb-3 flex-column gap-1" style={{minHeight:"35vh",backgroundColor:"lightgreen",border:"1px solid green"}}>
            <span className="fw-bold">Question {idx + 1}:</span>
            <p className="lead">
                {exam.text}
            </p>
        </div>
        {/* Options container */}
                <Form className="mb-2">
                    {
                        exam.Options && exam.Options.map((option,idx)=>{
                            return(
                                <QuestionOption key={idx} idx={idx} option={option} setOption={setOption} responseId={responseId} updateAnswer={updateAnswer} qid={exam.id} opt={option} answerQuestion={answerQuestion}/>
                            )
                        })
                    }
                </Form>
            </Card.Body>
        </Card>
    )
}