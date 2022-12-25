import {Button, Table,Modal,Form,FloatingLabel,Card} from "react-bootstrap";
import {PencilSquare, Trash} from "react-bootstrap-icons"
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function Examiners({examiners,courses,toggleFetched}){
    const [examiner,setExaminer] = useState({});
    const [password,setPassword] = useState("");
    const [editShow,setEditShow] = useState(false);
    const [email,setEmail] = useState("");
    const [course,setCourse] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {data:response} = await axios.post(`${SERVER_URL}/examiner/edit/${examiner.id}/${course}`,{
            email,password,
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        console.log(response);
        if(!response){
            setEditShow(false);
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            setEditShow(false);
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        toast.success(response.message)
        setEditShow(false);
        toggleFetched()
        return;

    }


    const deleteItem = async (id)=>{
        const {data:response} = await axios.post(`${SERVER_URL}/examiner/delete/${id}`,{},{
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
        toast.success(response.message,{duration:4000,position:"top-center"});
        toggleFetched()
        return;

    }

    const handleEdit = async(id)=>{
        const {data:response} = await axios.get(`${SERVER_URL}/examiner/${id}`,{
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
        setExaminer(response.data);
        setCourse(response.data.CourseId);
        setEditShow(true)
        return;
    }


    return(
        <>
            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>EMAIL</th>
                        <th>COURSE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        examiners && examiners.map((examiner,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{examiner.email}</td>
                                    <td>{examiner.Course.code}</td>
                                    <td className="d-flex justify-content-around">
                                        <Button className="btn-sm rounded-0" onClick={()=>handleEdit(examiner.id)}>
                                            <PencilSquare className="me-2"/>    
                                           Edit
                                        </Button>
                                        <Button className="btn-sm rounded-0 btn-danger" onClick={()=>deleteItem(examiner.id)}>
                                            <Trash className="me-2"/>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Modal show={editShow} onHide={()=>setEditShow(false)}>
                <Modal.Header>
                    <span className="fw-bold fs-3">Add Examiner</span>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <FloatingLabel 
                                label="Enter Examiner mail" controlId="examinerEmail">
                                    <Form.Control type="text"
                                    value={examiner.email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className="rounded-0 mb-3"
                                    placeholder="Enter email"/>
                            </FloatingLabel>
                            <FloatingLabel 
                                label="Enter Examiner password" controlId="examinerPass">
                                    <Form.Control type="password"
                                    value={examiner.password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className="rounded-0 mb-3"
                                    placeholder="Enter password"/>
                            </FloatingLabel>
                            <Form.Select onChange={(e)=>setCourse(e.target.value)} className="rounded-0 mb-3">
                                <option>-- Select Course --</option>
                                {
                                    courses && courses.map((c,idx)=>{
                                        return(
                                            <option value={c.id} key={idx}>{c.code}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            <div className="text-center">
                                <Button className="rounded-0" onClick={()=>handleSubmit()}>Update</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    )
}