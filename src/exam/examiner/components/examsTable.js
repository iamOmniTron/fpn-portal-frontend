import {Table,Button,Card,Form,Row,Col,Modal} from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import {useState} from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function ExamsTable({props,toggleFetched}){
    const [exam,setExam] = useState({});
    const [show,setShow] = useState(false);
    const [question,setQuestion] = useState("");
    const [option1,setOption1] = useState({});
    const [option2,setOption2] = useState({});
    const [option3,setOption3] = useState({});
    const [option4,setOption4] = useState({});


    const deleteItem = async(id)=>{
        const {data:response} = await axios.post(`${SERVER_URL}/exam/question/delete/${id}`,{},{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if(!response){
            toast.error("cannot delete item",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        toast.success(response.message,{duration:4000,position:"top-center"});
        toggleFetched()
        return;
    }


    const handleEdit = async(id)=>{
        const {data:response} = await axios.get(`${SERVER_URL}/exam/question/${id}`,{
            headers:{
                "Authorization":`Bearer ${token}`
              }
        });
        if(!response){
            toast.error("inavlid query",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        console.log(response.data.Options[0])
        setExam(response.data);
        setQuestion(response.data.text);
        setOption1(response.data.Options[0])
        setOption2(response.data.Options[1])
        setOption3(response.data.Options[2])
        setOption4(response.data.Options[3])
        setShow(true)
        return;
    }
    



    return(
        <>
        <Table striped bordered hover responsive size="lg">
            <thead>
            <tr>
                <th>#</th>
                <th>Question</th>
                <th>Options</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                    props && props.map((el,idx)=>{
                        return(
                            <tr key={idx}>
                                    <td>
                                        {idx +1}
                                    </td>
                                    <td>{el.text}</td>
                                    <td>
                                        <Button className="rounded-0 btn-success" onClick={()=>handleEdit(el.id)}>
                                            View Options
                                        </Button>
                                    </td>
                                    <td className="d-flex gap-2">
                                        <Button className="rounded-0" onClick={()=>handleEdit(el.id)}>
                                            View
                                        </Button>
                                        <Button className="btn-danger rounded-0" onClick={()=>deleteItem(el.id)}>
                                            Delete
                                        </Button>
                                    </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>


        <Modal show={show} onHide={()=>setShow(false)}>
            <Card>
                <Card.Header className="text-center">
                    <span className="fw-bold">Add Exam Question</span>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <span className="fw-bold">Question</span>
                        <Form.Control as="textarea" value={question}  row={3} onChange={(e)=>setQuestion(e.target.value)} placeholder="type question"/>
                        <span className="fw-bold">Option 1</span>
                        <Row className="mb-2">
                            <Col className="col-12 col-md-8">
                                <Form.Control as="textarea" value={option1.text} onChange={(e)=>{
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
                                <Form.Control value={option2.text} as="textarea" onChange={(e)=>{
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
                                <Form.Control value={option3.text} as="textarea" onChange={(e)=>{
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
                                <Form.Control value={option4.text} as="textarea" onChange={(e)=>{
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
                            <Button className="rounded-0">
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