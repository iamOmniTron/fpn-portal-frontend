import {useState,useEffect} from "react";
import {Container,Button} from "react-bootstrap";
import axios from "axios";
import {PlusLg} from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import Table from "./table";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function Sessions(){
    const [session,setSessions] = useState([]);

    const fetchSession = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/academic/sessions`);
        if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setSessions(response.data);
        return;
    }

    useEffect(()=>{
        fetchSession();
    },[]);
    return(
        <>
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Sessions</span>
                </div>
                <div className="bg-light text-light">
                    <Container>
                <div className="mt-3">
                <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="text-warning my-3 fs-5">
                            View All Sessions
                </div>
                <div>
                    <LinkContainer to="create">
                    <Button className=" rounded-0" variant="outline-primary" >
                        <PlusLg/>
                        Create
                    </Button>
                    </LinkContainer>
                </div>
                </div>
                
                </div>
                <Table props={session}/>
                </Container>
                </div>
                </div>
        </>
    )
}