import {Nav,Container,Navbar,Card,Button,Modal,Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LinkContainer } from "react-router-bootstrap";
import {useNavigate} from "react-router-dom";
// import {Formik,Field} from "formik";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Home(){
  const navigate = useNavigate();
  const [show,setShow] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const handleShow = ()=> setShow(true);
  const handleClose = ()=> setShow(false);


  const handleSubmit = async (e)=>{
    try{
      e.preventDefault();
      const {data:response} = await axios.post(`${SERVER_URL}/candidate/signup`,{email,password});
      if(!response){
        toast.error("Something went wrong",{duration:4000,position:'top-center'})
        return;
      }
      if(response.error){
        toast.error(response.message,{duration:4000,position:'top-center'})
        return;
      }
  
      return navigate("/applicant/registration/login");
    }catch(err){
      toast.error(err.message,{duration:4000,position:'top-center'})
    }
  }
    return (
        <>
           <Navbar bg="success" expand="lg" variant="dark" className="mb-5" style={{borderBottom:"1px solid red"}}>
        <Container>
            
          <Navbar.Brand className="ms-3">
          <img src="./fpn.jpg" width="50" height="40" alt="portal logo" className="pe-2 d-inline-block align-top rounded"/>
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
            <Card className="mx-3 mt-5 shadow-lg">
                <Card.Title className="mx-4 mt-3 text-danger">
                    <h4>How To Apply To Federal Polytechnic Nasarawa</h4>
                    <hr className="mx-4"/>
                </Card.Title>
                
                <Card.Body>
                    <h4 className="text-warning mx-2">Instructions on how to apply:</h4>
                        <div>
                            <ul>
                                <li>Step 1 - Click on Apply now</li>
                                <li>Step 2 - Register with Your Email and Password</li>
                                <li>Step 3 - Login to your registration portal with the Details</li>
                                <li>Step 4 - Complete and Submit the Application and Proceed to Payment</li>
                                <li>Step 5 - Click on <span className="fw-bold">Proceed To Pay</span> to Generate an Invoice</li>
                                <li>Step 6 - Print the Payment Invoice and Pay Using Your Credit Card</li>
                            </ul>
                            <ul className="mt-2">
                                <li className="fw-bold">On Successful Payment, You will be redirected to your Applicant Portal to track your Admission process</li>
                                <li className="fw-bold">On Account Creation, Use a Password you can Always Remember</li>
                                <li className="fw-bold text-danger">DO NOT SHARE YOUR PASSWORD WITH ANYONE!!!</li>
                            </ul>
                        </div>

                        <div className="text-center my-4">
                        <Button className="btn-lg rounded-0" variant="outline-success" onClick={handleShow}>Apply Now</Button>
                        </div>
                </Card.Body>
            </Card>
            <div>
            <Modal show={show} onHide={handleClose} centered >
              <Modal.Header closeButton className="pb-0">
                
                 <h4 className="text-warning text-center">Fill in The Following:</h4>
              </Modal.Header>
              <Modal.Body>
                <Card className="m-4 rounded-0 shadow-lg">
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="enter your email address" required onChange={(e)=>setEmail(e.target.value)}/>
                        <Form.Text className="text-danger"></Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="enter your password" required onChange={(e)=>setPassword(e.target.value)}/>
                        <Form.Text className="text-danger"></Form.Text>
                      </Form.Group>
                      <Form.Group className="text-center mt-2">
                        <Button className="btn-lg rounded-0 btn-success" type="submit">Submit</Button>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Modal.Body>
      </Modal>
            </div>
        </Container>
        </>
    )
}