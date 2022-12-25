import {Table,Button} from "react-bootstrap"
import axios from "axios";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function StudentsTable({props,toggleFetched}){

    const deregisterStudent = async (id)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/exam/student/unregister/${id}`,{},{
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
              toast.success(response.message);
              toggleFetched()
        }catch(err){
            toast.error(err.message || "something went wrong");
        }
    }
    return(
        <>
            <Table striped bordered hover responsive size="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>FULL NAME</th>
                        <th>MATRIC NUMBER</th>
                        <th>GENDER</th>
                        <th>DEPARTMENT</th>
                        <th>ACTIONS</th>
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
                                    <td>
                                        {el.Candidate.firstname} {el.Candidate.middlename} {el.Candidate.lastnumber}
                                    </td>
                                    <td>
                                        {el.Candidate.matricNumber}
                                    </td>
                                    <td>
                                        {el.Candidate.gender}
                                    </td>
                                    <td>{el.Candidate.Admission.Department.name}</td>
                                    <td>
                                        <Button className="btn-warning rounded-0"
                                        onClick={()=>deregisterStudent(el.id)}>De-register</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}