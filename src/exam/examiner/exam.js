import { Container,Card,Button,Form,FloatingLabel,Modal,Row,Col} from "react-bootstrap";
import { PencilSquare,PlusLg } from "react-bootstrap-icons";
import ExamsTable from "./components/examsTable";
import {useState,useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../dashboard/admin/components/loader";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");
// const id = localStorage.getItem("e_id");

export default function Exams(){
    const [editShow,setEditShow] = useState(false);
    const [exam,setExam] = useState({});
    const [duration,setDuration] = useState("");
    const [active,setActive] = useState(false);
    const [fetched,setFetched] = useState(false);
    const [createShow,setCreateShow] = useState(false);
    const [question,setQuestion] = useState("");
    const [option1,setOption1] = useState({});
    const [option2,setOption2] = useState({});
    const [option3,setOption3] = useState({});
    const [option4,setOption4] = useState({});
    const [questions,setQuestions] = useState([]);

    const toggleFetched = ()=> setFetched(!fetched);

    const fetchQuestions = async ()=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/exam/questions`,{
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
            setQuestions(response.data)
            return;
        }catch(err){
            toast.error(err.message || "something went wrong")
        }
    }

    const createQuestion = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/exam/question/${exam.id}`,{
                text:question,options:[option1,option2,option3,option4]
            },{
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
            setCreateShow(false);
            toast.success(response.message);
            toggleFetched();
        }catch(err){
            toast.err(err.message || "something went wrong")
        }
    }

    const handleSubmit = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/exam/update/${exam.id}`,{
                duration:+(duration),active: active === "true" ? true : false
            },{
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
            setEditShow(false);
            toast.success(response.message);
            toggleFetched();
        }catch(err){
            toast.error(err.message || "something went wrong");
        }
    }

    const fetchExaminer = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/exam/examiner`,{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          });
          console.log(response)
          if(!response){
              toast.error("error",{duration:4000,position:"top-center"});
              return;
          }
          if(!response.success){
              toast.error(response.error || response.message,{duration:4000,position:"top-center"});
              return;
          }
          setExam(response.data);
          setDuration(response.data.duration);
          setActive(response.data.active);
          return;
    }

    useEffect(()=>{
        fetchExaminer();
        fetchQuestions();
    },[fetched])
    return(
        <>
        {
            Object.keys(exam).length < 1 ? <Loader/> : 
            <Container>
                <div className="bg-light shadow-md p-4 mb-3">
                   <span className="fw-bold h3">Exam Details</span>
                </div>
                <Card className="rounded-0 shadow-lg mb-4">
                    <Card.Body className="d-flex flex-column gap-2">
                        <span>Title : {exam.Course.title}</span>
                        <span>Course Code : {exam.Course.code}</span>
                        <span>Duration : {exam.duration} minutes</span>
                        <span>Status : {exam.active ? "Active":"Inactive"}</span>
                        <div className="text-center">
                            <Button className="rounded-0" onClick={()=>setEditShow(true)}>
                                Edit Details
                                <PencilSquare/>
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="rounded-0 shadow-lg">
                    <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                        <h3>Questions</h3>
                        <Button className="rounded-0" onClick={()=>setCreateShow(true)}>
                            <PlusLg/>
                            Add Question
                        </Button>
                        </div>
                        <div>
                            <ExamsTable props={questions} toggleFetched={toggleFetched}/>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        }
        <Modal show={editShow} onHide={()=>setEditShow(false)}>
                <Card>
                    <Card.Header>
                        <span className="fw-bold">Edit Exam Details</span>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Duration"
                            className="mb-3 rounded-0"
                        >
                            <Form.Control type="number" onChange={(e)=>setDuration(e.target.value)} className="rounded-0" placeholder="duration"/>
                        </FloatingLabel>
                        <Form.Select className="rounded-0 mb-3" onChange={(e)=>setActive(e.target.value)}>
                            <option>--Select Active State--</option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </Form.Select>
                        <div className="text-center">
                            <Button className="rounded-0 btn-info" onClick={()=>handleSubmit()}>
                                Update
                            </Button>
                        </div>
                        </Form>
                    </Card.Body>
                </Card>
        </Modal>

        <Modal show={createShow} onHide={()=>setCreateShow(false)}>
            <Card>
                <Card.Header className="text-center">
                    <span className="fw-bold">Add Exam Question</span>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <span className="fw-bold">Question</span>
                        <Form.Control as="textarea" row={3} onChange={(e)=>setQuestion(e.target.value)} placeholder="type question"/>
                        <span className="fw-bold">Option 1</span>
                        <Row className="mb-2">
                            <Col className="col-12 col-md-8">
                                <Form.Control as="textarea" onChange={(e)=>{
                                    setOption1({text:e.target.value})
                                }} required row={2} placeholder="enter option one"/>
                            </Col>
                            <Col className="col-12 col-md-4">
                                <Form.Select onChange={(e)=>{
                                    setOption1({...option1,isAnswer:e.target.value === "true"})
                                }} placeholder="select answer">
                                    <option>-- select option --</option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <span className="fw-bold">Option 2</span>
                        <Row className="mb-2">
                            <Col className="col-12 col-md-8">
                                <Form.Control as="textarea" onChange={(e)=>{
                                    setOption2({text:e.target.value})
                                }} required row={2} placeholder="enter option two"/>
                            </Col>
                            <Col className="col-12 col-md-4">
                                <Form.Select placeholder="select answer" onChange={(e)=>{
                                    setOption2({...option2,isAnswer:e.target.value === "true"})
                                }}>
                                    <option>-- select option --</option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <span className="fw-bold">Option 3</span>
                        <Row className="mb-2">
                            <Col className="col-12 col-md-8">
                                <Form.Control as="textarea" onChange={(e)=>{
                                    setOption3({text:e.target.value})
                                }} required row={2} placeholder="enter option three"/>
                            </Col>
                            <Col className="col-12 col-md-4">
                                <Form.Select placeholder="select answer" onChange={(e)=>{
                                    setOption3({...option3,isAnswer:e.target.value === "true"})
                                }}>
                                    <option>-- select option --</option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <span className="fw-bold">Option 4</span>
                        <Row className="mb-2">
                            <Col className="col-12 col-md-8">
                                <Form.Control as="textarea" onChange={(e)=>{
                                    setOption4({text:e.target.value})
                                }} required row={2} placeholder="enter option four"/>
                            </Col>
                            <Col className="col-12 col-md-4">
                                <Form.Select placeholder="select answer" onChange={(e)=>{
                                    setOption4({...option4,isAnswer:e.target.value === "true"})
                                }}>
                                    <option>-- select option --</option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="rounded-0" onClick={()=>createQuestion()}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Modal>
        </>
    )
}