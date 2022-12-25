import {Speedometer2,People,HourglassSplit,Paypal, Journals} from "react-bootstrap-icons"
import { Container,Row } from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap";

export default function Index(){
    return(
        <>
            <div className="d-flex flex-column gap-3">
                <div className="bg-light mt-2 ps-2 py-2">
                    <Speedometer2 style={{height:"1.5em",width:"1.5em"}} className="me-2"/>
                    <span className="fw-bold fs-4">Dashboard</span>
                </div>
               <div className="bg-light">
                <div className="container">
                    <div className="d-flex flex-row flex-wrap gap-2 py-4">
                        <div className="flex-grow-1 bg-warning rounded shadow-lg text-light">
                        <LinkContainer to="applicants">
                            <div>
                            <People className="w-50 h-50"/>
                            <p className="lead fw-bold">Applicants</p>
                            </div>
                        </LinkContainer>
                        </div>
                        <div className="flex-grow-1 bg-info rounded shadow-lg text-light">
                        <LinkContainer to="payments">
                            <div>
                            <Paypal className="w-50 pt-2 h-50"/>
                            <p className="lead fw-bold">Payments</p>
                            </div>
                        </LinkContainer>
                        </div>
                        <div className="flex-grow-1 rounded shadow-lg bg-success text-light">
                        <LinkContainer to="session">
                            <div>
                            <HourglassSplit className="w-50 h-50"/>
                            <p className="lead fw-bold">Sessions</p>
                            </div>
                        </LinkContainer>
                        </div>
                        <div className="flex-grow-1 bg-secondary rounded shadow-lg text-light">
                        <LinkContainer to="course">
                            <div>
                            <Journals className="w-50 pt-2 h-50"/>
                            <p className="lead fw-bold">Courses</p>
                            </div>
                        </LinkContainer>
                        </div>
                    </div>
                </div>
               </div>
            </div>
        </>
    )
}