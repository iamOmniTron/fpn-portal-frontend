import {Container,Card, Alert} from "react-bootstrap"
import {HouseFill, PersonFill,LockFill,MortarboardFill} from "react-bootstrap-icons"
import {useState,useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../dashboard/admin/components/loader";
import {LinkContainer} from "react-router-bootstrap";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

const STATUSES = {
  "pending":"warning",
  "accepted":"success",
  "rejected":"danger"
}

export default function ApplicantPortal(){

  const [applicant,setApplicant] = useState({});


  const fetchAdmissionData = async ()=>{
      const {data:response} = await axios.get(`${SERVER_URL}/admission/me`,{
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
      setApplicant(response.data);
      return;
  }

  useEffect(()=>{
    setTimeout(()=>fetchAdmissionData(),2000);
  },[])
    return(
      <>
      {Object.keys(applicant).length <1 ? <Loader/> : (
      <Container>
        <Alert variant="info" className="rounded-0 shadow-lg ps-3 mb-3">
        <span className="fs-5"> Welcome {(applicant.Candidate.firstname).toUpperCase()} {applicant.Candidate.middlename} {applicant.Candidate.lastname}</span>
        </Alert>
        <Card className="shadow-lg rounded-0 mb-3">
          <Container>
          <div className="row d-flex flex-wrap p-3 gap-2">
                
                <div className="col-12 col-md-3 flex-grow-1 bg-primary rounded shadow-lg ps-2 text-light">
                        <LinkContainer to="profile">
                            <div>
                            <HouseFill className="w-25 h-25"/>
                            
                            <p className="lead fw-bold">Go to Homepage</p>
                            </div>
                        </LinkContainer>
                </div>
                <div className="col-12 col-md-3 flex-grow-1 bg-warning rounded shadow-lg ps-2 text-light">
                        <LinkContainer to="profile">
                            <div>
                            <PersonFill className="w-25 h-25"/>
                            <p className="lead fw-bold">View Profile</p>
                            </div>
                        </LinkContainer>
                </div>
                <div className="col-12 col-md-3 flex-grow-1 bg-success rounded ps-2 shadow-lg text-light">
                        <LinkContainer to="password/reset">
                            <div>
                            <LockFill className="w-25 h-25"/>
                            <p className="lead fw-bold">Manage Account</p>
                            </div>
                        </LinkContainer>
                </div>
                <div className="col-12 col-md-3 flex-grow-1 bg-secondary rounded ps-2 shadow-lg text-light">
                        <LinkContainer to="/student/login">
                            <div>
                            <MortarboardFill className="w-25 h-25"/>
                            <p className="lead fw-bold">Go To Student Portal</p>
                            </div>
                        </LinkContainer>
                </div>
                
          </div>
          </Container>
        </Card>
        <Card className="shadow-lg rounded-0">  
          <Card.Body>
            <h2 className="fw-bold text-secondary">Current Admission Status:
              <span className={`ms-2 d-inline-block bg-${STATUSES[applicant.status]}`} style={{height:"1rem", width:"1rem",borderRadius:"50%"}}></span> {applicant.status}
            </h2>

            {
              applicant.status === "accepted" ? 
              <Alert variant="success" className="rounded-0">
              <p className="lead">
                Congratulation {applicant.Candidate.firstname} {applicant.Candidate.middlename} {applicant.Candidate.lastname}, You have been Offered a provisional Admission at Federal Polytechnic Nasarawa!!
              </p> 
              </Alert>
              : applicant.status === "rejected" && <p className="lead">Unfortunately {applicant.Candidate.firstname} {applicant.Candidate.middlename} {applicant.Candidate.lastname}, Your Admission has been rejected</p>
             
            }

            <div className="mt-5">
              <span className="fs-4">Admission statuses</span>
              <ul>
                <li style={{listStyleType:"none"}}>
                  <span className="d-inline-block bg-success" style={{height:"1rem", width:"1rem",borderRadius:"50%"}}></span> : Admission Accepted
                </li>
                <li style={{listStyleType:"none"}}>
                  <span className="d-inline-block bg-warning" style={{height:"1rem", width:"1rem",borderRadius:"50%"}}></span>
                  : Admission Pending
                </li>
                <li style={{listStyleType:"none"}}>
                  <span className="d-inline-block bg-danger" style={{height:"1rem", width:"1rem",borderRadius:"50%"}}></span>
                  : Admission Rejected
                </li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </Container>

      )}
        </>
    )
}