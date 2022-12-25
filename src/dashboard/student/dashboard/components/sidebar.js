import {Nav,Container,Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Journals,Newspaper,Person,PersonPlus, Laptop,PencilSquare,Recycle} from "react-bootstrap-icons";

export default function Sidebar(){
    return(
        <>
            <Nav style={{minHeight:"100vh"}}className="d-none d-md-block align-items-center bg-dark d-flex sidebar">
                <Container className="pt-3" fluid>
                <Navbar.Brand href="#home" className="text-light fw-bold fs-5 me-3 mb-4">
                    <img
                    alt="portal logo"
                    src="/fpn.jpg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top rounded me-2"
                    />
                    <span className="pe-lg-2">Student</span>
                </Navbar.Brand>
                <hr className="text-light" style={{width:"100%"}}/>
        <div className="mt-4 d-flex flex-column gap-3 text-light text-center fw-bold">
            <LinkContainer to="">
                    <Nav.Link className="d-flex flex-row text-light">
                    <Person className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Profile
                    </Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="payments">
                <Nav.Link className="d-flex flex-row text-light">
                    <Recycle className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Payments
                </Nav.Link >
            </LinkContainer> */}
            <LinkContainer to="courses">
                <Nav.Link className="d-flex flex-row text-light">
                <Journals className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Courses
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/exam"> 
                <Nav.Link className="d-flex flex-row text-light">
                    <Laptop className="me-2" style={{height:"20px",width:"20px"}}/>
                    Examination
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="examination/result">
                <Nav.Link className="d-flex flex-row text-light">
                    <Newspaper className="me-2"  style={{height:"20px",width:"20px"}}/>
                    Results
                </Nav.Link>
            </LinkContainer>
    </div>
    </Container>
            </Nav> 
   {/* PASTE HERE */}
  
            
        </>
    )
}