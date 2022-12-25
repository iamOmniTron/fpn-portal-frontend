import {Container,Row,Col,Card,Form, Button,FloatingLabel} from "react-bootstrap"
import axios from "axios";
import toast from "react-hot-toast";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


export default function Register(){
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        try{
            e.preventDefault();
            const {data:response} = await axios.post(`${SERVER_URL}/candidate/unregistered/login`,{
                email,password
            });
            if(!response.success){
                toast.error(response.message,{duration:4000,position:'top-center'});
                return;
            }
            localStorage.setItem("authenticationToken",response.data);
            return navigate("/applicant/new");
        }catch(err){
            toast.error("something went wrong",{duration:4000,position:'top-center'})
        }
    }   
    return(
        <>
            <Container>
                <Row>
                    <Col className="col-12 mt-4">
                        <div className="fw-bold fs-20 ms-4 text-danger">
                           SIGN IN TO COMPLETE YOUR REGISTRATION PROCESS
                        </div>
                    </Col>
                </Row>
                <hr/>
                <Container>
                    <Card className="shadow-lg mt-3 mx-auto" style={{maxWidth:"500px"}}>
                        <Card.Header className="text-center text-warning">
                            <h3>Log In</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="mx-auto">
                            <Form >
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Your Email"
                                    className="mb-3 rounded-0"
                                >
                                    <Form.Control type="email" className="rounded-0" placeholder="your email" onChange={(e)=>setEmail(e.target.value)}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                    <Form.Control className="rounded-0" type="password" placeholder="create your password" onChange={(e)=>setPassword(e.target.value)}/>
                                </FloatingLabel>
                                <div className="text-center">
                                    <Button className="btn-success rounded-0 btn-lg" onClick={handleSubmit}>Login</Button>
                                </div>
                            </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </>
    )
}