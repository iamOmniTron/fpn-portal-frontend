import {Container,Nav,Form,Navbar,Button,Card,Alert,FloatingLabel} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState,useEffect } from "react";
import Hnd from "./components/hnd";
import Nd from "./components/nd";
import Prend from "./components/prend";
import axios from "axios";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function Register(){
    const navigate = useNavigate();
    const [programs,setPrograms] = useState([]);
    const [programName,setProgramName] = useState("");
    const [programType,setProgramType] = useState({});
    const [details,setDetails] = useState("");
    const [schools,setSchools] = useState([]);
    const [allDepartments,setAllDepartments] = useState([]);
    const [localGovernmentArea,setLocalGovernmentArea] = useState("");
    const [address,setAddress] = useState("");
    const [contactAddress,setContactAddress] = useState("");
    const [departments,setDepartments] = useState([]);
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [middlename,setMiddlename] = useState("");
    const [phone,setPhone] = useState("");
    const [stateOfOrigin,setStateOfOrigin] = useState("");
    const [dob,setDob] = useState("");
    const [gender,setGender] = useState("");
    const [nextOfKinFirstname,setNextOfKinFirstname] = useState("");
    const [nextOfKinLastname,setNextOfKinlastname] = useState("");
    const [nextOfKinMiddlename,setNextOfKinMiddlename] = useState("");
    const [nextOfKinPhone,setNextOfKinPhone] = useState("");
    const [department,setDepartment] = useState("");

    const handleOnPreNDSelect = ()=>setDepartments(...allDepartments.filter((d)=>(d.School.name).toLowerCase() == "school of applied science"));

    const handleSubmit = async (e)=>{
        try{
            e.preventDefault();
            console.log(token);
            const {data:response} = await axios.post(`${SERVER_URL}/candidate/update`,{
                firstname,lastname,middlename,phone,stateOfOrigin,dob,gender,nextOfKinFirstname,nextOfKinLastname,nextOfKinMiddlename,nextOfKinPhone,department,details,programId:+(programType.id),address,contactAddress,localGovernmentArea
            },{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response){
                toast.error("cannot proceed registration",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error | response.message,{duration:4000,position:"top-center"});
                return;
            }
            return navigate("/applicant/payment/registration");
        }catch(err){
            toast.error(err.message,{duration:4000,position:'top-center'})
        }
    }

    const fetchDepartments = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/departments`);
        console.log(response);
        if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setDepartments(response.data);
        setAllDepartments(response.data);
        return;
    }

    const fetchSchools = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/schools`);
        console.log(response);
        if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setSchools(response.data);
        return;
    }

    const fetchPrograms = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/programs`);
        console.log(response);
        if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setPrograms(response.data);
        return;
    }

    useEffect(()=>{
        fetchSchools();
        fetchPrograms();
        fetchDepartments();
    },[]);
    return(
        <>
    <Navbar bg="success" expand="md" variant="dark" className="mb-5" style={{borderBottom:"1px solid red"}}>
        <Container>
            
          <Navbar.Brand className="ms-3">
          <img src="../fpn.jpg" width="50" height="40" alt="portal logo" className="pe-2 d-inline-block align-top rounded"/>
            <LinkContainer to="/">
            <span className="d-none d-lg-inline-block">FEDERAL POLYTECHNIC NASARAWA</span>
            </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="toggle-nav" />
            <Navbar.Collapse id="toggle-nav">
          <Nav className="ms-auto text-light">
            <LinkContainer to="/applicant/register">
              <Nav.Link className="text-light">Registration</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/portal">
            <Nav.Link className="text-light">Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/applicant/login">
              <Nav.Link className="text-light">Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/forgot">
              <Nav.Link className="text-light">Forgot Password</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className="d-flex align-items-center flex-column gap-5 pb-4">
                <Card style={{minWidth:"50vw"}}>
                    <Card.Header>
                        <span className="fw-bold text-warning">Data Capturing</span>
                    </Card.Header>
                    <Card.Body>
                        <span className="fw-bold">Personal Information</span>
                        <Form>
                            <FloatingLabel label="Firstname" controlId="firstname" className="mb-3">
                                <Form.Control type="text" onChange={(e)=>setFirstname(e.target.value)} className="rounded-0" placeholder="Firstname"/>
                            </FloatingLabel>
                            <FloatingLabel label="Middlename" controlId="middlename" className="mb-3">
                                <Form.Control type="text" onChange={(e)=>setMiddlename(e.target.value)} className="rounded-0" placeholder="Middlename"/>
                            </FloatingLabel>
                            <FloatingLabel label="Lastname" controlId="lastname" className="mb-3">
                                <Form.Control type="text" onChange={(e)=>setLastname(e.target.value)} className="rounded-0" placeholder="Lastname"/>
                            </FloatingLabel>
                            <FloatingLabel label="Phone number" controlId="phone-user" className="mb-3">
                                <Form.Control type="tel" onChange={(e)=>setPhone(e.target.value)} className="rounded-0" placeholder="phone"/>
                            </FloatingLabel>
                            <Form.Select className="mb-3 rounded-0" onChange={(e)=>setStateOfOrigin(e.target.value)}>
                                <option>--Select State Of Origin--</option>
                                <option value="Abia Stata">Abia</option>
                                <option value="Adamawa State">Adamawa</option>
                                <option value="Akwa Ibom State">Akwa Ibom</option>
                                <option value="Anambra State">Anambra</option>
                                <option value="Bauchi State">Bauchi</option>
                                <option value="Bayelsa State">Bayelsa</option>
                                <option value="Benue State">Benue</option>
                                <option value="Borno State">Borno</option>
                                <option value="Cross-river State">Cross-river</option>
                                <option value="Delta State">Delta</option>
                                <option value="Ebonyi State">Ebonyi</option>
                                <option value="Edo State">Edo</option>
                                <option value="Ekiti State">Ekiti</option>
                                <option value="Enugu State">Enugu</option>
                                <option value="Imo State">Imo</option>
                                <option value="Jigawa State">Jigawa</option>
                                <option value="Kaduna State">Kaduna</option>
                                <option value="Kano State">Kano</option>
                                <option value="Katsina State">Katsina</option>
                                <option value="Kebbi State">Kebbi</option>
                                <option value="Kogi State">Kogi</option>
                                <option value="Kwara State">Kwara</option>
                                <option value="Lagos State">Lagos</option>
                                <option value="Nasarawa State">Nasarawa</option>
                                <option value="Niger State">Niger</option>
                                <option value="Ogun State">Ogun</option>
                                <option value="Ondo State">Ondo</option>
                                <option value="Osun State">Osun</option>
                                <option value="Oyo State">Oyo</option>
                                <option value="Plateau State">Plateau</option>
                                <option value="Rivers State">Rivers</option>
                                <option value="Sokoto State">Sokoto</option>
                                <option value="Taraba State">Taraba</option>
                                <option value="Yobe State">Yobe</option>
                                <option value="Zamfara State">Zamfara</option>
                                <option value="FCT">FCT</option>
                            </Form.Select>
                            <FloatingLabel label="Local Government Area" controlId="lga" className="mb-3">
                                <Form.Control type="text" onChange={(e)=>setLocalGovernmentArea(e.target.value)} className="rounded-0" placeholder="local government area"/>
                            </FloatingLabel>
                            <FloatingLabel label="Home Address" controlId="homeAddress" className="mb-3">
                                <Form.Control type="text" onChange={(e)=>setAddress(e.target.value)} className="rounded-0" placeholder="home address"/>
                            </FloatingLabel>
                            <FloatingLabel label="Contact Address" controlId="contactAddress" className="mb-3">
                                <Form.Control type="text" onChange={(e)=>setContactAddress(e.target.value)} className="rounded-0" placeholder="Contact Address"/>
                            </FloatingLabel>
                            <div className="d-flex gap-3">
                                <Form.Group className="col-6">
                                    <Form.Label>Date Of Birth</Form.Label>
                                    <Form.Control type="date" onChange={(e)=>setDob(e.target.value)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                <Form.Select required onChange={(e)=>setGender(e.target.value)}>
                                    <option>--Select Gender--</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Select>
                                </Form.Group>
                            </div>
                        </Form>
                        <div className="mt-3">
                        <span className="fw-bold">Next Of Kin's Information</span>
                        </div>
                        <Form>
                            <FloatingLabel label="Firstname" className="mb-3" controlId="nokfirstname">
                                <Form.Control className="rounded-0" onChange={(e)=>setNextOfKinFirstname(e.target.value)} placeholder="firstname" type="text"/>
                            </FloatingLabel>
                            <FloatingLabel label="Middlename" className="mb-3" controlId="nokmiddlename">
                                <Form.Control className="rounded-0" onChange={(e)=>setNextOfKinMiddlename(e.target.value)} placeholder="middlename" type="text"/>
                            </FloatingLabel>
                            <FloatingLabel label="Lastname" className="mb-3" controlId="noklastname">
                                <Form.Control className="rounded-0" placeholder="lastname" onChange={(e)=>setNextOfKinlastname(e.target.value)} type="text"/>
                            </FloatingLabel>
                            <FloatingLabel label="Phone number" className="mb-3" controlId="nokphone">
                                <Form.Control className="rounded-0" onChange={(e)=>setNextOfKinPhone(e.target.value)} placeholder="phone" type="text"/>
                            </FloatingLabel>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="d-flex justify-content-center" style={{minWidth:"50vw"}}>
                <Card>
                    <Card.Header>
                        <span className="fw-bold text-warning">Programme Type</span>
                    </Card.Header>
                    <Card.Body>
                    <Alert variant="info" className="rounded-0">Please select the program you want to enroll for in Federal Polytechnic Nasarawa</Alert>
                    <div className="d-flex gap-2">
                        <div className="col-3">Application Type</div>
                        <div className="col-8">
                        <Form>
                        <Form.Group>
                        <Form.Select onChange={(e)=>{
                            setProgramType(e.target.value);
                            setProgramName((programs.find((p)=>p.id == e.target.value)).name);
                            console.log(e.target.value);
                        }
                            } size="md" className="rounded-0" placeholder="select the program you want to enroll for">
                            <option>--select program type--</option>
                            {
                                programs && programs.map((program,idx)=>{
                                    return(
                                        <option key={idx} value={program.id}>{(program.name).toUpperCase()}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        </Form.Group>
                    </Form>
                        </div>
                    </div>
                    </Card.Body>
                </Card>
            </div>
            {
                (()=>{
                    switch (programName) {
                        case "hnd":
                            return <Hnd setDetails={setDetails}/>
                    
                        case "nd":
                            return <Nd setDetails={setDetails}/>
                        case "pre-nd":
                            return <Prend setDetails={setDetails} onSelect={handleOnPreNDSelect}/>
                        default:
                            break;
                    }
                })()
            }
            <div className="d-flex justify-content-center">
                <Card style={{minWidth:"50vw"}}>
                    <Card.Header>
                        <span className="fw-bold text-warning">Select Program you want to study</span>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Select className="rounded-0 mb-3" onChange={(e)=>{
                                const dep = allDepartments.filter((d)=>d.School.id == e.target.value)
                                setDepartments([...dep])
                            }
                            }>
                                <option>-- Select School --</option>
                                    {
                                        schools && schools.map((school)=>{
                                            return(
                                                <option key={school.id} value={school.id}>{school.name}  {(school.Program.name).toUpperCase()}</option>
                                            )
                                        })
                                    }
                            </Form.Select>
                            <Form.Select className="rounded-0" onChange={(e)=>setDepartment(e.target.value)}>
                                <option>--Select Department--</option>
                                    {
                                        departments && departments.map((dep)=>{
                                            return(
                                                <option key={dep.id} value={dep.id}>{dep.name}</option>
                                            )
                                        })
                                    }
                            </Form.Select>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <Button size="lg" onClick={handleSubmit} className="btn-success rounded-0">Submit Application</Button>
        </div>
      </Container>
        </>
    )
}