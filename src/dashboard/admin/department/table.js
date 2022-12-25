import {Table as Tb,Button,Modal,Card,Form,FloatingLabel} from "react-bootstrap"
import {PencilSquare,Trash} from "react-bootstrap-icons"
import toast from "react-hot-toast";
import axios from "axios";
import {useState} from "react";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


export default function Table({props,schools,toggleFetched}){
    const [item,setItem] = useState({});
    const [editShow,setEditShow] = useState(false);
    const [departmentName,setDepartmentName] = useState("");
    const [totalCreditUnits,setTotalCreditUnits] = useState(0);
    const [school,setSchool] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(school)
        const {data:response} = await axios.post(`${SERVER_URL}/department/edit/${item.id}/${school}`,{
            name:departmentName,totalCreditUnits:+(totalCreditUnits)
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
        toggleFetched();
        return;

    }

    const deleteItem = async(id)=>{
        const {data:response} = await axios.post(`${SERVER_URL}/department/delete/${id}`,{
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
        toggleFetched();
        return;
    }  

    
    const handleEdit = async(id)=>{
        const {data:response} = await axios.get(`${SERVER_URL}/department/${id}/`);
        if(!response){
            toast.error("inavlid query",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        console.log(response)
        setItem(response.data);
        setSchool(response.data.School.id);
        setDepartmentName(response.data.name)
        setTotalCreditUnits(response.data.totalCreditUnits);
        setEditShow(true)
        return;
    }
    return(
        <>
            <Tb striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>SCHOOL</th>
                        <th>TOTAL CREDIT UNITS</th>
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
                                <td>{el.School.name} {el.School.Program.name}</td>
                                <td>{el.totalCreditUnit}</td>
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
                        <span className="fs-4 fw-bold">Edit Department</span>
                    </Modal.Header>
                    <Card className="m-4 rounded-0 shadow-lg">
                        <Card.Body>
                            <Form>
                                <FloatingLabel 
                                label="Enter Name" controlId="depName" className="mb-3">
                                    <Form.Control type="text"
                                    value={departmentName}
                                    onChange={(e)=>setDepartmentName(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter department name"/>
                                </FloatingLabel>
                                <FloatingLabel 
                                label="Enter Total Credit Unit Per Semester" controlId="tcups" className="mb-3">
                                    <Form.Control type="text"
                                    value={departmentName}
                                    onChange={(e)=>setTotalCreditUnits(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter total credit units"/>
                                </FloatingLabel>
                                <Form.Select className="rounded-0" onChange={(e)=>setSchool(e.target.value)}>
                                    <option>-- select school --</option>
                                    {
                                        schools && schools.map((el)=>{
                                            return(
                                                <option key={el.id} value={el.id}>{el.name}</option>
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