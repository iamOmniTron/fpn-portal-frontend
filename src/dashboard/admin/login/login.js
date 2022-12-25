import {Button,Card,Form,FloatingLabel, Container} from "react-bootstrap";
import {PersonCircle} from "react-bootstrap-icons";
import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function LoginAdmin(){
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/admin/login`,{
                email,password
            });
            if(!response){
                toast.error("cannot login",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.error || response.message,{duration:4000,position:"top-center"});
                return;
            }
            localStorage.setItem("authenticationToken",response.data);
            return navigate("/admin");
        }catch(err){
            toast.error(err.message || "something went wrong");
        }
    }
    return (
        <>
        <div style={{backgroundColor:"lightgray"}}>
            <Container className="d-flex vh-100 align-items-center">
            <Card className="shadow-lg mt-3 mx-auto" style={{maxWidth:"500px"}}>
                        <Card.Header className="text-center">
                            <h3>
                                <PersonCircle className="h-25 w-25"/>
                            </h3>
                            <span className="h2 text-primary">Administrator Login</span>
                        </Card.Header>
                        <Card.Body>
                            <div className="mx-auto">
                            <Form >
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Enter email"
                                    className="mb-3 rounded-0"
                                >
                                    <Form.Control type="email" className="rounded-0" placeholder="your email" onChange={(e)=>setEmail(e.target.value)}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                    <Form.Control className="rounded-0" type="password" placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}/>
                                </FloatingLabel>
                                <div className="text-center">
                                    <Button className="btn-primary rounded-0 btn-lg" onClick={handleSubmit}>Login</Button>
                                </div>
                                <div className="text-right mt-3">
                                    <LinkContainer to="/" style={{textDecoration:"none"}}>
                                       <Button variant="link">Navigate To Homepage?</Button>
                                    </LinkContainer>
                                </div>
                            </Form>
                            </div>
                        </Card.Body>
                    </Card>
            </Container>
            </div>
        </>
    )
}