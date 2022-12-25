import {Container,Button} from "react-bootstrap";
import { PersonSquare,Pencil } from "react-bootstrap-icons";
import {useState,useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../admin/components/loader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function Profile(){
    const [applicant,setApplicant] = useState({});


    const fetchApplicant = async()=>{
        try{
            const {data:response} = await axios.get(`${SERVER_URL}/profile`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
        console.log(response);
        if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setApplicant(response.data);
        }catch(err){
            toast.error(err.message | "something went wrong");
        }
    }

    useEffect(()=>{
        fetchApplicant();
    },[]);
    return(
        <>
        {
            Object.keys(applicant).length <1 ? <Loader/> :
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 py-2 ps-2 d-flex flex-row gap-3">
                    <div>
                        <PersonSquare style={{height:"10em", width:"10em"}}/>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <h2 className="d-2">{(applicant.firstname.toUpperCase())} {applicant.middlename} {applicant.lastname}</h2>
                        <span className="d-5">Welcome to your profile page</span>
                        
                    </div>
                </div>
                <div className="bg-light text-dark">
                <Container className="py-3">
                    <div className="d-flex flex-column flex-md-row align-items-center gap-2 mb-3">
                        <span className="fw-bold align-self-md-start">PERSONAL INFORMATION</span>
                        <div>
                            <div className="d-flex gap-4">
                                <span>Firstname:</span>
                                <span>{applicant.firstname}</span>
                            </div>

                            <div className="d-flex gap-4">
                                <span>Middlename:</span>
                                <span>{applicant.middlename}</span>
                            </div>

                            <div className="d-flex gap-4">
                                <span>Lastname:</span>
                                <span>{applicant.lastname}</span>
                            </div>

                            <div className="d-flex gap-4">
                                <span>Date Of Birth:</span>
                                <span>{(new Date(applicant.dob).toLocaleDateString())}</span>
                            </div>

                            <div className="d-flex gap-4">
                                <span>Sex:</span>
                                <span>{applicant.gender}</span>
                            </div>

                            <div className="d-flex gap-4">
                                <span>Matric Number:</span>
                                <span>{applicant.matricNumber}</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                        <span className="fw-bold align-self-md-start">NEXT OF KIN'S INFORMATION</span>
                        <div>
                            <div className="d-flex gap-4">
                                <span>Firstname:</span>
                                <span>{applicant.nextOfKinFirstname}</span>
                            </div>
                            <div className="d-flex gap-4">
                                <span>Middlename:</span>
                                <span>{applicant.nextOfKinMiddlename}</span>
                            </div>
                            <div className="d-flex gap-4">
                                <span>Lastname:</span>
                                <span>{applicant.nextOfKinLastname}</span>
                            </div>
                            <div className="d-flex gap-4">
                                <span>Phone Number:</span>
                                <span>{applicant.nextOfKinPhone}</span>
                            </div>
                        </div>
                    </div>
                </Container>
                </div>
            </div>
        }
        </>
    )
}