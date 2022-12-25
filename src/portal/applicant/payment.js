import {Table,Container,Card} from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");


const STATUSES = {
    true:"Successful",
    false:"Not Successful"
}


export default function ApplicantsPayments(){
    const [payments,setPayments ]= useState([]);

    const fetchMyPayments = async()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/payments/me`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if(!response){
            toast("something went wrong",{duration:4000,position:"top-center"})
            return;
        }
        if(response.error){
            toast(response.error,{duration:4000,position:"top-center"})
            return;
        }
        setPayments(response.data);
    }

    useEffect(()=>{
        fetchMyPayments();
    },[])

    return(
        <>
            <Container>
                <div className="shadow-lg rounded-0 ps-2 mb-3">
                    <span className="fw-bold fs-4 text-warning">Your payment history</span>
                </div>
                <Card className="rounded-0 shadow-lg">
                    <Card.Body>
                        <Table hover responsive size="md">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Description</th>
                                    <th>Payment Reference number</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments && payments.map((payment,idx)=>{
                                        return(
                                            <tr key={payment.id}>
                                                <td>
                                                    {idx +1}
                                                </td>
                                                <td>
                                                    {payment.description}
                                                </td>
                                                <td>
                                                    {payment.refId}
                                                </td>
                                                <td>
                                                    {(new Date(payment.createdAt).toDateString())}
                                                </td>
                                                <td>
                                                    {STATUSES[payment.confirmed]}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}