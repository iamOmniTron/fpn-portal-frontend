import { Outlet } from "react-router-dom"
import {Row,Col, Container} from "react-bootstrap";
import NavBar from "./components/nav"
import Sidebar from "./components/sidebar"

export default function Admin(){
    return(
        <>
        <Row className="g-0">
            <Col className="col-2">
                <Sidebar/>
            </Col>
            <Col className="col-12 col-md-10">
                <NavBar/>
            <Container className="vh-auto" style={{backgroundColor:"lightgray",height:"90vh",overflowY:"scroll"}} fluid>
                    <Outlet/>
            </Container>
            </Col>
        </Row>
        </>
    )
}