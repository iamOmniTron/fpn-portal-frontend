import {Container,Card} from "react-bootstrap";
import {PersonCircle} from "react-bootstrap-icons"
import axios from "axios";
import Loader from "../../dashboard/admin/components/loader";
import {useState,useEffect} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function ApplicantProfile(){
    const navigate = useNavigate();
    const [details,setDetails]= useState({});

    const fetchProfile = async ()=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/profile`,{
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
            console.log(response.data);
            setDetails(response.data);
        }catch(err){
            console.log(err)
            toast.error(err.message,{duration:4000,position:"top-center"});
            return navigate("")
        }
    }

    useEffect(()=>{
        fetchProfile();
    },[]);
    return(
        <>
        {
            Object.keys(details).length < 1 ? <Loader/> :
            <Container>
                <div className=" d-flex justify-content-center">
                    <Card className="shadow-lg rounded-0 mb-2" style={{minWidth:"50vw"}}>
                        <Card.Header>
                        <div className="text-center">
                                <PersonCircle className="w-25 h-25"/>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                <span className="fw-bold fs-3 text-secondary">Personal Information</span>
                                <div className="ms-2 d-flex flex-column">
                                    <span className="fw-bold fs-6">First Name : {details.firstname}</span>
                                    <span className="fw-bold fs-6">Middle Name : {details.middlename}</span>
                                    <span className="fw-bold fs-6">Last Name : {details.lastname}</span>
                                    <span className="fw-bold fs-6">Email : {details.email}</span>
                                    <span className="fw-bold fs-6">Phone Number : {details.phone}</span>
                                    <span className="fw-bold fs-6">Date of Birth : {details.dob}</span>
                                    <span className="fw-bold fs-6">Gender : {details.gender}</span>
                                    <span className="fw-bold fs-6">State of Origin : {details.stateOfOrigin} State</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="fw-bold fs-3 text-secondary">Next Of Kin's Information</span>
                                <div className="ms-2 d-flex flex-column">
                                    <span className="fw-bold fs-6">First Name : {details.nextOfKinFirstname}</span>
                                    <span className="fw-bold fs-6">Middle Name : {details.nextOfKinMiddlename}</span>
                                    <span className="fw-bold fs-6">Last Name : {details.nextOfKinLastname}</span>
                                    <span className="fw-bold fs-6">Phone Number : {details.nextOfKinPhone}</span>
                                </div>
                            </div>
                            {
                                details.Admission.status === "accepted" &&
                            <div className="mt-2">
                                <span className="fw-bold fs-3 text-secondary">Portal Information</span>
                                <div className="ms-2 d-flex flex-column">
                                    <span className="fw-bold fs-6">Matric Number: {details.matricNumber}</span>
                                </div>
                            </div>
                            }
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        }
    </>
    )
}