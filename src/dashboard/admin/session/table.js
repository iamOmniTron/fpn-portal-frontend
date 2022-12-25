import {Table as Tb,Button} from "react-bootstrap"
import {PencilSquare,Trash} from "react-bootstrap-icons"
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


export default function Table({props}){
    const navigate = useNavigate();

    const deleteItem = async(id)=>{
        const {data:response} = await axios.post(`${SERVER_URL}/academic/session/delete/${id}`,{
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
        return;
    }  

    
    const handleEdit = (id)=>{
        return navigate(`edit/${id}`)
    }
    return(
        <>
            <Tb striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>START YEAR</th>
                        <th>END YEAR</th>
                        <th>ACTIVE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
            {
                props && props.map((el,idx)=>{
                    console.log(el.active)
                    return(
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{el.startYear}</td>
                                <td>{el.endYear}</td>
                                <td>{el.active === true ? "active": "in active"}</td>
                                <td className="d-flex justify-content-around">
                            <Button className="btn-small rounded-0 btn-primary"
                            onClick={e=>
                            {
                                e.preventDefault();
                                handleEdit(el.id)}}>
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
        </>
    )
}