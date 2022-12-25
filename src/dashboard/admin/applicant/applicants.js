import {Container} from "react-bootstrap"
import Table from "./table";
import axios from "axios";
import {useState,useEffect} from "react";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function Applicants(){
  const [admissions,setAdmissions] = useState([]);
  const [fetched,setFetched] = useState(false)


  const toggleFetched = ()=> setFetched(!fetched);

  const fetchAdmissions = async ()=>{
    const {data:response} = await axios.get(`${SERVER_URL}/admissions?status=pending`,{
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
        console.log(response.data)
        setAdmissions(response.data);
        return;
  }

      useEffect(()=>{
        fetchAdmissions();
      },[fetched])
    return(
        <>
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Applicants</span>
                </div>
                <div className="bg-light text-light">
                    <Container>
                <div className="mt-3">
                <div className="text-warning my-3 fs-5">
                            List of Applicants
                        </div>

                </div>
                <Table props={admissions} toggleFetched={toggleFetched}/>
                    </Container>
                </div>
            </div>
        </>
    )
}