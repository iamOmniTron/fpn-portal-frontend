import {useState} from "react";
import { Container,Card,Form,FloatingLabel,Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function LoginStudent(){
    const navigate = useNavigate();
    const [matricNumber,setMatricNumber] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/student/login`,{
                matricNumber,password
            });
            console.log(response)
            if(!response){
                toast.error("error",{duration:4000,position:"top-center"});
                return;
            }
            if(!response.success){
                toast.error(response.message,{duration:4000,position:"top-center"});
                return;
            }
            localStorage.setItem("authenticationToken",response.data);
            return navigate("/student")
        }catch(err){
            toast.error("Unable to login to portal",{duration:4000,position:"top-center"});
        }
    }
    return(
        <>
            <div className="vh-100 vw-100 bg-secondary">
                <Container className="d-flex vh-100 justify-content-center align-items-center">
                        <Card style={{maxWidth:"50vw"}}>
                            <Card.Header className="text-center d-flex flex-column align-items-center">
                                <img src="/fpn.jpg" className="img-fluid w-50 h-50 d-block" alt="portal logo"/>
                                <span className="fw-bold text-warning h3">Login Student</span>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                <FloatingLabel label="Matric number" controlId="matNo" className="mb-3">
                                    <Form.Control type="text" onChange={(e)=>setMatricNumber(e.target.value)} className="rounded-0" placeholder="matric number"/>
                                </FloatingLabel>
                                <FloatingLabel label="Password" controlId="password" className="mb-3">
                                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} className="rounded-0" placeholder="password"/>
                                </FloatingLabel>
                                <div className="text-center">
                                    <Button className="btn-lg btn-secondary rounded-0" onClick={(e)=>handleSubmit()}>Login</Button>
                                </div>
                                </Form>
                                <LinkContainer to="/" style={{textDecoration:"none"}}>
                                    <Button variant="link">navigate to home page?</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                </Container>
            </div>
        </>
    )
}