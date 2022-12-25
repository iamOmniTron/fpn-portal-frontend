import {Table as Tb,Button} from "react-bootstrap"
import {Trash} from "react-bootstrap-icons"
import toast from "react-hot-toast";
import axios from "axios";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


export default function Table({props,toggleFetched}){


    const unregisterCourse = async (id)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/course/unregister/${id}`,{},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response){
                toast.error("cannot unregister course at the moment",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error | response.message,{duration:4000,position:"top-center"});
                return;
            }
            toast.success(response.message,{duration:4000,position:"top-center"});
            toggleFetched();
            return;
        }catch(err){
            toast.error(err.message | "something went wrong");
        }

    }


    return(
        <>
            <Tb striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>CODE</th>
                        <th>TITLE</th>
                        <th>UNIT</th>
                        <th>TYPE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props && props.map((el,idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{el.Course.code}</td>
                                    <td>{el.Course.title}</td>
                                    <td>{el.Course.unit}</td>
                                    <td>{el.Course.type}</td>
                                    <td className="">
                                        <Button className="btn-small btn-danger rounded-0" onClick={(e)=>unregisterCourse(el.id)}>
                                           <Trash/> 
                                            Unregister
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