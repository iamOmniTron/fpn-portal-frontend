import {Table as Tb,Button,Modal,Card,Form,FloatingLabel} from "react-bootstrap"
import {PencilSquare,Trash} from "react-bootstrap-icons"
import toast from "react-hot-toast";
import axios from "axios";
import {useState} from "react";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


export default function Table({props,toggleFetched,programs}){
    const [item,setItem] = useState({});
    const [editShow,setEditShow] = useState(false);
    const [schoolName,setSchoolName] = useState("");
    const [program,setProgram] = useState(1);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {data:response} = await axios.post(`${SERVER_URL}/school/edit/${item.id}`,{
            name:schoolName,program:+(program)
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
        setEditShow(false);
        toggleFetched()
        return;

    }

    const deleteItem = async(id)=>{
        const {data:response} = await axios.post(`${SERVER_URL}/school/delete/${id}`,{},{
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
        const {data:response} = await axios.get(`${SERVER_URL}/school/${id}`);
        if(!response){
            toast.error("inavlid query",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setItem(response.data)
        setEditShow(true)
        setSchoolName(response.data.name)
        return;
    }
    return(
        <>
            <Tb striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>PROGRAM</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
            {
                props && props.map((el,idx)=>{
                    return(
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.Program.name}</td>
                                <td className="d-flex justify-content-around">
                            <Button className="btn-small rounded-0 btn-primary"
                            onClick={(e)=>handleEdit(el.id)}>
                            <PencilSquare/>Edit
                            </Button>
                            <Button className="btn-small rounded-0 btn-danger" onClick={e=>{
                                e.preventDefault();
                                deleteItem(el.id)}}>
                                <Trash/>Delete
                            </Button>
                        </td>
                            </tr>
                    )
                })
            }
            </tbody>
            </Tb>
            <Modal show={editShow} onHide={()=>setEditShow(false)}>
            <Modal.Header closeButton className="pb-0">
                        <span className="fs-4 fw-bold">Edit School</span>
                    </Modal.Header>
                    <Card className="m-4 rounded-0 shadow-lg">
                        <Card.Body>
                            <Form>
                                <FloatingLabel 
                                label="Enter School Name" controlId="schoolName">
                                    <Form.Control
                                    value={schoolName} type="text"
                                    onChange={(e)=>setSchoolName(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter school name"/>
                                </FloatingLabel>
                                <Form.Select className="rounded-0 mt-3" onChange={(e)=>setProgram(e.target.value)}>
                                    <option>-- select program --</option>
                                    {
                                        programs && programs.map((p,idx)=>{
                                            return(
                                                <option value={p.id} key={idx}>{p.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                <div className="text-center mt-3">
                                    <Button className="rounded-0 bt-success"
                                    onClick={handleSubmit}>
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