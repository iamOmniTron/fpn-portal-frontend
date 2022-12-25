import {useState,useEffect} from "react";
import {Container,Button} from "react-bootstrap";
import axios from "axios";
import Table from "./table";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function AllPayments(){
    const [payments,setPayments] = useState([]);

    const fetchPayments = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/payments`,{
            headers:{
                "Authorization":`Bearer ${token}`
              }
        });
        console.log(response);
        if(!response){
            toast.error("cannot delete item",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error | response.message,{duration:4000,position:"top-center"});
            return;
        }
        setPayments(response.data);
        return;
    }

    useEffect(()=>{
        fetchPayments();
    },[]);
    return(
        <>
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <span className="fw-bold fs-4">Payments</span>
                </div>
                <div className="bg-light text-light">
                    <Container>
                <div className="mt-3">
                <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="text-warning my-3 fs-5">
                            View All Payments
                </div>
                </div>
                
                </div>
                <Table props={payments}/>
                </Container>
                </div>
                </div>
        </>
    )
}