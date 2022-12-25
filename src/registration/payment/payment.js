import { Container,Row,Col,Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import swal from "sweetalert"
import { useState,useEffect } from "react";
import {Printer,Paypal,} from "react-bootstrap-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../dashboard/admin/components/loader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function PaymentPage(){
    const navigate = useNavigate();
    const [paymentDetails,setPaymentDetails] = useState({});

    const showSuccessMessage = ()=> swal("Payment Confirmed","redirection to portal","success");

    const confirmPayment = async ()=>{
        try{
            const {data:response} = await axios.post(`${SERVER_URL}/payment/registration/confirm/${paymentDetails.id}`,{},{
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
            showSuccessMessage();
            handleRedirect();
        }catch(err){
            toast.error("error processing payment",{duration:4000,position:"top-center"})
        }
    }

    const handleRedirect = ()=>navigate("/login/applicant/confirmed");
  
    const fetchPaymentDetails = async ()=>{
        try{
            console.log("before fetch")
            const {data:response } = await axios.get(`${SERVER_URL}/payment/registration/generate`,{
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
            setPaymentDetails(response.data);
        }catch(err){
            console.log("something occured here")
        }
    }

    useEffect(()=>{
        fetchPaymentDetails();
    },[])

    return(
        <>
            {
               Object.keys(paymentDetails).length === 0 ? <Loader/> :
        <Container>
            <hr className="text-dark"/>
            <Row className="my-4">
                <Col className="col-md-6 col-sm-12">
                    <div style={{height:"10rem", width:"10rem", border:"5px solid black"}}>
                        <QRCode value={paymentDetails.link} size={150}/>
                    </div>
                </Col>
                <Col className="col-md-6 col-sm-12 d-md-flex justify-content-md-end">
                    <div className="d-flex flex-column text-md-end text-start pe-2">
                        Generated on : {new Intl.DateTimeFormat("en-US").format(new Date(paymentDetails.createdAt))}
                        <div className="pe-2" style={{backgroundColor:"lightgray"}}>
                            <span className="fw-bold d-5">Payment Reference Number</span>
                            <h3 className="d-3 fw-bold">{paymentDetails.refId}</h3>
                        </div>
                    </div>
                </Col>
            </Row>
                <div className="d-flex flex-column">
                    <div className="fw-bold text-light ps-2" style={{backgroundColor:"#ee652f"}}><h4>Payment Details</h4></div>
                    <div className="d-flex justify-content-between px-2" style={{backgroundColor:"gray"}}>
                        <div>Description</div>
                        <div>Amount</div>
                    </div>
                    <div className="d-flex flex-row px-2 justify-content-between" style={{backgroundColor:"#d9dbddd6", height:"25vh"}}>
                        <div>
                            <p>{paymentDetails.description}</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-end" style={{width:"40%"}}>
                            Charges
                        </div>
                        <div className="d-flex flex-column justify-content-between">
                            <span>NGN {paymentDetails.amount}</span>
                            <span>NGN 200.00</span>
                        </div>
                    </div>
                    <div className="d-flex p-2 justify-content-between fw-bold" style={{backgroundColor:"gray"}}>
                        <div>Total Amount</div>
                        <div>NGN 5,200.00</div>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-center mt-3 gap-2">
                        <Button className="btn-success rounded-0 btn-lg text-light">
                            <Printer className="me-2"/>PRINT NOW</Button>
                        <Button className="btn-warning rounded-0 btn-lg text-light" onClick={confirmPayment}>
                            <Paypal className="me-2"/>
                            PAY NOW</Button>
                    </div>
                </div>
        </Container>
            }
        </>
    )
}