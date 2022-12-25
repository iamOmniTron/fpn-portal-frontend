import {Table as Tb,Button,Modal,Card} from "react-bootstrap"
import toast from "react-hot-toast";
import axios from "axios";
import {useState} from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

const STATUSES = {
    true:"Paid",
    false:"Not Paid"
}
export default function Table({props,toggleFetched}){
    const [show,setShow] = useState(false);
    const [applicant,setApplicant] = useState({});
    const [results,setResults] = useState({});

    const fetchCandidate = async (id)=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/candidate/${id}`,{
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
        setApplicant(response.data);
        setResults(JSON.parse(response.data.Admission.details))
        setShow(true);
        return;
        }catch(err){
            toast.error(err.message | "error fetching data",{duration:4000,position:"top-center"})
        }
    }

    const acceptAdmission = async (id)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/admission/accept/${id}`,{},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
                if(!response){
                    toast.error("error",{duration:4000,position:"top-center"});
                    return;
                }
                if(!response.success){
                    toast.error(response.error | response.message,{duration:4000,position:"top-center"});
                    return;
                }
                toast.success(response.message,{duration:4000,position:"top-center"})
                toggleFetched();
                return;
        }catch(err){
            toast.error(err.message | "something went wrong",{duration:4000,position:"top-center"});
            return;
        }
    }

    const rejectAdmission = async (id)=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/admission/reject/${id}`,{},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
                if(!response){
                    toast.error("error",{duration:4000,position:"top-center"});
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
            toast.error(err.message | "something went wrong",{duration:4000,position:"top-center"});
            return;
        }
    }
    return(
        <>
            <Tb striped bordered hover responsive size="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>FIRSTNAME</th>
                        <th>MIDDLENAME</th>
                        <th>LASTNAME</th>
                        <th>STATE OF ORIGIN</th>
                        <th>PAYMENT STATUS</th>
                        <th>ADMISSION STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
            {
                props && props.map((el,idx)=>{
                    return(
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{el.Candidate.firstname}</td>
                                <td>{el.Candidate.middlename}</td>
                                <td>{el.Candidate.lastname}</td>
                                <td style={{minWidth:"15vw"}}>{el.Candidate.stateOfOrigin} State</td>
                                <td style={{minWidth:"15vw"}}>{STATUSES[el.Candidate.paid]}</td>
                                <td style={{minWidth:"15vw"}}>{el.status}</td>
                                <td className="d-flex gap-1 px-2">
                            <Button className="btn-small rounded-0 btn-success" onClick={(e)=>acceptAdmission(el.Candidate.id)}>
                                Accept
                            </Button>
                            <Button className="btn-small rounded-0 btn-danger" onClick={(e)=>rejectAdmission(el.Candidate.id)}>Reject</Button>
                            <Button className="btn-small rounded-0 btn-primary" onClick={(e)=>fetchCandidate(el.Candidate.id)}>
                                Preview
                            </Button>
                        </td>
                            </tr>
                    )
                })
            }
            </tbody>
            </Tb>
            <Modal show={show} onHide={()=>setShow(false)}>
                <Card>
                    <Card.Body>
                        <span className="fw-bold fs-3 text-warning">Candidate Bio-Data</span>
                        <div className="d-flex flex-column ms-3">
                            <span className="fw-bold lead">Firstname: {applicant.firstname}</span>
                            <span className="fw-bold lead">Middlename: {applicant.middlename}</span>
                            <span className="fw-bold lead">Lastname: {applicant.lastname}</span>
                            <span className="fw-bold lead">State Of Origin: {applicant.stateOfOrigin}</span>
                            <span className="fw-bold lead">Gender: {applicant.gender}</span>
                        </div>
                        <span className="fw-bold fs-3 text-warning">Results</span>
                        <div className="d-flex flex-column ms-3">
                            
                        </div>
                    </Card.Body>
                </Card>
            </Modal>
        </>
    )
}