import {Table as Tb,Button,Modal,Card,Form,FloatingLabel} from "react-bootstrap"
import {PencilSquare,Trash} from "react-bootstrap-icons"
import toast from "react-hot-toast";
import axios from "axios";
import {useState} from "react";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

const SEMESTERS = {
    1:"First",
    2:"Second"
};


export default function Table({props,departments,toggleFetched}){
    const [item,setItem] = useState({});
    const [editShow,setEditShow] = useState(false);
    const [department,setDepartment] = useState("");
    const [courseTitle,setCourseTitle] = useState("");
    const [level,setLevel] = useState("");
    const [courseCode,setCourseCode] = useState("");
    const [semester,setSemester] = useState(1)
    const [courseUnit,setCourseUnit] = useState("");
    const [courseType,setCourseType] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {data:response} = await axios.post(`${SERVER_URL}/course/edit/${item.id}/${department}`,{
            title:courseTitle,unit:courseUnit,type:courseType,code:courseCode,departmentId:department,semester:+(semester),level
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
        const {data:response} = await axios.post(`${SERVER_URL}/course/delete/${id}`,{},{
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
        const {data:response} = await axios.get(`${SERVER_URL}/course/${id}`);
        console.log(response)
        if(!response){
            toast.error("invalid query",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        console.log(response)
        setItem(response.data);
        setDepartment(response.data.Department.id);
        setCourseTitle(response.data.title);
        setCourseCode(response.data.code);
        setCourseUnit(response.data.unit);
        setSemester(response.data.semester);
        setCourseType(response.data.type);
        setEditShow(true)
        return;
    }
    return(
        <>
            <Tb striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TITLE</th>
                        <th>CODE</th>
                        <th>TYPE</th>
                        <th>UNIT</th>
                        <th>LEVEL</th>
                        <th>SEMESTER</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
            {
                props && props.map((el,idx)=>{
                    return(
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{el.title}</td>
                                <td>{el.code}</td>
                                <td>{el.type}</td>
                                <td>{el.unit}</td>
                                <td>{el.level}</td>
                                <td>{el.semester}</td>
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
                        <span className="fs-4 fw-bold">Edit Course</span>
                    </Modal.Header>
                    <Card className="m-4 rounded-0 shadow-lg">
                        <Card.Body>
                            <Form>
                                <FloatingLabel 
                                label="Enter Course Title" controlId="courseTitle" className="mb-3">
                                    <Form.Control type="text"
                                    value={courseTitle}
                                    onChange={(e)=>setCourseTitle(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter course title"/>
                                </FloatingLabel>
                                <FloatingLabel 
                                label="Enter Course Code" controlId="courseCode" className="mb-3">
                                    <Form.Control type="text"
                                    value={courseCode}
                                    onChange={(e)=>setCourseCode(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter course code"/>
                                </FloatingLabel>
                                <FloatingLabel 
                                label="Enter Course Unit" controlId="courseUnit" className="mb-3">
                                    <Form.Control type="text"
                                    value={courseUnit}
                                    onChange={(e)=>setCourseUnit(e.target.value)}
                                    className="rounded-0"
                                    placeholder="Enter course unit"/>
                                </FloatingLabel>
                                <Form.Select  className="mb-3" onChange={(e)=>setSemester(e.target.value)}>
                                    <option>-- Select Course Type</option>
                                    <option value={1}>First</option>
                                    <option value={2}>Second</option>
                                </Form.Select>
                                <Form.Select  className="mb-3" onChange={(e)=>setLevel(e.target.value)}>
                                    <option>-- Select Course Type</option>
                                    <option value="nd1">ND 1</option>
                                    <option value="nd2">ND 2</option>
                                    <option value="hnd1">HND 1</option>
                                    <option value="hnd2">HND 2</option>
                                </Form.Select>
                                <Form.Select className="rounded-0 mb-3" onChange={(e)=>setCourseType(e.target.value)}>
                                    <option>-- select course type</option>
                                    <option value="General">General</option>
                                    <option value="Departmental">Departmental</option>
                                </Form.Select>

                                <Form.Select className="rounded-0" onChange={(e)=>setDepartment(e.target.value)}>
                                    <option>-- select department --</option>
                                    {
                                        departments && departments.map((el)=>{
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