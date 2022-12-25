import { Outlet } from "react-router-dom"
import {Row,Col, Container} from "react-bootstrap";
import NavBar from "./components/nav"
import Sidebar from "./components/sidebar"

export default function StudentDashboard(){
    return(
        <>
        <Row className="g-0">
            <Col className="col-2">
                <Sidebar/>
            </Col>
            <Col className="col-12 col-md-10">
                <NavBar/>
            <Container className="vh-auto" style={{backgroundColor:"lightgray",minHeight:"90vh"}} fluid>
                    <Outlet/>
            </Container>
            </Col>
        </Row>
        </>
    )
}