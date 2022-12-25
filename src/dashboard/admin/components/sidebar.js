import {Nav,Container,Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Speedometer2,Journals,PersonPlus,People,ClockHistory,Book,House, Laptop,Gear,PencilSquare,Recycle} from "react-bootstrap-icons";

export default function Sidebar(){
    return(
        <>
            <Nav style={{height:"100vh",overflowX:"scroll"}}className="w-100 d-none d-md-block align-items-center bg-dark d-flex">
                <Container className="pt-3" fluid>
                <Navbar.Brand href="#home" className="text-light fw-bold fs-5 me-3 mb-4">
                    <img
                    alt="portal logo"
                    src="/fpn.jpg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top rounded me-2"
                    />
                    <span className="d-md-none d-lg-inline-block pe-lg-2">Administrator</span>
                    <span className="d-lg-none">Admin</span>
                </Navbar.Brand>
                <hr className="text-light" style={{width:"100%"}}/>
        <div className="mt-4 d-flex flex-column gap-3 text-center fw-bold">
            <LinkContainer to="">
            <Nav.Link className="d-flex flex-row text-light">
                    <Speedometer2 className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Dashboard
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="applicants">
                <Nav.Link className="d-flex flex-row text-light">
                    <PersonPlus className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Applicants
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="students">
                <Nav.Link className="d-flex flex-row text-light">
                    <People className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Students
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="payments">
                <Nav.Link className="d-flex flex-row text-light">
                <Recycle className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Payments
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="session"> 
                <Nav.Link className="d-flex flex-row text-light">
                    <ClockHistory className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Sessions
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="school"> 
                <Nav.Link className="d-flex flex-row text-light">
                    <House className="me-2"  style={{height:"20px",width:"20px"}}/>
                    School
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="department" className="w-100"> 
                <Nav.Link className="d-flex flex-row text-light">
                    <PencilSquare className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Departments
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="course"> 
                <Nav.Link className="d-flex flex-row text-light">
                    <Journals className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Courses
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/exam">
                <Nav.Link className="d-flex flex-row text-light">
                    <Laptop className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Exams
                </Nav.Link>
            </LinkContainer>
    </div>
    </Container>
            </Nav>
        </>
    )
}